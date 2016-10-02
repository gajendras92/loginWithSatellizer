// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


var userSchema = new mongoose.Schema({
    local: {
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    facebook: {
        id: {
            type: String,
            index: true
        }, //adding index as we search facebook users based on id
        token: {
            type: String
        },
        email: {
            type: String
        },
        name: {
            type: String
        }
    },
    google: {
        id: {
            type: String,
            index: true
        }, //adding index as we search google users based on id
        token: {
            type: String
        },
        email: {
            type: String
        },
        name: {
            type: String
        }
    },
    email: {
        type: String,
        unique: 'Email already exists',
        required: 'Please fill in a email',
        lowercase: true,
        trim: true
    },
    isEmailVerified :  {
        type: String,
        default: 'false'
    },
    name: {
        type: String
    },
    imageUrl:{
        type:String
    },
    phone: {
        type: String
    },
    updated: {
        type: Date,
        default: Date.now
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
exports.UserSchema = module.exports.UserSchema = userSchema;
exports.boot = module.exports.boot = function (app) {
    mongoose.model('User', userSchema);
    return app.models.User = mongoose.model('User');
};