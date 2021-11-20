<template>
  <div class="main">
    <GlobalHeaderTitle></GlobalHeaderTitle>
    <div/>
    <GlobalHeaderSearchLine v-show="currentPage !== 'SearchPage'"></GlobalHeaderSearchLine>
    <div/>
    <GlobalHeaderNavigator :current-page="this.currentPage"></GlobalHeaderNavigator>
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
  backdrop-filter: saturate(180%) blur(10px);
  background: rgba(250,250,250,0.72);
  box-shadow: 10px 5px 50px rgba(230,230,230,0.72);
}
</style>