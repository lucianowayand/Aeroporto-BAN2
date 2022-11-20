import { api } from "./api";

export async function GetAllEmpregados(){
    return api.get('/empregado')
}

export async function CreateEmpregados(params){
    return api.post('/empregado', params).catch((reason) => reason.response)
}

export async function UpdateEmpregados(id, params){
    return api.put(`/empregado/${id}`, params).catch((reason) => reason.response)
}

export async function DeleteEmpregados(id){
    return api.delete(`/empregado/${id}`).catch((reason) => reason.response)
}