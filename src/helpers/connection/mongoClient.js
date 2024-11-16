import mongoose from "mongoose";
import config from "../../config";

class MongoClient {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      const mongoUrl = config.mongoUri;

      await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1);
    }
  }

  static connect() {
    if (!this.instance) {
      this.instance = new MongoClient();
    }
    return this.instance;
  }
}

export default MongoClient;
