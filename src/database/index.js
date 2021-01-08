import Sequelize from 'sequelize';

import User from '../app/models/User';
import Class from '../app/models/Class';
import StudentClass from '../app/models/StudentClass';

import databaseConfig from '../config/database';

const models = [User, Class, StudentClass];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();