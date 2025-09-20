const db = require('./db')
/**
 * addlike
 * getlikebypostid
 * getlikebyuserid
 * deletelike
 */

class LikeRepo{

    async addLike(userId,postId){
        try {
            await db.any('INSERT INTO likes (user_id,post_id) VALUES ()')
        } catch (error) {
            
        }
    }
}