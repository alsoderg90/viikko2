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



export default {
    getAll : getAll,
    create : create,
    Delete: Delete
}