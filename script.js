// Lógica de curtidas, animações e interações
document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".post-actions > .action-btn:last-child");

    if (!likeBtn) return;
    const likeSvg = likeBtn.querySelector("svg");

    // Localiza o nó de texto do botão para atualizar o contador
    let textNode = Array.from(likeBtn.childNodes).find(node => 
        node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
    );

    // Começa em 9999 para que ao curtir vá para 10000 (exibindo "10K")
    let baseLikes = 9999;
    let maxLikes = 10000;
    let minLikes = 0;
    let isLiked = false;

    // Define o valor inicial no elemento de texto
    if (textNode) {
        textNode.textContent = ` ${formatLikes(baseLikes)}`;
    }

    // Formata números para formato abreviado se ultrapassarem 1000
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "K";
        }
        return num.toString();
    }

    // Aplica o estilo e animação (bounce) no coração
    function applyLikedStyle(liked) {
        if (liked) {
            likeSvg.style.fill = "#ef4444";
            likeSvg.style.stroke = "#ef4444";
            likeSvg.style.color = "#ef4444";
        } else {
            likeSvg.style.fill = "none";
            likeSvg.style.stroke = "currentColor";
            likeSvg.style.color = "#ffffff";
        }

        // Efeito visual de escala
        likeSvg.style.transform = "scale(1.4)";
        setTimeout(() => {
            likeSvg.style.transform = "scale(1)";
        }, 150);
    }

    // Função central para incrementar/adicionar curtida
    function addLike() {
        if (!isLiked) {
            if (baseLikes < maxLikes) {
                baseLikes++;
            }
            isLiked = true;
            likeBtn.classList.add("liked");
            applyLikedStyle(true);
        } else {
            baseLikes = Math.max(minLikes, baseLikes - 1);
            isLiked = false;
            likeBtn.classList.remove("liked");
            applyLikedStyle(false);
        }

        if (textNode) {
            textNode.textContent = ` ${formatLikes(baseLikes)}`;
        }
    }

    // Evento de clique no BOTÃO DE CORAÇÃO (Curte ou Descurte)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addLike();
    });

    // Evento de clique na IMAGEM PRINCIPAL (Soma ou subtrai o like alternadamente)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Evento no botão de SALVAR (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const svgBookmark = bookmarkBtn.querySelector("svg");
            if (svgBookmark) {
                svgBookmark.style.transform = "scale(1.2)";
                setTimeout(() => {
                    svgBookmark.style.transform = "scale(1)";
                }, 150);
            }
        });
    }
});