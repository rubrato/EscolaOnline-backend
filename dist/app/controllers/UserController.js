"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
    async index(req, res) {
        const users = await _User2.default.findAll({
            attributes: ['id', 'name', 'email', 'teacher']
        });

        return res.json(users);
    }

    async store(req, res) {
        const user = await _User2.default.create(req.body);

        return res.json(user);
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        const user = await _User2.default.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await _User2.default.findOne({ where: { email }});

            if (userExists) {
                return res.status(400).json({ error: 'Email já em uso por outro usuário' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { id, name, teacher } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            teacher
         })
    }
}

exports. default = new UserController();