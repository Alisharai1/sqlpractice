function f1() {
    throw { bb: "Alisha" }
}

function f2() {
    try {
        f1()
    } catch (error) {
        throw error
    }
}

function f3() {
    try {
        f2()
    } catch (error) {
        console.log(error)
    }
}
f3()

