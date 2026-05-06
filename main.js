/* global CONTENT */

const el = {
  heroTitleRu: document.querySelector("#hero-title-ru"),
  heroTitleZh: document.querySelector("#hero-title-zh"),
  heroSubtitle: document.querySelector("#hero-subtitle"),
  heroPhoto: document.querySelector("#hero-photo"),
  aboutDescription: document.querySelector("#about-description"),
  aboutStats: document.querySelector("#about-stats"),
  menuTabs: document.querySelector("#menu-tabs"),
  menuItems: document.querySelector("#menu-items"),
  advantagesList: document.querySelector("#advantages-list"),
  reviewsList: document.querySelector("#reviews-list"),
  contactAddress: document.querySelector("#contact-address"),
  contactMetro: document.querySelector("#contact-metro"),
  contactWorktime: document.querySelector("#contact-worktime"),
  contactSocial: document.querySelector("#contact-social"),
  mapIframe: document.querySelector("#map-iframe"),
  routeLink: document.querySelector("#route-link"),
  takeawayLink: document.querySelector("#takeaway-link"),
  footerName: document.querySelector("#footer-name"),
  footerCopy: document.querySelector("#footer-copy"),
  footerMapLink: document.querySelector("#footer-map-link"),
  footerVkLink: document.querySelector("#footer-vk-link"),
};

let activeCategory = "";

function setSeoMeta() {
  if (!CONTENT?.seo) return;
  document.title = CONTENT.seo.title || document.title;
  const desc = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (desc) desc.setAttribute("content", CONTENT.seo.description || "");
  if (ogTitle) ogTitle.setAttribute("content", CONTENT.seo.ogTitle || CONTENT.seo.title || "");
  if (ogDesc) ogDesc.setAttribute("content", CONTENT.seo.ogDescription || "");
}

function renderHero() {
  el.heroTitleRu.textContent = CONTENT.hero.titleRu;
  el.heroTitleZh.textContent = CONTENT.hero.titleZh;
  el.heroSubtitle.textContent = CONTENT.hero.subtitle;

  // Фото кафе
  if (el.heroPhoto && CONTENT.hero.photo) {
    el.heroPhoto.src = CONTENT.hero.photo;
    el.heroPhoto.style.display = "block";
  }
}

function renderAbout() {
  el.aboutDescription.textContent = CONTENT.about.description;
  el.aboutStats.innerHTML = CONTENT.about.stats
    .map((stat) => `
      <article class="stat-card">
        <p class="stat-card__value">${stat.value}</p>
        <p class="stat-card__label">${stat.label}</p>
      </article>
    `).join("");
}

function renderMenuTabs() {
  const categories = CONTENT.menu.map((section) => section.category);
  activeCategory = activeCategory || categories[0];
  el.menuTabs.innerHTML = categories
    .map((category) => `
      <button class="menu-tab ${category === activeCategory ? "is-active" : ""}" type="button" role="tab" aria-selected="${category === activeCategory}" data-category="${category}">
        ${category}
      </button>
    `).join("");
  el.menuTabs.querySelectorAll(".menu-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category || "";
      renderMenuTabs();
      renderMenuItems();
    });
  });
}

function renderMenuItems() {
  const section = CONTENT.menu.find((entry) => entry.category === activeCategory);
  const items = section?.items || [];
  el.menuItems.innerHTML = items
    .map((item) => {
      const imageBlock = item.photo
        ? `<img src="${item.photo}" alt="${item.name}" loading="lazy" />`
        : `<div class="menu-card__placeholder" aria-hidden="true">食</div>`;
      return `
        <article class="menu-card">
          <div class="menu-card__media">${imageBlock}</div>
          <div class="menu-card__body">
            <div class="menu-card__header">
              <h3>${item.name}</h3>
              <p class="menu-card__price">${item.price}</p>
            </div>
            <p class="menu-card__desc">${item.desc}</p>
          </div>
        </article>
      `;
    }).join("");
}

function renderAdvantages() {
  el.advantagesList.innerHTML = CONTENT.advantages
    .map((item) => `
      <article class="advantage-card">
        <div class="advantage-card__icon" aria-hidden="true">${item.icon}</div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");
}

function renderReviews() {
  el.reviewsList.innerHTML = CONTENT.reviews
    .map((review) => {
      const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
      return `
        <article class="review-card">
          <div class="review-card__top">
            <p class="review-card__name">${review.name}</p>
            <p class="review-card__date">${review.date}</p>
          </div>
          <p class="review-card__stars" aria-label="Оценка ${review.rating} из 5">${stars}</p>
          <p class="review-card__text">${review.text}</p>
        </article>
      `;
    }).join("");
}

function formatSchedule(schedule) {
  return Object.entries(schedule).map(([day, hours]) => `${day}: ${hours}`).join(" | ");
}

function renderContacts() {
  el.contactAddress.textContent = CONTENT.contacts.address;
  el.contactMetro.textContent = CONTENT.contacts.metro;
  el.contactWorktime.textContent = formatSchedule(CONTENT.contacts.workSchedule);
  el.mapIframe.src = CONTENT.contacts.mapIframe;
  el.routeLink.href = CONTENT.contacts.yandexMapsUrl;
  el.takeawayLink.href = CONTENT.contacts.takeawayLink || "#";
  el.takeawayLink.textContent = CONTENT.contacts.takeawayLabel || "Заказать навынос";

  // Кнопки соцсетей (ВКонтакте)
  if (el.contactSocial && CONTENT.contacts.social?.length) {
    el.contactSocial.innerHTML = CONTENT.contacts.social
      .map((s) => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-btn social-btn--${s.icon}">
          ${s.name}
        </a>
      `).join("");
  }
}

function renderFooter() {
  el.footerName.textContent = CONTENT.footer.name;
  el.footerCopy.textContent = CONTENT.footer.copyright;
  el.footerMapLink.href = CONTENT.contacts.yandexMapsUrl;

  // ВК в футере
  if (el.footerVkLink && CONTENT.footer.vkUrl) {
    el.footerVkLink.href = CONTENT.footer.vkUrl;
    el.footerVkLink.style.display = "inline";
  }
}

function init() {
  setSeoMeta();
  renderHero();
  renderAbout();
  renderMenuTabs();
  renderMenuItems();
  renderAdvantages();
  renderReviews();
  renderContacts();
  renderFooter();
}

init();
