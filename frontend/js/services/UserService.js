import { BACKEND_URL } from '../config';
import axios from 'axios';

export default class UserService {
    /*constructor(){
        this.authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    setAuthToken(){
        this.authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }*/

     async login(login, password) {
      
        const url = `${BACKEND_URL}/login`;
        const data = { login, password }
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json'// ,
                        //'Authorization': 'Bearer ' + authToken 
                    },
                    credentials: 'include',
                })
        return resultRaw.json();
    }

    async edit(id, name, email, login, password, access) {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed edit with token = '+authToken)
        const url = `${BACKEND_URL}/users/edit`;
        const data = {id, name, email, login, password, access}
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

    async add(name, email, login, password, access) {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed add with token = '+authToken)
        const url = `${BACKEND_URL}/users/add`;
        const data = { name, email, login, password, access}
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

    async registr(name, email, login, password, access) {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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
        return resultRaw.json();
    }

    async fetchData(){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed fetch data with token = '+authToken)
        const path = `${BACKEND_URL}/users/data`
        const response = await fetch(path, 
            {
                credentials: 'include',
                headers: {
                    'Authorization': 'Bearer ' + authToken 
                }
            });
        const resJson = await response.json()
        return resJson;
    }

    async logout() {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed logout with token = '+authToken)
        const url = `${BACKEND_URL}/logout`;
        let authHeader;
        if(authToken){
            authHeader = 'Bearer ' + authToken; 
        }
        const resultRaw = await fetch(url, { method: 'POST',
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': authHeader
                    }                    
                })
        return resultRaw.json();
    }

    async access() {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed access with token = '+authToken)
        let authHeader;
        if(authToken){
            authHeader = 'Bearer ' + authToken; 
        }
        const url =  `${BACKEND_URL}/access`;
        let resonse = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader
            }
        });
        return resonse.json();
    }

    async deleteRow(id){
        console.log('---> pressed delete with token = '+authToken)
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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
                    'Authorization': 'Bearer ' + authToken 
                }
            })
    }

    async takeImg(id){
        const path = `${BACKEND_URL}/takeimg`;
            return fetch(path, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json' 
                }
            })
    }

    async googleAuth(userData){
        console.log('---> pressed googleauth with token = '+authToken)
        const path = `${BACKEND_URL}/googleauth`;
        const response = await fetch( path, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    }
    
  
}