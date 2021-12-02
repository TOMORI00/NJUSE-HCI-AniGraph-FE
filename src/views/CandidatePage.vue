<template>
  <div id="search-page-body" v-title data-title="AniGraph | 搜索候选">
    <GlobalHeader :current-page="currentPage" id="candidate-page-header"></GlobalHeader>
    <div id="candidate-page-main">
      <div v-for="(item, i) in searchCandidateContent" id="candidate-page-list" :key="i"
           class="candidate-page-list-content">
        <img class="candidate-page-list-content-img" @click="toGraph(item.id)"
             :src="getImageSrc(item.image)">
        <div class="candidate-page-list-content-description">
          <div class="candidate-page-list-content-title">
            <div class="candidate-page-list-content-title-name-cn" @click="toGraph(item.id)">{{ item.name_cn }}</div>
            <div class="candidate-page-list-content-title-name">{{ item.name }}</div>
            <div style="width: 100px"></div>
            *调试信息：ID={{ item.id }}
          </div>
          <div class="candidate-page-list-content-summary">
            {{ decodeURIComponent(item.summary) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";
import {searchEntityByNameAPI} from "@/api";

export default {
  name: "CandidatePage",
  components: {GlobalHeader},
  data() {
    return {
      currentPage: "CandidatePage",
      searchCandidateContent: [],

      nullImageSrc: "https://mjh1.oss-cn-hangzhou.aliyuncs.com/hci/null.svg",
    };
  },
  computed: {
  },
  mounted() {
    searchEntityByNameAPI(decodeURIComponent(String(this.$route.query.q)))
      .then((res) => {
        this.searchCandidateContent = res.data.content;
        for (let i = 0; i < this.searchCandidateContent.length; i++) {
          try {
            this.searchCandidateContent[i].image.replace("http", "https");
          } catch (e) {
            console.log(this.searchCandidateContent[i]);
            break;
          }
        }
      });
  },
  methods: {
    toGraph(id) {
      this.$router.push({path: "/graph", query: {entityId: id}});
    },

    getImageSrc(image) {
      return image !== null ? image.replace("http", "https") : this.nullImageSrc;
    },
  },
};
</script>

<style scoped>
#candidate-page-header {
  position: sticky;
  top: 0;
  z-index: 999;
}

#candidate-page-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5vh;
}

.candidate-page-list-content {
  width: 50vw;
  margin-bottom: 35px;
  display: flex;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 5px;

}

.candidate-page-list-content-img {
  width: 80px;
  height: 120px;
  margin-right: 10px;
}

.candidate-page-list-content-img:hover {
  cursor: pointer;
}

.candidate-page-list-content-title {
  display: flex;
  font-size: large;
}

.candidate-page-list-content-title-name-cn {
  color: #fb7299;
  font-weight: bold;
  margin-right: 10px;
}

.candidate-page-list-content-title-name-cn:hover {
  cursor: pointer;
  text-decoration: underline;
}

.candidate-page-list-content-summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>