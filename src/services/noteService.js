import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = (newNote) => {
    const request = axios.post(baseUrl,newNote);
    return request.then(response => response.data);
}

const update = (id, newNote) => {
    const request = axios.put(`${baseUrl}/${id}`,newNote);
    return request.then(response => response.data);
}
// return an object with 3 functions
// export default {
//     getAll: getAll,
//     create: create,
//     update: update,
// }

//simple syntax when key and value are same name
export default { getAll,create,update }