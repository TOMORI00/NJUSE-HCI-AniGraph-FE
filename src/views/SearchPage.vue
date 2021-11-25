<template>
  <div id="search-page-body" v-title data-title="AniGraph | 搜索">
    <GlobalHeader :current-page="currentPage"></GlobalHeader>
    <div id="search-page-main">
      <div id="search-page-slogan">
        <img id="search-page-icon" alt="fail" src="../assets/logo.png">
        <div id="search-page-title">AniGraph</div>
      </div>
      <div id="search-page-input">
        <input id="search-page-input-line" v-model="searchPageInputContent">
        <button id="search-page-input-button" @click="searchPageInputConfirm">
          <img src="../assets/searchIcon.png" alt="error" style="width: 20px">
        </button>
      </div>
      <div id="search-page-forecast" v-if="searchPageInputContent !== ''">
        <div v-for="(item, i) in searchForecastContent" :key="i" class="search-page-forecast-content">{{ item.name }}</div>
      </div>
    </div>
  </div>

</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";
import { searchEntityByNameAPI } from "@/api";

export default {
  name: "SearchPage",
  components: { GlobalHeader },
  data() {
    return {
      currentPage: "SearchPage",
      searchPageInputContent: "",
      searchForecastContent: [],
    };
  },
  methods: {
    searchPageInputConfirm() {
      this.$router.push("/graph");
    },
    handleSearchLineChange() {
      searchEntityByNameAPI(this.searchPageInputContent)
          .then((res) => {
            this.searchForecastContent = res.data.content;
          })
          .catch((err) => {
            console.log(err);
          });
    }
  },
  watch: {
    searchPageInputContent() {
      if(this.searchPageInputContent === "") {
        this.searchForecastContent = [];
      } else {
        this.handleSearchLineChange();
      }
    }
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
  padding-left: 15px;
  padding-top: 3px;
  color: black;
  font-size: 20px;
}

#search-page-input {
  display: flex;
  align-items: center;
  justify-content: center;
}

#search-page-forecast {
  border-style:solid;
  border-width:1px;
  max-height: 300px;
  overflow: auto;
  position: relative;
  right: 35px;
  border-radius: 0 0 10px 10px;
  width: 550px;
  background: ghostwhite;
  font-size: 20px;
}

#search-page-forecast::-webkit-scrollbar {
  width : 10px;
  height: 1px;
}
#search-page-forecast::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow   : inset 0 0 3px rgba(0, 0, 0, 0.2);
  background   : #fb7299;
}
#search-page-forecast::-webkit-scrollbar-track {
  box-shadow   : inset 0 0 2px rgba(0, 0, 0, 0.2);
  background: white;
  border-radius: 10px;
}

.search-page-forecast-content {
  padding-left: 20px;
  padding-top: 1px;
  padding-bottom: 1px;
}

.search-page-forecast-content:hover {
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>