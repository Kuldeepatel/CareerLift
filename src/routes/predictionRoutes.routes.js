const express = require('express');
const router = express.Router();
const predictionController = require('../Controllers/predictionController.Controller');

router.post('/', predictionController.predict);
router.get('/promotionranking', predictionController.getAllEmployeePromotionRanking);

module.exports = router;
