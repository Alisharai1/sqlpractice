const { object, string, number } = require('yup')

const addCommentRequestBodySchema = object({
    userId: string().required(),
    postId: string().required(),
    message: string().required()
});

const getCommentByIdRequestParamsSchema = object({
    id: string().required().uuid('invalid uuid')

});

const getCommentByPostIdRequestParamsSchema = object({
    postId: string().required()

});

const deleteCommentByIdRequestParamsSchema = object({
    id: string().required().uuid('invalid uuid')

});

const updateCommentRequestBodySchema = object({
    id: string().required().uuid('invalid uuid'),
    message: string().required()
})

module.exports = { addCommentRequestBodySchema, getCommentByIdRequestParamsSchema, getCommentByPostIdRequestParamsSchema, deleteCommentByIdRequestParamsSchema, updateCommentRequestBodySchema }
