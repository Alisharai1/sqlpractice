const db = require('./db')

class CommentRepo {

    async addComment(id, userId, postId, message) {
        try {
            await db.none('INSERT INTO comments(id, user_id,post_id,message) VALUES ($1,$2,$3,$4);', [id, userId, postId, message])
        } catch (error) {
            throw error
        }
    }

    async getCommentById(id) {
        try {
            const comment = await db.any('SELECT id,message,user_id AS "userId",post_id AS "postId",created_at AS "createdAt",updated_at AS "updatedAt" FROM comments WHERE id=$1 LIMIT 1;', [id])
            if (comment && comment.length) {
                return comment[0]
            }

        } catch (error) {
            throw error
        }
    }

    async getCommentsByPostId(postId) {
        try {
            const comments = await db.any('SELECT id,message,user_id AS "userId",post_id AS "postId",created_at AS "createdAt",updated_at AS "updatedAt" FROM comments WHERE post_id=$1;', [postId])
            return comments
        } catch (error) {
            throw error
        }
    }

    async deleteComment(id) {
        try {
            await db.none('DELETE FROM comments WHERE id=$1;', [id])
        } catch (error) {
            throw error
        }
    }

    async updateComment(id, message) {
        try {
            await db.none('UPDATE comments SET message = $1 WHERE id= $2;', [message, id])
        } catch (error) {
            throw error
        }
    }
}

module.exports = new CommentRepo();
