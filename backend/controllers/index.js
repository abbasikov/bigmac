import { Router } from 'express';
import PricingService from '../services/pricing.js';

// const PricingService = require('../services/pricing');
const router = Router();

router.get('/', async (req, res, next) => {
    const PostServiceInstance = new PricingService();
    const results = await PostServiceInstance.getResults();
    return res.status(200).json(results);
});

export default router;