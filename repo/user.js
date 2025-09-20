const db = require('./db')
//importing postgres client
class UserRepo {
    constructor() {

    }

    async addUser(id, name, age, email) {
        try {
            await db.none('INSERT INTO users (id,name,age,email) VALUES ($1,$2,$3,$4);', [id, name, age, email])

        } catch (error) {
            throw error
        }
    }

    async getUserById(id) {
        try {
            const data = await db.any('SELECT name,age,email,id,created_at AS "createdAt",updated_at AS "updatedAt" FROM users WHERE id=$1 limit 1;', [id])
            if (data && data.length) {
                return data[0]
            }
        } catch (error) {
            throw error
        }
    }

    async getUserByEmail(email) {
        try {
            const data = await db.any('SELECT name,age,email,id,created_at AS "createdAt",updated_at AS "updatedAt" FROM users WHERE email=$1 LIMIT 1;', [email])
            if (data && data.length) {
                return data[0]
            }
        } catch (error) {
            throw error
        }
    }

    async deleteUserById(id) {
        try {
            await db.none('DELETE FROM users WHERE id=$1;', [id])

        } catch (error) {
            throw error
        }
    }

    async updateUserById(id, name, age) {
        try {
            await db.none('UPDATE users SET name=$1,age=$2 WHERE id=$3;', [name, age, id])

        } catch (error) {
            throw error
        }
    }

    async getTotalNoOfUser() {
        try {
            const totalUsers = await db.one('SELECT COUNT(*) AS totalusers FROM users;')
            return totalUsers

        } catch (error) {
            throw error

        }
    }

}

module.exports = new UserRepo()

