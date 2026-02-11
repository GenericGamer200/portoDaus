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
      <img src="assets/${tech.icon}" 
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

  if (bLeft && bRight) {
    bLeft.classList.remove("opacity-0");
    bRight.classList.remove("opacity-0");
  }

  let progress = 0;

  const interval = setInterval(() => {
    let remaining = 100 - progress;
    let jump = remaining * 0.12;
    if (jump < 0.2) jump = 0.2;
    progress += jump;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      loaderText.style.opacity = "1";

      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 0.8s ease-out";

        setTimeout(() => {
          document.body.classList.remove("overflow-hidden");
          preloader.remove();

          //animasi section muncul setelah preloader hilang
          const revealElements = document.querySelectorAll(".will-reveal");

          if (revealElements.length > 0) {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    //identifikasi elemen yang keliatan
                    let animation = "animate-fade-in-up";

                    if (
                      entry.target.classList.contains("-translate-x-[30px]")
                    ) {
                      animation = "animate-fade-in-left";
                    } else if (
                      entry.target.classList.contains("translate-x-[30px]")
                    ) {
                      animation = "animate-fade-in-right";
                    }
                    //ilangin kelas awal
                    entry.target.classList.remove(
                      "opacity-0",
                      "-translate-x-[30px]",
                      "translate-x-[30px]",
                      "translate-y-[30px]",
                    );

                    //tambahin kelas animasi sesuai arah
                    if (
                      entry.target.classList.contains("-translate-x-[30px]")
                    ) {
                      animation = "animate-fade-in-left";
                    } else if (
                      entry.target.classList.contains("translate-x-[30px]")
                    ) {
                      animation = "animate-fade-in-right";
                    }

                    entry.target.classList.add(animation);
                    observer.unobserve(entry.target);
                  }
                });
              },
              {
                root: null, // viewport
                rootMargin: "0px", // no margin
                threshold: 0.15, //gerak kalo 15% elemen keliatan
              },
            );

            revealElements.forEach((el) => observer.observe(el));
          }
        }, 800);
      }, 1200);
    }

    // update UI berdasarkan progress
    progressFill.style.width = `${progress}%`;

    const maxTravel = 40;
    const currentTravel = (progress * maxTravel) / 100;

    if (bLeft && bRight) {
      bLeft.style.left = "50%";
      bRight.style.right = "50%";
      bLeft.style.transform = `translateX(calc(-50% - ${currentTravel}px))`;
      bRight.style.transform = `translateX(calc(50% + ${currentTravel}px))`;
    }
  }, 30);
});
