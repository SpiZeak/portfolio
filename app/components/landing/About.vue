<script setup lang="ts">
import { computed, toRef } from 'vue'
import type { IndexCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: IndexCollectionItem
}>()

const page = toRef(props, 'page')

const paragraphs = computed(() => {
  const raw = page.value?.about?.description ?? ''
  return raw
    .split(/\r?\n\s*\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
})
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :ui="{
      container: '!p-0',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium'
    }"
  >
    <template #description>
      <div class="space-y-4 text-muted sm:text-md text-sm lg:text-sm text-left">
        <p
          v-for="(paragraph, index) in paragraphs"
          :key="index"
        >
          {{ paragraph }}
        </p>
      </div>
    </template>
  </UPageSection>
</template>

<style scoped>

</style>
