const postRepo = require('../repo/post')
const uuidv4 = require('uuid').v4
const userRepo = require('../repo/user')


class PostService {

    async addPost(userId, description) {
        const postId = uuidv4()
        try {
            const user = await userRepo.getUserById(userId)
            if (!user) {
                throw new Error("user not found")
            }
            await postRepo.addPost(userId, postId, description)
            const newPost = await this.getPostById(postId)
            return newPost
        } catch (error) {
            throw error
        }
    }

    async getPostById(postId) {
        try {
            const post = await postRepo.getPostById(postId)
            if (!post) {
                throw new Error("post doesn't exist")
            }
            return post

        } catch (error) {
            throw error
        }
    }

    async updatePost(postId, description) {
        try {
            await this.getPostById(postId)

            await postRepo.updatePostById(postId, description)
            const updatedPost = await this.getPostById(postId)
            return updatedPost
        } catch (error) {
            throw error
        }
    }

    async deletePost(postId) {
        try {
            await this.getPostById(postId)
            await postRepo.deletePostById(postId)
        } catch (error) {
            throw error
        }
    }

    async getPostByUserId(userId) {
        try {
            const user = await userRepo.getUserById(userId)
            if (!user) {
                throw new Error("user not found")
            }
            const posts = await postRepo.getPostsByUserId(userId)
            return posts

        } catch (error) {
            throw error
        }
    }

    async getPostsByDescription(description, page) {
        try {


            const posts = await postRepo.queryPostsByDescription(description, page)
            return posts

        } catch (error) {
            throw error
        }

    }
}

module.exports = new PostService();