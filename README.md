# Satya Power website

React 19 + TypeScript single-page application, built with Vite 7 and Tailwind CSS 4. The package's historical `tanstack_start_ts` name is misleading: routing uses React Router, and there is no application backend or server-rendered framework here.

## Run locally

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

The configured port is 8085. Vite picks another port if it is occupied.

```sh
npm run typecheck
npm test
npm run lint
npm run build
```

## Architecture

- `src/main.tsx`: route definitions for home, products, services, brands, gallery, about, contact, admin and the 404 fallback.
- `src/routes/__root.tsx`: shared header/footer, notification UI, scroll reset and company settings. React Query is provided, but content hooks currently subscribe directly to Firestore.
- `src/components`: reusable page sections, product details, quote and payment dialogs. `ui/` contains Radix-based primitives.
- `src/lib/*-data.ts`: Firebase content subscriptions and admin mutations. The product catalogue uses a separate REST metadata loader with on-demand images and an IndexedDB image cache; full galleries are fetched only for details or editing.
- `src/lib/firebase.ts`: Firebase initialization, authentication and production-only analytics.
- Contact/quote delivery uses Firestore and Formspree. Quote actions also open a WhatsApp draft. Service requests use Firestore.
- Razorpay checkout runs in the browser. Browser payment callbacks are recorded as `pending_verification`; this project does not implement trusted server-side verification.
- `firestore.rules`, `firebase.json`, and `vercel.json`: database policy and hosting configuration. Production hosting needs SPA route rewrites.

## Review and fixes — 2026-09-05

Fixed discarded product galleries, replacement of legitimate remote product URLs with seed images, stale product details while live data arrives, empty image source errors, missing descriptions in compressed caches, search parameters being deleted on reload, and empty caches resurrecting deleted seed entries.

Removed automatic database seeding from public reads and made company settings tolerate corrupt, unavailable, or partial browser caches. Failed product saves now keep the editor open instead of pretending a local cache update saved the database.

Contact, service, and quote forms no longer confirm delivery when all delivery paths fail. Submission buttons prevent repeat clicks while requests are pending; network confirmation has a bounded wait. WhatsApp text is encoded correctly and its tab opens during the user's click rather than after network waits. No real test inquiries or payments were submitted.

Removed a payment secret from frontend source. Firestore rules no longer invoke the nonexistent `Resource.size()` method; inquiry fields are validated individually. See the [Firebase Resource reference](https://firebase.google.com/docs/reference/rules/rules.firestore.Resource). Payment rules now reject client-created records claiming a verified success.

Applied the repository's Prettier formatting and replaced explicit `any` types flagged by ESLint with concrete types or checked unknown values. Added five automated regressions for product images, WhatsApp encoding, unavailable inquiry delivery, company caches, and intentionally empty service caches.

## Validation and remaining work

- TypeScript and production build pass; nine regression tests pass.
- Lint has no errors and six existing Fast Refresh warnings in shared UI primitives.
- Browser smoke checks cover every route, 404, product details, quote prefill, search reload, category filters and the mobile menu. Home layout was inspected at 390px and 1440px with no horizontal overflow.
- The build still warns about the large entry bundle. Route splitting and moving image data to object storage would reduce startup/download cost.
- Rotate the exposed Razorpay credential in the merchant dashboard. Removing it from this copy cannot revoke credentials or clean previously deployed files/history.
- Rule changes are local only: they have not been deployed or exercised against a Firestore emulator. Review and deploy them with the corresponding frontend release.
- Implement a trusted payment backend for order creation and payment verification before treating browser callbacks as confirmed payments. No backend deployment or merchant credentials were available for that work.
- Authenticated admin mutations and real message/payment delivery were not exercised. The existing rules treat every authenticated user as an administrator; account provisioning must remain restricted to trusted administrators.

## Catalogue loading and gallery preservation update

The live read-only audit on 2026-09-05 found 34 products: 30 have multiple gallery photos, one has a single gallery photo, and three have no gallery array entries. Existing remote image data was not modified. A missing gallery cannot be reconstructed from this code alone if it was previously overwritten; check backups or re-upload the originals for those products.

The catalogue now uses `src/lib/product-catalog.ts` to fetch only name, category, brand, description and featured status through the public Firestore REST API. It supports pagination, shared in-flight requests, explicit refresh after admin changes, and refresh on window focus (after a 60-second freshness period). This replaces the product collection snapshot subscription, which previously downloaded every inline image, gallery and brochure on page load. Other content hooks still use Firestore subscriptions.

Product cards request primary images only when they approach the viewport. Primary photos are cached in IndexedDB by document update time, so revisits can reuse images without losing correctness after an admin update. Opening details retrieves the selected product's complete gallery and brochure. Each gallery thumbnail has an accessible label and selected state.

The admin editor fetches the complete current server document before opening; failed reads prevent editing. Metadata-only saves omit both image fields, preserving the stored gallery. Image edits use current form values, keep all photo slots, and prevent saves while compression is in flight. New uploads use WebP with an 80 KB target. Oversized product writes are rejected before submission, and failed compression no longer silently substitutes an oversized original. Existing documents are not bulk-recompressed.

Measured response sizes (not a promise of identical loading times on every device/network):

| Measurement                                 |         Previous |      Updated |
| ------------------------------------------- | ---------------: | -----------: |
| Full catalogue data versus initial metadata | 18,311,536 bytes | 46,696 bytes |
| Initial JavaScript entry, gzip              |        563.51 KB |    180.63 KB |

Photo and detail requests are additional, on demand. Admin, payment and image-compression code is deferred. The hero prioritizes its first image and postpones inactive slide images. Fingerprinted build assets receive long-lived caching headers in Firebase/Vercel hosting configuration. These browser and hosting changes require deployment to affect Google search visits; localhost testing does not change the public site.

Nine automated regressions cover image preservation, metadata-only updates, full detail loading, paginated field-mask queries and the prior data-handling fixes. TypeScript and production build pass; lint retains six shared-UI Fast Refresh warnings. Live admin writes were not used as tests. See the [Firestore list API and field masks](https://firebase.google.com/docs/firestore/reference/rest/v1/projects.databases.documents/list).

### Photo controls follow-up

Product cards now provide previous/next photo controls, loading the complete gallery only on interaction. Product details show a photo counter and arrows as well as thumbnails. Navigation includes both the primary image and all distinct gallery entries. Eleven regressions pass, including primary-image inclusion and preservation of genuinely single-photo records.

A fresh read-only check confirmed exactly one distinct saved photo for A870 OTDR, Fujikura 33s, Fujikura 43s and Fujikura 72s. Additional photos for these records require originals or backups; the UI does not substitute unrelated product images.

### Upload visibility and loading reliability

The admin photo slots now always expose Upload/Replace and Remove controls, including on touchscreens. Replacing a photo keeps the previous preview until processing succeeds; failures leave the original intact. Editor initialization includes the primary image even if it is not duplicated in the gallery array.

Public catalogue metadata is cached separately from photo bytes to render repeat visits quickly. Image requests retry a transient failure once and retry when connectivity returns. A missing primary field falls back to a saved gallery photo. Empty records show an explicit no-photo state instead of an endless loading label. Shared, revision-keyed gallery promises prevent duplicate downloads between card navigation and details; admin reads always fetch current server data. Card thumbnails remain visible after loading a gallery.

Fourteen automated regressions cover the cache, image fallback, gallery deduplication, fresh admin reads and earlier fixes. Browser checks confirmed the production catalogue renders 34 products without console errors. Network outages and deleted/missing originals still require a retry or re-upload; no claim is made that external services can never fail. These changes are local until deployed.
