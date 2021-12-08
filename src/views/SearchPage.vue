<template>
  <div id="search-page-body" v-title data-title="AniGraph | 搜索">
    <GlobalHeader :current-page="currentPage"></GlobalHeader>
    <div id="search-page-main">
      <div id="search-page-slogan">
        <img id="search-page-icon" alt="fail" src="../assets/logo.png">
        <div id="search-page-title">AniGraph</div>
      </div>
      <SearchPageInput></SearchPageInput>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";
import SearchPageInput from "@/components/SearchPageInput";

export default {
  name: "SearchPage",
  components: { SearchPageInput, GlobalHeader },
  data() {
    return {
      currentPage: "SearchPage",
    };
  },
};
</script>

<style scoped>
#search-page-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20vh;
}

#search-page-icon {
  width: 50px;
  height: 50px;
  animation: rotate 8s infinite alternate;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {

    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
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
  margin-bottom: 60px;
}

</style>