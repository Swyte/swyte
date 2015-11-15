var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    phone: Number,
    
    facebook: { type: String, default: ''},
    twitter: {type: String, default: ''},
    instagram: {type: String, default: ''},
    tokens: Array,
    
    profile: {
      name: { type: String, default: '' },
      gender: { type: String, default: '' },
      location: { type: String, default: '' },
      picture: { type: String, default: '' },
      label: { type: String, default: ''} 
    }
});

module.exports = mongoose.model('User', userSchema);
