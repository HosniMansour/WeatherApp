let id = require('pow-mongodb-fixtures').createObjectId;

const users = exports.users = {
    user1: {
        _id: id(),
        email: 'email1@email.com',
        password: '$2b$10$7JIFmq3KHmtw/0wGEBA2TuotQ7annfi9CGZ9miPNDaQaMvRBUKYbO',
        cities: ["Tunis","London"],
    },
    user2: {
        _id: id(),
        email: 'email2@email.com',
        password: '$2b$10$7JIFmq3KHmtw/0wGEBA2TuotQ7annfi9CGZ9miPNDaQaMvRBUKYbO',
        cities: ["Tunis","Paris"],
    }
    ,
    user3: {
        _id: id(),
        email: 'email3@email.com',
        password: '$2b$10$7JIFmq3KHmtw/0wGEBA2TuotQ7annfi9CGZ9miPNDaQaMvRBUKYbO',
        cities: ["Paris"],
    }
};