document.addEventListener("DOMContentLoaded", () => {

    const memoryGrid = document.getElementById("pm-memory-grid");
    const filterButtons = document.querySelectorAll(".pm-filter");

    if (!memoryGrid || !window.preciousMomentsData) {
        console.warn("Precious Moments: データまたは表示場所が見つかりません。");
        return;
    }

    // --------------------
    // Memory Cards
    // --------------------
    function renderMemories(category = "ALL") {

        memoryGrid.innerHTML = "";

        const memories = window.preciousMomentsData.filter(memory => {
            return category === "ALL" || memory.category === category;
        });

        if (memories.length === 0) {
            memoryGrid.innerHTML = `
                <p class="pm-empty">まだ、このカテゴリーの思い出はありません。</p>
            `;
            return;
        }

        memories.forEach(memory => {

            const card = document.createElement("article");
            card.className = "pm-memory-card";

            card.innerHTML = `
                <div class="pm-memory-image">
                    <img src="${memory.image}" alt="${memory.title}" loading="lazy">
                </div>

                <div class="pm-memory-content">
                    <span class="pm-memory-category">${memory.category}</span>
                    <h3>${memory.title}</h3>
                    <p class="pm-memory-date">${memory.date}</p>
                    <p class="pm-memory-caption">${memory.caption}</p>
                </div>
            `;

            memoryGrid.appendChild(card);
        });
    }

    // --------------------
    // Category Filter
    // --------------------
    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.filter;

            filterButtons.forEach(item => {
                item.classList.remove("is-active");
            });

            button.classList.add("is-active");

            renderMemories(category);
        });

    });

    // Initial Display
    renderMemories();

});