"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Class extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: _sequelize2.default.STRING,
                class_id: _sequelize2.default.STRING,
                date: _sequelize2.default.DATE,
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

exports. default = Class;