const RK_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDQSWV0QrVQx2C_t-BDndqjuQLnxELdClA",
  authDomain: "rk-rail-cx.firebaseapp.com",
  projectId: "rk-rail-cx",
  storageBucket: "rk-rail-cx.firebasestorage.app",
  messagingSenderId: "18449306424",
  appId: "1:18449306424:web:3721f82cc1095f90bce7cd"
};

firebase.initializeApp(RK_FIREBASE_CONFIG);
const db = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue;

const SUPPORT_HTML = "System developer and support<br>Sandip Nandi | 8584833366<br>sandipnandi2000@gmail.com";

const mealSlots = ["Breakfast", "Lunch", "Snacks", "Dinner", "Beverage", "Other"];
const complaintNatures = ["Over Charging", "Staff Behavior", "Food Quality", "Food Qty", "Expiry Product", "Hygiene", "Others"];
const complaintStatuses = ["open", "acknowledged", "investigating", "waiting for vendor", "resolved", "closed"];

const seedBaseKitchens = [
  { id: "BK-NDLS", name: "New Delhi Base Kitchen", city: "New Delhi", active: true },
  { id: "BK-HWH", name: "Howrah Base Kitchen", city: "Kolkata", active: true },
  { id: "BK-BCT", name: "Mumbai Central Base Kitchen", city: "Mumbai", active: true },
  { id: "BK-CNB", name: "Kanpur Base Kitchen", city: "Kanpur", active: true }
];

const seedMenuItems = [
  { name: "Veg Thali", category: "Lunch", price: 120, sellingPrice: 120, costPrice: 82, type: "veg", source: "pantry", available: true, stockQty: 24, itemImage: "" },
  { name: "Chicken Curry Meal", category: "Dinner", price: 180, sellingPrice: 180, costPrice: 128, type: "non-veg", source: "pantry", available: true, stockQty: 12, itemImage: "" },
  { name: "Poha", category: "Breakfast", price: 55, sellingPrice: 55, costPrice: 32, type: "veg", source: "pantry", available: true, stockQty: 30, itemImage: "" },
  { name: "Tea", category: "Beverage", price: 15, sellingPrice: 15, costPrice: 8, type: "veg", source: "pantry", available: true, stockQty: 80, itemImage: "" },
  { name: "Water Bottle", category: "Beverage", price: 20, sellingPrice: 20, costPrice: 14, type: "veg", source: "pantry", available: true, stockQty: 100, itemImage: "" }
];

function $(id) {
  return document.getElementById(id);
}

function money(value) {
  return "Rs " + Number(value || 0).toLocaleString("en-IN");
}

function sellingPriceOf(item) {
  return Number(item?.sellingPrice ?? item?.price ?? 0);
}

function costPriceOf(item) {
  return Number(item?.costPrice ?? item?.baseKitchenCost ?? item?.price ?? 0);
}

function invoiceItemQty(line) {
  return Number(line?.approvedQty ?? line?.qty ?? line?.requestedQty ?? 0);
}

function invoiceCostTotal(invoice) {
  const stored = Number(invoice?.totalCost || 0);
  if (stored > 0) return stored;
  return (invoice?.items || []).reduce((sum, line) => sum + invoiceItemQty(line) * costPriceOf(line), 0);
}

function orderPrintableHtml(order) {
  const items = order.items || [];
  const rows = items.map((line, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(line.name || "")}</td>
      <td>${Number(line.qty || 0)}</td>
      <td>${money(line.price ?? line.sellingPrice ?? 0)}</td>
      <td>${money(Number(line.qty || 0) * Number(line.price ?? line.sellingPrice ?? 0))}</td>
    </tr>`).join("");
  const totalQty = items.reduce((sum, line) => sum + Number(line.qty || 0), 0);
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(order.orderNo || "Customer Invoice")}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #17202a; margin: 28px; }
    .head { display: flex; justify-content: space-between; gap: 24px; border-bottom: 2px solid #17202a; padding-bottom: 14px; }
    h1 { margin: 0 0 6px; font-size: 24px; }
    p { margin: 4px 0; }
    .muted { color: #5f6b7a; }
    table { width: 100%; border-collapse: collapse; margin-top: 22px; }
    th, td { border: 1px solid #ccd4df; padding: 10px; text-align: left; font-size: 13px; }
    th { background: #f2f5f9; }
    .total { text-align: right; font-weight: 700; }
    .box { margin-top: 18px; padding: 12px; border: 1px solid #ccd4df; }
    @media print { button { display: none; } body { margin: 18px; } }
  </style>
</head>
<body>
  <button onclick="window.print()" style="float:right;padding:10px 14px;margin-bottom:12px;">Print / Save PDF</button>
  <div class="head">
    <div>
      <h1>RK Group Passenger Food Invoice</h1>
      <p class="muted">Railway Catering Services</p>
      <p><b>Order No:</b> ${escapeHtml(order.orderNo || "")}</p>
      <p><b>Status:</b> ${escapeHtml(order.status || "")}</p>
    </div>
    <div>
      <p><b>Developer Support:</b> Sandip Nandi</p>
      <p>8584833366</p>
      <p>sandipnandi2000@gmail.com</p>
    </div>
  </div>
  <div class="box">
    <p><b>Passenger:</b> ${escapeHtml(order.customer?.name || "")}</p>
    <p><b>Phone:</b> ${escapeHtml(order.customerPhone || order.customer?.phone || "")}</p>
    <p><b>Train / Coach / Seat:</b> ${escapeHtml(order.train || "")} / ${escapeHtml(order.coach || "")} / ${escapeHtml(order.seat || "")}</p>
    <p><b>Order Date:</b> ${nowLabel(order.createdAt)}</p>
  </div>
  <table>
    <thead><tr><th>Sl</th><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot>
      <tr><td colspan="2" class="total">Total</td><td><b>${totalQty}</b></td><td></td><td><b>${money(order.total)}</b></td></tr>
    </tfoot>
  </table>
  <div class="box">Thank you for giving RK Group the opportunity to serve you. We wish you a comfortable and pleasant journey.</div>
</body>
</html>`;
}

function printCustomerOrder(order) {
  const popup = window.open("", "_blank");
  if (!popup) {
    toast("Please allow popup to print customer invoice.");
    return;
  }
  popup.document.open();
  popup.document.write(orderPrintableHtml(order));
  popup.document.close();
  popup.focus();
}

function invoicePrintableHtml(invoice) {
  const items = invoice.items || [];
  const totalQty = Number(invoice.totalQty || items.reduce((sum, line) => sum + invoiceItemQty(line), 0));
  const totalCost = invoiceCostTotal(invoice);
  const rows = items.map((line, index) => {
    const qty = invoiceItemQty(line);
    const rate = costPriceOf(line);
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(line.name || "")}</td>
        <td>${qty}</td>
        <td>${money(rate)}</td>
        <td>${money(qty * rate)}</td>
      </tr>`;
  }).join("");
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(invoice.invoiceNo || "Invoice")}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #17202a; margin: 28px; }
    .head { display: flex; justify-content: space-between; gap: 24px; border-bottom: 2px solid #17202a; padding-bottom: 14px; }
    h1 { margin: 0 0 6px; font-size: 24px; }
    p { margin: 4px 0; }
    .muted { color: #5f6b7a; }
    table { width: 100%; border-collapse: collapse; margin-top: 22px; }
    th, td { border: 1px solid #ccd4df; padding: 10px; text-align: left; font-size: 13px; }
    th { background: #f2f5f9; }
    .total { text-align: right; font-weight: 700; }
    .box { margin-top: 18px; padding: 12px; border: 1px solid #ccd4df; }
    .sign { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 60px; }
    .line { border-top: 1px solid #17202a; padding-top: 8px; text-align: center; }
    @media print { button { display: none; } body { margin: 18px; } }
  </style>
</head>
<body>
  <button onclick="window.print()" style="float:right;padding:10px 14px;margin-bottom:12px;">Print / Save PDF</button>
  <div class="head">
    <div>
      <h1>RK Group Base Kitchen Invoice</h1>
      <p class="muted">Railway Catering Services</p>
      <p><b>Invoice No:</b> ${escapeHtml(invoice.invoiceNo || "")}</p>
      <p><b>Status:</b> ${escapeHtml(invoice.status || "")}</p>
      ${invoice.revisionNo ? `<p><b>Revision:</b> ${Number(invoice.revisionNo)}</p>` : ""}
    </div>
    <div>
      <p><b>Developer Support:</b> Sandip Nandi</p>
      <p>8584833366</p>
      <p>sandipnandi2000@gmail.com</p>
    </div>
  </div>
  <div class="box">
    <p><b>Train No:</b> ${escapeHtml(invoice.train || "")}</p>
    <p><b>Train / Rack Manager:</b> ${escapeHtml(invoice.rackManager || "")}</p>
    <p><b>Supplier Base Kitchen:</b> ${escapeHtml(invoice.baseKitchenName || "")}</p>
    <p><b>Indent No:</b> ${escapeHtml(invoice.indentNo || "")}</p>
    <p><b>Invoice Date:</b> ${nowLabel(invoice.createdAt)}</p>
  </div>
  <table>
    <thead><tr><th>Sl</th><th>Item</th><th>Qty</th><th>Cost Rate</th><th>Amount</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot>
      <tr><td colspan="2" class="total">Total</td><td><b>${totalQty}</b></td><td></td><td><b>${money(totalCost)}</b></td></tr>
    </tfoot>
  </table>
  ${invoice.disputeReason ? `<div class="box"><b>Dispute Note:</b> ${escapeHtml(invoice.disputeReason)}</div>` : ""}
  ${invoice.settlementNote ? `<div class="box"><b>Settlement Note:</b> ${escapeHtml(invoice.settlementNote)}</div>` : ""}
  <div class="sign">
    <div class="line">Base Kitchen Signature</div>
    <div class="line">Train / Rack Manager Signature</div>
  </div>
</body>
</html>`;
}

function printInvoice(invoice) {
  const popup = window.open("", "_blank");
  if (!popup) {
    toast("Please allow popup to print invoice.");
    return;
  }
  popup.document.open();
  popup.document.write(invoicePrintableHtml(invoice));
  popup.document.close();
  popup.focus();
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
  if (["processing", "preparing", "sent", "new", "pending", "acknowledged", "investigating", "waiting for vendor"].includes(s)) tone = "warn";
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

async function proofFileData(file) {
  if (!file) return null;
  if (file.type.startsWith("image/")) {
    return { name: file.name, type: file.type, dataUrl: await compressImage(file, 900, 0.72) };
  }
  const maxBytes = 650 * 1024;
  if (file.size > maxBytes) {
    toast("Audio/video proof is too large for this demo. Please upload a smaller file below 650 KB.");
    return null;
  }
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { name: file.name, type: file.type || "application/octet-stream", dataUrl };
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
