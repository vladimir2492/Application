import { BACKEND_URL } from '../config';

export default class UserService {
    constructor(){
        this.authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

     async login(login, password) {
        console.log('---> pressed login with token = '+this.authToken)
        const url = `${BACKEND_URL}/login`;
        const data = { login, password }
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json' ,
                    },
                    credentials: 'include',
                })
        return resultRaw.json();
    }

    async edit(id, name, email, login, password, access) {
        console.log('---> pressed edit with token = '+this.authToken)
        const url = `${BACKEND_URL}/users/edit`;
        const data = {id, name, email, login, password, access}
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + this.authToken 
                        },
                    credentials: 'include',
                })
        const text = await resultRaw.text(); 
        return text; 
    }

    async add(name, email, login, password, access) {
        console.log('---> pressed add with token = '+this.authToken)
        const url = `${BACKEND_URL}/users/add`;
        const data = { name, email, login, password, access}
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.authToken 
                    },
                    credentials: 'include',
                })
        return resultRaw.text();
    }

    async registr(name, email, login, password, access) {
        console.log('---> pressed registr without token')
        const url = `${BACKEND_URL}/users/registr`;
        const data = { name, email, login, password, access}
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
        return resultRaw.text();
    }

    async fetchData(){
        console.log('---> pressed fetch data with token = '+this.authToken)
        const path = `${BACKEND_URL}/users/data`
        const response = await fetch(path, 
            {
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + this.authToken 
                }
            });
        const resJson = await response.json()
        return resJson;
    }

    async logout() {
        console.log('---> pressed logout with token = '+this.authToken)
        const url = `${BACKEND_URL}/logout`;
        const resultRaw = await fetch(url, { method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.authToken 
                    },
                    credentials: 'include',
                })
        return resultRaw.text();
    }

    async access() {
        console.log('---> pressed access with token = '+this.authToken)
        let authHeader;
        if(this.authToken){
            authHeader = 'Bearer ' + this.authToken; 
        }
        const url =  `${BACKEND_URL}/access`;
        let resonse = await fetch(url, {
            credentials: 'include',
            headers: {
                'Authorization': authHeader
            }
        });
        return resonse.json();
    }

    async deleteRow(id){
        console.log('---> pressed delete with token = '+this.authToken)
        const path = `${BACKEND_URL}/users/delete`;
            return fetch(path, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.authToken 
                }
            })
    }
}