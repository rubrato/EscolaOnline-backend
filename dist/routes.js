"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _ClassController = require('./app/controllers/ClassController'); var _ClassController2 = _interopRequireDefault(_ClassController);
var _StudentClassController = require('./app/controllers/StudentClassController'); var _StudentClassController2 = _interopRequireDefault(_StudentClassController);

var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

routes.post('/users', _UserController2.default.store);
routes.get('/users', _UserController2.default.index);
routes.post('/sessions', _SessionController2.default.store);

routes.post('/sessions/:id', _SessionController2.default.studentStore);

routes.use(_auth2.default);

routes.put('/users', _UserController2.default.update);

routes.get('/classes', _ClassController2.default.index);
routes.post('/classes', _ClassController2.default.store);

routes.get('/classes/students', _StudentClassController2.default.index);
routes.post('/classes/student', _StudentClassController2.default.store);

exports. default = routes;