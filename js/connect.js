/* =========================================
   CONNECT PAGE
   Latest Updates & NEW Badge
========================================= */

// 更新情報の管理
// 日付は YYYY-MM-DD 形式で入力

const connectUpdateSettings = {
    scheduleUpdatedAt: "",
  
    important: [
      /*
      {
        date: "2026-11-18",
        title: "重要なお知らせ",
        description: "お知らせの内容",
        url: "special.html"
      }
      */
    ],
  
    events: [
        {
          date: "2026-11-22",
          title: "境界幻想譚 第三話",
          description: "物語と歌が融合する月夜のひととき。",
          url: "schedule.html"
        }
      ],
  
    information: [
      /*
      {
        date: "2026-11-18",
        title: "通常のお知らせ",
        description: "お知らせの内容",
        url: "special.html"
      }
      */
    ]
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    renderConnectUpdates();
  });
  
  function parseConnectDate(value) {
    if (!value) return null;
  
    const normalized = String(value).replace(/\./g, "-");
    const match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  
    if (!match) return null;
  
    const [, year, month, day] = match;
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  
    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      return null;
    }
  
    return date;
  }
  
  function isConnectNew(dateValue) {
    const date = parseConnectDate(dateValue);
    if (!date) return false;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
  
    const days = Math.floor(
      (today - date) / (1000 * 60 * 60 * 24)
    );
  
    return days >= 0 && days < 14;
  }
  
  function formatConnectDate(value) {
    const date = parseConnectDate(value);
    if (!date) return "";
  
    return `${date.getFullYear()}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(
      date.getDate()
    ).padStart(2, "0")}`;
  }
  
  function createUpdateCard({
    category,
    title,
    description,
    date,
    url,
    isNew
  }) {
    const article = document.createElement("article");
    article.className = "connect-update-card";
  
    const top = document.createElement("div");
    top.className = "connect-update-top";
  
    const categoryLabel = document.createElement("span");
    categoryLabel.className = "connect-update-category";
    categoryLabel.textContent = category;
  
    top.appendChild(categoryLabel);
  
    if (isNew) {
      const badge = document.createElement("span");
      badge.className = "connect-new-badge";
      badge.textContent = "NEW";
      top.appendChild(badge);
    }
  
    const heading = document.createElement("h3");
    heading.textContent = title;
  
    const text = document.createElement("p");
    text.className = "connect-update-description";
    text.textContent = description || "";
  
    const dateText = document.createElement("time");
    dateText.className = "connect-update-date";
    dateText.textContent = formatConnectDate(date);
  
    article.append(top, heading, text, dateText);
  
    if (url) {
      const link = document.createElement("a");
      link.className = "connect-update-link";
      link.href = url;
      link.textContent = "VIEW MORE →";
      article.appendChild(link);
    }
  
    return article;
  }
  
  function renderConnectUpdates() {
    const container = document.getElementById(
      "connect-update-list"
    );
  
    if (!container) return;
  
    const updates = [];
  
    // SCHEDULE
    const events = window.scheduleEvents || [];
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const upcomingEvents = events
      .filter(event => {
        const eventDate = parseConnectDate(event.date);
        return eventDate && eventDate >= today;
      })
      .sort((a, b) => {
        return parseConnectDate(a.date) - parseConnectDate(b.date);
      });
  
    if (upcomingEvents.length > 0) {
      const event = upcomingEvents[0];
  
      updates.push({
        category: "SCHEDULE",
        title: event.title,
        description: `${event.date} / ${event.time} / ${event.platform}`,
        date: connectUpdateSettings.scheduleUpdatedAt,
        url: "schedule.html",
        isNew: isConnectNew(
          connectUpdateSettings.scheduleUpdatedAt
        ),
        sortDate: parseConnectDate(event.date)
      });
    }
  
    // LETTER
    const letters = window.letterData || [];
  
    const latestLetter = [...letters]
      .filter(letter => parseConnectDate(letter.date))
      .sort((a, b) => {
        return parseConnectDate(b.date) - parseConnectDate(a.date);
      })[0];
  
    if (latestLetter) {
      updates.push({
        category: "LETTER",
        title: latestLetter.title,
        description: latestLetter.heading || "A new letter from Karen.",
        date: latestLetter.date,
        url: "letter.html",
        isNew: isConnectNew(latestLetter.date),
        sortDate: parseConnectDate(latestLetter.date)
      });
    }
    // IMPORTANT
  connectUpdateSettings.important.forEach(item => {
    updates.push({
      category: "IMPORTANT",
      title: item.title,
      description: item.description,
      date: item.date,
      url: item.url || "",
      isNew: isConnectNew(item.date),
      sortDate: parseConnectDate(item.date)
    });
  });
  
  // EVENT
  connectUpdateSettings.events.forEach(item => {
    updates.push({
      category: "EVENT",
      title: item.title,
      description: item.description,
      date: item.date,
      url: item.url || "",
      isNew: isConnectNew(item.date),
      sortDate: parseConnectDate(item.date)
    });
  });

  
    // INFORMATION
    connectUpdateSettings.information.forEach(item => {
      updates.push({
        category: "INFORMATION",
        title: item.title,
        description: item.description,
        date: item.date,
        url: item.url || "",
        isNew: isConnectNew(item.date),
        sortDate: parseConnectDate(item.date)
      });
    });
  
    // 表示順：日付の新しいものから
    updates.sort((a, b) => {
      return (b.sortDate || 0) - (a.sortDate || 0);
    });
  
    container.innerHTML = "";
  
    if (updates.length === 0) {
      container.textContent = "現在、新しいお知らせはありません。";
      return;
    }
  
    updates.forEach(update => {
      container.appendChild(createUpdateCard(update));
    });
  }