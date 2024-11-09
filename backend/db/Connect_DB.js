const mongoose = require("mongoose")

const Connect_DB = async() => {
    await mongoose.connect(process.env.DB).then(() => {
        console.log('DB connection established'.bgWhite.black)
    }).catch((err) => {
        console.error('Error connecting to DB:', err.message)
    })
}

module.exports = Connect_DB