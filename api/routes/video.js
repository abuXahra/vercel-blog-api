
const express = require('express')
const router = express.Router();
const Video = require('../models/Video')

router.post('/create', async (req, res) => {
    try {
        const newVideo = await Video(req.body)
        newVideo.save()
        res.status(200).json(newVideo)
    } catch (err) {
        res.status(500).json(err)

    }
})



router.get('/', async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 })
        res.status(200).json(videos)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    } catch (err) {
        res.status(200).json(err)
    }
})



router.put('/:id', async (req, res) => {
    try {
        const updateVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateVideo)
    } catch (err) {
        res.status(200).json(err)
    }
})



router.delete('/:id', async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id)
        res.status(200).json("Video Deleted Successfully")
    } catch (err) {
        res.status(200).json(err)
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json('Category has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;