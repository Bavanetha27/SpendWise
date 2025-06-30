const mdb = require('mongoose');
const UserSchema = mdb.Schema({
    userName: String,
    email:String,
    password: String,
    phone: {
    type: Number,
    default: 0, 
    },
    darkMode:Boolean
})

const user_schema = mdb.model("user", UserSchema);
module.exports = user_schema;