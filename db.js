var mongoose = require("mongoose");

const db_url = "mongodb+srv://cothoa:123@cothoaa.ze3r8sz.mongodb.net/web?retryWrites=true&w=majority&appName=cothoaa";

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(db_url);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.log("Failed to connect to MongoDB " + error);
        process.exit(1); // 1 is failure, 0 is success
    }
};

