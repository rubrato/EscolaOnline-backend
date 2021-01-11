"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Class = require('../models/Class'); var _Class2 = _interopRequireDefault(_Class);

var _StudentClass = require('../models/StudentClass'); var _StudentClass2 = _interopRequireDefault(_StudentClass);

class StudentClassController {
    async index(req, res) {
        const { class_id } = req.body;

        const tClass = await _Class2.default.findOne({
            where: { id: class_id },
            attributes: [ 'name', 'class_id' ]
        })

        const students = await _StudentClass2.default.findAll({
            include: [
                {
                    model: _User2.default,
                    as: 'student',
                    attributes: ['id', 'name', 'email'],
                },
            ],

            where: { class_id },

            attributes: []
        });

        return res.json({ tClass, students });
    }

    async store(req, res) {
        const { student_id,  class_id } = req.body;

        const studentClass = await _StudentClass2.default.findOrCreate({
            where: {
                student_id,
                class_id,
            }
        });

        return res.json({ studentClass });
    };
}

exports. default = new StudentClassController();