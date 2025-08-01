const mdb = require('mongoose');
const UserSchema = mdb.Schema({
    userName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    phone: {
    type: Number,
    default: 0, 
    },
    darkMode:Boolean
})

const user_schema = mdb.model("user", UserSchema);
module.exports = user_schema;