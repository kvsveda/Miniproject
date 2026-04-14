// ============================================================
//  routes/auth.js — Login & Signup routes
// ============================================================
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/signup
router.post('/signup', authController.signup);

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/me  (protected — for token refresh / profile)
const authMiddleware = require('../middleware/auth');
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
