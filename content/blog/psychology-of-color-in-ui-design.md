title: Optimising WordPress Performance for Lightweb's Campaign Sites
description: Lessons from reducing load times and improving Core Web Vitals while building custom plugins for Lightweb clients.
date: 2025-03-15
image: https://images.pexels.com/photos/40799/paper-colorful-color-loose-40799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 5
author:
name: Max Trewhitt
avatar:
src: https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
alt: Max Trewhitt

---

During my internship at Lightweb I owned a string of performance projects for WordPress marketing sites. Each homepage was crammed with plugins, blocking scripts, and auto-generated markup. Here is the playbook we now run whenever a campaign site starts to drag.

## 1. Measure first, then make promises

We capture baseline metrics using WebPageTest, Lighthouse, and Chrome DevTools performance traces on both desktop and a throttled Moto G4 profile. This makes conversations easier when someone says “the page feels slow” because we can point to Largest Contentful Paint (5.6s) or JavaScript execution time (4.1s) instead of debating feelings.

## 2. Trim and defer everything you can

WordPress themes often enqueue assets regardless of need. We built a custom plugin that exposes an admin UI for toggling scripts per template. Anything non-essential is deferred, inlined, or replaced with a modern alternative. We swapped slider libraries for CSS scroll snapping and replaced jQuery-powered animations with a handful of vanilla JS modules.

## 3. Optimise media and caching

Most hero images shipped at 4–6 MB. We introduced an image pipeline using Sharp to generate responsive WebP assets and set up cache headers through Cloudflare Workers. Coupled with lazy loading, this alone shaved two seconds off LCP across the board.

## 4. Harden the back end

On the PHP side we cached expensive queries with transients, pruned database calls in Advanced Custom Fields loops, and added a job that warms caches after editors publish updates. We also audited plugins and removed anything unmaintained or redundant.

## 5. Keep regressions out of production

Performance checks are part of our GitHub Actions workflow. Every pull request runs Lighthouse CI and fails if budgets are exceeded. Stakeholders see the reports directly in pull requests, which keeps the team aligned.

### Results

Across three high-traffic campaign sites we cut Largest Contentful Paint from 5.6s to 2.3s, reduced JavaScript execution time by 58%, and set up a maintainable process for future launches. Editors now have the tooling to keep pages lean without touching code.

If you run WordPress at scale and need help tuning it, feel free to reach out.
