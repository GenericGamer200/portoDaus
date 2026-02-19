//improt
import { gsap } from "gsap";

//cari logo di assets
const techStack = [
  { name: "HTML5", icon: "html.svg" },
  { name: "CSS3", icon: "css.svg" },
  { name: "Tailwind", icon: "tailwind.svg" },
  { name: "JavaScript", icon: "js.svg" },
  { name: "Java", icon: "java.svg" },
  { name: "mySQL", icon: "mysql.svg" },
  { name: "MariaDB", icon: "mariadb.svg" },
  { name: "Git", icon: "git.svg", extraClass: "invert" },
  { name: "GitHub", icon: "github.svg", extraClass: "invert" },
];

const techGrid = document.getElementById("tech-grid");

// looping buat naro logo di seksi tech stack, {tech.extraClass || ""} biar ga error kalo gaada extraClass
techStack.forEach((tech) => {
  const card = `
    <div class="group p-8 border border-border rounded-2xl bg-bg/40 hover:border-accent transition-all duration-300 flex flex-col items-center justify-center gap-4">
      <img src="src/assets/${tech.icon}" 
           alt="${tech.name}" 
           class="w-12 h-12 md:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all ${tech.extraClass || ""}"> 
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
}

menuBtn.addEventListener("click", toggleMenu);

// tutup menu pas link di klik
mobileLinks.forEach((link) => {
  link.addEventListener("click", toggleMenu);
});

// logika preloader

document.body.classList.add("overflow-hidden"); // biar ga bisa scroll pas preloader

gsap.set(
  ["#bracket-left", "#bracket-right", "#loader-text", "#progress-fill"],
  { opacity: 0 },
);

gsap
  .timeline({
    onComplete: () =>
      gsap.to("#preloader", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          document.body.classList.remove("overflow-hidden"); // biar bisa scroll lagi setelah preloader hilang
          gsap.set("#preloader", { pointerEvents: "none" });
          initScrollReveal();
        },
      }),
  })
  //logika animasi preloader
  .to(
    "#bracket-left",
    { x: -50, opacity: 1, duration: 1.3, ease: "power2.inOut" },
    0.4,
  )
  .to(
    "#bracket-right",
    { x: 50, opacity: 1, duration: 1.3, ease: "power2.inOut" },
    "<",
  )
  .to(
    "#progress-fill",
    { width: "100%", opacity: 1, duration: 1.3, ease: "power2.inOut" },
    "<",
  )
  .to("#loader-text", { opacity: 1, duration: 0.7, ease: "power3.out" }, 1.8)
  .to(
    "#loader-text",
    { scale: 1, duration: 0.55, ease: "elastic.out(1.05,0.5)" },
    "-=0.35",
  )
  .to({}, { duration: 0.3 });

// logika scroll reveal, pake IntersectionObserver API buat deteksi elemen yang masuk viewport, terus kasih animasi fade in sesuai arah masuknya

function initScrollReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        let anim = "animate-fade-in-up"; // default animasi kalo masuk dari bawah

        if (el.classList.contains("-translate-x-[30px]"))
          anim = "animate-fade-in-left";
        if (el.classList.contains("translate-x-[30px]"))
          anim = "animate-fade-in-right";

        el.classList.remove(
          "opacity-0",
          "translate-y-[30px]",
          "-translate-x-[30px]",
          "translate-x-[30px]",
        );
        el.classList.add(anim);
        obs.unobserve(el);
      });
    },
    { threshold: 0.15 }, // trigger animasi saat 15% elemen terlihat di viewport
  );

  document.querySelectorAll(".will-reveal").forEach((el) => obs.observe(el)); // observe semua elemen dengan class will-reveal
}
