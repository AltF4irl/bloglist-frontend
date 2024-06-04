import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async (blogId) => {
    const res = await axios.get(`${baseUrl}/${blogId}/comments`)
    return res.data
}

const create = async (blogId, comment) => {
    const res = await axios.post(`${baseUrl}/${blogId}/comments`, comment)
    return res.data
}

export default {
    getAll,
    create
}