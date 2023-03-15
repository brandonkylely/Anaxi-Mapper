const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

async function connectToDatabase() {
    try {
        const user = process.env.DB_USER;
        const password = process.env.DB_PASSWORD;
        const host = process.env.DB_HOST;
        const port = process.env.DB_PORT;
        const dbName = process.env.DB_NAME;
        const rs = process.env.DB_REPLICA_SET;

        const connectionString = `mongodb://${user}:${password}@${host}:${port}/${dbName}?replicaSet=${rs}`
        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000
    });
    Logger.info("Connected to database");
} catch (error) {
    Logger.error(error);
}
}
module.exports = connectToDatabase;

//&authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false