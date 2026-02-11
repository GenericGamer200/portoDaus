//cari logo di assets
const techStack = [
  { name: "HTML5", icon: "html.svg" },
  { name: "CSS3", icon: "css.svg" },
  { name: "Tailwind", icon: "tailwind.svg" },
  { name: "JavaScript", icon: "js.svg" },
  { name: "Git", icon: "git.svg", extraClass: "invert" },
  { name: "GitHub", icon: "github.svg", extraClass: "invert" },
];

const techGrid = document.getElementById("tech-grid");

// looping buat naro logo di seksi tech stack, {tech.extraClass || ""} biar ga error kalo gaada extraClass
techStack.forEach((tech) => {
  const card = `
    <div class="group p-8 border border-border rounded-2xl bg-bg/40 hover:border-accent transition-all duration-300 flex flex-col items-center justify-center gap-4">
      <img src="/assets/${tech.icon}" 
           alt="${tech.name}" 
           class="w-12 h-12 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all ${tech.extraClass || ""}"> 
      <span class="text-xs font-bold text-text/40 group-hover:text-text tracking-widest uppercase">
        ${tech.name}
      </span>
    </div>
  `;
  techGrid.innerHTML += card;
});

//logika tahun dinamis di footer
document.getElementById("year").textContent = new Date().getFullYear();

//logika hamburger menu
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const mobileLinks = document.querySelectorAll(".mobile-link");

function toggleMenu() {
  // Slide menu in/out
  mobileMenu.classList.toggle("translate-x-full");
  mobileMenu.classList.toggle("translate-x-0");

  // animasi hamburger menu
  line1.classList.toggle("rotate-45");
  line1.classList.toggle("translate-y-2");

  line2.classList.toggle("opacity-0");

  line3.classList.toggle("-rotate-45");
  line3.classList.toggle("-translate-y-2");

  // cegah scroll pas menu kebuka
  // document.body.classList.toggle("overflow-hidden");
}

menuBtn.addEventListener("click", toggleMenu);

// tutup menu pas link di klik
mobileLinks.forEach((link) => {
  link.addEventListener("click", toggleMenu);
});

//logika preload
//kunci scroll pas preloader aktif
document.body.classList.add("overflow-hidden");

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const bLeft = document.getElementById("bracket-left");
  const bRight = document.getElementById("bracket-right");
  const loaderText = document.getElementById("loader-text");
  const progressFill = document.getElementById("progress-fill");

  // tampilkan bracket kalo udah kepanggil aja
  if (bLeft && bRight) {
    bLeft.classList.remove("opacity-0");
    bRight.classList.remove("opacity-0");
  }

  let progress = 0;

  const interval = setInterval(() => {
    let remaining = 100 - progress;
    // buat progress makin pelan pas mendekati 100%
    let jump = remaining * 0.12;
    if (jump < 0.2) jump = 0.2;
    progress += jump;

    // biar ga pernah lebih dari 100%
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // teks dev muncul
      loaderText.style.opacity = "1";

      // biar preloader fade out setelah loading selesai
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.8s ease";
        setTimeout(() => {
          document.body.classList.remove("overflow-hidden"); // bisa scroll lagi
          preloader.remove();
        }, 800);
      }, 1200);
    }

    // animasi progress bar
    progressFill.style.width = `${progress}%`;

    // animasi bracket bergerak
    // maksimal bracket bergerak 40px
    //pake gpu transform biar lebih smooth
    const maxTravel = 40;
    const currentTravel = (progress * maxTravel) / 100;

    if (bLeft && bRight) {
      // set posisi awal bracket
      bLeft.style.left = "50%";
      bRight.style.right = "50%";
      bLeft.style.transform = `translateX(calc(-50% - ${currentTravel}px))`;
      bRight.style.transform = `translateX(calc(50% + ${currentTravel}px))`;
    }
  }, 30); // biar lebih smooth, bisa diatur dari 30 sampe 100ms makin kecil makin smooth
});
