module.exports = {
    mongoUrl: 'mongodb://hackharvard:hackharvard@ds053964.mongolab.com:53964/hh',
    sessionCookie: {
        maxAge: 8640000,
        httpOnly: true,
        secure: false
    },
    sessionSecret: process.env.SESSION_SECRET || 'TestTest',
    sessionKey: 'sessionId',
    sessionCollection: 'sessions'
};
