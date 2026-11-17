const projectForm = document.querySelector("#project-form");
const formStatus = document.querySelector("#form-status");
const studioWhatsApp = "https://wa.me/60176049150";
const lightbox = document.querySelector("#project-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");

if (lightbox && lightboxImage) {
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.lightboxSrc;
      lightboxImage.alt = item.querySelector("img")?.alt || "EENUO project photo";
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lightbox-close")?.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

if (projectForm && formStatus) {
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!projectForm.reportValidity()) return;

    const answers = new FormData(projectForm);
    const message = [
      "Hi EENUO Cabinet Studio, I'd like to discuss a project.",
      "",
      `Name: ${answers.get("name")}`,
      `Project: ${answers.get("project")}`,
      `Preferred timing: ${answers.get("timing")}`,
      `About the space: ${answers.get("details") || "I can share more details in chat."}`,
    ].join("\n");
    const whatsappUrl = `${studioWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    formStatus.textContent = "WhatsApp will open with your project details. Review your message and tap Send to contact the studio.";
  });
}
