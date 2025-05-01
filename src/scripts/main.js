document.addEventListener("mousemove", (event) => {
  const customCursor = document.getElementById("custom-cursor");
  customCursor.style.left = `${event.clientX}px`;
  customCursor.style.top = `${event.clientY}px`;
});

const links = document.querySelectorAll("a");
const customCursor = document.getElementById("custom-cursor");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    customCursor.style.backgroundColor = "red";
  });

  link.addEventListener("mouseleave", () => {
    customCursor.style.backgroundColor = "var(--cursor-color)";
  });
});