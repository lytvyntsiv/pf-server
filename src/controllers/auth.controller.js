import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
import config from "../config";
import User from "../models/user.schema";

class AuthController {
  static async generateNonce(req, res) {
    try {
      const nonce = uuidv4();
      res.json({ nonce });
    } catch (error) {
      console.error("Error generating nonce:", error);
      res.status(500).json({ message: "Error generating nonce" });
    }
  }

  static async login(req, res) {
    try {
      const { address, signature, message } = req.body;
      const web3 = new Web3();

      const recoveredAddress = web3.eth.accounts.recover(message, signature);

      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        const user = await User.findOne({ address }).lean();
        if (!user) {
          const newUser = new User({
            address,
          });
          await newUser.save();
        }

        const token = jwt.sign({ address }, config.jwtSecret, {
          expiresIn: "1h",
        });
        res.json({ success: true, token });
      } else {
        res.status(400).json({ message: "Invalid signature" });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(500).json({ message: "Authentication failed" });
    }
  }

  static async me(req, res) {
    res.json({ user: req.user });
  }
}

export default AuthController;
