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
    const isChinese = document.documentElement.lang === "zh-CN";
    const projectType = answers.get("project");
    const translatedProjectType = window.eenuoProjectTranslations?.[projectType] || projectType;
    const timing = answers.get("timing");
    const translatedTiming = window.eenuoProjectTranslations?.[timing] || timing;
    const message = isChinese
      ? [
          "你好 EENUO Cabinet Studio，我想咨询一个定制项目。",
          "",
          `姓名：${answers.get("name")}`,
          `项目：${translatedProjectType}`,
          `预计开始时间：${translatedTiming}`,
          `空间介绍：${answers.get("details") || "我可以在聊天中补充更多信息。"}`,
        ].join("\n")
      : [
          "Hi EENUO Cabinet Studio, I'd like to discuss a project.",
          "",
          `Name: ${answers.get("name")}`,
          `Project: ${projectType}`,
          `Preferred timing: ${answers.get("timing")}`,
          `About the space: ${answers.get("details") || "I can share more details in chat."}`,
        ].join("\n");
    const whatsappUrl = `${studioWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    formStatus.textContent = isChinese
      ? "WhatsApp 将打开并预填你的项目资料，请检查信息后点击发送，联系工作室。"
      : "WhatsApp will open with your project details. Review your message and tap Send to contact the studio.";
  });
}
