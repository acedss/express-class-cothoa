const checkLoginSession = (req, res, next) => {
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}

const checkSingleSession = (role) => (req, res, next) => {
    if (req.session && req.session.username && req.session.role == "admin") {
        next();
    } else {
        res.status(403).send("Access denied");
    }
};

const checkMultipleSessions = (allowedRoles) => (req, res, next) => {
    if (req.session && req.session.username) {
        if (allowedRoles.includes(req.session.role)) {
            next();
        } else {
            res.status(403).send("Access denied");
        }
    } else {
        res.redirect('/auth/login');
    }
};

module.exports = { checkLoginSession, checkSingleSession, checkMultipleSessions };