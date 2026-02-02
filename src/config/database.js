const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vivekrajawat2005_db_user:RGnhLoj1Uob0FSqz@devproject.hzc2zvx.mongodb.net/devProject"
  );
};

module.exports = connectDB;


