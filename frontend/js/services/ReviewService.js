import { BACKEND_URL } from '../config';

export default class ReviewService{

    /*constructor(){
        this.authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }*/

    async fetchData(){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed fetch data with token = '+authToken)
        const path = `${BACKEND_URL}/reviews/data`
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

    async add(text_review, rating, rest_name, answer, visit_date) {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed add with token = '+authToken)
        const url = `${BACKEND_URL}/reviews/add`;
        const data = {text_review, rating, rest_name, answer, visit_date};
        console.log(data)
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
        const path = `${BACKEND_URL}/reviews/delete`;
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

    async edit(id, text_review, rating, rest_name, answer, visit_date) {
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed edit with token = '+authToken)
        const url = `${BACKEND_URL}/reviews/edit`;
        const data = {id, text_review, rating, rest_name, answer, visit_date};
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

    async getRating(rest_name){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed ret rating with token = '+authToken);
        const url = `${BACKEND_URL}/reviews/getrating`;
        const result = await fetch(url, { method: 'POST',
                    body: JSON.stringify({
                        rest_name: rest_name
                    }), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    credentials: 'include',
                })
        return result.json();
    }

    async oneRestReviews(rest_name){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed one rest reviews with token = '+authToken);
        const url = `${BACKEND_URL}/reviews/onerestreviews`;
        const result = await fetch(url, { method: 'POST',
                    body: JSON.stringify({
                        rest_name: rest_name
                    }), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    credentials: 'include',
                })
        return result.json();
    }

    async oneRestReviewsWithoutAnswer(ownerRests){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed one rest reviews without answer with token = '+authToken);
        const url = `${BACKEND_URL}/reviews/answer_onerestreviews`;
        const result = await fetch(url, { method: 'POST',
                    body: JSON.stringify({
                        ownerRests: ownerRests
                    }), 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + authToken
                    },
                    credentials: 'include',
                })     
        return result.json();
    }

    async lastReview(rest_name){
        const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log('---> pressed last review with token = '+authToken);
        const url = `${BACKEND_URL}/reviews/last_review`;
        const result = await fetch(url, { method: 'POST',
                    body: JSON.stringify({
                        rest_name: rest_name
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