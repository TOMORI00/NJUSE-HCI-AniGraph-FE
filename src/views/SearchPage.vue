<template>
  <div id="search-page-body" v-title data-title="AniGraph | 搜索">
    <GlobalHeader :current-page="currentPage"></GlobalHeader>
    <div id="search-page-main">
      <div id="search-page-slogan">
        <img id="search-page-icon" alt="fail" src="../assets/logo.png">
        <div id="search-page-title">AniGraph</div>
      </div>
      <div id="search-page-input">
        <input id="search-page-input-line" v-model="searchPageInputContent" :placeholder="searchPagePlaceHolder">
        <button id="search-page-input-button" @click="searchPageInputConfirm">
          <img alt="error" src="../assets/searchIcon.png" style="width: 20px">
        </button>
      </div>
      <div v-if="searchPageInputContent !== ''" id="search-page-forecast">
        <div v-for="(item, i) in searchForecastContent" :key="i" class="search-page-forecast-content"
             @click="handleForecastConfirm(item)">{{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";
import { getSearchEntityCandidateAPI } from "@/api";

export default {
  name: "SearchPage",
  components: { GlobalHeader },
  data() {
    return {
      currentPage: "SearchPage",
      searchPagePlaceHolder: "开始探索番剧/人物/公司",
      searchPageInputContent: "",
      searchForecastContent: [],
    };
  },
  created() {
    const that = this;
    document.onkeydown = function () {
      const key = window.event.keyCode;
      if (key === 13) {
        that.searchPageInputConfirm();
      }
    };
  },
  methods: {
    searchPageInputConfirm() {
      if (this.searchPageInputContent === "") {
        let elem = document.getElementById("search-page-input");
        if (elem) {
          elem.classList.add("shake");
          this.searchPagePlaceHolder = "请输入点什么";
          setTimeout(() => {
            elem.classList.remove("shake");
          }, 800);
        }
        return;
      }
      const elem1 = document.getElementById("search-page-main");
      const elem2 = document.getElementById("search-page-slogan");
      let tick = 0;
      let pos = 20;
      let opacity = 1.0;
      let margin = 60;
      let id = setInterval(frame, 0);
      const that = this;

      function frame() {
        if (tick === 75) {
          clearInterval(id);
          that.$router.push({ path: "/candidate", query: { q: that.searchPageInputContent } });
        } else {
          tick++;
          pos -= 0.25;
          opacity -= 0.02;
          margin -= 1;
          elem1.style.marginTop = pos + "vh";
          elem1.style.opacity = opacity;
          elem2.style.marginBottom = margin + "px";
        }
      }
    },
    handleSearchLineChange() {
      getSearchEntityCandidateAPI(this.searchPageInputContent)
          .then((res) => {
            this.searchForecastContent = res.data.content;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    handleForecastConfirm(val) {
      this.searchPageInputContent = val;
      this.searchPageInputConfirm();
    }
  },
  watch: {
    searchPageInputContent() {
      const elem = document.getElementById("search-page-input-line");
      if (this.searchPageInputContent === "") {
        elem.style.borderRadius = "10px 0 0 10px";
        this.searchForecastContent = [];
      } else {
        elem.style.borderRadius = "10px 0 0 0";
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
  border: 1px solid #fb7299;
  outline: none;
}

#search-page-input-button:hover {
  cursor: pointer;
}

#search-page-input-line {
  width: 550px;
  height: 45px;
  border-radius: 10px 0 0 10px;
  padding-left: 15px;
  padding-top: 3px;
  color: black;
  font-size: 20px;
  font-weight: lighter;
  border: 2px solid #fb7299;
  outline: none;
}

#search-page-input-line:focus {
  border: 2px solid #fb7299;
  outline: none;
}

#search-page-input {
  display: flex;
  align-items: center;
  justify-content: center;
}

#search-page-forecast {
  border: 1px solid #fb7299;
  border-top: white;
  max-height: 300px;
  overflow: auto;
  position: relative;
  right: 35px;
  border-radius: 0 0 10px 10px;
  width: 550px;
  font-size: 20px;
}

#search-page-forecast::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}

#search-page-forecast::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  background: #fb7299;
}

#search-page-forecast::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  background: white;
  border-radius: 10px;
}

.search-page-forecast-content {
  padding-left: 15px;
  padding-top: 1px;
  padding-bottom: 1px;
}

.search-page-forecast-content:hover {
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.shake {
  animation: shake 800ms ease-in-out;
}

@keyframes shake { /* 垂直抖动，核心代码 */
  10%, 90% {
    transform: translate3d(0, -1px, 0);
  }
  20%, 80% {
    transform: translate3d(0, +2px, 0);
  }
  30%, 70% {
    transform: translate3d(0, -4px, 0);
  }
  40%, 60% {
    transform: translate3d(0, +4px, 0);
  }
  50% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>