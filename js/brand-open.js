/* House pattern: opaque initials veil for first load and in-page links. */

const overlay = document.querySelector("[data-brand-open]");
const mark = overlay?.querySelector("[data-brand-initials]");
const travelBtn = document.querySelector("[data-page-travel]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let busy = false;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, reduceMotion ? 0 : ms));
}

function setInitials() {
  if (!overlay || !mark) return;
  mark.textContent = overlay.getAttribute("data-initials") || "ÉL";
}

async function cover() {
  overlay.classList.add("is-active");
  overlay.setAttribute("aria-hidden", "false");
  document.documentElement.classList.add("brand-open-pending");
  overlay.offsetHeight;
  overlay.classList.add("is-covering");
  overlay.classList.remove("is-revealing", "is-intro");
  await wait(720);
}

async function reveal() {
  overlay.classList.remove("is-covering", "is-intro");
  overlay.classList.add("is-active", "is-revealing");
  await wait(880);
  overlay.classList.remove("is-active", "is-revealing");
  overlay.setAttribute("aria-hidden", "true");
  document.documentElement.classList.remove("brand-open-pending");
}

async function play(afterCover) {
  if (!overlay || busy) return;
  busy = true;
  await cover();
  afterCover?.();
  await reveal();
  busy = false;
}

async function intro() {
  if (!overlay) return;
  setInitials();
  overlay.classList.add("is-active", "is-intro");
  overlay.setAttribute("aria-hidden", "false");
  await wait(900);
  busy = true;
  await reveal();
  busy = false;
}

function goToHash(hash) {
  const id = hash.replace("#", "");
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "auto", block: "start" });
    history.pushState(null, "", hash);
  }
}

function nearBottom() {
  const room = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  return room < 120;
}

function updateTravel() {
  if (!travelBtn) return;
  const down = !nearBottom();
  travelBtn.dataset.direction = down ? "down" : "up";
  travelBtn.setAttribute("aria-label", down ? "Go to the bottom" : "Back to the top");
  travelBtn.querySelector(".page-travel__icon").textContent = down ? "↓" : "↑";
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.classList.contains("skip-link")) return;
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    event.preventDefault();
    play(() => goToHash(hash));
  });
});

travelBtn?.addEventListener("click", () => {
  const down = travelBtn.dataset.direction !== "up";
  play(() => {
    window.scrollTo({
      top: down ? document.documentElement.scrollHeight : 0,
      behavior: "auto",
    });
  });
});

window.addEventListener("scroll", updateTravel, { passive: true });
updateTravel();
setInitials();
intro();

window.BrandOpen = { play };
