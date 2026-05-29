# RK Rail Catering Firebase and GitHub Launch Guide

Developer and support: Sandip Nandi, 8584833366, sandipnandi2000@gmail.com

## Apps

- `index.html` - app launcher
- `customer-app.html` - passenger feedback, complaint and food order
- `command-center.html` - train manager / unified command center
- `base-kitchen.html` - base kitchen indent and invoice workflow

## Firebase collections used

- `menuItems` - master food item and pantry stock
- `customerOrders` - passenger food orders
- `feedbacks` - feedback and complaint records
- `baseKitchens` - base kitchen master
- `indents` - train manager indent to base kitchen
- `invoices` - base kitchen invoice and delivery acceptance/dispute
- `systemSettings` - seed marker for default master data

## Firestore indexes you may need

Firebase may ask to create indexes from the browser console. Create them if prompted.

- `customerOrders`: `customer.phone` ascending, `createdAt` descending
- `feedbacks`: `createdAt` descending
- `indents`: `createdAt` descending
- `invoices`: `createdAt` descending
- `menuItems`: `updatedAt` descending

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

The current app uses your existing Firebase project:

- Project ID: `rk-group-feedback`
- Auth domain: `rk-group-feedback.firebaseapp.com`

If you create a new Firebase project, replace the config object in `rk-common.js`.
