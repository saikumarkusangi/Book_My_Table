const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bookings:[
        {
            type:Schema.Types.ObjectId,
            ref:'Bookings'
        }
    ]
});

const User = mongoose.model('Users',userSchema);
module.exports = User;