const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String, 
        required: [true, "Please add the user email"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the password"],
    },
    bookingDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'busBookingDetails',
    }
},
    {
        timeStamps: true
    }
);

module.exports = mongoose.model("bookingHistory", userSchema);
