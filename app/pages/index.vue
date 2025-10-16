<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description
})

const particleConfig = {
  particleCount: 260,
  particleSpread: 9,
  speed: 0.16,
  particleColors: ['#38bdf8', '#f97316', '#f8fafc'],
  moveParticlesOnHover: true,
  particleHoverFactor: 0.45,
  alphaParticles: true,
  particleBaseSize: 160,
  sizeRandomness: 1.4,
  cameraDistance: 26
}
</script>

<template>
  <UPage v-if="page">
    <section class="relative bg-gradient-to-br from-primary/10 via-transparent to-transparent mb-12 p-6 sm:p-10 border border-default/10 rounded-3xl overflow-hidden">
      <ParticlesBackground
        class="z-0"
        v-bind="particleConfig"
      />
      <div class="z-10 relative">
        <LandingHero :page />
      </div>
    </section>
    <UPageSection
      :ui="{
        container: '!pt-0 lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page />
      <LandingWorkExperience :page />
    </UPageSection>
    <LandingBlog :page />
    <LandingFAQ :page />
  </UPage>
</template>
