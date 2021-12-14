<template>
  <div>KG Search Line 知识图谱搜索栏</div>
</template>

<script>
export default {
  name: "KgSearchLine",
  data() {
    return {
      content: "",
    };
  },
  methods:{
    emitSearchEvent(){
      this.$emit("search-acknowledge");
    },

    emitNextResultEvent(){
      this.$emit("next-result");
    },

    emitPrevResultEvent(){
      this.$emit("prev-result");
    },
  }
};
</script>

<style scoped>

</style>