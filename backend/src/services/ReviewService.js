const BaseService = require('./BaseService');
const ReviewModel = require('../models/ReviewModel');

class ReviewService extends BaseService {
    constructor() {
        super(ReviewModel);
    }
}


module.exports = ReviewService;