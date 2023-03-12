import Room from '../models/room'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middlewares/catchAsyncError'
import APIFeatures from '../utils/apiFeatures'
// Create all rooms   =>   /api/rooms
const allRooms = catchAsyncErrors(async (req, res) => {

    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter()

    // const rooms = await Room.find()
    let rooms = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: rooms.length,
        rooms,
    })

})


// Create new room => /api/rooms
// Define a function named "newRoom" that takes in a request and a response object as arguments.
const newRoom = catchAsyncErrors(async (req, res) => {

    // Create a new Room object from the data in the request body.
    const room = new Room(req.body)
    await room.save(); // Save the new room object to the database.
    // Send a success response back to the client with a status code of 200.
    res.status(200).json({
        success: true,
        room, // Include a success message in the response.
    })


})


// Get room details   =>   /api/rooms/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {

    const room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        room
    });

})


// Update room details   =>   /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res, next) => {

    let room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404))
    }

    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        room
    })

})

// Delete room   =>   /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res, next) => {

    const room = await Room.findOneAndDelete({ _id: req.query.id });
    if (!room) {
        return next(new ErrorHandler('Room not found with this ID', 404));
    }
    res.status(200).json({
        success: true,
        message: 'Room is deleted.'
    })

})





// Create a new review   =>   /api/reviews


// Check Review Availability   =>   /api/reviews/check_review_availability



// Get all rooms - ADMIN   =>   /api/admin/rooms



// Get all room reviews - ADMIN   =>   /api/reviews


// Delete room review - ADMIN   =>   /api/reviews
export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}