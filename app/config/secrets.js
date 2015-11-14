module.exports = {
    facebook: {
        clientID: process.env.FACEBOOK_ID || '754220301289665',
        clientSecret: process.env.FACEBOOK_SECRET || '41860e58c256a3d7ad8267d3c1939a4a',
        callbackURL: '/auth/facebook/callback',
        passReqToCallback: true
    },

    instagram: {
        clientID: process.env.INSTAGRAM_ID || '9f5c39ab236a48e0aec354acb77eee9b',
        clientSecret: process.env.INSTAGRAM_SECRET || '5920619aafe842128673e793a1c40028',
        callbackURL: '/auth/instagram/callback',
        passReqToCallback: true
    },

    twitter: {
        consumerKey: process.env.TWITTER_KEY || '6NNBDyJ2TavL407A3lWxPFKBI',
        consumerSecret: process.env.TWITTER_SECRET  || 'ZHaYyK3DQCqv49Z9ofsYdqiUgeoICyh6uoBgFfu7OeYC7wTQKa',
        callbackURL: '/auth/twitter/callback',
        passReqToCallback: true
    }
};
