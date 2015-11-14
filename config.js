module.exports = {
    mongoUrl: 'mongodb://127.0.0.1:27017/hh',
    sessionCookie: {
        maxAge: 8640000,
        httpOnly: true,
        secure: false
    },
    sessionSecret: process.env.SESSION_SECRET || 'TestTest',
    sessionKey: 'sessionId',
    sessionCollection: 'sessions'
};
