import { api } from "./api";

export async function GetAllAvioes(){
    return api.get('/aviao')
}

export async function CreateAvioes(params){
    return api.post('/aviao', params).catch((reason) => reason.response)
}

export async function UpdateAvioes(id, params){
    return api.put(`/aviao/${id}`, params).catch((reason) => reason.response)
}

export async function DeleteAvioes(id){
    return api.delete(`/aviao/${id}`).catch((reason) => reason.response)
}