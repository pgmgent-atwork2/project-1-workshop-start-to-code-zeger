document.addEventListener("mousemove", (event) => {
  const customCursor = document.getElementById("custom-cursor");
  customCursor.style.left = `${event.clientX}px`;
  customCursor.style.top = `${event.clientY}px`;
});