const {model, Schema} = require('mongoose');

const schema = new Schema({
    username: {type: String, required: true},
    hashedPassword: {type: String, required: true},
});



const User = model('User', schema);
module.exports = User;