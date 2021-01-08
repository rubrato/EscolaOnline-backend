import User from '../models/User';

class UserController {
    async index(req, res) {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'teacher']
        });

        return res.json(users);
    }

    async store(req, res) {
        const user = await User.create(req.body);

        return res.json(user);
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({ where: { email }});

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

export default new UserController();