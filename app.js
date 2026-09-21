(() => {
  const sectionsRoot = document.getElementById("sections");
  const quickSection = document.getElementById("quickSection");
  const quickGrid = document.getElementById("quickGrid");
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

  function linkCard(link) {
    const a = document.createElement("a");
    a.className = "link-card";
    a.href = link.url;
    a.dataset.search = [link.name, link.note, link.url]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = link.icon || link.name.slice(0, 2).toUpperCase();

    const copy = document.createElement("span");
    copy.className = "link-copy";

    const name = document.createElement("span");
    name.className = "link-name";
    name.textContent = link.name;

    const note = document.createElement("span");
    note.className = "link-note";
    note.textContent = link.note || new URL(link.url).hostname;

    copy.append(name, note);
    a.append(icon, copy);
    return a;
  }

  function render() {
    sectionsRoot.replaceChildren();
    quickGrid.replaceChildren();

    const favourites = HOME_SECTIONS.flatMap(section =>
      section.links.filter(link => link.favourite)
    );
    favourites.forEach(link => quickGrid.append(linkCard(link)));
    quickSection.hidden = favourites.length === 0;

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

    let quickVisible = 0;
    quickGrid.querySelectorAll(".link-card").forEach(card => {
      const show = !q || card.dataset.search.includes(q);
      card.hidden = !show;
      if (show) quickVisible += 1;
    });
    quickSection.hidden = quickVisible === 0;

    noResults.hidden = !q || visibleCount > 0;
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
