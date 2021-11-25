import {axios} from "@/util/axios";

export function searchEntityByNameAPI(data) {
    return axios({
        url: "/entity/searchEntityByName",
        method: "GET",
        data,
    });
}