"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Class = require('../models/Class'); var _Class2 = _interopRequireDefault(_Class);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class ClassController {
    async index(req, res) {
        const { teacher_id } = req.body;

        const classes = await _Class2.default.findAll({
            where: { teacher_id: teacher_id }
        });

        return res.json(classes);
    }

    async store(req, res) {
        const { name, class_id, teacher_id, date } = req.body;

        const isTeacher = await _User2.default.findOne({
            where: { id: teacher_id, teacher: true },
        });

        if (!isTeacher) {
            return res.status(401).json({ error: 'Usuário selecionado não é um professor' });
        }

        const tClass = await _Class2.default.create({
            name,
            class_id,
            teacher_id,
            date
        });

        return res.json(tClass);
    }
}

exports. default = new ClassController();