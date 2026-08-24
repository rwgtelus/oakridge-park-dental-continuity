# Oakridge Park Dental — GitHub Pages DNS Cutover

**Prepared:** August 23, 2026 PDT  
**Live GitHub Pages site:** https://rwgtelus.github.io/oakridge-park-dental-continuity/  
**Target custom domain:** `oakridgeparkdental.ca` and `www.oakridgeparkdental.ca`

## Current DNS Snapshot

The public DNS snapshot below was captured before any cutover. Keep it for rollback.

| Record | Current value |
|---|---|
| Nameservers | `launch1.spaceship.net`, `launch2.spaceship.net` |
| Apex `A` | `104.18.26.246`, `104.18.27.246` |
| Apex `AAAA` | No answer |
| `www` `CNAME` | `cname.manus.space` |
| Resolved `www` addresses | `104.19.168.112`, `104.19.169.112` |

## Required Cutover Sequence

GitHub recommends adding the custom domain to the Pages repository **before** changing DNS, which reduces the risk that another GitHub user could claim the domain.[1]

1. Keep the Spaceship DNS editor open and ready.
2. In the repository, open **Settings → Pages** and set **Custom domain** to `oakridgeparkdental.ca`; click **Save**.
3. In Spaceship DNS, remove the two current apex `A` records listed above.
4. Add the four GitHub Pages apex `A` records below.
5. Replace the current `www` CNAME target `cname.manus.space` with `rwgtelus.github.io`.
6. Save the DNS zone.
7. Wait for GitHub’s DNS check and TLS certificate. GitHub notes that DNS changes can take up to 24 hours to propagate and HTTPS can take up to 24 hours to become available, although they are often faster.[1]
8. Once available in **Settings → Pages**, ensure **Enforce HTTPS** is selected.

## DNS Records to Enter

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `185.199.108.153` | Automatic or 300 seconds |
| `A` | `@` | `185.199.109.153` | Automatic or 300 seconds |
| `A` | `@` | `185.199.110.153` | Automatic or 300 seconds |
| `A` | `@` | `185.199.111.153` | Automatic or 300 seconds |
| `CNAME` | `www` | `rwgtelus.github.io` | Automatic or 300 seconds |

GitHub also supports optional IPv6 `AAAA` records. They are not required for this urgent cutover; the four `A` records plus the `www` CNAME are sufficient. If IPv6 is desired later, the official values are listed in GitHub’s custom-domain documentation.[1]

## Records to Remove or Replace

| Existing record | Action |
|---|---|
| Apex `A` → `104.18.26.246` | Remove |
| Apex `A` → `104.18.27.246` | Remove |
| `www` CNAME → `cname.manus.space` | Replace with `rwgtelus.github.io` |

Do not change the nameservers. The domain can remain on Spaceship DNS.

## Expected Result

Once DNS and the GitHub certificate are ready:

- `https://oakridgeparkdental.ca/` will serve the independent continuity site.
- `https://www.oakridgeparkdental.ca/` will redirect to or serve the configured apex domain.
- The default GitHub Pages URL remains the deployment origin.
- The Manus-hosted project and private full backup remain unchanged.

## Rollback

If the clinic later returns to the previous Manus deployment and the former records are still valid:

1. Remove the four GitHub Pages apex `A` records.
2. Restore apex `A` values `104.18.26.246` and `104.18.27.246`.
3. Change `www` CNAME from `rwgtelus.github.io` back to `cname.manus.space`.
4. Remove the custom domain from the GitHub Pages repository after traffic has returned to the intended host.

Before rollback, confirm the current Manus restoration instructions and destination records; do not assume the August 23 values remain permanent.

## References

[1]: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site "GitHub Docs — Managing a custom domain for your GitHub Pages site"
