
const userRepo = require('../repo/user')
const uuidv4 = require('uuid').v4
class UserService {

    async addUser(name, email, age) {
        const id = uuidv4()
        try {
            const user = await this.getUserByEmail(email)
            if (user) {
                throw new Error("duplicate email id");
            }
            await userRepo.addUser(id, name, age, email)
            const newUser = await this.getUserById(id)
            return newUser
        } catch (error) {
            throw error
        }
    }

    async getUserById(id) {
        try {
            const user = await userRepo.getUserById(id)
            // console.log(user);
            if (!user) {
                throw new Error("user doesn't exist")
            }

            return user
        } catch (error) {
            throw error
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await userRepo.getUserByEmail(email)
            return user
        } catch (error) {
            throw error
        }
    }

    async deleteUser(id) {
        try {
            await this.getUserById(id)
            await userRepo.deleteUserById(id)

        } catch (error) {
            throw error
        }
    }

    async updateUser(id, name, age) {
        try {
            const user = await this.getUserById(id)
            if (!user) {
                throw new Error("user id doesn't exist");
            }
            await userRepo.updateUserById(id, name, age)
            const updatedUser = await this.getUserById(id)
            return updatedUser
        } catch (error) {
            throw error
        }
    }

    async getTotalNoOfUser() {
        try {
            const totalUser = await userRepo.getTotalNoOfUser()
            return totalUser
        } catch (error) {
            throw error

        }
    }

}

module.exports = new UserService();
