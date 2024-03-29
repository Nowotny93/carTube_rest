const router = require('express').Router();

const { register, login, logout } = require('../sevices/users')

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {

        const result = await register(username, password);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        // res.status(400).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await login(username, password);
        res.json(result);
    } catch (err) {
        console.error(err);
        // res.status(400).json({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    logout(req.user.token);
    res.status(204).end();
});

module.exports = router