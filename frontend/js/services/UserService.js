import { BACKEND_URL } from '../config';
import axios from 'axios';

export default class UserService {
    
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
        //const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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
        const url = `${BACKEND_URL}/logout`;
        const resultRaw = await fetch(url, { method: 'POST',
                    credentials: 'include',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    }                    
                })
        return resultRaw.json();
    }

    async access() {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const url =  `${BACKEND_URL}/access`;
        let response = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        });
        return response.json();
    }

    async deleteRow(id){
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
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const path = `${BACKEND_URL}/takeimg`;
            const response = await fetch(path, {
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
            return response.json();
    }

    async googleAuth(userData){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
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