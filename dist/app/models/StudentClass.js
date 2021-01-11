"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class StudentClass extends _sequelize.Model {
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

exports. default = StudentClass;