(() => {
  const sectionsRoot = document.getElementById("sections");
  const topGrid = document.getElementById("topGrid");
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");
  const noResults = document.getElementById("noResults");
  const greeting = document.getElementById("greeting");
  const subtitle = document.getElementById("subtitle");
  const dateLabel = document.getElementById("dateLabel");
  const themeButton = document.getElementById("themeButton");

  const dayparts = [
    [5, "morning"],
    [12, "afternoon"],
    [18, "evening"],
    [24, "evening"],
  ];

  function currentDaypart() {
    const hour = new Date().getHours();
    return (dayparts.find(([limit]) => hour < limit) || dayparts[0])[1];
  }

  function setHeader() {
    document.title = HOME_SETTINGS.title || "Home";
    greeting.textContent = (HOME_SETTINGS.greeting || "Hello")
      .replace("{daypart}", currentDaypart());
    subtitle.textContent = HOME_SETTINGS.subtitle || "";
    dateLabel.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date());
  }

  function faviconUrl(url) {
    return "https://www.google.com/s2/favicons?sz=64&domain_url=" +
      encodeURIComponent(url);
  }

  function linkCard(link, compact = false) {
    const a = document.createElement("a");
    a.className = compact ? "link-card top-card" : "link-card";
    a.href = link.url;
    a.dataset.search = [link.name, link.url]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const icon = document.createElement("img");
    icon.className = "favicon";
    icon.src = faviconUrl(link.url);
    icon.alt = "";
    icon.loading = "lazy";

    const name = document.createElement("span");
    name.className = "link-name";
    name.textContent = link.name;

    a.append(icon, name);
    return a;
  }

  function render() {
    sectionsRoot.replaceChildren();
    topGrid.replaceChildren();

    (HOME_TOP_LINKS || []).forEach(link => topGrid.append(linkCard(link, true)));

    HOME_SECTIONS.forEach(section => {
      const wrapper = document.createElement("section");
      wrapper.className = "link-section";

      const heading = document.createElement("div");
      heading.className = "section-heading";
      heading.innerHTML = "<h2></h2><span></span>";
      heading.querySelector("h2").textContent = section.title;
      heading.querySelector("span").textContent =
        section.links.length + (section.links.length === 1 ? " link" : " links");

      const grid = document.createElement("div");
      grid.className = "link-grid";
      section.links.forEach(link => grid.append(linkCard(link)));

      wrapper.append(heading, grid);
      sectionsRoot.append(wrapper);
    });
  }

  function filterLinks(query) {
    const q = query.trim().toLowerCase();
    let visibleCount = 0;

    document.querySelectorAll(".link-section").forEach(section => {
      let sectionVisible = 0;
      section.querySelectorAll(".link-card").forEach(card => {
        const show = !q || card.dataset.search.includes(q);
        card.hidden = !show;
        if (show) sectionVisible += 1;
      });
      section.hidden = sectionVisible === 0;
      visibleCount += sectionVisible;
    });

    let topVisible = 0;
    topGrid.querySelectorAll(".link-card").forEach(card => {
      const show = !q || card.dataset.search.includes(q);
      card.hidden = !show;
      if (show) topVisible += 1;
    });

    noResults.hidden = !q || (visibleCount + topVisible) > 0;
  }

  searchInput.addEventListener("input", () => filterLinks(searchInput.value));

  searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const value = searchInput.value.trim();
    if (!value) return;

    const visible = [...document.querySelectorAll(".link-section .link-card")]
      .filter(card => !card.hidden);

    if (visible.length === 1) {
      window.location.href = visible[0].href;
      return;
    }

    window.location.href =
      (HOME_SETTINGS.searchEngine || "https://www.google.com/search?q=") +
      encodeURIComponent(value);
  });

  document.addEventListener("keydown", event => {
    if (
      event.key === "/" &&
      document.activeElement !== searchInput &&
      !document.querySelector("dialog[open]")
    ) {
      event.preventDefault();
      searchInput.focus();
    }
  });

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("home-theme", theme);
    themeButton.textContent = theme === "dark" ? "☀" : "◐";
  }

  const storedTheme = localStorage.getItem("home-theme");
  const initialTheme =
    storedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initialTheme);

  themeButton.addEventListener("click", () => {
    applyTheme(
      document.documentElement.dataset.theme === "dark" ? "light" : "dark"
    );
  });

  const helpDialog = document.getElementById("helpDialog");
  document.getElementById("editHelp").addEventListener("click", () => helpDialog.showModal());
  document.getElementById("closeHelp").addEventListener("click", () => helpDialog.close());

  setHeader();
  render();
})();
