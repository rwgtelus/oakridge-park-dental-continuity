# Continuity Site QA Notes

## Homepage desktop review

The preview successfully reproduces the established OPD visual language: the white horizontal logo, transparent navigation over the original family hero image, dark green photographic overlay, Playfair Display headline, DM Sans supporting copy, pill-shaped white and outlined CTAs, and the original compact top contact bar.

The first inspection revealed that the mobile navigation was visible below the desktop navigation because it lacked a default hidden state. This was corrected by hiding `.mobile-menu` outside the mobile/tablet breakpoint. A second inspection confirmed the duplicate links were removed and the first viewport is balanced and readable.

The small black input visible at the upper right in the annotated browser screenshot is injected by the connected browser environment and is not part of the site DOM or source.

## About and Treatments desktop review

The About page retains the original interior-page treatment: team photography beneath a transparent header, a deep green overlay, oversized serif title, restrained continuity notice, approved practice story, approved four-doctor roster, sourced languages, and clinic photography. The hero remains legible without obscuring the team image.

The Treatments page presents the five approved categories and existing service names without price claims, appointment promises, or treatment-outcome claims. The restorative hero image, dark overlay, and editorial heading scale match the original OPD category-page style. Both pages expose only working phone, email, internal navigation, and directions pathways.

## New Patients and Contact desktop review

The New Patients page uses the approved welcoming clinic image and clearly presents the no-referral pathway, 60–90 minute first-visit guidance, what-to-bring information, non-assignment payment wording, address, and Saturday call-to-confirm qualifier. The composition closely follows the original site’s hero and section rhythm.

The Contact page is deliberately phone-first and contains the verified phone, email, fax, address, hours, and external Google Maps route. It clearly explains that the usual form is unavailable and that email requests are not confirmed until the practice replies. No disabled or non-functioning form is present.

## Mobile viewport review — 390 × 844

Headless Chromium screenshots confirm that the mobile header preserves the OPD logo, uses a clear 46-pixel menu control, and gives the hero adequate contrast. The homepage headline, copy, and two calls to action stack cleanly without horizontal overflow. The persistent Call Now / Request by Email bar remains readable and does not cover the hero actions.

The Contact page headline wraps naturally, the service notice remains readable, and the phone-first contact section begins immediately after the hero. The fixed mobile action bar is consistently visible. Both screenshots show the intended 390-pixel viewport with no clipped text or horizontal scrolling.

## Automated quality results

The final homepage Lighthouse audit scored **100 Accessibility**, **100 Best Practices**, **100 SEO**, and **80 Performance** under simulated throttling from the local development server. Performance improved from 73 after converting the three largest homepage images to optimized WebP files, preloading the hero image, and setting explicit high fetch priority. The remaining performance limitations are primarily development-server cache headers and externally loaded brand fonts; GitHub Pages supplies production caching.

The Node test suite contains eight passing checks covering the five required pages, one-H1 structure, verified contact details, working phone/email/directions paths, absent Manus runtime dependencies, absent forms/reviews/ratings, complete local image references, metadata and Dentist JSON-LD, exact sourced doctor names, and GitHub Pages support files.
