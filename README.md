# Property Matters PH — Website

Static website for [@propertymattersph](https://www.instagram.com/propertymattersph). No build tools needed — plain HTML, CSS, and JS.

## Structure

```
index.html          Home — hero, services, featured listings, testimonials
properties.html     All listings with For Sale / For Lease filters
contact.html        Inquiry form (Netlify Forms) + contact details
thank-you.html      Shown after a form submission
css/style.css       All styling (brand colors at the top in :root)
js/main.js          Filtering + URL-parameter handling
js/listings.js      Renders listings from data/listings.json
data/listings.json  THE LISTINGS — edited via the admin panel
admin/              Decap CMS admin panel (yoursite.com/admin)
images/uploads/     Photos uploaded via the admin panel land here
```

## How the owner edits the site (no code)

Once the CMS is connected (see below), the owner:

1. Opens `yoursite.com/admin` and logs in
2. Clicks **Property Listings**
3. Adds/edits/deletes listings in a form — including uploading photos from a phone
4. Clicks **Publish** — the site rebuilds and updates in ~1 minute

The first 3 listings automatically appear on the home page as "Featured."

## One-time CMS setup (developer)

The admin panel needs the site to deploy from a Git repository:

1. Push this folder to a GitHub repository
2. In Netlify: the project → **Project configuration** → link the repository (build command: none, publish directory: `/`)
3. Enable **Identity** on the project, then Identity → Services → enable **Git Gateway**
4. Set Identity registration to **Invite only**, and invite the owner's email
5. She accepts the invite, sets a password, and can use `/admin`

If Netlify Identity isn't available on the account, swap Decap for Sveltia CMS (same `config.yml`) with a GitHub-backed login instead.

## Other edits (code)

**Change brand colors** — edit the `:root` variables at the top of `css/style.css`.

**Testimonials / text** — edit the HTML directly, or ask Claude.

**Local preview** — listings load via `fetch`, so open the site with a local server (`python3 -m http.server`), not by double-clicking the file.

## Deploy

Hosted on Netlify. To publish updates, drag this whole folder onto the site's Deploys page (or ask Claude to deploy it). The inquiry form works automatically on Netlify — submissions appear under Forms in the dashboard; enable email notifications in Settings → Forms.
