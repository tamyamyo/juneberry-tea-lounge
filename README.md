# Juneberry Tea Lounge — Local Website

A refined, elegant static website for Juneberry Tea Lounge. Built with clean HTML, CSS, and JavaScript. Perfect for local prototyping before hosting.

## Files Overview

- **index.html** — Main website structure
- **styles.css** — All styling and responsive design
- **script.js** — Smooth scrolling and interactive elements
- **logo-light.svg** — Logo for navigation header (light background)
- **logo-dark.svg** — Logo for hero section (dark background)

## How to Use Locally

1. **Open in browser:** Simply double-click `index.html` or drag it into your browser
2. **No server needed** — This is a static site; it runs entirely in the browser
3. **Responsive design** — Works on desktop, tablet, and mobile

## Customization Guide

### 🎨 Colors

All colors are defined at the top of `styles.css` in the `:root` section (lines 20-30).

To change the color palette:

```css
:root {
    --color-forest-green: #1a3a2a;      /* Main brand color */
    --color-black: #0f0f0f;              /* Dark text */
    --color-antique-gold: #c9a961;       /* Gold accents */
    --color-cream: #f5f3f0;              /* Light backgrounds */
    --color-champagne: #d4a574;          /* Secondary accent */
}
```

### 📝 Text Changes

Easy-to-find customization points marked with `<!-- CUSTOMIZATION POINT: -->` comments:

#### Hero Section (index.html, lines 33-44)
- Main headline
- Subheading
- Button text

#### Signature Drinks (lines 59-116)
- Drink names
- Categories
- Descriptions

#### Experience Section (lines 119-145)
- Main text about the lounge
- Three pillar headings and descriptions

#### Visit Us Section (lines 172-190)
- Address/location
- Hours
- Phone and email

#### Footer (lines 197-205)
- Copyright year
- Social media links (currently placeholders)

### 🖼️ Logos & Images

**Logo files:**
- Replace `logo-light.svg` with your light-background logo
- Replace `logo-dark.svg` with your dark-background logo
- Or use PNG/JPG files — just update the `src` in index.html

**Drink images:**
The drink cards have placeholder gradient backgrounds. To add real photos:

```html
<div class="drink-image milk-tea"></div>
```

Replace with:

```html
<div class="drink-image" style="background-image: url('path/to/image.jpg'); background-size: cover;"></div>
```

Or remove the class and add a background-image directly in the CSS for each drink card.

### 🗺️ Map Integration

The "Visit Us" section has a placeholder map box. To add a real Google Map:

1. Go to [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
2. Generate an embed code
3. Replace the map-placeholder div (around line 185) with the embed iframe

### 🔤 Typography

Fonts are imported from Google Fonts in `index.html` (line 7).

Current fonts:
- **Headings:** Playfair Display (serif, elegant)
- **Body:** Inter (sans-serif, clean)

To change fonts, update line 7 and the corresponding CSS variables in `styles.css` (lines 27-28).

### 📱 Responsive Breakpoints

The site is fully responsive. Breakpoints are at:
- **1024px** — Tablet
- **768px** — Large mobile
- **480px** — Small mobile

All spacing and font sizes adjust automatically.

## Sections Reference

### Hero (`<section class="hero">`)
- Centered branding, headline, subtext, CTA buttons
- Dark forest green background

### Signature Drinks (`<section id="menu" class="drinks-section">`)
- 6 featured drink cards in a responsive grid
- Hover effects on cards

### Experience (`<section id="experience" class="experience-section">`)
- Description of the lounge vibe
- Three pillars: Craft, Comfort, Community

### Craft (`<section class="craft-section">`)
- Premium ingredient messaging
- Minimal, elegant layout

### Visit Us (`<section id="visit" class="visit-section">`)
- Location, hours, contact info
- Map placeholder

### Footer (`<footer class="footer">`)
- Branding, social links, copyright

## Navigation

The sticky header has smooth scroll links to:
- `#menu` — Signature Drinks
- `#experience` — The Lounge Experience
- `#visit` — Visit Us

All section links scroll smoothly.

## CSS Custom Properties

All spacing, colors, and sizing use CSS variables for easy global adjustments.

Key variables in `:root`:

```css
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 1.5rem;
--spacing-lg: 2rem;
--spacing-xl: 3rem;
--spacing-2xl: 4rem;
--spacing-3xl: 6rem;
```

Change these to adjust overall spacing across the entire site.

## JavaScript Features

- Smooth anchor link scrolling
- Fade-in animations as sections scroll into view
- Button press feedback (scale animation)
- Automatic footer year update
- Navbar shadow on scroll

All optional — the site works fine without JS too.

## Browser Support

Works in all modern browsers (Chrome, Safari, Firefox, Edge). No IE support needed.

## Next Steps for Deployment

When ready to host:

1. **Get a domain** — Use a registrar like Namecheap, GoDaddy, or Google Domains
2. **Choose a host** — Netlify, Vercel, or GitHub Pages (all free for static sites)
3. **Add real images** — Replace placeholder gradients with photos
4. **Add Google Map** — Embed your actual location
5. **Set up email** — Add a contact form if needed
6. **Add social links** — Update footer with Instagram/Facebook URLs

## Questions?

All HTML elements use semantic tags and have comments explaining their purpose. CSS is organized by section and heavily commented for easy modification.

---

**Brand Colors:**
- Forest Green: `#1a3a2a`
- Antique Gold: `#c9a961`
- Cream: `#f5f3f0`

**Fonts:**
- Serif: Playfair Display
- Sans-serif: Inter

**Vibe:** Boutique hotel lounge meets premium tea shop. Elegant, calm, refined.
