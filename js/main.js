(() => {
  "use strict";

  const WHATSAPP = "2348069725500";
  const nav = document.querySelector("#primary-nav");
  const menu = document.querySelector(".menu-toggle");
  const header = document.querySelector("#site-header");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  menu?.addEventListener("click", () => {
    const open = nav?.classList.toggle("open") ?? false;
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    document.body.classList.toggle("menu-open", open);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
      menu?.setAttribute("aria-label", "Open navigation");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener(
    "scroll",
    () => {
      header?.classList.toggle("scrolled", window.scrollY > 8);
    },
    { passive: true },
  );

  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.min = new Date().toISOString().split("T")[0];
  });

  const toast = document.querySelector("#toast");
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 5000);
  }

  function clean(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ");
  }

  function encode(value) {
    return encodeURIComponent(value);
  }

  function formatDate(value) {
    if (!value) return "";
    const d = new Date(`${value}T00:00:00`);
    if (Number.isNaN(d.getTime())) return value;
    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  }

  function validateForm(form) {
    const error = form.querySelector("[data-error]");
    const required = [...form.querySelectorAll("[required]")];
    let firstInvalid = null;
    let message = "";

    required.forEach((field) => {
      const valid = clean(field.value) !== "";
      field.setAttribute("aria-invalid", String(!valid));
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    const phone = form.elements.whatsapp;
    if (
      phone &&
      clean(phone.value) &&
      !/^[0-9+()\\-\\s]{8,20}$/.test(clean(phone.value))
    ) {
      phone.setAttribute("aria-invalid", "true");
      firstInvalid ||= phone;
      message = "Please enter a valid WhatsApp number.";
    }

    const date = form.elements.preferredDate;
    if (date && clean(date.value)) {
      const selected = new Date(`${date.value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        date.setAttribute("aria-invalid", "true");
        firstInvalid ||= date;
        message = "Please choose today or a future date.";
      }
    }

    if (!message && firstInvalid)
      message = "Please complete the required fields.";

    if (error) error.textContent = message;
    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  function buildVisitMessage(form) {
    const f = form.elements;
    return [
      "Hi Deeplus Gadgets, I would like to schedule a visit.",
      "",
      `Name: ${clean(f.name.value)}`,
      `WhatsApp: ${clean(f.whatsapp.value)}`,
      `Looking for: ${clean(f.interest.value)}`,
      `Preferred date: ${formatDate(f.preferredDate.value)}`,
      `Preferred time: ${clean(f.preferredTime.value)}`,
      `Source: ${clean(f.source.value)}`,
      `Notes: ${clean(f.notes.value) || "None"}`,
      "",
      "Please confirm the appointment details with me.",
    ].join("\n");
  }

  function buildDeliveryMessage(form) {
    const f = form.elements;
    return [
      "Hi Deeplus Gadgets, I would like to request home delivery.",
      "",
      `Name: ${clean(f.name.value)}`,
      `WhatsApp: ${clean(f.whatsapp.value)}`,
      `Gadget needed: ${clean(f.gadgetCategory.value)}`,
      `Budget / preferred model: ${clean(f.budgetOrPreference.value) || "Not specified"}`,
      `Delivery location: ${clean(f.location.value)}`,
      `Preferred delivery date: ${formatDate(f.preferredDate.value)}`,
      `Source: ${clean(f.source.value)}`,
      `Notes: ${clean(f.notes.value) || "None"}`,
      "",
      "Please confirm the gadget, price and delivery details with me.",
    ].join("\n");
  }

  document.querySelectorAll(".request-form").forEach((form) => {
    form.addEventListener("input", (event) => {
      if (event.target.matches("input, select, textarea")) {
        event.target.removeAttribute("aria-invalid");
        const error = form.querySelector("[data-error]");
        if (error) error.textContent = "";
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateForm(form)) return;

      const type = form.dataset.formType;
      const message =
        type === "visit" ? buildVisitMessage(form) : buildDeliveryMessage(form);
      const url = `https://wa.me/${WHATSAPP}?text=${encode(message)}`;

      showToast(
        "Your request is ready. WhatsApp will open so Deeplus can confirm the details.",
      );
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
})();
