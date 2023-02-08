import express from 'express'

const router = express.Router()

const {
    getItems,
    getItem
} = require('../controllers/items')

router.get('/', getItems)
router.get('/:id', getItem)

module.exports = router
