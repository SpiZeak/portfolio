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

const photos = ref<Photo[]>([
  {
    src: '/hero/random-1.avif',
    alt: 'Soft sunset reflecting on a mountain range',
    meta: 'Lake District • Sony A7 IV • 35mm'
  },
  {
    src: '/hero/random-2.avif',
    alt: 'City skyline captured through a rain-speckled window',
    meta: 'Tokyo • Fuji X-T5 • 56mm'
  },
  {
    src: '/hero/random-3.avif',
    alt: 'Slow shutter capture of waves on a volcanic beach',
    meta: 'Reykjavík • Canon R6 • 24mm'
  },
  {
    src: '/hero/random-4.avif',
    alt: 'Golden hour portrait against a brutalist facade',
    meta: 'Barcelona • Leica Q2 • 28mm'
  },
  {
    src: '/hero/random-5.avif',
    alt: 'Neon trails weaving through a night market',
    meta: 'Hong Kong • Fuji X-Pro3 • 23mm'
  },
  {
    src: '/hero/random-6.avif',
    alt: 'Minimalist sand dunes with long shadows',
    meta: 'Abu Dhabi • Hasselblad 907X • 65mm'
  },
  {
    src: '/hero/random-7.avif',
    alt: 'Autumn forest with soft morning fog',
    meta: 'Black Forest • Sony A7R V • 85mm'
  },
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
    src: '/hero/random-10.avif',
    alt: 'Candid moment between newlyweds under string lights',
    meta: 'Paris • Canon R6 • 50mm'
  },
  {
    src: '/hero/random-11.avif',
    alt: 'Macro detail of dew on alpine wildflowers',
    meta: 'Zermatt • Sony A7 IV • 90mm'
  },
  {
    src: '/hero/random-12.avif',
    alt: 'Abstract reflections on mirrored high-rise glass',
    meta: 'Chicago • Leica SL2-S • 75mm'
  }
])

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
  ogImage: photos.value[0]?.src,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :links="page.links"
      :ui="{
        container: 'lg:flex sm:flex-row sm:items-center',
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start flex-wrap gap-2'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex flex-wrap items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />
          <UButton
            v-if="page.links[1]"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0 !max-w-7xl'
      }"
    >
      <div class="mx-auto px-3 sm:px-6 lg:px-10 w-full">
        <div class="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
          <Motion
            v-for="(photo, index) in photos"
            :key="photo.src"
            :initial="{ opacity: 0, transform: 'translateY(16px)' }"
            :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
            :transition="{ delay: 0.04 * index }"
            :in-view-options="{ once: true, amount: 0.2 }"
            class="block"
          >
            <figure
              class="group relative bg-muted/20 shadow-lg shadow-neutral-950/5 border border-muted/40 rounded-3xl aspect-[3/2] overflow-hidden"
            >
              <img
                :src="photo.src"
                :alt="photo.alt"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                loading="lazy"
              >
              <figcaption class="bottom-0 absolute inset-x-0 flex flex-col gap-1 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white text-sm pointer-events-none">
                <span class="font-medium">{{ photo.alt }}</span>
                <span class="text-white/70 text-xs">{{ photo.meta }}</span>
              </figcaption>
            </figure>
          </Motion>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
