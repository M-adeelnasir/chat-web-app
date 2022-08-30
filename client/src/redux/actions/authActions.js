import axios from 'axios'

export const userRegister = (formdata) => {
    return async (dispatch) => {
        try {
            const data = await axios.post('/api/v1/register', formdata)
            console.log(data);
        } catch (err) {
            console.log(err.response.data);

        }
    }
}