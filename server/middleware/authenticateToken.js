const Sessions = require('../models/Sessions');

const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const session = await Sessions.findOne({ token });
        if (!session) return res.status(403).json({ message: 'Invalid session' });

        req.userId = session.userId; 
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authenticateToken;

