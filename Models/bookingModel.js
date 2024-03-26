const mongoose = require('mongoose');

const bookingUserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookingHistory',
        required: true,
    },
    details: [{ type: mongoose.Schema.Types.Mixed }],
});

module.exports = mongoose.model("busBookingDetails", bookingUserSchema);
