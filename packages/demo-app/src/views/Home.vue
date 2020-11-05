<template>
<div style="height: 100%;">
  <app-sidebar />
  <mapbox-map />
</div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar/AppSidebar';
import MapboxMap from '@/components/MapboxMap/MapboxMap';

export default {
  name: 'Home',
  components: {
    AppSidebar,
    MapboxMap,
  },
};
</script>
