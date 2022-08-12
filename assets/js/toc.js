window.addEventListener("DOMContentLoaded", () => {
  const observerForTableOfContentActiveState = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          document
            .querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.add("active");
        } else {
          document
            .querySelector(`nav li a[href="#${id}"]`)
            .parentElement.classList.remove("active");
        }
      });
    }
  );
  document
    .querySelectorAll("h1[id],h2[id],h3[id], h4[id]")
    .forEach((section) => {
      observerForTableOfContentActiveState.observe(section);
    });
  // Track all sections that have an `id` applied
});
