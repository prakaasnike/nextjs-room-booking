import nc from 'next-connect';
import dbConnect from "../../../../config/dbConnect";
import { allRooms, newRoom, getSingleRoom } from '../../../../controllers/roomControllers'

const handler = nc();
// Connect to the MongoDB database and start listening to requests
dbConnect();

handler.get(allRooms)
handler.post(newRoom)


export default handler