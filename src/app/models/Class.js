import Sequelize, { Model } from 'sequelize';

class Class extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                class_id: Sequelize.STRING,
                date: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'teacher_id', as: 'teacher' });
    }
}

export default Class;