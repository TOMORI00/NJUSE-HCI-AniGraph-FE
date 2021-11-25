<template>
  <div id="search-page-body" v-title data-title="AniGraph | 搜索候选">
    <GlobalHeader :current-page="currentPage"></GlobalHeader>

  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  name: "CandidatePage",
  components: { GlobalHeader },
  data() {
    return {
      currentPage: "CandidatePage",
      searchPageInputContent: "",
      searchForecastContent: [],
    };
  },
  mounted() {

  }
};
</script>

<style scoped>

</style>