module.exports = {
    SESSION_SECRET: process.env.TOKEN_SECRET || 'hbR95YN7tZ9fJ5$AI&rdhizBc8guelHO1&uTing',
    facebook: {
        clientID: '1582563292051119',
        clientSecret: 'f15fe0047518fe8b78bf9ab5c47df12a',
        callbackURL: 'http://localhost:2000/auth/facebook/callback',
        pageId : 'takeAndSmile'
    },
    twitter: {
        consumerKey: 'fIFMqbdot16mf3FfE6t2HMssU',
        consumerSecret: 'M9ZFTEz6NWNj15rPm4XszeLsFpxENfPO4gGzK1ItjblkxFhQ5W',
        accessToken: '3593245573-qIBcVqCeIjp2ghH4Q0ym2rpGLj6E3gTW7qzJ75S',
        accessTokenSecret : 'TdjnAnrTMyYvIxNQRWPMjgi0rgUOaB2U08H4Yj8idctxU'
    },
    google: {
        clientID: '900296747588-k8oj55e27hnubmbtgsf3en6bf2g1ikmm.apps.googleusercontent.com',
        clientSecret: 'rtlTXseUQ0eMiVqhlxkFrdmT',
        callbackURL: 'http://localhost:2000/auth/google/callback'
    }
};