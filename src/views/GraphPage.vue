<template>
  <div class="graph-page">
    <global-header/>
    <knowledge-graph/>
  </div>
</template>

<script>
import GlobalHeader from "../components/GlobalHeader";
import KnowledgeGraph from "../components/KnowledgeGraph";

export default {
  name: "GraphPage",
  components: {
    GlobalHeader,
    KnowledgeGraph,
  },
  mounted() {
    document.styleSheets[0].insertRule("#app {overflow-y: scroll;}", 0);
    document.styleSheets[0].insertRule("#app::-webkit-scrollbar {width: 0;}", 0);
  },
  beforeDestroy() {
    document.styleSheets[0].deleteRule(0);
    document.styleSheets[0].deleteRule(0);
  }
};
</script>
<style scoped>
.graph-page {
  height: 100%;
}
</style>