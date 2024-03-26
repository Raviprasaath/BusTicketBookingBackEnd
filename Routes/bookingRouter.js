const express = require('express');

const route = express.Router();

const { 
    gettingBookingDetails, 
    addingToBookingDetails, 
    updatingToBookingDetails, 
    deletingFromBookingDetails 
} = require("../Controllers/bookingController");

route.get('/', gettingBookingDetails);
route.post('/:id', addingToBookingDetails);
route.patch('/:id', updatingToBookingDetails);
route.delete('/:id', deletingFromBookingDetails);

module.exports = route;