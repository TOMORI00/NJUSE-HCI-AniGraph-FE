<template>
  <div id="search-page-body" v-title data-title="AniGraph | 搜索">
    <GlobalHeader :current-page="currentPage"></GlobalHeader>
    <div id="search-page-main">
      <div id="search-page-slogan">
        <img id="search-page-icon" alt="fail" src="../assets/logo.png">
        <div id="search-page-title">AniGraph</div>
      </div>
      <div id="search-page-input">
        <input
            id="search-page-input-line"
            v-model="searchPageInputContent"
            :placeholder="searchPagePlaceHolder"
            autocomplete="off"
            autofocus
            @click="currentIndex = -1">
        <button id="search-page-input-button" @click="searchPageInputConfirm">
          <img alt="error" src="../assets/searchIcon.png" style="width: 20px">
        </button>
      </div>
      <div v-if="searchPageInputContent !== ''" id="search-page-forecast">
        <div
            v-for="(item, i) in searchForecastContent"
            :key="i"
            :class="{active: currentIndex === i}"
            class="search-page-forecast-content"
            @click="handleForecastConfirm(item)"
            @mouseover="currentIndex = i">{{ item }}
        </div>
      </div>
      <div v-if="searchPageInputContent !== '' && searchForecastContent.length === 0"
           id="search-page-forecast-none-match">暂无匹配
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";
import { searchEntityCandidateAPI } from "@/api";

export default {
  name: "SearchPage",
  components: { GlobalHeader },
  data() {
    return {
      currentPage: "SearchPage",
      searchPagePlaceHolder: "开始探索番剧/人物/公司",
      searchPageInputContent: "",
      searchForecastContent: [],
      currentIndex: -1,
    };
  },
  mounted() {
    const that = this;
    document.getElementById("search-page-input-line").focus();
    document.onkeydown = function () {
      if (that.$router.currentRoute.path === "/search") {
        const key = window.event.keyCode;
        switch (key) {
          case 13:
            that.searchPageInputConfirm();
            break;
          case 40:
            that.handleArrowKey("down");
            break;
          case 38:
            that.handleArrowKey("up");
            break;
        }
      }
    };
  },
  methods: {
    handleArrowKey(direction) {
      const elem = document.getElementById("search-page-forecast");
      const elems = document.getElementsByClassName("search-page-forecast-content");
      const inputLine = document.getElementById("search-page-input-line");
      if (direction === "down") {
        if (this.currentIndex < elems.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      }
      if (direction === "up") {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = elems.length;
        }
      }
      this.searchPageInputContent = elems[this.currentIndex].textContent.trim();
      inputLine.focus();
      setTimeout(() => {
        inputLine.selectionStart = elems[this.currentIndex].textContent.length;
        inputLine.selectionEnd = elems[this.currentIndex].textContent.length;
      }, 10);
      elem.scrollTo({ top: this.currentIndex * 32 - 256 });
      this.$forceUpdate();
    },
    searchPageInputConfirm() {
      if (this.searchPageInputContent === "") {
        let elem = document.getElementById("search-page-input");
        if (elem) {
          elem.classList.add("shake");
          this.searchPagePlaceHolder = "请输入点什么";
          elem.focus();
          setTimeout(() => {
            elem.classList.remove("shake");
          }, 800);
        }
        document.getElementById("search-page-input-line").focus();
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
      if (this.currentIndex === -1 || !this.searchForecastContent.includes(this.searchPageInputContent)) {
        searchEntityCandidateAPI(this.searchPageInputContent.trim())
            .then((res) => {
              this.searchForecastContent = res.data.content;
            })
            .catch((err) => {
              console.log(err);
            });
      }
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
        this.currentIndex = -1;
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
  border-radius: 0 0 5px 10px;
  width: 549px;
  font-size: 20px;
  scroll-behavior: smooth;
}

#search-page-forecast::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}

#search-page-forecast::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  background: #fb7299;
}

#search-page-forecast::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
}

.search-page-forecast-content {
  padding-left: 15px;
  padding-top: 1px;
  padding-bottom: 1px;
}

#search-page-forecast-none-match {
  border-radius: 0 0 5px 10px;
  border: 1px solid #fb7299;
  border-top: white;
  font-size: 20px;
  width: 549px;
  position: relative;
  right: 35px;
  padding-left: 15px;
  padding-top: 1px;
  padding-bottom: 1px;
}

.active {
  box-shadow: inset 0 0 3px rgba(250, 250, 250, 0.4);
  background: rgba(251, 114, 153);
  color: white;
  cursor: pointer;
}

.shake {
  animation: shake 800ms ease-in-out;
}

@keyframes shake {
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