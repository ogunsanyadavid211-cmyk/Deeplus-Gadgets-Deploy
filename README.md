# Deeplus Gadgets — Vanilla Frontend V3

This is a reviewed public-site frontend rebuilt with:
- HTML5
- CSS3
- Vanilla JavaScript ES6+
- No React
- No Bootstrap
- No Tailwind
- No jQuery
- No frontend framework

## Corrected items
- Uses the Deeplus D+ / hexagon logo as an SVG asset.
- Correct contact email: Deeplusgadgets@gmail.com
- Prominent free-spin gift messaging after an eligible confirmed purchase.
- Real schedule-visit form with name, WhatsApp, interest, date, time, source and notes.
- Real home-delivery request form with name, WhatsApp, gadget, budget/model, location, date, source and notes.
- Client-side validation and accessible error states.
- Forms open a pre-filled WhatsApp request after validation; this is intentionally not presented as an automatic booking.
- Responsive 320px–1920px layout.
- Mobile navigation, sticky header, FAQ accordions and reduced-motion support.
- No fake product inventory or invented prices.

## Important integration note
The existing Deeplus repository contains the real backend APIs for `/api/bookings` and `/api/deliveries`.
This standalone vanilla build does not pretend those APIs are connected when opened as static files. The request forms currently hand off the completed request to the real Deeplus WhatsApp number. When this frontend is mounted into the existing application/API environment, the submit handlers can be wired to the existing endpoints without changing the visual forms.

## Brand asset
`assets/deeplus-logo.png` is the user's supplied official Deeplus Gadgets logo, used directly in the header and footer.
