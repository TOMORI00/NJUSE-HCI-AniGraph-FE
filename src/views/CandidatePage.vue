<template>
  <div id="search-page-body" v-title data-title="AniGraph | 搜索候选">
    <GlobalHeader :current-page="currentPage" id="candidate-page-header"></GlobalHeader>
    <div id="candidate-page-main">
      <div v-for="(item, i) in searchCandidateContent" id="candidate-page-list" :key="i"
           class="candidate-page-list-content">
        <div class="candidate-page-list-content-img" @click="toGraph(item.id)">
          {{ item.image_grid }}
        </div>
        <div class="candidate-page-list-content-description">
          <div class="candidate-page-list-content-title">
            <div class="candidate-page-list-content-title-name-cn">{{ item.name_cn }}</div>
            <div class="candidate-page-list-content-title-name">{{ item.name }}</div>
          </div>
          <div class="candidate-page-list-content-">
            {{ item.summary }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader";
import { searchEntityByNameAPI } from "@/api";

export default {
  name: "CandidatePage",
  components: { GlobalHeader },
  data() {
    return {
      currentPage: "CandidatePage",
      searchCandidateContent: [],
    };
  },
  mounted() {
    searchEntityByNameAPI(decodeURIComponent(String(this.$route.query.q)))
        .then((res) => {
          this.searchCandidateContent = res.data.content;
        });
  },
  methods: {
    toGraph(id) {
      console.log(id);
      this.$router.push({ path: "/graph", query: { id: id } });
    }
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
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 5px;

}

.candidate-page-list-content-img {
  width: 80px;
  height: 120px;
  margin-right: 10px;
  background: #fb7299;
  overflow: hidden;
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
</style>