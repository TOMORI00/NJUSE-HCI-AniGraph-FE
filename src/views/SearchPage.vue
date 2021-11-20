<template>
  <div v-title data-title="AniGraph | 搜索" id="search-page-body">
    <GlobalHeader :current-page="currentPage"></GlobalHeader>
    <div id="search-page-main">
      <div id="search-page-slogan">
        <img id="search-page-icon" src="../assets/logo.png" alt="fail">
        <div id="search-page-title">AniGraph</div>
      </div>
      <div id="search-page-input">
        <input id="search-page-input-line">
        <button id="search-page-input-button"></button>
      </div>
    </div>
  </div>

</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";

export default {
  name: "SearchPage",
  data() {
    return {
      currentPage: "SearchPage",
    };
  },
  components: { GlobalHeader }
};
</script>

<style scoped>
#search-page-body {
  /*background-size: cover;*/
  /*background: url("../assets/background.png");*/
  /*background-repeat: no-repeat;*/
  /*background-attachment: fixed;*/
  /*background: url("../asssets/background.png") no-repeat fixed;*/
}

#search-page-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92vh;
  flex-direction: column;
  padding-bottom: 100px;
}

#search-page-icon {
  width: 50px;
  height: 50px;
}

#search-page-title {
  color: #fb7299;
  font-size: 50px;
  font-weight: bolder;
  margin-left: 10px;
}

#search-page-slogan {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 70px;
}

#search-page-input-button {
  width: 70px;
  height: 45px;
  border-radius: 0 10px 10px 0;
  background: #fb7299;
}

#search-page-input-line {
  width: 550px;
  height: 45px;
  border-radius: 10px 0 0 10px;
}

#search-page-input {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>