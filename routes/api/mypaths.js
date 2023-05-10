const express = require('express');
const router = express.Router();
const mypathsCtrl = require('../../controllers/api/mypaths');

// GET /api/items
router.get('/', mypathsCtrl.index);
// GET /api/items/:id
router.get('/:id', mypathsCtrl.show);
// POST
router.post('/', mypathsCtrl.create);
router.get('/:id/edit', mypathsCtrl.edit);

module.exports = router;
