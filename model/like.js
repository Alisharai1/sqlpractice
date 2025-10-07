const { object, string, number } = require('yup')

const addLikeRequestBodySchema = object({
    userId: string().required("user Id is required"),
    postId: string().required("post Id is required")
});

const getLikeByUserIdBodySchema = object({
    userId: string().required("user Id is required")
});

const getLikeByPostIdBodySchema = object({
    postId: string().required("post Id is required")
});

const getLikeByIdParamsSchema = object({
    id: string().required("like id is required").uuid("like id should be unique")
});

const deleteLikeByIdParamsSchema = object({
    id: string().required("like id is required").uuid("like id should be unique")
});

module.exports = { addLikeRequestBodySchema, getLikeByUserIdBodySchema, getLikeByPostIdBodySchema, getLikeByIdParamsSchema, deleteLikeByIdParamsSchema }

