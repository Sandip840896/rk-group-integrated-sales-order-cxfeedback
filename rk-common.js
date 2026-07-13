const RK_FIREBASE_CONFIG = {
  apiKey: "AIzaSyA7ducj8rnFxl4qv8xM6dUWq75GPgm-1rc",
  authDomain: "rk-rail-cx.firebaseapp.com",
  projectId: "rk-rail-cx",
  storageBucket: "rk-rail-cx.firebasestorage.app",
  messagingSenderId: "18449306424",
  appId: "1:18449306424:web:3721f82cc1095f90bce7cd"
};

firebase.initializeApp(RK_FIREBASE_CONFIG);
const db = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue;

const SUPPORT_HTML = "System developer and support<br>Sandip Nandi | 858483366<br>sandipnandi2000@gmail.com";

const mealSlots = ["Breakfast", "Lunch", "Evening Tiffin", "Dinner", "Beverage", "Other"];
const cuisineOptions = ["North Indian", "South Indian", "Chinese"];
const menuPreferenceFilters = ["Veg", "Non-Veg", ...cuisineOptions];
const complaintNatures = ["Over Charging", "Staff Behavior", "Food Quality", "Food Qty", "Expiry Product", "Hygiene", "Others"];
const complaintStatuses = ["open", "acknowledged", "investigating", "waiting for vendor", "customer-replied", "resolved", "closed"];
const orderStatuses = ["new", "accepted", "preparing", "out-for-delivery", "delivered"];
const deliveryWindows = [
  "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00",
  "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00",
  "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00",
  "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00",
  "22:00-23:00"
];

const seedBaseKitchens = [
  { id: "BK-NDLS", name: "New Delhi Base Kitchen", city: "New Delhi", active: true },
  { id: "BK-HWH", name: "Howrah Base Kitchen", city: "Kolkata", active: true },
  { id: "BK-BCT", name: "Mumbai Central Base Kitchen", city: "Mumbai", active: true },
  { id: "BK-CNB", name: "Kanpur Base Kitchen", city: "Kanpur", active: true }
];

const seedTrainMasters = [
  { trainNumber: "12859", trainName: "Gitanjali Express", yardName: "Mumbai CSMT to Howrah", active: true },
  { trainNumber: "12860", trainName: "Gitanjali Express", yardName: "Howrah to Mumbai CSMT", active: true },
  { trainNumber: "12345", trainName: "Meals On Wheels Demo Express", yardName: "Howrah Yard", active: true },
  { trainNumber: "12001", trainName: "Sample Rajdhani", yardName: "New Delhi Yard", active: true }
];

const gitanjaliRouteStops = {
  "12860": [
    { code: "HWH", station: "Howrah Jn", day: 1, arrival: "", departure: "13:40", haltMinutes: 0, km: 0 },
    { code: "KGP", station: "Kharagpur Jn", day: 1, arrival: "15:15", departure: "15:20", haltMinutes: 5, km: 116 },
    { code: "TATA", station: "Tatanagar Jn", day: 1, arrival: "17:03", departure: "17:10", haltMinutes: 7, km: 250 },
    { code: "CKP", station: "Chakradharpur", day: 1, arrival: "18:03", departure: "18:05", haltMinutes: 2, km: 312 },
    { code: "ROU", station: "Rourkela", day: 1, arrival: "19:32", departure: "19:40", haltMinutes: 8, km: 413 },
    { code: "JSG", station: "Jharsuguda Jn", day: 1, arrival: "21:48", departure: "21:50", haltMinutes: 2, km: 515 },
    { code: "RIG", station: "Raigarh", day: 1, arrival: "22:48", departure: "22:50", haltMinutes: 2, km: 586 },
    { code: "BSP", station: "Bilaspur Jn", day: 2, arrival: "00:00", departure: "00:10", haltMinutes: 10, km: 719 },
    { code: "R", station: "Raipur Jn", day: 2, arrival: "00:40", departure: "00:45", haltMinutes: 5, km: 829 },
    { code: "DURG", station: "Durg", day: 2, arrival: "01:35", departure: "01:40", haltMinutes: 5, km: 866 },
    { code: "NGP", station: "Nagpur Jn", day: 2, arrival: "04:15", departure: "04:20", haltMinutes: 5, km: 1131 },
    { code: "BSL", station: "Bhusaval Jn", day: 2, arrival: "09:25", departure: "09:30", haltMinutes: 5, km: 1521 },
    { code: "JL", station: "Jalgaon Jn", day: 2, arrival: "09:58", departure: "10:00", haltMinutes: 2, km: 1545 },
    { code: "NK", station: "Nasik Road", day: 2, arrival: "14:25", departure: "14:30", haltMinutes: 5, km: 1777 },
    { code: "IGP", station: "Igatpuri", day: 2, arrival: "15:25", departure: "15:30", haltMinutes: 5, km: 1828 },
    { code: "KYN", station: "Kalyan Jn", day: 2, arrival: "17:52", departure: "17:55", haltMinutes: 3, km: 1914 },
    { code: "DR", station: "Mumbai Dadar Central", day: 2, arrival: "20:42", departure: "20:45", haltMinutes: 3, km: 1959 },
    { code: "CSMT", station: "Mumbai CSMT", day: 2, arrival: "21:20", departure: "", haltMinutes: 0, km: 1968 }
  ],
  "12859": [
    { code: "CSMT", station: "Mumbai CSMT", day: 1, arrival: "", departure: "06:00", haltMinutes: 0, km: 0 },
    { code: "DR", station: "Mumbai Dadar Central", day: 1, arrival: "06:12", departure: "06:15", haltMinutes: 3, km: 9 },
    { code: "KYN", station: "Kalyan Jn", day: 1, arrival: "06:52", departure: "06:55", haltMinutes: 3, km: 54 },
    { code: "IGP", station: "Igatpuri", day: 1, arrival: "08:42", departure: "08:47", haltMinutes: 5, km: 137 },
    { code: "NK", station: "Nasik Road", day: 1, arrival: "09:25", departure: "09:30", haltMinutes: 5, km: 188 },
    { code: "JL", station: "Jalgaon Jn", day: 1, arrival: "11:58", departure: "12:00", haltMinutes: 2, km: 420 },
    { code: "BSL", station: "Bhusaval Jn", day: 1, arrival: "12:35", departure: "12:40", haltMinutes: 5, km: 445 },
    { code: "SEG", station: "Shegaon", day: 1, arrival: "14:03", departure: "14:05", haltMinutes: 2, km: 560 },
    { code: "NGP", station: "Nagpur Jn", day: 1, arrival: "18:55", departure: "19:00", haltMinutes: 5, km: 837 },
    { code: "R", station: "Raipur Jn", day: 1, arrival: "23:30", departure: "23:35", haltMinutes: 5, km: 1143 },
    { code: "BSP", station: "Bilaspur Jn", day: 2, arrival: "01:20", departure: "01:35", haltMinutes: 15, km: 1254 },
    { code: "JSG", station: "Jharsuguda Jn", day: 2, arrival: "04:28", departure: "04:30", haltMinutes: 2, km: 1454 },
    { code: "ROU", station: "Rourkela", day: 2, arrival: "05:47", departure: "05:55", haltMinutes: 8, km: 1555 },
    { code: "CKP", station: "Chakradharpur", day: 2, arrival: "07:18", departure: "07:20", haltMinutes: 2, km: 1656 },
    { code: "TATA", station: "Tatanagar Jn", day: 2, arrival: "08:13", departure: "08:20", haltMinutes: 7, km: 1719 },
    { code: "KGP", station: "Kharagpur Jn", day: 2, arrival: "10:18", departure: "10:23", haltMinutes: 5, km: 1853 },
    { code: "SRC", station: "Santragachi Jn", day: 2, arrival: "11:48", departure: "11:50", haltMinutes: 2, km: 1961 },
    { code: "HWH", station: "Howrah Jn", day: 2, arrival: "13:50", departure: "", haltMinutes: 0, km: 1968 }
  ]
};

const seedMenuItems = [
  { name: "Veg Thali", category: "Lunch", price: 120, sellingPrice: 120, costPrice: 82, type: "veg", cuisine: "North Indian", source: "pantry", available: true, stockQty: 24, itemImage: "" },
  { name: "Chicken Curry Meal", category: "Dinner", price: 180, sellingPrice: 180, costPrice: 128, type: "non-veg", cuisine: "North Indian", source: "pantry", available: true, stockQty: 12, itemImage: "" },
  { name: "Poha", category: "Breakfast", price: 55, sellingPrice: 55, costPrice: 32, type: "veg", cuisine: "North Indian", source: "pantry", available: true, stockQty: 30, itemImage: "" },
  { name: "Tea", category: "Beverage", price: 15, sellingPrice: 15, costPrice: 8, type: "veg", cuisine: "North Indian", source: "pantry", available: true, stockQty: 80, itemImage: "" },
  { name: "Water Bottle", category: "Beverage", price: 20, sellingPrice: 20, costPrice: 14, type: "veg", cuisine: "North Indian", source: "pantry", available: true, stockQty: 100, itemImage: "" }
];

function $(id) {
  return document.getElementById(id);
}

function firebaseDocId(value) {
  return encodeURIComponent(String(value || "").trim()).replace(/\./g, "%2E");
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

function itemMealSlots(item) {
  if (Array.isArray(item?.mealSlots) && item.mealSlots.length) return item.mealSlots;
  if (item?.category) return [item.category];
  return ["Other"];
}

function itemCuisineTags(item) {
  const tags = [];
  const type = String(item?.type || "").toLowerCase();
  if (type === "veg") tags.push("Veg");
  if (type === "non-veg" || type === "non veg") tags.push("Non-Veg");
  if (Array.isArray(item?.cuisines)) tags.push(...item.cuisines);
  if (item?.cuisine) tags.push(item.cuisine);
  if (!item?.cuisine && !Array.isArray(item?.cuisines) && type !== "beverage") tags.push("North Indian");
  return [...new Set(tags.filter(Boolean))];
}

function matchesMenuPreference(item, preference) {
  if (!preference || preference === "all") return true;
  const tags = itemCuisineTags(item).map((tag) => String(tag).toLowerCase());
  return tags.includes(String(preference).toLowerCase());
}

function trainLabel(train) {
  if (!train) return "";
  return `${train.trainNumber || train.id || ""} - ${train.trainName || ""}${train.yardName ? ` (${train.yardName})` : ""}`;
}

function trainBaseNumber(value) {
  const text = String(value || "").trim();
  const firstToken = text.split(/\s+/)[0] || text;
  const match = firstToken.match(/\d{4,6}/);
  return match ? match[0] : firstToken.toLowerCase();
}

function trainKeys(...values) {
  const keys = new Set();
  values.flat().forEach((value) => {
    if (value === null || value === undefined) return;
    if (typeof value === "object") {
      keys.add(String(value.trainNumber || "").trim().toLowerCase());
      keys.add(String(value.id || "").trim().toLowerCase());
      keys.add(String(value.train || "").trim().toLowerCase());
      keys.add(trainBaseNumber(value.trainNumber || value.id || value.train));
      return;
    }
    keys.add(String(value).trim().toLowerCase());
    keys.add(trainBaseNumber(value));
  });
  keys.delete("");
  return keys;
}

function trainMatches(left, right) {
  if (!left || !right) return false;
  const leftKeys = trainKeys(left);
  const rightKeys = trainKeys(right);
  return [...leftKeys].some((key) => rightKeys.has(key));
}

function rakeMatches(left, right) {
  const a = String(left || "").trim();
  const b = String(right || "").trim();
  return !a || !b || a === b;
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const source = String(text || "");
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      if (row.some((part) => part !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell.trim());
  if (row.some((part) => part !== "")) rows.push(row);
  return rows;
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
  const itemsTotal = Number(order.itemsTotal ?? items.reduce((sum, line) => sum + Number(line.qty || 0) * Number(line.price ?? line.sellingPrice ?? 0), 0));
  const deliveryCharge = Number(order.deliveryCharge || 0);
  const processingCharge = Number(order.processingCharge || 0);
  const highDemandCharge = Number(order.highDemandCharge || 0);
  const couponDiscount = Number(order.couponDiscount || 0);
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
      <h1>Meals On Wheels Passenger Food Invoice</h1>
      <p class="muted">Fresh meals, happy journeys</p>
      <p><b>Order No:</b> ${escapeHtml(order.orderNo || "")}</p>
      <p><b>Status:</b> ${escapeHtml(order.status || "")}</p>
    </div>
    <div>
      <p><b>Developer Support:</b> Sandip Nandi</p>
      <p>858483366</p>
      <p>sandipnandi2000@gmail.com</p>
    </div>
  </div>
  <div class="box">
    <p><b>Passenger:</b> ${escapeHtml(order.customer?.name || "")}</p>
    <p><b>Phone:</b> ${escapeHtml(order.customerPhone || order.customer?.phone || "")}</p>
    <p><b>PNR:</b> ${escapeHtml(order.pnr || order.customer?.pnr || "")}</p>
    <p><b>Train:</b> ${escapeHtml(order.train || "")} ${order.trainName ? `- ${escapeHtml(order.trainName)}` : ""}</p>
    <p><b>Yard / Coach / Seat:</b> ${escapeHtml(order.yardName || "")} / ${escapeHtml(order.coach || "")} / ${escapeHtml(order.seat || "")}</p>
    <p><b>Delivery Slot:</b> ${escapeHtml(order.deliveryWindow || order.requestedDeliveryTime || "")}</p>
    <p><b>Payment Mode:</b> ${escapeHtml(order.paymentMode || "COD")} | ${escapeHtml(order.paymentStatus || "cash-on-delivery")}</p>
    <p><b>Order Date:</b> ${nowLabel(order.createdAt)}</p>
    ${order.deliveryPersonName ? `<p><b>Delivery By:</b> ${escapeHtml(order.deliveryPersonName)} | ${escapeHtml(order.deliveryPersonPhone || "")}${order.deliveryVanNo ? ` | Van ${escapeHtml(order.deliveryVanNo)}` : ""}</p>` : ""}
  </div>
  <table>
    <thead><tr><th>Sl</th><th>Item</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot>
      <tr><td colspan="2" class="total">Items Total</td><td><b>${totalQty}</b></td><td></td><td><b>${money(itemsTotal)}</b></td></tr>
      <tr><td colspan="4" class="total">Delivery Charge</td><td>${money(deliveryCharge)}</td></tr>
      <tr><td colspan="4" class="total">Processing Charge</td><td>${money(processingCharge)}</td></tr>
      ${highDemandCharge ? `<tr><td colspan="4" class="total">High Demand Charge</td><td>${money(highDemandCharge)}</td></tr>` : ""}
      ${couponDiscount ? `<tr><td colspan="4" class="total">Coupon Discount ${escapeHtml(order.couponCode || "")}</td><td>- ${money(couponDiscount)}</td></tr>` : ""}
      <tr><td colspan="4" class="total">Total Payable</td><td><b>${money(order.total)}</b></td></tr>
    </tfoot>
  </table>
  <div class="box">Thank you for giving Meals On Wheels the opportunity to serve you. We wish you a comfortable and pleasant journey.</div>
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
      <h1>Meals On Wheels Base Kitchen Invoice</h1>
      <p class="muted">Railway Catering Services</p>
      <p><b>Invoice No:</b> ${escapeHtml(invoice.invoiceNo || "")}</p>
      <p><b>Status:</b> ${escapeHtml(invoice.status || "")}</p>
      ${invoice.revisionNo ? `<p><b>Revision:</b> ${Number(invoice.revisionNo)}</p>` : ""}
    </div>
    <div>
      <p><b>Developer Support:</b> Sandip Nandi</p>
      <p>858483366</p>
      <p>sandipnandi2000@gmail.com</p>
    </div>
  </div>
  <div class="box">
    <p><b>Train No:</b> ${escapeHtml(invoice.train || "")}</p>
    <p><b>Train / Rake Manager:</b> ${escapeHtml(invoice.rackManager || "")}</p>
    <p><b>Supplier Base Kitchen:</b> ${escapeHtml(invoice.baseKitchenName || "")}</p>
    <p><b>Indent No:</b> ${escapeHtml(invoice.indentNo || "")}</p>
    ${invoice.deliveryStation ? `<p><b>Delivery Station:</b> ${escapeHtml(invoice.deliveryStation)}</p>` : ""}
    ${invoice.deliveryTime ? `<p><b>Delivery Time:</b> ${escapeHtml(invoice.deliveryTime)}</p>` : ""}
    <p><b>Invoice Date:</b> ${nowLabel(invoice.createdAt)}</p>
    ${invoice.deliveryPersonName ? `<p><b>Delivery Person:</b> ${escapeHtml(invoice.deliveryPersonName)} | ${escapeHtml(invoice.deliveryPersonPhone || "")}</p>` : ""}
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
    <div class="line">Train / Rake Manager Signature</div>
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

function cleanPnr(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 10);
}

function playBuzz(label = "New live update") {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      toast(label);
      return;
    }
    const ctx = new AudioCtx();
    const beep = (delay, freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.22);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.24);
    };
    beep(0, 740);
    beep(0.28, 980);
    toast(label);
  } catch (error) {
    toast(label);
  }
}

function nowLabel(value) {
  if (!value) return "-";
  const date = value.toDate ? value.toDate() : new Date(value);
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function dateFromAny(value) {
  if (!value) return null;
  const date = value.toDate ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
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

function firebaseAccessMessage(collectionName, error) {
  if (String(error?.message || "").toLowerCase().includes("permission")) {
    return `Firebase permission missing for ${collectionName}. Publish the latest FIREBASE_RULES_V1_CONTROLLED_PILOT.rules in Firebase Console.`;
  }
  return `Live sync error in ${collectionName}: ${error?.message || "Unknown Firebase error"}`;
}

function compatDocId(type, value = "") {
  return `${type}__${firebaseDocId(value || shortId(type.toUpperCase()))}`;
}

function statusBadge(status) {
  const s = String(status || "new").toLowerCase();
  let tone = "info";
  if (["delivered", "accepted", "closed", "resolved", "invoiced", "supplier-delivered-to-rake"].includes(s)) tone = "ok";
  if (["processing", "preparing", "out-for-delivery", "sent", "new", "pending", "acknowledged", "investigating", "waiting for vendor", "customer-replied", "restaurant-accepted", "restaurant-preparing", "restaurant-handover"].includes(s)) tone = "warn";
  if (["disputed", "cancelled", "rejected", "open"].includes(s)) tone = "danger";
  return `<span class="badge ${tone}">${escapeHtml(s.replace(/-/g, " "))}</span>`;
}

function registrationStatus(row, fallback = "pending") {
  return String(row?.approvalStatus || row?.status || fallback).toLowerCase();
}

const registrationPhoneSources = [
  { collection: "partners", type: "partner", phoneField: "phone", nameFields: ["restaurantName", "name"], loginField: "loginId" },
  { collection: "baseKitchens", type: "base-kitchen", phoneField: "phone", nameFields: ["name"], loginField: "loginId" },
  { collection: "deliveryPartners", type: "delivery-partner", phoneField: "phone", nameFields: ["name"], loginField: "loginId" },
  { collection: "adminUsers", type: "staff", phoneField: "phone", nameFields: ["name", "email"], loginField: "email" },
  { collection: "customerOrders", type: "customer", phoneField: "customer.phone", nameFields: ["customer.name"], loginField: "" }
];

function nestedValue(row, path) {
  return String(path || "").split(".").reduce((value, key) => value?.[key], row);
}

function normalizedPhoneIdentity(row, source) {
  const name = source.nameFields.map((field) => nestedValue(row, field)).find(Boolean) || "Registered user";
  return {
    id: row.id,
    sourceCollection: source.collection,
    userType: source.collection === "adminUsers" && row.role ? String(row.role) : source.type,
    phone: cleanPhone(nestedValue(row, source.phoneField)),
    name: String(name),
    loginId: source.loginField ? String(nestedValue(row, source.loginField) || "") : "",
    status: registrationStatus(row, source.type === "customer" ? "active" : "pending"),
    compatSource: row.compatSource || source.collection
  };
}

async function findRegistrationByPhone(phone) {
  const clean = cleanPhone(phone);
  if (clean.length !== 10) return [];
  const results = [];
  const registryDoc = await db.collection("systemSettings").doc(compatDocId("phoneIdentity", clean)).get().catch(() => null);
  if (registryDoc?.exists) {
    const data = registryDoc.data();
    results.push({ id: registryDoc.id, ...data, phone: clean, registry: true });
  }
  for (const source of registrationPhoneSources) {
    try {
      const snap = await db.collection(source.collection).where(source.phoneField, "==", clean).limit(10).get();
      snap.docs.forEach((doc) => results.push(normalizedPhoneIdentity({ id: doc.id, ...doc.data() }, source)));
    } catch (error) {
      console.warn(`Phone lookup skipped for ${source.collection}`, error);
    }
  }
  try {
    const fallback = await db.collection("systemSettings").where("phone", "==", clean).limit(30).get();
    fallback.docs.forEach((doc) => {
      const data = doc.data();
      if (!["partner", "baseKitchen", "deliveryPartner", "phoneIdentity"].includes(String(data.type || ""))) return;
      results.push({
        id: doc.id,
        sourceCollection: "systemSettings",
        compatSource: "systemSettings",
        userType: data.userType || (data.type === "baseKitchen" ? "base-kitchen" : data.type === "deliveryPartner" ? "delivery-partner" : data.type),
        phone: clean,
        name: data.name || data.restaurantName || "Registered user",
        loginId: data.loginId || "",
        status: registrationStatus(data),
        registry: data.type === "phoneIdentity"
      });
    });
  } catch (error) {
    console.warn("Fallback phone lookup skipped", error);
  }
  const unique = new Map();
  results.forEach((row) => unique.set(`${row.sourceCollection || row.compatSource}:${row.id}:${row.userType}`, row));
  return [...unique.values()];
}

async function assertUniqueRegistrationPhone(phone, options = {}) {
  const clean = cleanPhone(phone);
  if (clean.length !== 10) throw new Error("Enter a valid 10 digit phone number.");
  const matches = await findRegistrationByPhone(clean);
  const blocking = matches.find((row) => {
    if (options.allowSameType && row.userType === options.userType) return false;
    if (options.recordId && (row.id === options.recordId || row.registrationId === options.recordId)) return false;
    return true;
  });
  if (blocking) throw new Error(`This phone number is already registered for ${blocking.name} (${String(blocking.userType || "user").replace(/-/g, " ")}). Use Login or Forgot Password instead.`);
  return matches;
}

async function registerPhoneIdentity(phone, payload = {}) {
  const clean = cleanPhone(phone);
  await db.collection("systemSettings").doc(compatDocId("phoneIdentity", clean)).set({
    type: "phoneIdentity",
    phone: clean,
    userType: payload.userType || "user",
    name: payload.name || "Registered user",
    loginId: payload.loginId || "",
    registrationId: payload.registrationId || "",
    sourceCollection: payload.sourceCollection || "",
    status: payload.status || "registered",
    updatedAt: FieldValue.serverTimestamp(),
    createdAt: FieldValue.serverTimestamp()
  }, { merge: true });
}

async function readUploadedDocument(file, maxImageSize = 900) {
  if (!file) return null;
  if (String(file.type || "").startsWith("image/")) {
    return { name: file.name, type: file.type, dataUrl: await compressImage(file, maxImageSize, 0.72) };
  }
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { name: file.name, type: file.type || "application/pdf", dataUrl };
}

function openPasswordResetRequest(userType = "user") {
  document.getElementById("passwordResetModal")?.remove();
  const backdrop = document.createElement("div");
  backdrop.id = "passwordResetModal";
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `<div class="modal stack">
    <div class="section-title"><div><h2>Forgot Password</h2><p>Verify the registered phone. Control Tower or Admin will reset the password and inform you manually.</p></div><button class="icon-btn" type="button" data-close-password-reset><i data-lucide="x"></i></button></div>
    <label class="field"><span>Registered Phone Number</span><input class="input" id="passwordResetPhone" inputmode="tel" maxlength="10" placeholder="10 digit phone"></label>
    <button class="btn secondary" type="button" id="findPasswordResetUser"><i data-lucide="search"></i> Find Registration</button>
    <div id="passwordResetUserDetail" class="hidden"></div>
    <button class="btn hidden" type="button" id="submitPasswordResetRequest"><i data-lucide="send"></i> Send Reset Request</button>
  </div>`;
  document.body.appendChild(backdrop);
  let selected = null;
  const close = () => backdrop.remove();
  backdrop.querySelector("[data-close-password-reset]").addEventListener("click", close);
  backdrop.addEventListener("click", (event) => { if (event.target === backdrop) close(); });
  backdrop.querySelector("#findPasswordResetUser").addEventListener("click", async () => {
    const phone = cleanPhone(backdrop.querySelector("#passwordResetPhone").value);
    if (phone.length !== 10) return toast("Enter a valid 10 digit registered phone.");
    const rows = await findRegistrationByPhone(phone);
    selected = rows.find((row) => row.userType === userType && !row.registry)
      || rows.find((row) => !row.registry)
      || rows[0];
    if (!selected) return toast("No registration found for this phone number.");
    const detail = backdrop.querySelector("#passwordResetUserDetail");
    detail.className = "item";
    detail.innerHTML = `<h3>${escapeHtml(selected.name || "Registered user")}</h3><p>${escapeHtml(String(selected.userType || userType).replace(/-/g, " "))} | ${escapeHtml(phone)}</p>${selected.loginId ? `<p><b>Login ID:</b> ${escapeHtml(selected.loginId)}</p>` : ""}<p><b>Status:</b> ${escapeHtml(selected.status || "registered")}</p>`;
    backdrop.querySelector("#submitPasswordResetRequest").classList.remove("hidden");
    lucide?.createIcons?.();
  });
  backdrop.querySelector("#submitPasswordResetRequest").addEventListener("click", async () => {
    if (!selected) return;
    await compatAdd("passwordResetRequests", "passwordResetRequest", {
      phone: cleanPhone(selected.phone),
      name: selected.name || "Registered user",
      userType: selected.userType || userType,
      loginId: selected.loginId || "",
      registrationId: selected.id || "",
      sourceCollection: selected.sourceCollection || selected.compatSource || "",
      registrationCompatSource: selected.compatSource || selected.sourceCollection || "",
      status: "pending",
      requestedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });
    close();
    toast("Password reset request sent. Control Tower or Admin will contact you after resetting it.");
  });
  lucide?.createIcons?.();
}

function canCustomerChangeOrder(order) {
  const status = String(order?.status || "").toLowerCase();
  if (!["new", "accepted"].includes(status)) return false;
  const explicitUntil = dateFromAny(order?.customerCancelUntil);
  if (explicitUntil) return Date.now() <= explicitUntil.getTime();
  const created = dateFromAny(order?.createdAt);
  if (!created) return false;
  return Date.now() - created.getTime() <= 2 * 60 * 1000;
}

function canCommandCancelCustomerOrder(order) {
  return ["new", "accepted", "preparing"].includes(String(order?.status || "").toLowerCase());
}

async function cancelCustomerOrder(order, reason, source = "system") {
  if (!order?.id) return;
  const batch = db.batch();
  batch.update(db.collection("customerOrders").doc(order.id), {
    status: "cancelled",
    cancelReason: reason,
    cancelledBy: source,
    cancelledAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    statusLog: FieldValue.arrayUnion({ status: "cancelled", at: new Date().toISOString(), note: reason })
  });
  if (!order.orderStockReleased && String(order.status || "").toLowerCase() !== "delivered") {
    (order.items || []).forEach((line) => {
      if (!line.itemId) return;
      batch.update(db.collection("menuItems").doc(line.itemId), {
        stockQty: FieldValue.increment(Number(line.qty || 0)),
        available: true,
        updatedAt: FieldValue.serverTimestamp()
      });
    });
    batch.update(db.collection("customerOrders").doc(order.id), { orderStockReleased: true });
  }
  await batch.commit();
}

async function cancelIndent(indent, reason, source = "system") {
  if (!indent?.id) return;
  await db.collection("indents").doc(indent.id).update({
    status: "cancelled",
    cancelReason: reason,
    cancelledBy: source,
    cancelledAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  });
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

function setSubmitState(form, state = "idle", label = "") {
  const btn = form?.querySelector?.("button[type='submit']");
  if (!btn) return () => {};
  if (!btn.dataset.idleHtml) btn.dataset.idleHtml = btn.innerHTML;
  btn.disabled = state !== "idle";
  if (state === "saving") btn.innerHTML = `<i data-lucide="loader-2"></i> ${escapeHtml(label || "Submitting...")}`;
  if (state === "saved") btn.innerHTML = `<i data-lucide="check"></i> ${escapeHtml(label || "Submitted")}`;
  if (state === "idle") btn.innerHTML = btn.dataset.idleHtml;
  lucide?.createIcons?.();
  return () => setSubmitState(form, "idle");
}

function finishSubmitState(form, message = "Submitted") {
  setSubmitState(form, "saved", message);
  setTimeout(() => setSubmitState(form, "idle"), 1600);
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
  seedTrainMasters.forEach((train) => {
    batch.set(db.collection("trainMasters").doc(firebaseDocId(train.trainNumber)), {
      ...train,
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
      toast(firebaseAccessMessage(collectionName, error));
    });
}

function onLiveCompat(collectionName, fallbackType, callback, orderField = "createdAt", direction = "desc", limit = 100) {
  let fallbackUnsubscribe = null;
  const fallback = () => db.collection("systemSettings")
    .where("type", "==", fallbackType)
    .limit(limit)
    .onSnapshot((snapshot) => {
      const rows = snapshot.docs
        .map((doc) => ({ id: doc.id, compatSource: "systemSettings", ...doc.data() }))
        .sort((a, b) => {
          const left = (a[orderField]?.toMillis ? a[orderField].toMillis() : 0);
          const right = (b[orderField]?.toMillis ? b[orderField].toMillis() : 0);
          return direction === "asc" ? left - right : right - left;
        });
      callback(rows);
    }, (error) => {
      console.error(error);
      toast(firebaseAccessMessage("systemSettings", error));
    });
  const primaryUnsubscribe = db.collection(collectionName)
    .orderBy(orderField, direction)
    .limit(limit)
    .onSnapshot((snapshot) => {
      callback(snapshot.docs.map((doc) => ({ id: doc.id, compatSource: collectionName, ...doc.data() })));
    }, (error) => {
      console.error(error);
      if (String(error?.message || "").toLowerCase().includes("permission")) {
        toast(`${collectionName} is blocked by Firebase rules. Using pilot fallback storage.`);
        fallbackUnsubscribe = fallback();
        return;
      }
      toast(firebaseAccessMessage(collectionName, error));
    });
  return () => {
    primaryUnsubscribe();
    if (fallbackUnsubscribe) fallbackUnsubscribe();
  };
}

async function compatAdd(collectionName, fallbackType, payload) {
  try {
    const ref = await db.collection(collectionName).add(payload);
    return { id: ref.id, collectionName };
  } catch (error) {
    if (!String(error?.message || "").toLowerCase().includes("permission")) throw error;
    const id = compatDocId(fallbackType);
    await db.collection("systemSettings").doc(id).set({
      ...payload,
      type: fallbackType,
      compatCollection: collectionName,
      compatFallback: true,
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
    toast(`${collectionName} is blocked by Firebase rules. Saved in pilot fallback storage.`);
    return { id, collectionName: "systemSettings" };
  }
}

async function compatSet(collectionName, fallbackType, docId, payload) {
  try {
    await db.collection(collectionName).doc(docId).set(payload, { merge: true });
    return { id: docId, collectionName };
  } catch (error) {
    if (!String(error?.message || "").toLowerCase().includes("permission")) throw error;
    const id = compatDocId(fallbackType, docId);
    await db.collection("systemSettings").doc(id).set({
      ...payload,
      type: fallbackType,
      compatCollection: collectionName,
      compatFallback: true,
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
    toast(`${collectionName} is blocked by Firebase rules. Saved in pilot fallback storage.`);
    return { id, collectionName: "systemSettings" };
  }
}

async function compatUpdate(row, collectionName, payload) {
  const targetCollection = row?.compatSource === "systemSettings" ? "systemSettings" : collectionName;
  await db.collection(targetCollection).doc(row.id).update({
    ...payload,
    updatedAt: FieldValue.serverTimestamp()
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
          <div class="logo">MW</div>
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

