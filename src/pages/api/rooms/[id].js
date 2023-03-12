import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect';

// Import the roomControllers functions
import { getSingleRoom, updateRoom, deleteRoom } from '../../../../controllers/roomControllers';

// Import the onError and authentication middlewares
import onError from '../../../../middlewares/errors';
// import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth';

// Create a new next-connect handler and add the onError middleware
const handler = nc({ onError });

// Connect to the MongoDB database
dbConnect();

// Route for getting a single room
handler.get(getSingleRoom);
handler.put(updateRoom);
handler.delete(deleteRoom);

// // Route for updating a room
// handler
//     .use(isAuthenticatedUser, authorizeRoles('admin'))
//     .put(updateRoom);

// // Route for deleting a room
// handler
//     .use(isAuthenticatedUser, authorizeRoles('admin'))
//     .delete(deleteRoom);

// Export the handler
export default handler;
