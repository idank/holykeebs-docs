<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

// import required modules
import { Zoom, Pagination, Navigation } from 'swiper/modules';
const modules = [Zoom, Pagination, Navigation];

const props = defineProps<{
  paths: string[];
  height?: string;
  width?: string;
}>();
</script>
<template>
<swiper
    :style="{
      'height': height,
      'width': width,
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :zoom="true"
    :lazy="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
  >
    <swiper-slide v-for="path in paths">
    <div class="swiper-zoom-container">
      <img
        :src="path"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<style>
.swiper-slide {
  overflow: hidden;
}
</style>
