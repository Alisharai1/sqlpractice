const commentRepo = require('../repo/comment')
const uuid = require('uuid').v4
const postService = require('../service/post')
const userService = require('../service/user')

class CommentService {

    async addComment(userId, postId, message) {
        const id = uuid()
        try {
            await userService.getUserById(userId)
            await postService.getPostById(postId)

            await commentRepo.addComment(id, userId, postId, message)

            const newComment = await this.getCommentById(id)
            return newComment
        } catch (error) {
            throw error
        }
    }

    async getCommentById(id) {
        try {
            const comment = await commentRepo.getCommentById(id)
            if (!comment) {
                throw new Error("comment doesn't exist")
            }
            return comment
        } catch (error) {
            throw error
        }
    }

    async getCommentsByPostId(postId) {
        try {
            await postService.getPostById(postId)

            const comments = await commentRepo.getCommentsByPostId(postId)
            return comments
        } catch (error) {
            throw error

        }
    }

    async deleteComment(id) {
        try {
            await this.getCommentById(id)
            await commentRepo.deleteComment(id)
        } catch (error) {
            throw error
        }
    }

    async updateComment(id, message) {
        try {
            await commentRepo.getCommentById(id)
            const newMessage = await commentRepo.updateComment(id, message)
            return newMessage

        } catch (error) {
            throw error
        }
    }
}

module.exports = new CommentService();

