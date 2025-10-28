var mongoose = require("mongoose");

const db_url = process.env.DB_URL;

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(db_url);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.log("Failed to connect to MongoDB " + error);
        process.exit(1); // 1 is failure, 0 is success
    }
};

