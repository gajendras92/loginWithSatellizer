module.exports = function(app){
    app.route('/api/v1/getUserByEmail')
        .get(app.getUserByEmail);

};