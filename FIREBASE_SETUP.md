# RK Rail Catering Firebase and GitHub Launch Guide

Developer and support: Sandip Nandi, 858483366, sandipnandi2000@gmail.com

## Apps

- `index.html` - app launcher
- `customer-app.html` - passenger feedback, complaint and food order
- `command-center.html` - train manager / unified command center
- `base-kitchen.html` - base kitchen indent and invoice workflow
- `control-tower.html` - maker-checker approval for catalog and partners
- `partner-app.html` - restaurant / station partner enlistment and catalog request
- `delivery-app.html` - delivery partner profile, pickup, OTP and delivery status
- `central-command.html` - management dashboard and ecosystem overview

## Firebase collections used

- `menuItems` - master food item and pantry stock
- `customerOrders` - passenger food orders
- `feedbacks` - feedback and complaint records
- `baseKitchens` - base kitchen master
- `trainMasters` - train number, train name and yard master
- `indents` - train manager indent to base kitchen
- `invoices` - base kitchen invoice and delivery acceptance/dispute
- `stockInterests` - passenger notify-me requests for sold out items
- `catalogRequests` - product requests waiting for Control Tower approval
- `partners` - partner restaurant / vendor enlistment records
- `deliveryPartners` - delivery person profile, KYC/photo and delivery count
- `cashPurchases` - local outside purchase by train manager
- `storeInwards` - store/warehouse inward records
- `staffSales` - onboard sales person sale entry
- `adminUsers` - prototype app login and access roles
- `systemSettings` - seed marker for default master data

## Firestore indexes you may need

Firebase may ask to create indexes from the browser console. Create them if prompted.

- `customerOrders`: `customer.phone` ascending, `createdAt` descending
- `feedbacks`: `createdAt` descending
- `indents`: `createdAt` descending
- `invoices`: `createdAt` descending
- `menuItems`: `updatedAt` descending
- `catalogRequests`: `createdAt` descending
- `partners`: `createdAt` descending
- `deliveryPartners`: `updatedAt` descending

## Required rule update after adding new apps

If Delivery App shows `Live sync error in deliveryPartners: Missing or insufficient permissions`, or Partner App cannot enroll a partner, Firebase Rules are still old.

Open Firebase Console > Firestore Database > Rules, paste the full content from `FIREBASE_RULES_V1_CONTROLLED_PILOT.rules`, then click **Publish**.

The new apps need these collections to be allowed:

- `deliveryPartners`
- `partners`
- `catalogRequests`

The app also has a pilot fallback: if those new collections are blocked, it can save these records in `systemSettings` with type values `deliveryPartner`, `partner`, and `catalogRequest`. This keeps testing moving, but publishing the latest rules is still the cleaner setup.

## Suggested first testing rules

Use open rules only for internal testing. Before public launch, add Firebase Authentication and role based rules.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Safer production direction

- Add Firebase Authentication for command center and base kitchen users.
- Allow public write only to `customerOrders` and `feedbacks`.
- Restrict `menuItems`, `indents`, `invoices`, and `baseKitchens` to authenticated RK staff.
- Use `FIREBASE_RULES_V1_CONTROLLED_PILOT.rules` for a controlled pilot where deletes should be blocked.
- Enable Firebase App Check after GitHub Pages domain is final.
- Keep Firebase project billing and quota alerts active because photo proof is stored as compressed base64 in Firestore in this V1.

## GitHub Pages launch steps

1. Create a new GitHub repository, for example `rk-rail-catering-suite`.
2. Upload these files to the repository root.
3. Go to repository `Settings` > `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select branch `main` and folder `/root`, then save.
6. Open the Pages URL GitHub shows. It will load `index.html`.
7. In Firebase Console, open `Firestore Database` and confirm the collections are being created live.
8. If Firebase shows missing-index links in console errors, open those links and create the indexes.

## Firebase config

The current app uses your Firebase project:

- Project ID: `rk-rail-cx`
- Auth domain: `rk-rail-cx.firebaseapp.com`
- Storage bucket: `rk-rail-cx.firebasestorage.app`

If you create a new Firebase project, replace the config object in `rk-common.js`.
