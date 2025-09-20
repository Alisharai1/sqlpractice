const { object, string, number } = require('yup')

const addPostRequestBodyBySchema = object({
    description: string().required("description is required"),
    userId: string().required().uuid()

});
const getPostRequestParamsSchema = object({
    id: string().required("post id is required").uuid("post id should be unique")
});

const patchPostRequestBodySchema = object({
    description: string().required("description is required")
});

const getPostRequestQuerySchema = object({
    description: string(),
    page: number().integer().positive()
});



module.exports = { addPostRequestBodyBySchema, getPostRequestParamsSchema, patchPostRequestBodySchema, getPostRequestQuerySchema }


