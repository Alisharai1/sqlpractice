function person(num) {
    if (num === 1) {
        throw new Error("person doesn't exist")
    }
}

function employee() {
    try {
        person(1)
        throw new Error("person found")
    } catch (error) {
        console.log(error.message);

    }
}

employee()