import {axios} from "../util/axios";

const prefix = "/relation";

export function getRelationsByEntityIdAPI(data) {
    return axios.get(prefix + "/getRelationsByEntityId", {
        params: {
            id: data,
        }
    });
}