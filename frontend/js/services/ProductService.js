import { BACKEND_URL } from '../config';

export default class ProductService{

    constructor(){
        this.authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }

    async edit(id, category, model, discription, quantity, sales, price) {
        console.log('---> pressed edit with token = '+this.authToken)
        const url = `${BACKEND_URL}/products/edit`;
        const data = {id, category, model, discription, quantity, sales, price};
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.authToken
                    },
                    credentials: 'include',
                })
        return resultRaw.json();
    }

    async add(category, model, discription, quantity, sales, price) {
        console.log('---> pressed add with token = '+this.authToken)
        const url = `${BACKEND_URL}/products/add`;
        const data = { category, model, discription, quantity, sales, price}
        const resultRaw = await fetch(url, { method: 'POST',
                    body: JSON.stringify(data), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.authToken
                    },
                    credentials: 'include',
                })
        return resultRaw.json();
    }

    async fetchData(){
        console.log('---> pressed fetch data with token = '+this.authToken)
        const path = `${BACKEND_URL}/products/data`
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

    async deleteRow(id){
        console.log('---> pressed delete with token = '+this.authToken)
        const path = `${BACKEND_URL}/products/delete`;
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