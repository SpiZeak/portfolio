<script setup lang="ts">
const { data: page } = await useAsyncData('gallery-page', () => {
  return queryCollection('pages').path('/gallery').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

interface Photo {
  src: string
  alt: string
  meta: string
}

interface Collection {
  key: string
  title: string
  description: string
  focus: string
  location: string
  client: string
  year: string
  gear: string[]
  deliverables: string[]
  palette: string[]
  shots: Photo[]
}

const collections = ref<Collection[]>([
  {
    key: 'osolo-onboarding',
    title: 'Osolo Client Onboarding Portal',
    description: 'A React and TypeScript experience that walks enterprise clients through onboarding, ties into internal CRMs, and surfaces content managed in WordPress.',
    focus: 'Full-stack product delivery',
    location: 'Remote · Stockholm',
    client: 'Osolo Consultant Group',
    year: '2018 — Present',
    gear: ['React', 'TypeScript', 'Node.js', 'WordPress REST API', 'Storybook'],
    deliverables: ['Responsive onboarding dashboards', 'Integration layer for legacy systems', 'Author-friendly content modules'],
    palette: ['#0f172a', '#0ea5e9', '#22c55e'],
    shots: [
      {
        src: '/hero/random-5.avif',
        alt: 'Account overview dashboard with progress indicators',
        meta: 'React · TypeScript · Tailwind CSS'
      },
      {
        src: '/hero/random-2.avif',
        alt: 'Workflow builder interface for onboarding tasks',
        meta: 'Node.js services · API integrations'
      },
      {
        src: '/hero/random-12.avif',
        alt: 'Mobile summary view of the onboarding experience',
        meta: 'React Native prototype · Offline support'
      }
    ]
  },
  {
    key: 'lightweb-plugins',
    title: 'Lightweb WordPress Extensions',
    description: 'Custom plugins and performance optimisations that gave Lightweb clients the tools to launch campaigns faster and keep pages speedy.',
    focus: 'WordPress engineering',
    location: 'Gothenburg · Remote',
    client: 'Lightweb',
    year: '2017 — 2018',
    gear: ['PHP', 'WordPress', 'ACF', 'Webpack', 'REST API'],
    deliverables: ['Plugin suite for campaign landing pages', 'Page speed optimisation playbook', 'Reusable Gutenberg block patterns'],
    palette: ['#1e293b', '#f59e0b', '#0ea5e9'],
    shots: [
      {
        src: '/hero/random-1.avif',
        alt: 'Custom WordPress block layout for a campaign page',
        meta: 'Advanced Custom Fields · PHP'
      },
      {
        src: '/hero/random-3.avif',
        alt: 'Performance profile comparing page load improvements',
        meta: 'Webpack bundling · Caching strategy'
      },
      {
        src: '/hero/random-6.avif',
        alt: 'WordPress editor sidebar with tailored controls',
        meta: 'Gutenberg · React'
      }
    ]
  },
  {
    key: 'component-library',
    title: 'Osolo Component Library & Design System',
    description: 'A shared React component library documented in Storybook with automated visual regression testing and release pipelines.',
    focus: 'Design system engineering',
    location: 'Remote · Stockholm',
    client: 'Osolo Consultant Group',
    year: '2023 — Present',
    gear: ['React', 'TypeScript', 'Storybook', 'Chromatic', 'Playwright'],
    deliverables: ['Token-driven component library', 'Design system documentation', 'Automated regression testing suite'],
    palette: ['#312e81', '#7dd3fc', '#22c55e'],
    shots: [
      {
        src: '/hero/random-4.avif',
        alt: 'Storybook documentation for a data visualization component',
        meta: 'Storybook · Controls & Docs'
      },
      {
        src: '/hero/random-7.avif',
        alt: 'Design tokens mapped across light and dark themes',
        meta: 'CSS variables · Theming'
      },
      {
        src: '/hero/random-10.avif',
        alt: 'Automated visual regression report highlighting changes',
        meta: 'Chromatic · CI/CD pipeline'
      }
    ]
  },
  {
    key: 'robotkodarn',
    title: 'Robotkodarn Coding Lessons PWA',
    description: 'A React + Redux single-page app that compiles Arduino code in the browser and streams it to classroom hardware for Vinnovera’s STEM programme.',
    focus: 'Education technology',
    location: 'Stockholm · Remote',
    client: 'Vinnovera',
    year: '2017',
    gear: ['React', 'Redux', 'WebUSB', 'Service Workers', 'TypeScript'],
    deliverables: ['Offline-ready progressive web app', 'Live code compilation pipeline', 'Classroom device management interface'],
    palette: ['#0f172a', '#38bdf8', '#f97316'],
    shots: [
      {
        src: '/hero/random-8.avif',
        alt: 'Lesson plan dashboard for robotics teachers',
        meta: 'React · Redux state management'
      },
      {
        src: '/hero/random-9.avif',
        alt: 'Serial monitor view showing device communication',
        meta: 'WebUSB · Node.js gateway'
      },
      {
        src: '/hero/random-11.avif',
        alt: 'Student progress overview across robotics modules',
        meta: 'Offline caching · IndexedDB'
      }
    ]
  }
])

const highlights = [
  {
    value: '7+',
    label: 'Years shipping production software',
    description: 'Leading React, Node.js, and WordPress delivery for enterprise and education clients.',
    icon: 'i-lucide-rocket'
  },
  {
    value: 'TypeScript-first',
    label: 'Primary stack',
    description: 'React, Node.js, Storybook, and automated testing pipelines that keep teams confident in every release.',
    icon: 'i-lucide-code-2'
  },
  {
    value: 'Agile & collaborative',
    label: 'Ways of working',
    description: 'Facilitating backlog refinement, sprint rituals, and cross-functional demos across time zones.',
    icon: 'i-lucide-users'
  }
]

const approach = [
  {
    title: 'Discover & align',
    description: 'Clarify requirements, audit existing platforms, and define an incremental delivery plan with stakeholders.',
    icon: 'i-lucide-compass'
  },
  {
    title: 'Build in increments',
    description: 'Pair programming, continuous integration, and sprint demos keep feedback loops tight and quality high.',
    icon: 'i-lucide-git-branch'
  },
  {
    title: 'Harden & hand over',
    description: 'Automated testing, performance budgets, and clear documentation ensure teams can own the product long-term.',
    icon: 'i-lucide-shield-check'
  }
]

const allPhotos = computed(() => {
  return collections.value.flatMap(collection => collection.shots)
})

const heroPhotos = computed(() => {
  return allPhotos.value.slice(0, 4)
})

const tabItems = computed(() => {
  return collections.value.map(collection => ({
    label: collection.title,
    key: collection.key,
    collection
  }))
})

const tabsUi = {
  root: 'flex flex-col gap-6 w-full',
  list: 'relative flex flex-wrap gap-2 rounded-xl bg-elevated/70 p-2',
  indicator: 'absolute top-2 h-[calc(100%-16px)] duration-200 ease-out rounded-lg bg-white/5',
  trigger: 'relative z-10 px-3 py-2 rounded-lg text-sm font-medium transition data-[state=active]:text-primary data-[state=inactive]:text-muted hover:text-primary',
  content: 'mt-4'
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
  ogImage: allPhotos.value[0]?.src,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start',
        title: '!mx-0 text-left text-4xl sm:text-5xl font-semibold tracking-tight',
        description: '!mx-0 text-left text-base sm:text-lg text-muted max-w-2xl',
        links: 'justify-start flex-wrap gap-3'
      }"
    >
      <template #headline>
        <UBadge
          variant="soft"
          color="neutral"
          size="sm"
        >
          Engineering Portfolio 2025
        </UBadge>
      </template>
      <template #links>
        <div
          v-if="page.links"
          class="flex sm:flex-row flex-col sm:items-center gap-3"
        >
          <UButton
            v-if="page.links[0]"
            v-bind="page.links[0]"
            :to="global.meetingLink"
          />
          <UButton
            v-if="page.links[1]"
            v-bind="page.links[1]"
          />
        </div>
      </template>
      <template #media>
        <div class="gap-3 grid grid-cols-3 h-full">
          <div
            v-for="(photo, index) in heroPhotos"
            :key="photo.src"
            class="relative bg-muted/20 border border-muted/40 rounded-2xl overflow-hidden"
            :class="index === 0 ? 'col-span-2 aspect-[5/3]' : 'aspect-[3/4]'"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="w-full h-full object-cover"
              loading="lazy"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div class="bottom-0 absolute inset-x-0 p-4 text-white text-xs">
              <p class="font-medium">
                {{ photo.alt }}
              </p>
              <p class="text-white/70">
                {{ photo.meta }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </UPageHero>

    <UPageSection
      title="At a glance"
      description="Key metrics that guide how I ship software."
      :ui="{
        container: '!pt-0',
        title: 'text-left text-2xl font-semibold',
        description: 'text-left text-muted max-w-2xl'
      }"
    >
      <div class="gap-4 grid md:grid-cols-3">
        <UCard
          v-for="highlight in highlights"
          :key="highlight.label"
          class="bg-elevated/60 border-muted/40 h-full"
        >
          <div class="flex items-start gap-4">
            <span class="flex justify-center items-center bg-muted/40 rounded-xl w-12 h-12 text-primary">
              <UIcon
                :name="highlight.icon"
                class="size-5"
              />
            </span>
            <div>
              <p class="font-semibold text-default text-3xl">
                {{ highlight.value }}
              </p>
              <p class="font-medium text-muted text-sm">
                {{ highlight.label }}
              </p>
              <p class="mt-2 text-muted text-sm">
                {{ highlight.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      title="Case studies"
      description="Detailed walkthroughs of recent projects and the engineering decisions behind them."
      :ui="{
        container: '!pt-0',
        title: 'text-left text-2xl font-semibold',
        description: 'text-left text-muted max-w-3xl'
      }"
    >
      <UTabs
        :items="tabItems"
        orientation="horizontal"
        :ui="tabsUi"
      >
        <template #content="{ item }">
          <div
            v-if="item.collection"
            class="gap-10 grid lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]"
          >
            <div class="gap-4 grid sm:grid-cols-2">
              <UCard
                v-for="shot in item.collection.shots"
                :key="shot.src"
                :ui="{ body: 'p-0' }"
                class="group bg-elevated/60 border-muted/40 overflow-hidden"
              >
                <div class="relative aspect-[3/2]">
                  <img
                    :src="shot.src"
                    :alt="shot.alt"
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div class="bottom-0 absolute inset-x-0 p-4 text-white text-xs">
                    <p class="font-medium">
                      {{ shot.alt }}
                    </p>
                    <p class="text-white/70">
                      {{ shot.meta }}
                    </p>
                  </div>
                </div>
              </UCard>
            </div>
            <UCard
              class="bg-elevated/60 border-muted/40"
            >
              <template #header>
                <div class="flex flex-col gap-3">
                  <UBadge
                    variant="soft"
                    color="neutral"
                    size="xs"
                    class="w-fit uppercase tracking-wide"
                  >
                    {{ item.collection.focus }}
                  </UBadge>
                  <h3 class="font-semibold text-default text-xl">
                    {{ item.collection.client }}
                  </h3>
                  <p class="text-muted text-sm">
                    {{ item.collection.description }}
                  </p>
                </div>
              </template>
              <div class="space-y-5 text-sm">
                <div class="flex flex-wrap items-center gap-4 text-muted">
                  <span class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-map-pin"
                      class="size-4"
                    />
                    {{ item.collection.location }}
                  </span>
                  <span class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-calendar"
                      class="size-4"
                    />
                    {{ item.collection.year }}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-muted text-xs uppercase tracking-wide">
                    Featured gear
                  </p>
                  <div class="flex flex-wrap gap-2 mt-2">
                    <UBadge
                      v-for="gear in item.collection.gear"
                      :key="gear"
                      size="xs"
                      color="neutral"
                      variant="soft"
                    >
                      {{ gear }}
                    </UBadge>
                  </div>
                </div>
                <div>
                  <p class="font-medium text-muted text-xs uppercase tracking-wide">
                    Deliverables
                  </p>
                  <div class="space-y-2 mt-3">
                    <p
                      v-for="deliverable in item.collection.deliverables"
                      :key="deliverable"
                      class="flex items-center gap-2 text-default"
                    >
                      <UIcon
                        name="i-lucide-check"
                        class="size-4 text-primary"
                      />
                      <span>{{ deliverable }}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <p class="font-medium text-muted text-xs uppercase tracking-wide">
                    Palette
                  </p>
                  <div class="flex items-center gap-3 mt-3">
                    <span
                      v-for="color in item.collection.palette"
                      :key="color"
                      class="shadow-inner border border-white/20 rounded-full w-9 h-9"
                      :style="{ backgroundColor: color }"
                    />
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </template>
      </UTabs>
    </UPageSection>

    <UPageSection
      title="How I work"
      description="The delivery loop I rely on to keep releases predictable and maintainable."
      :ui="{
        container: '!pt-0',
        title: 'text-left text-2xl font-semibold',
        description: 'text-left text-muted max-w-3xl'
      }"
    >
      <div class="gap-4 grid md:grid-cols-3">
        <UCard
          v-for="step in approach"
          :key="step.title"
          class="bg-elevated/60 border-muted/40 h-full"
        >
          <div class="flex flex-col gap-4">
            <span class="flex justify-center items-center bg-muted/40 rounded-xl w-12 h-12 text-primary">
              <UIcon
                :name="step.icon"
                class="size-5"
              />
            </span>
            <div>
              <h3 class="font-semibold text-default text-lg">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-muted text-sm">
                {{ step.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <UCard class="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-muted/40 overflow-hidden">
        <div class="md:items-center gap-6 grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div class="space-y-4">
            <h3 class="font-semibold text-default text-2xl">
              Let's ship your next release
            </h3>
            <p class="max-w-xl text-muted text-sm">
              From roadmap discovery to production support, I take features from idea to release while keeping code quality, performance, and stakeholder feedback in sync.
            </p>
            <div class="flex flex-wrap gap-3">
              <UButton
                v-if="page.links?.[0]"
                v-bind="page.links[0]"
                :to="global.meetingLink"
              />
              <UButton
                v-if="page.links?.[1]"
                v-bind="page.links[1]"
              />
              <UButton
                v-if="global.email"
                variant="ghost"
                color="neutral"
                :to="`mailto:${global.email}`"
                label="Email directly"
              />
            </div>
          </div>
          <div class="hidden md:block relative">
            <div class="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none" />
            <img
              :src="allPhotos[6]?.src || heroPhotos[0]?.src"
              :alt="allPhotos[6]?.alt || heroPhotos[0]?.alt"
              class="rounded-3xl w-full object-cover aspect-[3/4]"
              loading="lazy"
            >
          </div>
        </div>
      </UCard>
    </UPageSection>
  </UPage>
</template>
