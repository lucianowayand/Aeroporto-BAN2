import { api } from "./api";

export async function GetAllAvioes(){
    return api.get('/aviao')
}

export async function CreateAvioes(params){
    return api.post('/aviao', params).catch((reason) => reason.response)
}