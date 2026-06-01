# RK Group Integrated Sales, Order and CX Feedback

Developer and support: Sandip Nandi, 8584833366, sandipnandi2000@gmail.com

This is a live Firebase + GitHub Pages prototype for RK Group railway catering operations.

## Apps

- `index.html` - launch page with separate entry points for each user group.
- `customer-app.html` - passenger order, feedback, complaint and tracking app.
- `command-center.html` - train manager / supervisor command center.
- `base-kitchen.html` - base kitchen indent, invoice and dispute app.

## Current Version 1 Scope

- Customer order from train, coach, berth and PNR details.
- Live order tracking and customer invoice print.
- Customer feedback and complaint with media proof.
- Customer reply and rating on RK response.
- Command center live order, feedback, complaint, master, stock and dashboard.
- Train master, food master and base kitchen master.
- Base kitchen indent acceptance, quantity adjustment, invoice and dispute handling.
- Cash purchase, store inward and staff sales register.
- Basic super admin utilities for backup and master deletion in prototype mode.
- Version roadmap is maintained in `VERSION_ROADMAP.md`.

## Important Version 3 Parking

PNR lookup from web/API is intentionally not included in Version 1. It needs a secure backend/API proxy so API keys and passenger data are not exposed in the browser.

## Live Links

Replace the repository name if the GitHub Pages URL changes.

- Customer App: `https://sandip840896.github.io/rk-group-integrated-sales-order-cxfeedback/customer-app.html`
- Command Center: `https://sandip840896.github.io/rk-group-integrated-sales-order-cxfeedback/command-center.html`
- Base Kitchen: `https://sandip840896.github.io/rk-group-integrated-sales-order-cxfeedback/base-kitchen.html`

## Launch Rule

Version 1 is suitable for controlled pilot testing with known RK users. Before large public rollout, enable Firebase Authentication, role-based Firestore rules, App Check, and backend handling for sensitive features.
