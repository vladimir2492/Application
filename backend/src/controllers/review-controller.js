const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const ReviewService = require('../services/ReviewService');
const ensureToken = require('../guard/ensureToken');
const accessGuard = require('../guard/access-guard');

const reviewService = new ReviewService();

router.get('/data', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Admin']), async (req, res) => {
    let data = await reviewService.returnTableData();
    res.send(200, data);
})

router.post('/add', ensureToken, (req, res, next) => accessGuard(req, res, next, ['User', 'Admin']), async (req, res) => {
    const d = Date.now();
    const {
        text_review,
        rating,
        rest_name,
        answer,
        visit_date
    } = req.body;
    let id = uniqid();
    const newElement = {
        id,
        text_review,
        rating,
        rest_name,
        answer,
        visit_date,
        date:  d.toString()
    };
    await reviewService.addRowInTable(newElement);
    res.status(200).send({ message: 'Add of review was successful', error: false });
})

router.post('/delete', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Admin']), async (req, res) => {
    const {
        id
    } = req.body;
    const result = await reviewService.deleteElementById(id);
    if(result){
        return res.status(200).send({ message: 'Delete was successful', error: false });  
    }
    return res.status(200).send({ message: 'Delete was wrong', error: true });
})

router.post('/edit', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Owner', 'Admin']), async (req, res) => {
    const {
        id,
        text_review,
        rating,
        rest_name,
        answer,
        visit_date
    } = req.body;
    let newElement = {
        id,
        text_review,
        rating,
        rest_name,
        answer,
        visit_date
    };
    await reviewService.editRow(newElement)
    res.status(200).send({ message: 'Edit of review was successful', error: false });
});

//возвращает среднюю оценку, максимальную и минимальную оценку
router.post('/getrating', ensureToken, (req, res, next) => accessGuard(req, res, next, ['User']), async (req, res) => {
    const {rest_name} = req.body;
    if (rest_name){
        const reviewData = await reviewService.returnTableData();   
        const ratingResult = ratingFunc(reviewData, rest_name);
        return res.status(200).send({message: ratingResult, error: false});
    }
    return res.status(400).send({message: 'Have not rest_name in req.body', error: true}) 
})

//возвращает все отзывы по задаваемому имени ресторана
router.post('/onerestreviews', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Owner']), async (req, res) =>{
    const {rest_name} = req.body;
    if(rest_name){
        const reviewData = await reviewService.returnTableData();
        let reviews=[];
        for(let rev of reviewData){
            if(rev.rest_name === rest_name){
                reviews.push(rev)
            }
        }
        if(reviews.length==0){
            res.status(401).send({message: 'no reviews of this rest without answer', error: true})
        }
        return res.status(200).send({message: reviews, error: false})
    }
    res.status(401).send({message: 'Empty req.body without rest_name', error: true})
})

//возвращает все отзывы без ответа 
router.post('/answer_onerestreviews', ensureToken, (req, res, next) => accessGuard(req, res, next, ['Owner']), async (req, res) =>{
    const {ownerRests} = req.body;
    let reviewsArr = [];
    if(ownerRests){
        const reviewData = await reviewService.returnTableData();
        let i =1;
        for(let rest of ownerRests){
            for(let rev of reviewData){
                if(rev.rest_name === rest.name && rev.answer==null){
                    i++;
                    reviewsArr.push(rev)
                }
            } 
        }
        return res.status(200).send({message: reviewsArr, error: false});
    }
    return res.status(400).send({message: 'Empty req.body without restaurants of owner', error: true})
})

router.post('/last_review', ensureToken, (req, res, next) => accessGuard(req, res, next, ['User']), async (req, res) =>{
    const {rest_name} = req.body;
    let last=0;
    let lastRev=null;
    if(rest_name){
        const reviewData = await reviewService.returnTableData();
        for(let rev of reviewData){
            if(rev.rest_name === rest_name && Number(rev.date) > last){
                last = Number(rev.date);
                lastRev = rev
            }
        }
        return res.status(200).send({message: lastRev, error: false})
    }
    return res.status(400).send({message:'Empty req.body with rest_name', error: true})
})

function ratingFunc(reviewData, rest_name){
    let sum = 0; 
    let k = 0;
    let max = -1;
    let min = 10;
    let average;
    for(let rev of reviewData){
        if(rev.rest_name === rest_name){
            const intRat = parseInt(rev.rating);
            sum+= intRat;
            k++;
            if(intRat < min){
                min = intRat;
            }
            if(intRat > max){
                max = intRat;
            }
        }
    }
    if(k !== 0){
        average = Math.round(sum / k);
    }else{
        average = 0;
    }
    if(max === -1){
        min=0;
        max=0;
    }
    return {average, min, max}
}

module.exports = router;