module.exports = function (app) {
    app.route('/api/v1/auth/signup').post(app.signup);
    app.route('/api/v1/auth/signin').post(app.signin);
    app.route('/api/v1/auth/facebook').post(app.facebookAuth);
    app.route('/api/v1/auth/google').post(app.googleAuth);
 }