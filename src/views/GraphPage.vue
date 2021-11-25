<template>
  <div>
    <global-header/>
    <div class="graph-wrapper"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import GlobalHeader from "../components/GlobalHeader";
import * as data from "./miserables.json";

export default {
  name: "GraphPage",
  components: {
    GlobalHeader,
  },
  data() {
    return {
      kgSvg: null,
    };
  },
  computed: {},
  mounted() {
    const _this = this;
    window.onresize = function () {
      _this.watchWindowSize();
    };
    _this.initPage();

  },
  methods: {
    initPage() {
      const _this = this;
      let w = document.body.clientWidth;
      let h = document.body.clientHeight - 64;
      _this.initGraph({
        nodes: data.nodes,
        links: data.links,
      }, {
        nodeStrength: d => d.group * (-20),
        linkStrokeWidth: l => Math.sqrt(l.value),
        linkStrength: 0.5,
        width: w,
        height: h,
      });
    },

    initGraph({nodes, links}, {
      nodeTitle,
      nodeFill,
      nodeStroke = "#fff",
      nodeStrokeWidth = 1.5,
      nodeStrokeOpacity = 1,
      nodeRadius = 8,
      nodeStrength,
      linkStroke = "#999",
      linkStrokeOpacity = 0.6,
      linkStrokeWidth = 1.5,
      linkStrokeLinecap = "round",
      linkStrength,
      width,
      height,
      invalidation
    } = {}) {
      if (height === undefined || width === undefined) {
        return;
      }

      let svg = d3.select(".graph-wrapper")
        .append("svg")
        .attr("id", "kgSvg")
        .attr("viewBox", [0, 0, width, height]);

      const forceNode = d3.forceManyBody();
      const forceLink = d3.forceLink(links).id(d => d.id);
      if (nodeStrength !== undefined) {
        forceNode.strength(nodeStrength);
      }
      if (linkStrength !== undefined) {
        forceLink.strength(0.1);
      }
      const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

      let g = svg.append("g");

      let link = g.append("g")
        .selectAll(".link")
        .data(links)
        .join("path")
        .attr("stroke", linkStroke)
        .attr("stroke-width", function (d) {
          return typeof linkStrokeWidth !== "function" ? linkStrokeWidth : linkStrokeWidth(d);
        })
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
        .attr("fill", function (d) {
          return nodeFill === undefined ? "#e15759" : nodeFill(d);
        })
        .attr("class", "node")
        .call(drag(simulation));
      // 如果设置了nodeTitle的函数，那么将为每个节点添加相关的title
      if (nodeTitle !== undefined) {
        node.append("title")
          .text(function (d) {
            return nodeTitle(d);
          });
      }

      svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        // .scaleExtent([0.5, 4])
        .on("zoom", zoom));


      if (invalidation != null) invalidation.then(() => simulation.stop());

      function zoom(event) {
        g.attr("transform", event.transform);
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

    watchWindowSize() {
      let w = document.documentElement.clientWidth;
      let h = document.documentElement.clientHeight - 64;
      d3.select("#kgSvg").attr("viewBox", [0, 0, Math.max(w, 700), h]);
    },
  },
};
</script>

<style scoped>
.graph-wrapper {
  /*width: 100%;*/
  /*height: 600px;*/
}
</style>