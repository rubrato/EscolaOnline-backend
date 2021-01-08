import Sequelize, { Model } from 'sequelize';

class StudentClass extends Model {
    static init(sequelize) {
        super.init(
            {},
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'student_id', as: 'student' });
        this.belongsTo(models.Class, { foreignKey: 'class_id', as: 'class' });
    }
}

export default StudentClass;