import axiox from 'axios'

export const userRegister = (formdata) => {
    return async (dispatch) => {
        try {
            const data = await axiox.post('/api/register', formdata)
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
}