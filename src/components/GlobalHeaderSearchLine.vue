<template>
  <div id="global-header-search-line-body">
    <div id="global-header-search-line-main">
      <input id="global-header-search-line-input" v-model="inputContent" placeholder="搜索" @mouseenter="isHover=true" @mouseleave="isHover=false" :style="{ color:(isHover ? 'black' : ''), background: (isHover ? 'white' : ''), fontWeight: (isHover ? 'bold' : ''), borderBottom: (isHover ? '1px solid black' : '')}">
      <button id="global-header-search-line-button" @click="inputConfirm" @mouseenter="isHover=true" @mouseleave="isHover=false" :style="{ color:(isHover ? 'black' : ''), background: (isHover ? 'white' : ''), fontWeight: (isHover ? 'bold' : ''), borderBottom: (isHover ? '1px solid black' : '')}">
        <svg height="20" style="margin-top: 4px;" version="1.1"
             viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M953.474215 908.234504l-152.576516-163.241391c61.92508-74.48211 95.81186-167.36973 95.81186-265.073744 0-229.294809-186.63531-415.930119-416.102133-415.930119-229.294809 0-415.930119 186.63531-415.930119 415.930119s186.63531 415.930119 415.930119 415.930119c60.032925 0 118.00168-12.55703 172.186125-37.327062 16.169326-7.396607 23.221905-26.318159 15.825298-42.315471-7.396607-16.169326-26.318159-23.221905-42.315471-15.825298-45.927768 20.813707-94.951789 31.478582-145.695952 31.478582-194.031917 0-351.94087-157.908953-351.94087-351.94087 0-194.031917 157.908953-351.94087 351.94087-351.94087 194.031917 0 351.94087 157.908953 351.94087 351.94087 0 91.339493-34.918864 177.86259-98.048043 243.743995-12.213002 12.729044-11.868974 33.026709 0.860071 45.239711 1.032085 0.860071 2.236183 1.204099 3.268268 2.064169 0.860071 1.204099 1.376113 2.752226 2.408198 3.956325l165.477574 177.00252c6.192508 6.70855 14.793214 10.148833 23.393919 10.148833 7.912649 0 15.653284-2.92424 21.845792-8.600706C964.827146 941.433227 965.515202 921.135562 953.474215 908.234504z"
              fill="#333333a6"></path>
        </svg>
      </button>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "GlobalHeaderSearchLine",
  data() {
    return {
      inputContent: "",
      isHover: false,
    };
  },
  mounted() {
    const that = this;
    this.inputContent = String(this.$route.query.q);
    document.onkeydown = function () {
      if (that.$router.currentRoute.path === "/candidate") {
        const key = window.event.keyCode;
        switch (key) {
          case 13:
            that.inputConfirm();
            break;
        }
      }
    };
  },
  methods: {
    inputConfirm() {
      this.$router.push({ path: "/candidate", query: { q: this.inputContent } });
      location.reload();
    }
  },
};
</script>

<style scoped>
#global-header-search-line-body {
}

#global-header-search-line-main {
  display: flex;
}

#global-header-search-line-input {
  border: none;
  height: 32px;
  width: 240px;
  padding-left: 10px;
  padding-right: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  color: rgba(0, 0, 0, 0.5);
  background: transparent;
  border-radius: 3px 0 0 0;
}

#global-header-search-line-input:focus {
  outline: none;
  background: white;
  color: black;
  border-bottom: 1px solid black;
  font-weight: bold;
}

#global-header-search-line-button {
  border: none;
  outline: none;
  height: 32px;
  width: 32px;
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}

#global-header-search-line-button:hover {
  cursor: pointer;
}
</style>