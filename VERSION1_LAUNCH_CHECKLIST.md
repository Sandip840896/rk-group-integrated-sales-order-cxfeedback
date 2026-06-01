# Version 1 Launch Checklist

Developer and support: Sandip Nandi, 8584833366, sandipnandi2000@gmail.com

Use this checklist before opening the app to RK train manager, base kitchen and selected passenger test users.

## 1. Upload Latest Files To GitHub

Upload these files to the repository root:

- `index.html`
- `customer-app.html`
- `command-center.html`
- `base-kitchen.html`
- `rk-common.js`
- `rk-app.css`
- `README.md`
- `FIREBASE_SETUP.md`
- `USER_GUIDE_V1.md`
- `VERSION1_LAUNCH_CHECKLIST.md`
- `VERSION_ROADMAP.md`
- `FIREBASE_RULES_V1_CONTROLLED_PILOT.rules`

Wait 1-2 minutes after upload for GitHub Pages deployment.

## 2. Firebase Data Check

Keep these collections:

- `menuItems`
- `baseKitchens`
- `trainMasters`
- `adminUsers`
- `systemSettings`

Before real pilot, delete old test transaction data if needed:

- `customerOrders`
- `feedbacks`
- `indents`
- `invoices`
- `stockInterests`
- `cashPurchases`
- `storeInwards`
- `staffSales`

Take backup first from Super Admin.

## 3. Firebase Rules

For internal testing, current open rules work.

For controlled pilot, paste rules from:

- `FIREBASE_RULES_V1_CONTROLLED_PILOT.rules`

These rules still allow public browser writes because Version 1 has no real Firebase Auth, but they block delete operations to reduce accidental damage. Use Super Admin delete only during testing with open rules.

## 4. Functional Test

Customer app:

- Search/select train.
- Enter PNR, coach, berth and phone.
- Place food order.
- Track order.
- Print customer invoice.
- Submit feedback.
- Submit complaint.
- Reply to RK response and give rating.
- Try sold-out Notify me.

Command Center:

- Confirm new order badge appears.
- Accept, prepare, initiate delivery and deliver customer order.
- Confirm feedback/complaint badge appears.
- Reply to complaint and change status.
- Create base kitchen indent.
- Confirm hidden food item cannot be indented.
- Accept base kitchen invoice.
- Raise dispute with note/photo.
- Accept final invoice.
- Add/edit/hide food item master.
- Upload/search train master.
- Add cash purchase/store inward.
- Add staff sale and check stock deduction.
- Check dashboard sales, gross profit and purchase totals.

Base Kitchen:

- Select base kitchen.
- Confirm incoming indent.
- Edit approved quantity.
- Save quantity.
- Accept/process indent.
- Create invoice.
- Check invoice PDF.
- Check disputed invoice.
- Resend final invoice.

## 5. QR And Links

Customer QR should point only to:

`https://sandip840896.github.io/rk-group-integrated-sales-order-cxfeedback/customer-app.html`

Do not share command center or base kitchen link publicly.

## 6. Version 1 Go/No-Go

Go live only when:

- Latest files are uploaded.
- Firebase backup is downloaded.
- Test data is cleaned.
- Customer app works on mobile network.
- Command center works on laptop/tablet.
- Base kitchen app works on mobile/laptop.
- Managers understand that Version 1 is a controlled pilot, not final production security.
