module.exports = function(app){

    var User = app.models.User;
    app.getUserByEmail = function (req, res) {

        User.findOne({
            email: req.query.email
        }, function (err, result) {
            if (err) {
                return res.status(400).send({
                    message: '400'
                });
            } else {

                res.jsonp(result);
            }
        })
    }

};