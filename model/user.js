const { object, string, number } = require('yup');

const addUserRequestBodySchema = object({
    name: string().required('name is required'),
    age: number().required('age is required').positive('age must be positive non-zero number').integer('age should be integer'),
    email: string().email('email should be valid').required('email is required')
});

const getUserByIdRequestParamsSchema = object({
    id: string().required('id is required').uuid('invalid uuid'),
});

const patchUserRequestBodySchema = object({
    name: string().required('name is required'),
    age: number().required('age is required').positive('age must be positive non-zero number').integer('age should be integer')
});


module.exports = { addUserRequestBodySchema, getUserByIdRequestParamsSchema, patchUserRequestBodySchema }
