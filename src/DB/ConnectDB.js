const mongoose = require('mongoose')

const ConnectDB = async() => {

    try {
        await mongoose.connect(`${process.env.DATABASE_URL}`)
        .then(() => {console.log("DATABASE Connected Successfully")})
    } catch (error) {
        console.log(`MongoDB Connection Error : ${error}`)
    }
}

module.exports = {
    ConnectDB
}