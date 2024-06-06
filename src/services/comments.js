import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async (blogId) => {
  const res = await axios.get(`${baseUrl}/${blogId}/comments`)
  return res.data
}

const create = async (blogId, comment) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { content: comment },
    config
  )
  return res.data
}

export default {
  getAll,
  create,
  setToken,
}
