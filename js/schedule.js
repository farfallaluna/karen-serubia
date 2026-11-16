/* =========================================
   SCHEDULE SYSTEM
   MOON CALENDAR
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const calendarGrid = document.getElementById("calendar-grid");
    const calendarMonth = document.getElementById("calendar-month");
    const eventDetail = document.getElementById("event-detail");
    const upcomingList = document.getElementById("upcoming-list");
  
    const prevButton = document.getElementById("prev-month");
    const nextButton = document.getElementById("next-month");
    const todayButton = document.getElementById("today-month");
  
    if (
      !calendarGrid ||
      !calendarMonth ||
      !eventDetail ||
      !upcomingList
    ) return;
  
    const events = window.scheduleEvents || [];
  
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let selectedDate = null;
  
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
    const categoryClass = {
      WAVE: "event-wave",
      MUSIC: "event-music",
      COLLAB: "event-collab",
      SPECIAL: "event-special"
    };
  
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
  
      return `${year}-${month}-${day}`;
    }
  
    function renderCalendar() {
      calendarGrid.innerHTML = "";
  
      calendarMonth.textContent = new Date(
        currentYear,
        currentMonth
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long"
      });
  
      // 曜日
      weekdays.forEach((day, index) => {
        const weekday = document.createElement("div");
        weekday.className = "calendar-day calendar-weekday";
        weekday.textContent = day;
      
        weekday.style.setProperty(
          "--calendar-delay",
          `${index * 60}ms`
        );
      
        calendarGrid.appendChild(weekday);
      });
  
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);
  
      const startDay = firstDay.getDay();
      const totalDays = lastDay.getDate();
  
      const totalCells = Math.ceil((startDay + totalDays) / 7) * 7;
  
      for (let i = 0; i < totalCells; i++) {
        const dayNumber = i - startDay + 1;
        const cellDate = new Date(currentYear, currentMonth, dayNumber);
        const dateString = formatDate(cellDate);
  
        const cell = document.createElement("div");
        cell.className = "calendar-day";
        cell.classList.add("calendar-cell-reveal");

        cell.style.setProperty(
          "--calendar-delay",
          `${(i + 7) * 35}ms`
        );
  
        if (cellDate.getMonth() !== currentMonth) {
          cell.classList.add("is-outside");
        }
  
        if (dateString === formatDate(today)) {
          cell.classList.add("is-today");
        }
  
        if (dateString === selectedDate) {
          cell.classList.add("is-selected");
        }
  
        const dateLabel = document.createElement("span");
        dateLabel.className = "calendar-date";
        dateLabel.textContent = cellDate.getDate();
  
        cell.appendChild(dateLabel);
  
        const dayEvents = events.filter(event => event.date === dateString);
        if (dayEvents.length > 0) {
            cell.classList.add("has-event");
          }
        dayEvents.forEach(event => {
          const eventButton = document.createElement("button");
  
          eventButton.type = "button";
          eventButton.className =
            `calendar-event ${categoryClass[event.category] || "event-wave"}`;
  
          eventButton.textContent = event.category;
  
          eventButton.addEventListener("click", (e) => {
            e.stopPropagation();
            showEventDetail(dateString);
          });
  
          cell.appendChild(eventButton);
        });
  
        cell.addEventListener("click", () => {
          selectedDate = dateString;
          showEventDetail(dateString);
          renderCalendar();
        });
  
        calendarGrid.appendChild(cell);
      }
    }
  
    function showEventDetail(dateString) {
      const selectedEvents = events.filter(
        event => event.date === dateString
      );
    
      const eventContent = selectedEvents.length
        ? selectedEvents.map(event => `
            <p class="event-letter-date">
              ${event.date.replaceAll("-", ".")}
            </p>
    
            <h2 class="event-letter-title">${event.title}</h2>
    
            <div class="event-letter-divider"></div>
    
            <p class="event-letter-description">
              ${event.description}
            </p>
    
            <p class="event-letter-meta">
              ${event.time || ""}
              ${event.platform ? `<br>${event.platform}` : ""}
            </p>
    
            <span class="event-letter-category">
              ${event.category}
            </span>
    
            ${event.url ? `
              <a class="event-letter-link"
                 href="${event.url}"
                 target="_blank"
                 rel="noopener noreferrer">
                OPEN EVENT PAGE ↗
              </a>
            ` : ""}
          `).join("")
        : `
            <p class="event-letter-date">
              ${dateString.replaceAll("-", ".")}
            </p>
    
            <h2 class="event-letter-title">
              A Quiet Moonlit Night
            </h2>
    
            <div class="event-letter-divider"></div>
    
            <p class="event-letter-description">
              この日の予定はありません。<br>
              また月明かりの下でお会いしましょう。
            </p>
          `;
    
      eventDetail.innerHTML = `
        <div class="event-detail-inner">
          <div class="event-letter-moon">☾</div>
    
          <p class="event-letter-label">
            MOONLIT EVENT LETTER
          </p>
    
          ${eventContent}
    
          <p class="event-letter-description" style="margin-top:24px;">
            May this night become a beautiful memory.
          </p>
    
          <button class="event-letter-close" type="button">
            CLOSE ✧
          </button>
        </div>
      `;
    
      eventDetail.classList.remove("is-updating");
    
      requestAnimationFrame(() => {
        eventDetail.classList.add("is-active");
      });
    }
    function closeEventDetail() {
      eventDetail.classList.remove("is-active");
    }
    
    // 背景またはCLOSEボタンで閉じる
    eventDetail.addEventListener("click", (event) => {
      if (
        event.target === eventDetail ||
        event.target.closest(".event-letter-close")
      ) {
        closeEventDetail();
      }
    });
    
    // Escapeキーで閉じる
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeEventDetail();
      }
    });
    
    function renderUpcoming() {
      const upcomingEvents = [...events]
        .filter(event => event.date >= formatDate(today))
        .sort((a, b) => a.date.localeCompare(b.date));
  
      if (upcomingEvents.length === 0) {
        upcomingList.innerHTML = "<p>現在、予定されているイベントはありません。</p>";
        return;
      }
  
      upcomingList.innerHTML = upcomingEvents.map(event => `
  <button class="upcoming-item" type="button"
    data-event-date="${event.date}">

    <div class="upcoming-date">
      ${event.date.replaceAll("-", ".")}
    </div>

    <div class="upcoming-info">
      <h3>${event.title}</h3>
      <p>${event.description}</p>
    </div>

    <div class="upcoming-time">
      ${event.time || ""}<br>${event.platform || ""}
    </div>

    <span class="upcoming-arrow">→</span>

  </button>
`).join("");

// イベントをクリックしたらポップアップを表示
upcomingList.querySelectorAll(".upcoming-item").forEach(item => {
  item.addEventListener("click", () => {
    const dateString = item.dataset.eventDate;
    showEventDetail(dateString);
  });
});
    }
  
    prevButton.addEventListener("click", () => {
      currentMonth--;
  
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
  
      renderCalendar();
    });
  
    nextButton.addEventListener("click", () => {
      currentMonth++;
  
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
  
      renderCalendar();
    });
  
    todayButton.addEventListener("click", () => {
      currentYear = today.getFullYear();
      currentMonth = today.getMonth();
      selectedDate = formatDate(today);
  
      renderCalendar();
      showEventDetail(selectedDate);
    });
  
    renderCalendar();
    renderUpcoming();
  
  });