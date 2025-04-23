const systemInfo = {
  userAgent: navigator.userAgent,
  language: navigator.language,
  languages: navigator.languages.join(", "),
  hardwareConcurrency: navigator.hardwareConcurrency + " threads",
  deviceMemory: (navigator.deviceMemory || "N/A") + " GB",
  cookieEnabled: navigator.cookieEnabled ? "Yes" : "No",
  online: navigator.onLine ? "Online" : "Offline",
};

for (const key in systemInfo) {
  localStorage.setItem(key, systemInfo[key]);
}

const footer = document.getElementById("footer-info");
let footerContent = "";
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  footerContent += `<p>${key}: ${value}</p>`;
}
footer.innerHTML = footerContent;

const url = `https://jsonplaceholder.typicode.com/posts/2/comments`;

fetch(url)
  .then((response) => response.json())
  .then((comments) => {
    const container = document.getElementById("comments");

    comments.forEach((comment) => {
      const div = document.createElement("div");
      div.classList.add("comment");
      div.innerHTML = `
            <div>
              <h4>${comment.name}</h4>
              <h5>${comment.email}</h5>
            </div>
            <p>${comment.body}</p>
          `;
      container.appendChild(div);
    });
  });

setTimeout(() => {
  document.getElementById("feedbackModal").style.bottom = "0";
}, 6000);

function closeModal() {
  document.getElementById("feedbackModal").style.bottom = "-100%";
}

const body = document.body;
const toggle = document.getElementById("themeToggle");

function applyTheme(mode) {
  if (mode === "dark") {
    body.classList.add("dark-theme");
    toggle.checked = true;
  } else {
    body.classList.remove("dark-theme");
    toggle.checked = false;
  }
}

function getTimeBasedTheme() {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 21 ? "light" : "dark";
}

window.addEventListener("DOMContentLoaded", () => {
  const autoTheme = getTimeBasedTheme();
  applyTheme(autoTheme);
});

toggle.addEventListener("change", () => {
  const mode = toggle.checked ? "dark" : "light";
  applyTheme(mode);
});
