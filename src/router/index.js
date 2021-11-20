import Vue from "vue";
import VueRouter from "vue-router";
import SearchPage from "@/views/SearchPage";
import HomePage from "@/views/HomePage";
import ArchivePage from "@/views/ArchivePage";

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
    }
];

export default new VueRouter( {
    mode: "hash",
    routes,
});