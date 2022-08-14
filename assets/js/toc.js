window.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("h1[id],h2[id],h3[id],h4[id]");

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
  headings.forEach((section) => {
    observerForTableOfContentActiveState.observe(section);
  });

  headings.forEach((section) => {
    section.addEventListener("click", () => {
      const location = window.location.origin + window.location.pathname;
      navigator.clipboard.writeText(`${location}#${section.id}`);
    });
  });
  // Track all sections that have an `id` applied
});
