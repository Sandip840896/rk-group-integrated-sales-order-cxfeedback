const RK_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDMcHok-Q-w6a0BwG2w1sFvSxQwgTXlnUg",
  authDomain: "rk-group-feedback.firebaseapp.com",
  projectId: "rk-group-feedback",
  storageBucket: "rk-group-feedback.firebasestorage.app",
  messagingSenderId: "89598658685",
  appId: "1:89598658685:web:398d8a06db8bea367ec914"
};

firebase.initializeApp(RK_FIREBASE_CONFIG);
const db = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue;

const SUPPORT_HTML = "System developer and support<br>Sandip Nandi | 8584833366<br>sandipnandi2000@gmail.com";

const mealSlots = ["Breakfast", "Lunch", "Snacks", "Dinner", "Beverage", "Other"];

const seedBaseKitchens = [
  { id: "BK-NDLS", name: "New Delhi Base Kitchen", city: "New Delhi", active: true },
  { id: "BK-HWH", name: "Howrah Base Kitchen", city: "Kolkata", active: true },
  { id: "BK-BCT", name: "Mumbai Central Base Kitchen", city: "Mumbai", active: true },
  { id: "BK-CNB", name: "Kanpur Base Kitchen", city: "Kanpur", active: true }
];

const seedMenuItems = [
  { name: "Veg Thali", category: "Lunch", price: 120, type: "veg", source: "pantry", available: true, stockQty: 24 },
  { name: "Chicken Curry Meal", category: "Dinner", price: 180, type: "non-veg", source: "pantry", available: true, stockQty: 12 },
  { name: "Poha", category: "Breakfast", price: 55, type: "veg", source: "pantry", available: true, stockQty: 30 },
  { name: "Tea", category: "Beverage", price: 15, type: "veg", source: "pantry", available: true, stockQty: 80 },
  { name: "Water Bottle", category: "Beverage", price: 20, type: "veg", source: "pantry", available: true, stockQty: 100 }
];

function $(id) {
  return document.getElementById(id);
}

function money(value) {
  return "Rs " + Number(value || 0).toLocaleString("en-IN");
}

function cleanPhone(value) {
  return String(value || "").replace(/\D/g, "").slice(-10);
}

function nowLabel(value) {
  if (!value) return "-";
  const date = value.toDate ? value.toDate() : new Date(value);
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function shortId(prefix) {
  const date = new Date();
  const stamp = date.toISOString().slice(2, 10).replace(/-/g, "");
  return `${prefix}-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function statusBadge(status) {
  const s = String(status || "new").toLowerCase();
  let tone = "info";
  if (["delivered", "accepted", "closed", "resolved", "invoiced"].includes(s)) tone = "ok";
  if (["processing", "preparing", "sent", "new", "pending"].includes(s)) tone = "warn";
  if (["disputed", "cancelled", "rejected", "open"].includes(s)) tone = "danger";
  return `<span class="badge ${tone}">${escapeHtml(s.replace(/-/g, " "))}</span>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function showTab(name) {
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.classList.toggle("hidden", panel.dataset.tabPanel !== name);
  });
  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === name);
  });
}

function wireTabs(defaultTab) {
  document.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });
  showTab(defaultTab);
}

async function ensureSeedData() {
  const settingsRef = db.collection("systemSettings").doc("seed-v1");
  const settings = await settingsRef.get();
  if (settings.exists) return;

  const batch = db.batch();
  seedBaseKitchens.forEach((kitchen) => {
    batch.set(db.collection("baseKitchens").doc(kitchen.id), {
      ...kitchen,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
  });
  seedMenuItems.forEach((item) => {
    const ref = db.collection("menuItems").doc();
    batch.set(ref, {
      ...item,
      masterItem: true,
      updatedAt: FieldValue.serverTimestamp()
    });
  });
  batch.set(settingsRef, { completed: true, completedAt: FieldValue.serverTimestamp() });
  await batch.commit();
}

function onLive(collectionName, callback, orderField = "createdAt", direction = "desc", limit = 100) {
  return db.collection(collectionName)
    .orderBy(orderField, direction)
    .limit(limit)
    .onSnapshot((snapshot) => {
      callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error(error);
      toast(`Live sync error in ${collectionName}: ${error.message}`);
    });
}

async function compressImage(file, maxSize = 760, quality = 0.72) {
  if (!file) return "";
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", quality);
}

function appHeader(title, subtitle) {
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="index.html">
          <div class="logo">RK</div>
          <div>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(subtitle)}</p>
          </div>
        </a>
        <div class="support">${SUPPORT_HTML}</div>
      </div>
    </div>
  `);
}
