# RK Group App Roadmap

Developer and support: Sandip Nandi, 8584833366, sandipnandi2000@gmail.com

## Version 1 - Controlled Pilot

- GitHub Pages static app with Firebase Firestore live sync.
- Customer order, tracking, invoice, feedback and complaint.
- Command center for train manager and supervisor workflow.
- Base kitchen indent, invoice, dispute and final delivery workflow.
- Masters for train, base kitchen and food item with cost/selling price.
- Store inward, cash purchase and staff sales entry.
- Dashboard for sales, complaints, fill rate, purchase and gross profit.
- Prototype login and super admin utilities.

## Version 2 - Production Hardening

- Firebase Authentication for all staff users.
- Role-based access for train manager, base kitchen, OPS manager, admin and super admin.
- App Check and stricter Firestore rules.
- Better audit log for all stock, order and invoice changes.
- Full Excel export/import for all masters and transactions.
- Stronger offline queue for train manager workflows in poor network zones.
- Better print formats for invoices, cash purchases, store inward and sales summary.

## Version 3 - External Integrations

- PNR/train lookup through a secure backend/API proxy.
- SMS/WhatsApp notification for order and complaint status.
- Payment integration if RK decides to collect online payment.
- Central API and reporting database for multi-train, multi-day analytics.

## Parked Item

PNR lookup is intentionally parked for Version 3. It should not be added directly in browser JavaScript because API keys and passenger details would be exposed.
