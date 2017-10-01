
const mongoose = require('mongoose');
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/emply';
mongoose.Promise = Promise;

module.exports = function(dbUri) {
    const promise = mongoose.connect(dbUri)
        .then(() => mongoose.connection);



    mongoose.connect(dbUri);

    mongoose.connection.on('connected', function() {
        console.log('mongoose default connection open to' + dbUri);
    });

    mongoose.connection.on('error', function(err) {
        console.log('mongoose default connection error' + err);
    });

    mongoose.connection.on('disconnected', function() {
        console.log('mongoose default connection disconnected');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
    return promise;
};

