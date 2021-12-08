<template>
  <div class="nav">
    <div @click="toHomePage" class="nav-button">Avatar</div>
<!--    <div @click="toSearchPage" v-show="currentPage !== 'SearchPage'" class="nav-button">搜索</div>-->
    <div @click="toHomePage" class="nav-button">个人中心</div>
    <div @click="toArchive" class="nav-button">每日放送</div>
  </div>
</template>

<script>
export default {
  name: "GlobalHeaderNavigator",
  props: ["currentPage"],
  methods: {
    toHomePage() {
      this.$router.push("/home");
    },
    toArchive() {
      this.$router.push("/archive");
    },
    toSearchPage() {
      this.$router.push("/search");
    },
  }
};
</script>

<style scoped>
.nav {
  width: 300px;
  display: flex;
  justify-content: space-around;
  padding-right: 50px;
  font-weight: bolder;
  font-size: larger;
}

.nav-button:hover {
  cursor: pointer;
}
</style>