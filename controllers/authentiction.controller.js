var config = require('../config/config');
var request = require('request');
var tokenService = require('../config/jwt.token.service.js');

module.exports = function(app){

    var User = app.models.User;
    app.signup = function (req, res) {
        var newUser = new User(req.body);
        newUser.local.email = req.body.email;
        newUser.local.password = newUser.generateHash(req.body.password);
        newUser.save(function (err, savedUser) {
            if(err) {
                return res.status(400).send({
                    message: "Email already exist"
                });
            }
            console.log("savedUser",savedUser);
            var resultUser = savedUser.toObject();
            delete resultUser.local;
            res.jsonp({token: tokenService.issueToken(resultUser),user:savedUser});
        });

    }

  app.signin = function (req, res) {
        console.log("req.body.email",req.body);
        app.models.User.findOne(
            {$or: [{
                'local.email': req.body.email
            }, {
                'email': req.body.email
            }]}).exec(function (err, user) {
                if (err) {
                    return res.status(400).send({
                        message: 'Please send user id password.'
                    });
                }

                // if no user is found, return the message
                if (!user) {
                    return res.status(404).send({
                        message: 'No user found.'
                    });
                }
                if(user.local.password!=undefined){
                    if (!user.validPassword(req.body.password)) {
                        return res.status(400).send({
                            message: 'Oops! Wrong password.'
                        });
                    }
                    else {
                        var resultUser = user.toObject();
                        delete resultUser.local;
                        res.jsonp({token: tokenService.issueToken(resultUser)});
                    }
                }
                else{
                    return res.status(400).send({
                        message: 'no password.'
                    });
                }


            });
    }

    app.facebookAuth = function (req, res) {
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name','picture'];
        var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
        var params = {
            code: req.body.code,
            client_id: config.facebook.clientID,
            client_secret: config.facebook.clientSecret,
            redirect_uri: req.body.redirectUri
        };

        // Step 1. Exchange authorization code for access token.
        request.get({ url: accessTokenUrl, qs: params, json: true }, function (err, response, accessToken) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: accessToken.error.message });
            }

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function (err, response, profile) {


                if (response.statusCode !== 200) {
                    return res.status(500).send({ message: profile.error.message });
                }

                checkEmail('facebook', req, res, profile, accessToken.access_token);
            });
        });
    };

    app.googleAuth = function (req, res) {
        var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        console.log("req.body",req.body);
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.google.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

        // Step 1. Exchange authorization code for access token.
        request.post(accessTokenUrl, { json: true, form: params }, function (err, response, token) {

            var reqUrl = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token.access_token;
            request.get(reqUrl, {
            }, function (error, response, body) {
                if (error || !body) {
                    return res.sendStatus(400);
                };
                if (body) {
                    var profile = JSON.parse(body);
                    checkEmail('google', req, res, profile, token.access_token);
                }
            });
        });
    }

   /* function checkEmail(socialType, req, res, profile, token) {
        var findCondition = {};
        findCondition[socialType + '.id'] = profile.id;
        User.findOne(findCondition, function (err, existingUser) {
            if (existingUser) {
                if (!existingUser.email) {
                    existingUser.name=profile.name;
                    existingUser.email = profile.email;
                }
                if (!existingUser.name) {
                    existingUser.name = profile.name;
                }
                if(!existingUser.imageUrl){
                    if(socialType == 'google'){
                        existingUser.imageUrl=profile.picture;
                    }
                    else{
                        existingUser.imageUrl=profile.picture.data.url;
                    }
                }
                existingUser[socialType].token = token;

                existingUser.save();
                delete existingUser[socialType];
                return res.jsonp({user: existingUser, token: tokenService.issueToken(existingUser)});
            } else {
                User.findOne({email: profile.email}, function (err, localUser) {
                    if (localUser) {
                        if (!localUser.name) {
                            localUser.name = profile.name;
                        }
                        localUser[socialType].token = token;
                        localUser.save();
                        delete localUser[socialType];
                        return res.jsonp({user: localUser, token: tokenService.issueToken(localUser)});
                    }
                    var user = new User();
                    user[socialType] = {};
                    user[socialType].id = profile.id;
                    user[socialType].name = profile.name;
                    user[socialType].email = profile.email;
                    user[socialType].token = token;
                    user.email = profile.email;
                    if(socialType == 'google'){
                        user.imageUrl = profile.picture;
                    }
                    else{
                        user.imageUrl = profile.picture.data.url;
                    }
                    user.name = profile.name;
                    user.save(function (err, data) {
                        res.jsonp({user: user, token: tokenService.issueToken(user)});
                    });
                });
            }
        });
    }*/
};