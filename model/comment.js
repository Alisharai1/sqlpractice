const { object, string, number } = require('yup')

const addComment = object({

    userId: string().required(),
    postId: string().required(),
    message: string().required()

});

const getCommentById = object({
    id: string().required('id is required').uuid('invalid uuid')

});

const getCommentByPostId = object({
    postId: string().required()

});
