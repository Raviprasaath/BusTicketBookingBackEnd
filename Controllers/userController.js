const userModel = require("../Models/userModel");
const watchListModel = require("../Models/bookingModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getRegisterDetails = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json("All fields are required");
        }

        const userAvailable = await userModel.findOne({ email });

        if (userAvailable) {
            return res.status(400).json("User already available");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            username,
            email,
            password: hashPassword,
        });

        if (newUser) {
            const newWatchlist = await watchListModel.create({
                user: newUser._id,
                details: [],
            });

            return res.status(201).json({
                _id: newUser.id,
                email: newUser.email,
                watchlist: newWatchlist._id,
            });
        } else {
            return res.status(400).json("User Data invalid");
        }
    } catch (error) {
        console.error('Error in getRegisterDetails:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getLogInDetails = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json("Email and Password required");
        }

        const user = await userModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50m" });

            return res.status(200).json({ accessToken, email, userId: user._id });
        } else {
            return res.status(401).json("Email or Password invalid");
        }
    } catch (error) {
        console.error('Error in getLoginDetails:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getRegisterDetails, getLogInDetails };