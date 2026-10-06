const $ = (s) => document.querySelector(s);
const problems = window.problems || [];

const esc = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const badge = (value) => {
  const cls = String(value).toLowerCase().replaceAll(" ", "-");
  return `<span class="badge ${cls}">${esc(value)}</span>`;
};

const quickLinks = [
  ["⌂", "Society Overview", "About, wings & flats", "#society"],
  ["✦", "Facilities", "Amenities & common areas", "#facilities"],
  ["▦", "Parking", "Availability & slot details", "#parking"],
  ["₹", "Maintenance", "Charges & breakup", "#maintenance"],
  ["◉", "Water System", "Supply & distribution", "#infrastructure"],
  ["◈", "Filtration System", "Overview & process", "#infrastructure"],
  ["✿", "Culture", "Events & gallery", "#culture"],
  ["▤", "Documents", "Notices, rules & reports", "#documents"],
  ["◎", "Important Contacts", "POCs, vendors & security", "#contacts"],
  ["☷", "Rules & Guidelines", "Society rules & information", "#documents"],
  ["i", "Resident Information", "Useful day-to-day info", "#society"],
  ["?", "FAQ", "Common questions", "#documents"]
];

const quickRoot = $("#quickLinks");
if (quickRoot) {
  quickRoot.innerHTML = quickLinks.map(([icon, title, desc, href]) => `
    <a href="${href}" class="quick-card">
      <span>${icon}</span>
      <b>${title}</b>
      <small>${desc}</small>
      <i>→</i>
    </a>
  `).join("");
}

const facilities = [
  ["Podium Garden", "P5 community garden", "f1"],
  ["Children’s Play Area", "Safe play zone", "f2"],
  ["Clubhouse", "Community & indoor activities", "f3"],
  ["Gym", "Fitness & wellness", "f4"],
  ["Security", "Entry, CCTV & visitor management", "f5"],
  ["Common Areas", "Lobbies, corridors & shared spaces", "f6"],
  ["Terrace", "Shared rooftop area", "f7"],
  ["Community Hall", "Meetings & celebrations", "f8"]
];

if ($("#facilitiesGrid")) {
  $("#facilitiesGrid").innerHTML = facilities.map(([name, desc, cls]) => `
    <article class="facility-card">
      <div class="facility-image ${cls}"></div>
      <div class="facility-body">
        <h3>${name}</h3>
        <p>${desc}</p>
        <span>View details →</span>
      </div>
    </article>
  `).join("");
}

const maintenance = [
  ["Regular Maintenance", "₹2,500"],
  ["Security", "₹800"],
  ["Water Charges", "₹700"],
  ["Lift Maintenance", "₹600"],
  ["Common Area Cleaning", "₹500"],
  ["Repairs & AMC", "₹700"],
  ["Sinking Fund", "₹400"],
  ["Other Charges", "₹300"]
];

if ($("#breakupList")) {
  $("#breakupList").innerHTML = maintenance.map(([label, amount]) => `
    <div><span>${label}</span><b>${amount}</b></div>
  `).join("") + `
    <div class="breakup-total"><span>Total</span><b>₹6,500</b></div>
  `;
}

const events = [
  ["Ganesh Utsav Celebration", "7 Sep 2026", "Podium Garden (P5)", "e1"],
  ["Dussehra Celebration", "12 Oct 2026", "Clubhouse", "e2"],
  ["Children’s Day Event", "11 Nov 2026", "Podium Garden (P5)", "e3"]
];

if ($("#eventGrid")) {
  $("#eventGrid").innerHTML = events.map(([name, date, place, cls]) => `
    <article class="event-card">
      <div class="event-image ${cls}"><span>${esc(date.split(" ")[0])}</span></div>
      <div class="event-body">
        <span class="tag">Community</span>
        <h3>${name}</h3>
        <p>⌖ ${place}</p>
        <small>Community activity with residents, families and guests.</small>
      </div>
    </article>
  `).join("");
}

const gallery = [
  ["Ganesh Utsav", "8 photos", "g1"],
  ["Independence Day", "10 photos", "g2"],
  ["Holi Celebration", "12 photos", "g3"],
  ["Children’s Day", "14 photos", "g4"],
  ["Diwali Celebration", "16 photos", "g5"],
  ["Sports Day", "18 photos", "g6"],
  ["Podium Garden", "20 photos", "g7"],
  ["Clubhouse Activities", "22 photos", "g8"]
];

if ($("#galleryGrid")) {
  $("#galleryGrid").innerHTML = gallery.map(([name, count, cls]) => `
    <article class="gallery-card">
      <div class="gallery-image ${cls}"></div>
      <div><b>${name}</b><small>${count}</small></div>
    </article>
  `).join("");
}

const documents = [
  ["Society Rules & Regulations", "Society Rules", "12 Jan 2026"],
  ["Latest AGM Minutes", "AGM Minutes", "05 Jan 2026"],
  ["Fire Safety Certificate", "Certificates", "20 Dec 2025"],
  ["Water Quality Report", "Water Reports", "10 Dec 2025"],
  ["Meeting Minutes", "Meeting Minutes", "08 Dec 2025"]
];

if ($("#docList")) {
  $("#docList").innerHTML = documents.map(([name, category, date]) => `
    <div class="doc-row">
      <span>▤</span>
      <div><b>${name}</b><small>${category} · ${date}</small></div>
      <button type="button" aria-label="Download ${esc(name)}">↓</button>
    </div>
  `).join("");
}

const contacts = [
  ["Society Office", "General society queries", "Society Admin"],
  ["Security", "Gate, visitors & emergencies", "Security Desk"],
  ["Water / Filtration", "Water system queries", "Assigned POC"],
  ["Maintenance", "Billing & maintenance queries", "Society Office"],
  ["Lift Vendor", "Lift service & breakdowns", "Vendor POC"],
  ["Electrical", "Common area electrical issues", "Electrical POC"]
];

if ($("#contactGrid")) {
  $("#contactGrid").innerHTML = contacts.map(([name, desc, poc]) => `
    <div class="contact-card">
      <span>◎</span>
      <div><b>${name}</b><small>${desc}</small><em>${poc}</em></div>
    </div>
  `).join("");
}

if ($("#homeUpdates")) {
  $("#homeUpdates").innerHTML = problems.slice(0, 3).map((p) => `
    <a href="#problems" class="update-card">
      <span class="update-icon">!</span>
      <div><b>${esc(p.title)}</b><small>${esc(p.category)} · ${esc(p.updated)}</small></div>
      ${badge(p.status)}
    </a>
  `).join("");
}

const problemSearch = $("#problemSearch");
const statusFilter = $("#statusFilter");
const categoryFilter = $("#categoryFilter");
const wingFilter = $("#wingFilter");

function renderProblems() {
  const q = (problemSearch?.value || "").trim().toLowerCase();
  const status = statusFilter?.value || "All status";
  const category = categoryFilter?.value || "All categories";
  const wing = wingFilter?.value || "All wings";

  const filtered = problems.filter((p) => {
    const haystack = [p.id, p.title, p.category, p.location, p.priority, p.status, ...(p.pocs || [])]
      .join(" ")
      .toLowerCase();
    const statusOk = status === "All status" || p.status === status;
    const categoryOk = category === "All categories" || p.category === category;
    const wingOk = wing === "All wings" || p.location.toLowerCase().includes(wing.toLowerCase());
    return (!q || haystack.includes(q)) && statusOk && categoryOk && wingOk;
  });

  if (!$("#problemRows")) return;
  $("#problemRows").innerHTML = filtered.length
    ? filtered.map((p) => `
      <button type="button" class="problem-row" data-id="${p.id}">
        <span>${p.id}</span>
        <strong>${esc(p.title)}</strong>
        <span>${esc(p.category)}</span>
        <span>${esc(p.location)}</span>
        <span>${badge(p.priority)}</span>
        <span>${badge(p.status)}</span>
        <span>${p.pocs.length}</span>
        <span>${esc(p.updated)}</span>
      </button>
    `).join("")
    : '<div class="empty">No matching problems found.</div>';

  document.querySelectorAll(".problem-row").forEach((row) => {
    row.addEventListener("click", () => openProblem(row.dataset.id));
  });
}

function openProblem(id) {
  const p = problems.find((item) => item.id === id);
  if (!p || !$("#problemModal")) return;

  $("#modalContent").innerHTML = `
    <div class="modal-eyebrow">${esc(p.id)} · ${esc(p.category)}</div>
    <div class="modal-title"><h2>${esc(p.title)}</h2>${badge(p.status)}</div>
    <p class="modal-description">${esc(p.description)}</p>
    <div class="detail-grid">
      <div><small>Location</small><b>${esc(p.location)}</b></div>
      <div><small>Priority</small><b>${badge(p.priority)}</b></div>
      <div><small>Reported</small><b>${esc(p.reported)}</b></div>
      <div><small>Last updated</small><b>${esc(p.updated)}</b></div>
    </div>
    <div class="poc-box"><h3>POC(s)</h3><div>${p.pocs.map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>
    <div class="modal-tabs"><b>Timeline</b><span>Photos (4)</span><span>Documents (3)</span></div>
    <div class="timeline">
      ${p.timeline.map(([date, title, text]) => `
        <div><i></i><small>${esc(date)}</small><b>${esc(title)}</b><p>${esc(text)}</p></div>
      `).join("")}
    </div>
    <div class="resolution"><b>Resolution</b><p>${esc(p.resolution)}</p></div>
  `;

  $("#problemModal").classList.add("open");
  document.body.classList.add("modal-open");
}

function closeProblem() {
  $("#problemModal")?.classList.remove("open");
  document.body.classList.remove("modal-open");
}

[problemSearch, statusFilter, categoryFilter, wingFilter].filter(Boolean).forEach((el) => {
  el.addEventListener(el.tagName === "INPUT" ? "input" : "change", renderProblems);
});

$("#modalClose")?.addEventListener("click", closeProblem);
$("#problemModal")?.addEventListener("click", (event) => {
  if (event.target.id === "problemModal") closeProblem();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProblem();
});

let parkingLevel = "P0";
const parkingTabs = $("#parkingTabs");

if (parkingTabs) {
  parkingTabs.innerHTML = ["P0", "P1", "P2", "P3", "P4"].map((level, index) => `
    <button type="button" class="${index === 0 ? "active" : ""}" data-level="${level}">
      ${level}<small>50 slots</small>
    </button>
  `).join("");
}

function renderParking() {
  if (!$("#slotGrid")) return;

  const available = parkingLevel === "P0" ? new Set([23, 47]) : new Set();
  $("#slotGrid").innerHTML = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    const isAvailable = available.has(number);
    return `<button type="button" class="slot ${isAvailable ? "available" : "purchased"}" data-number="${number}">
      ${String(number).padStart(2, "0")}
    </button>`;
  }).join("");

  document.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("click", () => {
      const number = Number(slot.dataset.number);
      const available = slot.classList.contains("available");
      $("#slotDetails").innerHTML = `
        <div class="selected-slot">
          <b>${parkingLevel} · Slot ${String(number).padStart(2, "0")}</b>
          <span>${available ? "Available" : "Purchased"}</span>
          <small>${available ? "No flat assigned" : "Assigned flat: Sample data"}</small>
        </div>
      `;
    });
  });
}

document.querySelectorAll("#parkingTabs button").forEach((button) => {
  button.addEventListener("click", () => {
    parkingLevel = button.dataset.level;
    document.querySelectorAll("#parkingTabs button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderParking();
  });
});

renderParking();
renderProblems();

$("#menuBtn")?.addEventListener("click", () => $("#mobileMenu")?.classList.toggle("open"));
document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => $("#mobileMenu")?.classList.remove("open"));
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  if ($("#installBtn")) $("#installBtn").hidden = false;
});

$("#installBtn")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  await deferredPrompt.prompt();
  deferredPrompt = null;
  $("#installBtn").hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}
