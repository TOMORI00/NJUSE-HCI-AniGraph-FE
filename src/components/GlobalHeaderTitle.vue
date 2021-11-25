<template>
  <div id="global-header-title-main" @click="toSearchPage" style="cursor: pointer;">AniGraph</div>
</template>

<script>
export default {
  name: "GlobalHeaderTitle",
  methods: {
    toSearchPage() {
      this.$router.push("/search");
      location.reload();
    }
  }
};
</script>

<style scoped>
#global-header-title-main {
  color: #fb7299;
  font-size: xx-large;
  font-weight: bolder;
  padding-left: 50px;
}
</style>