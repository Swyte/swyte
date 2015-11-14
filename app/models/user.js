var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    phone: Number,
    
    facebook: String,
    twitter: String,
    instagram: String,
    tokens: Array,

    profile: {
      name: { type: String, default: '' },
      gender: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
      picture: { type: String, default: '' }
    }
});

module.exports = mongoose.model('User', userSchema);
