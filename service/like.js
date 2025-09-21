const likeRepo = require('../repo/like')
const uuid = require('uuid').v4

class LikeService {
    async addLike(userId, postId, id) {
        try {
            if (!userId && !postId) {
                throw new Error("user and post both doesn't exist ")
            }
            else if (userId && !postId) {
                throw new Error("post doesn't exist")
            }
            const like = await this.getLikeById(id)
            if (like) {
                throw new Error("like id is same and already exist")
            }
            await likeRepo.addLike(userId, postId)


        } catch (error) {
            throw error
        }
    }

    async getLikeByPostId(postId) {
        try {
            const likes = await likeRepo.getLikeByPostId(postId)
            return likes
        } catch (error) {
            throw error

        }
    }

    async getLikeByUserId(userId) {
        try {
            const likes = await likeRepo.getLikeByUserId(userId)
            return likes
        } catch (error) {
            throw error
        }
    }

    async getLikeById(id) {
        try {
            const like = await likeRepo.getLikeById(id)
            return like
        } catch (error) {
            throw error
        }
    }

    async deleteLike(id) {
        try {
            const like = await this.getLikeById(id)
            if (!like) {
                throw new Error("like doesn't exist")
            }
            await likeRepo.deleteLike(id)

        } catch (error) {
            throw error
        }
    }

}
module.exports = new LikeService();
