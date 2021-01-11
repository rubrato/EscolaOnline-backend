"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await _User2.default.findOne({ where: { email }});

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name, teacher } = user;

        return res.json({
            user: {
                id,
                name,
                email,
                teacher
            },
            token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
                expiresIn: _auth2.default.expiresIn
            }),
        });
    }

    async studentStore(req, res) {
        const student = await _User2.default.findByPk(req.params.id);

        if (!student) {
            return res.status(401).json({ error: 'User not found' });
        }

        if (student.teacher) {
            return res.status(403).json({ error: 'This route is not used for teachers' })
        }

        const { id, name, email } = student;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
                expiresIn: _auth2.default.expiresIn
            }),
        });
    }
}

exports. default = new SessionController();