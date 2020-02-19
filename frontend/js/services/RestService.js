import { BACKEND_URL } from '../config';

export default class RestService{

    /*constructor(){
        this.authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }*/

    async fetchData(){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed fetch data with token = '+authToken)
        const path = `${BACKEND_URL}/restaurants/data`
        const response = await fetch(path,
            {
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + authToken
                }
            });
        const resJson = await response.json();
        return resJson;
    }

    async add(name, address, id_owner) {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed add with token = '+authToken)
        const url = `${BACKEND_URL}/restaurants/add`;
        const data = {name, address, id_owner}
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    credentials: 'include',
                })
        return resultRaw.json();
    }

    async deleteRow(id){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed delete with token = '+authToken)
        const path = `${BACKEND_URL}/restaurants/delete`;
        return fetch(path, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        })
    }

    async edit(id, name, address, id_owner) {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed edit with token = '+authToken);
        console.log('rest data for edit : ', 'id = ', id, ' name = ', name, ' address = ', address, ' id_owner = ', id_owner)
        const url = `${BACKEND_URL}/restaurants/edit`;
        const data = {id, name, address, id_owner};
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    credentials: 'include',
                })
        return resultRaw.json();
    }

    async restsOfOneOwner(id_owner){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed rests of one owner with token = '+authToken)
        const url = `${BACKEND_URL}/restaurants/ownerrest`;
        const result = await fetch(url, { method: 'POST',
                    body: JSON.stringify({
                        id_owner: id_owner
                    }), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    credentials: 'include',
                })
        return result.json();
    
    }


}