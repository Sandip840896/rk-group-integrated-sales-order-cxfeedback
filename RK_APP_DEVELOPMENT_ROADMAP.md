# RK Rail Catering App Roadmap

Developer and support: Sandip Nandi / 858483366 / sandipnandi2000@gmail.com

## Current Prototype Scope

- Customer App: QR landing, passenger details, PNR entry, train search, meal selection, live order tracking, feedback and complaint tickets.
- Train Command Center App: order control, feedback desk, pantry/store purchase, base-kitchen indent, invoice acceptance and master maintenance.
- Base Kitchen App: indent processing, invoice creation, dispute handling and new product request submission.
- Control Tower App: maker-checker approval for base kitchen and partner catalog items, partner approval, Gitanjali route planning.
- Partner App: restaurant enlistment, product catalog submission and approval status.
- Delivery App: delivery partner profile, order pickup, OTP release and delivered confirmation.
- Central Command App: management dashboard for ecosystem count, order status, sales, margin, complaints and approval risks.

## Phase 1: Controlled Pilot

- Keep the GitHub Pages static app model.
- Keep Firestore as the shared live database.
- Add all new requests into approval queues before publishing to the customer menu.
- Use compressed image data only for pilot images.
- Import `Master/active-base-kitchens-import.csv` into Command Center base-kitchen master.

## Phase 2: Train And Route Intelligence

- Replace manual train selection with PNR lookup when an approved API/source is available.
- Build train route master with station halt time, expected arrival/departure and base-kitchen coverage.
- Enforce base-kitchen allocation only when preparation plus travel buffer is available.
- Expand the Gitanjali Express pilot route into a reusable train-route collection.

## Phase 3: Production Security

- Add Firebase Authentication for all staff, partners and delivery users.
- Move role permissions from browser checks to Firebase rules with custom claims.
- Enable Firebase App Check.
- Replace open pilot write rules with role-based collection permissions.
- Keep Customer App public but restrict sensitive fields and staff actions.

## Phase 4: Image And Media Scale

- Move product photos, KYC images, delivery proof and complaint media to Firebase Storage.
- Store only Storage download URLs and metadata in Firestore.
- Create image size rules: thumbnail, menu card image and full proof image.
- Add duplicate image reuse for common catalog items.

## Phase 5: Management Analytics

- Add daily/monthly snapshots for sales, margin, fill rate, on-time delivery and complaint ageing.
- Add route-wise and train-wise profitability.
- Add base-kitchen scorecards and partner scorecards.
- Add delivery partner ratings, delivered count and failure history.
