import { axios } from "@/util/axios";

export function searchEntityByNameAPI(data) {
    return axios.get("/entity/searchEntityByName", { params: { name: data } });
}

export function searchEntityCandidateAPI(data) {
    return axios.get("/entity/getSearchEntityCandidate", { params: { name: data } });
}