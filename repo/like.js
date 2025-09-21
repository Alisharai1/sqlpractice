const db = require('./db')

class LikeRepo {

    async addLike(userId, postId) {
        try {
            await db.none('INSERT INTO likes (user_id, post_id) VALUES ($1,$2);', [userId, postId])
        } catch (error) {
            throw error
        }
    }

    async getLikeByPostId(postId) {
        try {
            const likes = await db.any('SELECT * FROM likes WHERE post_id = $1;', [postId])
            return likes
        } catch (error) {
            throw error
        }
    }

    async getLikeByUserId(userId) {
        try {
            const likes = await db.any('SELECT * FROM likes WHERE user_id= $1;', [userId])
            return likes
        } catch (error) {
            throw error
        }
    }

    async getLikeById(id) {
        try {
            const like = await db.any('SELECT * FROM likes WHERE id=$1;', [id])
            return like
        } catch (error) {
            throw error
        }
    }

    async deleteLike(id) {
        try {
            await db.any('SELECT * FROM likes WHERE id=$1;', [id])
        } catch (error) {
            throw error
        }
    }

}

module.exports = new LikeRepo();
