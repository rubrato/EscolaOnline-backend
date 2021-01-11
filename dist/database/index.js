"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Class = require('../app/models/Class'); var _Class2 = _interopRequireDefault(_Class);
var _StudentClass = require('../app/models/StudentClass'); var _StudentClass2 = _interopRequireDefault(_StudentClass);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

const models = [_User2.default, _Class2.default, _StudentClass2.default];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new (0, _sequelize2.default)(_database2.default);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

exports. default = new Database();