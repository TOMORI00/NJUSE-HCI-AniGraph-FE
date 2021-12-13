<template>
  <div id="search-input-body">
    <div id="search-input-main">
      <input
          id="search-input-main-line"
          v-model="inputContent"
          :placeholder="placeHolder"
          autocomplete="off"
          @click="currentIndex = -1">
      <button id="search-input-main-button" @click="searchInputConfirm">
        <img alt="error" src="../assets/searchIcon.png" style="width: 20px">
      </button>
    </div>
    <div v-if="inputContent !== ''" id="search-input-forecast">
      <div
          v-for="(item, i) in forecastContent"
          :key="i"
          :class="{active: currentIndex === i}"
          class="search-input-forecast-content"
          @click="handleForecastConfirm(item)"
          @mouseover="currentIndex = i">{{ item }}
      </div>
    </div>
    <div v-if="inputContent !== '' && forecastContent.length === 0"
         id="search-input-forecast-none-match">暂无匹配
    </div>
  </div>
</template>

<script>
import { searchEntityCandidateAPI } from "@/api";

export default {
  name: "SearchPageInput",
  data() {
    return {
      placeHolder: "开始探索番剧/人物/公司",
      inputContent: "",
      forecastContent: [],
      currentIndex: -1,
    };
  },
  mounted() {
    const that = this;
    document.getElementById("search-input-main-line").focus();
    document.onkeydown = function () {
      if (that.$router.currentRoute.path === "/search") {
        const key = window.event.keyCode;
        switch (key) {
          case 13:
            that.searchInputConfirm();
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
      const elem = document.getElementById("search-input-forecast");
      const elems = document.getElementsByClassName("search-input-forecast-content");
      const inputLine = document.getElementById("search-input-main-line");
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
      this.inputContent = elems[this.currentIndex].textContent.trim();
      inputLine.focus();
      setTimeout(() => {
        inputLine.selectionStart = elems[this.currentIndex].textContent.length;
        inputLine.selectionEnd = elems[this.currentIndex].textContent.length;
      }, 10);
      elem.scrollTo({ top: this.currentIndex * 32 - 256 });
      // this.$forceUpdate();
    },
    searchInputConfirm() {
      if (this.inputContent === "") {
        let elem = document.getElementById("search-input-body");
        if (elem) {
          elem.classList.add("shake");
          this.placeHolder = "请输入点什么";
          elem.focus();
          setTimeout(() => {
            elem.classList.remove("shake");
          }, 800);
        }
        document.getElementById("search-input-main-line").focus();
        return;
      }
      const elem1 = document.getElementById("search-page-main");
      let tick = 0;
      let pos = 20;
      let opacity = 1.0;
      let id = setInterval(frame, 0);
      const that = this;

      function frame() {
        if (tick === 80) {
          clearInterval(id);
          that.$router.push({ path: "/candidate", query: { q: that.inputContent } });
        } else {
          tick++;
          pos -= 0.25;
          opacity -= 0.02;
          elem1.style.marginTop = pos + "vh";
          elem1.style.opacity = opacity;
        }
      }
    },
    handleSearchLineChange() {
      if (this.currentIndex === -1 || !this.forecastContent.includes(this.inputContent)) {
        searchEntityCandidateAPI(this.inputContent.trim())
            .then((res) => {
              this.forecastContent = res.data.content;
            })
            .catch((err) => {
              console.log(err);
            });
      }
    },
    handleForecastConfirm(val) {
      this.inputContent = val;
      this.searchInputConfirm();
    }
  },
  watch: {
    inputContent() {
      const elem = document.getElementById("search-input-main-line");
      if (this.inputContent === "") {
        elem.style.borderRadius = "10px 0 0 10px";
        this.forecastContent = [];
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
#search-input-body {
  display: flex;
  flex-direction: column;
}

#search-input-main-button {
  width: 70px;
  height: 45px;
  border-radius: 0 10px 10px 0;
  background: #fb7299;
  border: 1px solid #fb7299;
  outline: none;
}

#search-input-main-button:hover {
  cursor: pointer;
}

#search-input-main-line {
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

#search-input-main-line:focus {
  border: 2px solid #fb7299;
  outline: none;
}

#search-input-main {
  display: flex;
  align-items: center;
  justify-content: center;
}

#search-input-forecast {
  border: 1px solid #fb7299;
  border-top: white;
  max-height: 300px;
  overflow: auto;
  border-radius: 0 0 5px 10px;
  width: 549px;
  font-size: 20px;
  scroll-behavior: smooth;
}

#search-input-forecast::-webkit-scrollbar {
  width: 10px;
  height: 1px;
}

#search-input-forecast::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  background: #fb7299;
}

#search-input-forecast::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
}

.search-input-forecast-content {
  padding-left: 15px;
  padding-top: 1px;
  padding-bottom: 1px;
}

#search-input-forecast-none-match {
  border-radius: 0 0 5px 10px;
  border: 1px solid #fb7299;
  border-top: white;
  font-size: 20px;
  width: 549px;
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