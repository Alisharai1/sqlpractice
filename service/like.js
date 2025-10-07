const likeRepo = require('../repo/like')
const postService = require('./post')
const uuid = require('uuid').v4
const userService = require('./user')

class LikeService {
    async addLike(userId, postId) {
        try {
            const id = uuid()

            await likeRepo.addLike(userId, postId)

        } catch (error) {
            throw error
        }
    }

    async getLikesByPostId(postId) {
        try {
            const likes = await likeRepo.getLikesByPostId(postId)
            return likes
        } catch (error) {
            throw error

        }
    }

    async getLikesByUserId(userId) {
        try {
            const likes = await likeRepo.getLikesByUserId(userId)
            return likes
        } catch (error) {
            throw error
        }
    }

    async getLikeById(id) {
        try {
            const like = await likeRepo.getLikeById(id)
            if (!like) {
                throw new Error("like not found")
            }
            return like
        } catch (error) {
            throw error
        }
    }

    async deleteLike(id) {
        try {
            await this.getLikeById(id)
            await likeRepo.deleteLike(id)

        } catch (error) {
            throw error
        }
    }

    async getLikeByUserIdAndPostId(userId, postId) {
        try {
            await userService.getUserById(userId)
            await postService.getPostById(postId)
            const like = await likeRepo.getLikeByUserIdAndPostId(userId, postId)
            return like

        } catch (error) {
            throw error

        }
    }

}
module.exports = new LikeService();
