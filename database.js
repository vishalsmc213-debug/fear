const mongoose = require('mongoose');

// Database Connection
mongoose.connect('mongodb://localhost:27017/fear_ai');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    subscriptionStatus: { type: String, default: 'free' }, // free, premium
    expiryDate: Date,
    purchasedProjects: [String] // வாங்கிய புராஜெக்ட் ஐடிக்கள்
});

const User = mongoose.model('User', userSchema);
