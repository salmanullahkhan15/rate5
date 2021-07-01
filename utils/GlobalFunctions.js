import axios from 'react-native-axios'

const apiFunctions = {

    GET_REQUEST: async function (url) {
        // alert(url)

        const data = await axios.get(url)
            .then(function (response) {
                return response
            })
            .catch(function (error) {
                return error
            });

        return data;

    },
    POST_REQUEST: async function (url, formData) {

        const data = fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.data)
                return data
            })
            .catch((error) => {
                console.log("Api call error ", error.message);
                return error
            });


        return data;

    },
}

export default apiFunctions