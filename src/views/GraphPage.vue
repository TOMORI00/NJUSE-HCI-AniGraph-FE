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
};
</script>
<style scoped>
.graph-page {
  height: 100%;
}
</style>