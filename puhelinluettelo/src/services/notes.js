import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const Delete = (id) => {
    console.log("id is",id)
   return axios.delete(`${baseUrl}/${id}`)
}

const replace = (id,newOject) => {
    console.log("id is2",newOject,`${baseUrl}/${id}`)
   return axios.put(`${baseUrl}/${id}`,newOject)
}

export default {
    getAll : getAll,
    create : create,
    Delete: Delete,
    replace : replace
}