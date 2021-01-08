import User from '../models/User';
import Class from '../models/Class';

import StudentClass from '../models/StudentClass';

class StudentClassController {
    async index(req, res) {
        const { class_id } = req.body;

        const tClass = await Class.findOne({
            where: { id: class_id },
            attributes: [ 'name', 'class_id' ]
        })

        const students = await StudentClass.findAll({
            include: [
                {
                    model: User,
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

        const studentClass = await StudentClass.findOrCreate({
            where: {
                student_id,
                class_id,
            }
        });

        return res.json({ studentClass });
    };
}

export default new StudentClassController();