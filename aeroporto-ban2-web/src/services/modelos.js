import { api } from "./api";

export async function GetAllModelos(){
    return api.get('/modelo')
}

export async function CreateModelos(params){
    return api.post('/modelo', params).catch((reason) => reason.response)
}

export async function UpdateModelos(id, params){
    return api.put(`/modelo/${id}`, params).catch((reason) => reason.response)
}

export async function DeleteModelos(id){
    return api.delete(`/modelo/${id}`).catch((reason) => reason.response)
}