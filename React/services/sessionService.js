import axios from "axios";
import { API_HOST_PREFIX } from './serviceHelpers';

const sessions = {
    endpoint:`${ API_HOST_PREFIX }/api/sessions`
}

const paginate =(pageIndex, pageSize)=>{
    const config = {
        method:"GET",
        url:`${sessions.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain:true,
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
    }
    return axios(config)
}

const getByCreator =(pageIndex, pageSize, creator)=>{
    const config = {
        method:"GET",
        url:`${sessions.endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}&user=${creator}`,
        crossdomain:true,
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
    }
    return axios(config)
}

const getById = (id)=>{
    const config = {
        method:"GET",
        url:`${sessions.endpoint}/${id}`,
        crossdomain:true,
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
    }
    return axios(config)
}

const add = (payload)=>{
    const config = {
        method:"POST",
        url:`${sessions.endpoint}`,
        data:payload,
        crossdomain:true,
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
    }
    return axios(config)
}

const update = (id, payload)=>{
    const config = {
        method:"PUT",
        url:`${sessions.endpoint}/${id}`,
        data:payload,
        crossdomain:true,
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
    }
    return axios(config)
}

const remove =(id)=>{
    const config = {
        method:"DELETE",
        url:`${sessions.endpoint}/${id}`,
        crossdomain:true,
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
    }
    return axios(config)
}

const getByWorkShopId = (id)=>{
    const config = {
        method:"GET",
        url:`${sessions.endpoint}/workShop/${id}`,
        crossdomain:true,
        withCredentials:true,
        headers:{"Content-Type":"application/json"}
    }
    return axios(config)
}

const sessionFunctions = {remove,getByCreator,getById,paginate,add,update,getByWorkShopId}

export default sessionFunctions;