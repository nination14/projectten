const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

async function authenticateUser(req, res, next) {
    const credentials = auth(req);

    if (credentials) {
        try {
            const user = await User.findOne({ where: { emailAddress: credentials.name }, attributes: { exclude: ['createdAt', 'updatedAt',] }});
            if (user) {
                const isAuthenticated = bcryptjs
                .compareSync(credentials.pass, user.password);
                if (isAuthenticated) {
                    req.currentUser = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emailAddress: user.emailAddress
                    }; 
                    next();
                } else {
                    const err = new Error('Not Authorized');
                    err.status = 401;
                    next(err);
                }
            } else {
                const err = new Error('Not Authorized');
                err.status = 401;
                next(err);
            }
        } catch (error) {
            next(error);
        }
    } else {
        const err = new Error('Not Authorized');
        err.status = 401;
        next(err);
    }
}

module.exports = authenticateUser;
