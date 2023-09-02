import { config } from "dotenv";
import { getPostHistory } from "./models/comments";
import { AWSS3, FileS3 } from "./models/s3";
import express from 'express'
import CustomerRoute from "./routes/customer.crud";
import CustomerFrontend from "./routes/customer.frontend";
config();

const port = process.env.PORT || 80;
const app = express();

app.use(CustomerRoute);
app.use(CustomerFrontend);

async function updateFiles() {
    const postHistory = await getPostHistory();
    const s3Connection = new AWSS3();

    for (let i = 0; i < postHistory.length; i++) {
        const item = postHistory[i];
        if (!await s3Connection.doesFileExists(item.id.toString())) {
            const file = {
                name: item.id.toString(),
                content: JSON.stringify(item)
            } as FileS3
            await s3Connection.uploadFile(file)
        }
    }
}

app.listen(port, () => `server running on port ${port}`)