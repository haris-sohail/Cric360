const express = require('express');
const DiscussionModel = require("../Models/Discussion");
const router = express.Router();
const uuid = require('uuid');

router.post('/postDiscussion', (req, res) => {
    DiscussionModel.create(
        {
            id: uuid.v4(),
            title: req.body.title,
            username: req.body.username,
            text: req.body.text,
            comments: req.body.comments,
            upvotes: req.body.upvotes,
            downvotes: req.body.downvotes
        }
    )
        .then(discussions => res.json(discussions))
        .catch(err => res.json(err))
})

router.post('/getDiscussions', (req, res) => {
    DiscussionModel.find()
        .then(discussions => res.json(discussions))
        .catch(err => res.json(err))
})

router.post('/upvote', (req, res) => {
    let discussion_id = req.body.discussionId;

    DiscussionModel.findOneAndUpdate(
        { id: discussion_id }, { $inc: { upvotes: 1 } },
        { returnOriginal: false }
    )
        .then(discussion => res.json(discussion))
        .catch(err => res.json(err))
})

router.post('/cancelUpvote', (req, res) => {
    let discussion_id = req.body.discussionId;

    DiscussionModel.findOneAndUpdate(
        { id: discussion_id }, { $inc: { upvotes: -1 } },
        { returnOriginal: false }
    )
        .then(discussion => res.json(discussion))
        .catch(err => res.json(err))
})

router.post('/downvote', (req, res) => {
    let discussion_id = req.body.discussionId;

    DiscussionModel.findOneAndUpdate(
        { id: discussion_id }, { $inc: { downvotes: 1 } },
        { returnOriginal: false }
    )
        .then(discussion => res.json(discussion))
        .catch(err => res.json(err))
})

router.post('/cancelDownvote', (req, res) => {
    let discussion_id = req.body.discussionId;

    DiscussionModel.findOneAndUpdate(
        { id: discussion_id }, { $inc: { downvotes: -1 } },
        { returnOriginal: false }
    )
        .then(discussion => res.json(discussion))
        .catch(err => res.json(err))
})

router.post('/getDiscussion', (req, res) => {
    let discussion_id = req.body.discussionId;

    DiscussionModel.findOne({ id: discussion_id })
        .then(discussion => res.json(discussion))
        .catch(err => res.json(err))
})

router.post('/addComment', async (req, res) => {
    try {
        let discussion_id = req.body.discussion_id;
        let username = req.body.username;
        let text = req.body.currentComment;

        const discussion = await DiscussionModel.findOne({ id: discussion_id })
        
        discussion.comments.push({
            postedBy: username,
            text: text
        })

        await discussion.save()

        res.json(discussion)
    }
    catch (err) {
        res.json(err)
    }
    
})

module.exports = router;