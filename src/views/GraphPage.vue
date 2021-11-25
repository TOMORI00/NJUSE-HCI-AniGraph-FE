<template>
  <div>
    <global-header/>
    <div class="graph-wrapper" @contextmenu.prevent=""></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import GlobalHeader from "../components/GlobalHeader";
import * as data from "./miserables.json";

export default {
  name: "GraphPage",
  components:{
    GlobalHeader,
  },
  data() {
    return {
      kgSvg: null,
    };
  },
  mounted() {
    const _this = this;
    _this.initPage();

  },
  methods: {
    initPage() {
      const _this = this;
      _this.kgSvg = d3.select(".graph-wrapper")
        .append("svg")
        .attr("viewBox", [0, 0, 800, 600]);
      _this.initGraph({
        nodes:data.nodes,
        links:data.links,
      },{
        nodeId: d=>d.id,
        nodeGroup:d=>d.group,
        linkStrokeWidth: l => Math.sqrt(l.value),
      });
    },

    initGraph({nodes, links}, {
      nodeId = d => d.id,
      nodeGroup,
      nodeGroups,
      nodeTitle,
      // nodeFill = "currentColor",
      nodeStroke = "#fff",
      nodeStrokeWidth = 1.5,
      nodeStrokeOpacity = 1,
      nodeRadius = 5,
      nodeStrength,
      // linkSource = ({source}) => source,
      // linkTarget = ({target}) => target,
      linkStroke = "#999",
      linkStrokeOpacity = 0.6,
      linkStrokeWidth = 1.5,
      linkStrokeLinecap = "round",
      linkStrength,
      colors = d3.schemeTableau10,
      width = 800,
      height = 600,
      invalidation
    } = {}) {
      const _this = this;
      const NODE = d3.map(nodes, nodeId).map(intern);
      // const LINK_SOURCE = d3.map(links, linkSource).map(intern);
      // const LINK_TARGET = d3.map(links, linkTarget).map(intern);
      // if (nodeTitle === undefined) {
      //   nodeTitle = function (d) {
      //     return d.id;
      //   };
      // }
      // const NODE_TITLE = nodeTitle === null ? null : d3.map(nodes, nodeTitle);
      const NODE_GROUP = nodeGroup === null ? null : d3.map(nodes, nodeGroup).map(intern);
      console.log("NODE_GROUP", NODE_GROUP);
      const LINK_STROKE_WIDTH = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);

      // nodes = d3.map(nodes, function (d, index) {
      //   return {
      //     id: NODE[index],
      //   };
      // });
      console.log("nodes", nodes);
      // links = d3.map(links, function (d, index) {
      //   return {
      //     source: LINK_SOURCE[index],
      //     target: LINK_TARGET[index],
      //   };
      // });
      console.log(links);

      console.log("nodeGroups", nodeGroups);
      if (NODE_GROUP && nodeGroups === undefined) {
        nodeGroups = d3.sort(NODE_GROUP);
      }
      console.log("nodeGroups", nodeGroups);

      const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);
      console.log("color", color);

      const forceNode = d3.forceManyBody();
      const forceLink = d3.forceLink(links).id(({index: i}) => NODE[i]);
      if (nodeStrength !== undefined) {
        forceNode.strength(nodeStrength);
      }
      if (linkStrength !== undefined) {
        forceLink.strength(linkStrength);
      }

      const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

      let g = _this.kgSvg.append("g");

      let link = g.append("g")
        .selectAll(".link")
        .data(links)
        .join("path")
        .attr("stroke", linkStroke)
        .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr("stroke-linecap", linkStrokeLinecap)
        .attr("class", "link");

      let node = g.append("g")
        .selectAll(".node")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .attr("stroke", nodeStroke)
        .attr("stroke-width", nodeStrokeWidth)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("fill","#e15759")
        .attr("class", "node")
        .call(drag(simulation));

      if(LINK_STROKE_WIDTH){
        link.attr("stroke-width", function ({index:i}){
          return LINK_STROKE_WIDTH[i];
        });
      }
      // if(NODE_GROUP){
      //   node.attr("fill", function ({index:i}){
      //     return color(NODE_GROUP[i]);
      //   });
      // }
      // if(NODE_TITLE){
      //   node.append("title")
      //     .text(function ({index:i}){
      //       return NODE_TITLE[i];
      //     });
      // }

      // 如果设置了nodeTitle的函数，那么将为每个节点添加相关的title
      if(nodeTitle !== undefined){
        node.append("title")
        .text(function (d){
          return nodeTitle(d);
        });
      }
      if (invalidation != null) invalidation.then(() => simulation.stop());

      function intern(value) {
        return value != null && typeof value === "object" ? value.valueOf() : value;
      }

      function ticked() {
        link
          .attr("d", function (d) {
            if (d.source.x < d.target.x) {
              return "M " + d.source.x + " " + d.source.y + " L " + d.target.x + " " + d.target.y;
            } else {
              return "M " + d.target.x + " " + d.target.y + " L " + d.source.x + " " + d.source.y;
            }
          });

        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
      }

      function drag(simulation) {
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }

        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }

        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }

        return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }
    },
  },
};
</script>

<style scoped>
.graph-wrapper {
  width: 100%;
  /*height: 600px;*/
}
</style>