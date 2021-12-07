import Vue from "vue";
import VueRouter from "vue-router";
import SearchPage from "@/views/SearchPage";
import HomePage from "@/views/HomePage";
import ArchivePage from "@/views/ArchivePage";
import GraphPage from "../views/GraphPage";
import CandidatePage from "@/views/CandidatePage";
import ErrorPage from "@/views/ErrorPage";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

const routes = [
	{
		path: "/",
		redirect: "/search",
	},
	{
        path: "/search",
        component: SearchPage
    },
    {
        path: "/home",
        component: HomePage
    },
    {
        path: "/archive",
        component: ArchivePage
    },
    {
        path: "/graph",
        component: GraphPage
    },
    {
        path: "/candidate",
        component: CandidatePage
    },
    {
        path: "/error",
        component: ErrorPage
    },
];

export default new VueRouter( {
    mode: "hash",
    routes,
});