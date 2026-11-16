/* =================================
   SCHEDULE — SCROLL MOTION
================================= */

document.addEventListener("DOMContentLoaded", () => {

    const calendarSection = document.querySelector(".calendar-section");
  
    if (!calendarSection) return;
  
    // カレンダーを監視する
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
  
          if (entry.isIntersecting) {
  
            const calendarGrid = entry.target.querySelector(
              "#calendar-grid"
            );
  
            if (!calendarGrid) return;
  
            // カレンダー全体を表示
            calendarGrid.classList.add("is-calendar-visible");
  
            // 日付セルを順番に表示
            const cells = calendarGrid.querySelectorAll(
              ".calendar-cell-reveal"
            );
  
            cells.forEach((cell, index) => {
              cell.style.setProperty(
                "--calendar-delay",
                `${index * 35}ms`
              );
  
              cell.classList.add("is-cell-visible");
            });
  
            // 一度表示したら監視終了
            observer.unobserve(entry.target);
          }
  
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      }
    );
  
    observer.observe(calendarSection);
  
  });