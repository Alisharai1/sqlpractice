const db = require('./db')

class PostRepo {

    async addPost(userId, postId, description) {
        try {
            await db.none('INSERT INTO posts (id,description,user_id) VALUES ($1,$2,$3);', [postId, description, userId])
        } catch (error) {
            throw error
        }

    }

    async getPostById(postId) {
        try {
            const post = await db.any('SELECT id,description,user_id AS "userId",created_at AS "createdAt",updated_at AS "updatedAt" FROM posts WHERE id=$1 LIMIT 1;', [postId])
            if (post && post.length) {
                return post[0]
            }

        } catch (error) {
            throw error
        }
    }

    async updatePostById(postId, description) {
        try {
            await db.none('UPDATE posts SET description=$1 WHERE id=$2;', [description, postId])
        } catch (error) {
            throw error
        }
    }

    async deletePostById(postId) {
        try {
            await db.none('DELETE FROM posts WHERE id=$1;', [postId])
        } catch (error) {
            throw error

        }
    }

    async getPostsByUserId(userId) {
        try {
            const posts = await db.any('SELECT id,description,user_id AS "userId",created_at AS "createdAt",updated_at AS "updatedAt" FROM posts WHERE user_id=$1;', [userId])
            return posts
        } catch (error) {
            throw error
        }
    }

    async queryPostsByDescription(description = "", page = 0) {
        try {
            const limit = 5
            const offset = limit * page
            const posts = await db.any('SELECT id,description,user_id AS "userId",created_at AS "createdAt",updated_at AS "updatedAt" FROM posts WHERE description LIKE $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3 ;', [`%${description}%`, limit, offset])
            return posts

        } catch (error) {
            throw error

        }
    }

}
module.exports = new PostRepo();
