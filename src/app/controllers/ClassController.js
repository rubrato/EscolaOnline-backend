import Class from '../models/Class';
import User from '../models/User';

class ClassController {
    async index(req, res) {
        const { teacher_id } = req.body;

        const classes = await Class.findAll({
            where: { teacher_id: teacher_id }
        });

        return res.json(classes);
    }

    async store(req, res) {
        const { name, class_id, teacher_id, date } = req.body;

        const isTeacher = await User.findOne({
            where: { id: teacher_id, teacher: true },
        });

        if (!isTeacher) {
            return res.status(401).json({ error: 'Usuário selecionado não é um professor' });
        }

        const tClass = await Class.create({
            name,
            class_id,
            teacher_id,
            date
        });

        return res.json(tClass);
    }
}

export default new ClassController();