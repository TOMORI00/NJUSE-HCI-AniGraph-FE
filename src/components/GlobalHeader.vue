<template>
  <div class="main">
    <GlobalHeaderTitle></GlobalHeaderTitle>
    <div style="min-width: 10px"/>
    <GlobalHeaderSearchLine v-show="currentPage !== 'SearchPage'"></GlobalHeaderSearchLine>
    <div style="min-width: 10px"/>
    <GlobalHeaderNavigator :current-page="this.currentPage" @show-modal="$emit('show-modal')"/>
  </div>
</template>

<script>
import GlobalHeaderTitle from "@/components/GlobalHeaderTitle";
import GlobalHeaderSearchLine from "@/components/GlobalHeaderSearchLine";
import GlobalHeaderNavigator from "@/components/GlobalHeaderNavigator";

export default {
  name: "GlobalHeader",
  props: ["currentPage"],
  components: { GlobalHeaderNavigator, GlobalHeaderSearchLine, GlobalHeaderTitle }
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  min-height: 32px;
  max-height: 64px;
  backdrop-filter: saturate(200%) blur(30px);
  background: rgba(240, 240, 240, 0.7);
  box-shadow: 0 10px 10px rgba(220, 220, 220, 0.7);
}
</style>