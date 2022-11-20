import { api } from "./api";

export async function GetAllModelos(){
    return api.get('/modelo')
}

export async function CreateModelos(params){
    return api.post('/modelo', params).catch((reason) => reason.response)
}