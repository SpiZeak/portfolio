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
    key: 'urban-afterglow',
    title: 'Urban Afterglow',
    description: 'Nocturnal editorials for a luxury streetwear launch, balancing neon intensity with intimate character-driven frames.',
    focus: 'Editorial campaign',
    location: 'Tokyo & Hong Kong',
    client: 'Aurelia Atelier',
    year: '2024',
    gear: ['Leica SL2-S', 'Fujifilm X-Pro3', '23mm f/1.4', 'Profoto A2'],
    deliverables: ['Lookbook hero suite', 'OOH billboard key art', 'Social-first motion snippets'],
    palette: ['#0f172a', '#38bdf8', '#f97316'],
    shots: [
      {
        src: '/hero/random-5.avif',
        alt: 'Neon trails weaving through a night market',
        meta: 'Mong Kok • Fuji X-Pro3 • 23mm'
      },
      {
        src: '/hero/random-2.avif',
        alt: 'City skyline captured through a rain-speckled window',
        meta: 'Shinjuku • Leica SL2-S • 75mm'
      },
      {
        src: '/hero/random-12.avif',
        alt: 'Abstract reflections on mirrored high-rise glass',
        meta: 'Central District • Leica SL2-S • 50mm'
      }
    ]
  },
  {
    key: 'seamless-horizons',
    title: 'Seamless Horizons',
    description: 'A mindful travel story showcasing design hotels through natural light, negative space, and long-exposure calm.',
    focus: 'Travel & hospitality',
    location: 'Lake District · Snæfellsnes · Rubʼ al Khali',
    client: 'Nine Pines Retreat',
    year: '2023',
    gear: ['Sony A7 IV', '24mm GM', 'DJI Mavic 3', 'PolarPro ND set'],
    deliverables: ['Hero landing imagery', 'Fine-art print triptych', 'Campaign teaser film stills'],
    palette: ['#ca8a04', '#f3f4f6', '#1e293b'],
    shots: [
      {
        src: '/hero/random-1.avif',
        alt: 'Soft sunset reflecting on a mountain range',
        meta: 'Lake District • Sony A7 IV • 35mm'
      },
      {
        src: '/hero/random-3.avif',
        alt: 'Slow shutter capture of waves on a volcanic beach',
        meta: 'Snæfellsnes • Sony A7 IV • 24mm'
      },
      {
        src: '/hero/random-6.avif',
        alt: 'Minimalist sand dunes with long shadows',
        meta: 'Rubʼ al Khali • Hasselblad 907X • 65mm'
      }
    ]
  },
  {
    key: 'human-stories',
    title: 'Human Stories',
    description: 'Portraiture-led storytelling crafted for annual reports and editorial spreads with an emphasis on intimacy.',
    focus: 'Portrait & lifestyle',
    location: 'Barcelona · Black Forest · Paris',
    client: 'Helio Collective',
    year: '2025',
    gear: ['Canon R6', 'Leica Q2', '85mm f/1.4', 'Aputure Nova P300c'],
    deliverables: ['Executive profile series', 'Campaign documentary stills', 'Event storybook gallery'],
    palette: ['#fbbf24', '#0f172a', '#f5f5f4'],
    shots: [
      {
        src: '/hero/random-4.avif',
        alt: 'Golden hour portrait against a brutalist facade',
        meta: 'Barcelona • Leica Q2 • 28mm'
      },
      {
        src: '/hero/random-7.avif',
        alt: 'Autumn forest with soft morning fog',
        meta: 'Black Forest • Sony A7R V • 85mm'
      },
      {
        src: '/hero/random-10.avif',
        alt: 'Candid moment between newlyweds under string lights',
        meta: 'Paris • Canon R6 • 50mm'
      }
    ]
  },
  {
    key: 'precision-details',
    title: 'Precision Details',
    description: 'Macro and architectural studies focused on texture, materials, and quiet nighttime atmospheres for design brands.',
    focus: 'Design documentation',
    location: 'Lisbon · Wadi Rum · Zermatt',
    client: 'Northline Studio',
    year: '2024',
    gear: ['Nikon Z7 II', '20mm f/1.8', 'Sony A7 IV', '90mm Macro'],
    deliverables: ['Material library catalogue', 'Large-format gallery prints', 'Art-direction deck stills'],
    palette: ['#1f2937', '#fde68a', '#c4b5fd'],
    shots: [
      {
        src: '/hero/random-8.avif',
        alt: 'Street scene framed by dramatic architecture',
        meta: 'Lisbon • Leica M11 • 50mm'
      },
      {
        src: '/hero/random-9.avif',
        alt: 'Long exposure of star trails above a desert camp',
        meta: 'Wadi Rum • Nikon Z7 II • 20mm'
      },
      {
        src: '/hero/random-11.avif',
        alt: 'Macro detail of dew on alpine wildflowers',
        meta: 'Zermatt • Sony A7 IV • 90mm'
      }
    ]
  }
])

const highlights = [
  {
    value: '48',
    label: 'Campaigns delivered',
    description: 'End-to-end editorial, hospitality and design briefs across three continents.',
    icon: 'i-lucide-aperture'
  },
  {
    value: '18',
    label: 'Cities documented',
    description: 'On-location production from Reykjavik to Hong Kong with nimble crews.',
    icon: 'i-lucide-globe-2'
  },
  {
    value: '5 days',
    label: 'Average turnaround',
    description: 'Curated client galleries with colour grading, retouching and delivery assets.',
    icon: 'i-lucide-timer'
  }
]

const approach = [
  {
    title: 'Pre-production Lab',
    description: 'Treatment development, casting and technical scouting that translates strategy into tangible shot plans.',
    icon: 'i-lucide-compass'
  },
  {
    title: 'On-location Direction',
    description: 'Precise direction for talent and crew while capturing candid in-between moments that brands crave.',
    icon: 'i-lucide-orbit'
  },
  {
    title: 'Post-production Finish',
    description: 'Cinematic grading, meticulous retouching and delivery-ready exports across all usage scenarios.',
    icon: 'i-lucide-sparkles'
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
          Portfolio 2025
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
      description="A snapshot of the production footprint clients rely on."
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
      title="Signature collections"
      description="Curated series that demonstrate how we translate strategy into sensory visuals across sectors."
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
      title="Workflow & services"
      description="Built for creative directors and marketers who need a single partner from first call sheet to final delivery."
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
              Let’s shape your next campaign
            </h3>
            <p class="max-w-xl text-muted text-sm">
              From pre-production logistics to polished delivery, I translate your brief into visuals that feel premium, lived-in, and undeniably on brand.
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
