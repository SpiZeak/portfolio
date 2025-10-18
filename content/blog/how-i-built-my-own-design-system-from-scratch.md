title: Building Osolo's React Component Library with Storybook
description: How we consolidated UI patterns into a TypeScript-first component library, complete with automated testing and release workflows.
date: 2025-03-05
image: https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 6
author:
name: Max Trewhitt
avatar:
src: https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
alt: Max Trewhitt

---

When our delivery teams at Osolo Consultant Group hit five concurrent React projects, we knew we needed a shared component library. This post covers the steps we took to build it, from auditing inconsistent UI to shipping a versioned package with Storybook docs.

## 1. Audit everything in production

I started by crawling each application and mapping components to screenshots. The outcome was a spreadsheet of variants, props, and tech debt. Seeing eight button implementations with different accessibility patterns provided the urgency we needed. We grouped candidates into three buckets: foundational primitives, feature-specific modules, and experiments to revisit later.

## 2. Set rules before writing components

We defined coding standards up front: TypeScript everywhere, CSS variables powered by design tokens, and strict ESLint/Prettier configs. Each component lives in its own directory with tests, stories, and README notes. We also introduced a decision log so future contributors know why a pattern exists.

## 3. Build with Storybook as the source of truth

Storybook acts as our playground and documentation site. For every component we add:

- Controls that expose props and default states
- Accessibility checks using Storybook's a11y addon
- Usage notes covering edge cases and do/don't guidance

Visual regression runs in Chromatic on every pull request, so regressions fail the build before they reach main. Component-level tests run in Vitest with Testing Library to keep behaviour accurate.

## 4. Automate verification and publishing

GitHub Actions drives the pipeline: lint, type check, Vitest, Playwright smoke tests, and Chromatic snapshots. When a release PR is merged we cut a new npm version, generate changelog entries, and publish documentation automatically. Consumer apps pin to specific versions, making rollbacks simple.

## 5. Prove the value with metrics

Six months in we saw a 45% drop in UI bugs surfaced during QA and reduced delivery time for new pages by roughly a sprint. Designers now reference Storybook instead of maintaining separate handoff files, and developers work from a known set of patterns.

If you're planning a similar initiative, start with a candid audit, define contribution rules together, and automate as much validation as you can. A component library only stays healthy when it is easier to follow the system than to go rogue.
