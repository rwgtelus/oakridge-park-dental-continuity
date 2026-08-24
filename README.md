# Oakridge Park Dental Continuity Site

This is a lightweight, dependency-free continuity website for Oakridge Park Dental. It is designed for GitHub Pages and remains independent of the Manus runtime.

The public site contains only approved practice information and locally bundled brand assets. It has no database, authentication, tracking dependency, patient data, secrets, or server-side appointment form.

## Local preview

Serve the repository root with any static HTTP server. Do not open the HTML files directly from the filesystem because relative directory routes are intended to behave like GitHub Pages.

## Validation

```bash
npm test
```

## Deployment

Enable GitHub Pages from the `main` branch and repository root. Verify the generated GitHub Pages URL before adding the custom domain. Add the custom domain only after the practice approves the visual result and the current DNS records have been documented.
