const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector("#mobile-menu");
const form = document.querySelector("#book-form");
const statusEl = document.querySelector("#form-status");
const cards = [...document.querySelectorAll(".artist-card")];
const dotsWrap = document.querySelector("[data-dots]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");

let index = 0;

menuBtn?.addEventListener("click", () => {
  const open = mobileMenu.hasAttribute("hidden") === false;
  if (open) {
    mobileMenu.setAttribute("hidden", "");
    menuBtn.setAttribute("aria-expanded", "false");
  } else {
    mobileMenu.removeAttribute("hidden");
    menuBtn.setAttribute("aria-expanded", "true");
  }
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.setAttribute("hidden", "");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show artist ${i + 1}`);
    if (i === index) dot.classList.add("is-active");
    dot.addEventListener("click", () => show(i));
    dotsWrap.append(dot);
  });
}

function show(next) {
  if (!cards.length) return;
  cards[index]?.classList.remove("is-active");
  index = (next + cards.length) % cards.length;
  cards[index]?.classList.add("is-active");
  renderDots();
}

prevBtn?.addEventListener("click", () => show(index - 1));
nextBtn?.addEventListener("click", () => show(index + 1));
renderDots();

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "there").split(" ")[0];
  statusEl.hidden = false;
  statusEl.textContent = `Thanks, ${name}. This demo would now hold that chair — no booking was actually made.`;
  form.reset();
});
