
const Joi = require('@hapi/joi');
const ErrorConstant = require('./supports/error.constant');
const CustomException = require('./supports/custom.exception');
const DomainConstant = require("./supports/domain.constant");

module.exports = {
  async createUser(payload) {
    const schema = Joi.object().keys({
      facebookId: Joi.string().optional().empty('')
        .min(12)
        .message('Identificador de facebook debe tener como minimo 12 digitos')
        .max(25)
        .message('Identificador de facebook debe tener como maximo 25 digitos'),
      country: Joi.string().required()
        .valid(...Object.values(DomainConstant.CODE_COUNTRY_PHONE))
        .length(2)
        .message("El codigo de pais debe tener 2 digitos"),
      coverPicture: Joi.string().optional().empty('')
        .pattern(new RegExp('^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$'))
        .message('La foto de portada no tiene el formato de URL'),
      profilePicture: Joi.string().optional().empty('')
        .pattern(new RegExp('^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$'))
        .message('La foto de perfil no tiene el formato de URL'),
      name: Joi.string().required()
        .min(2)
        .message('El nombre debe tener como minimo 2 digitos')
        .max(20)
        .message('El nombre debe tener como maximo 20 digitos'),
      lastName: Joi.string().required()
        .min(4)
        .message('El apellido debe tener como minimo 4 digitos')
        .max(50)
        .message('El apellido debe tener como maximo 50 digitos'),
      mobile: Joi.string().required()
        .length(9)
        .message('El numero de telefono debe tener 9 digitos'),
      device: Joi.object().keys({
        location: Joi.string().required()
          .min(5)
          .message('La ubicacion debe tener como minimo 5 digitos')
          .max(30)
          .message('La ubicacion debe tener como maximo 30 digitos'),
        model: Joi.string().required()
          .min(3)
          .message('El modelo debe tener como minimo 3 digitos')
          .max(15)
          .message('El modelo debe tener como maximo 15 digitos'),
        origin: Joi.string().required()
          .min(3)
          .message('El origen debe tener como minimo 3 digitos')
          .max(10)
          .message('El origen debe tener como maximo 10 digitos')
      }).optional()
    });
    await Validator.validate(schema, payload).catch((reason) => {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      const {
        message,
      } = reason;
      new CustomException(
        ErrorConstant.ERROR_VALIDACION_DATOS.code,
        ErrorConstant.ERROR_VALIDACION_DATOS.message,
        message.filter(distinct),
        HttpConstant.BAD_REQUEST_STATUS.code.toString(),
      ).throw(!Types.isEmpty(reason));
    });
  },
  async updateUser(payload) {
    const schema = Joi.object().keys({
      coverPicture: Joi.string().optional().empty('')
        .pattern(new RegExp('^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$'))
        .message('La foto de portada no tiene el formato de URL'),
      profilePicture: Joi.string().optional().empty('')
        .pattern(new RegExp('^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$'))
        .message('La foto de perfil no tiene el formato de URL'),
      name: Joi.string().required()
        .min(2)
        .message('El nombre debe tener como minimo 2 digitos')
        .max(20)
        .message('El nombre debe tener como maximo 20 digitos'),
      hash: Joi.string().required()
        .min(50)
        .message('El hash debe tener como minimo 50 digitos')
        .max(300)
        .message('El hash debe tener como maximo 300 digitos'),
      lastName: Joi.string().required()
        .min(4)
        .message('El apellido debe tener como minimo 4 digitos')
        .max(50)
        .message('El apellido debe tener como maximo 50 digitos'),
      // mobile: Joi.string().required()
      //   .length(9)
      //   .message('El numero de telefono debe tener 9 digitos'),
      country: Joi.string().required()
        .valid(...Object.values(DomainConstant.CODE_COUNTRY_PHONE))
        .length(2)
        .message("El codigo de pais debe tener 2 digitos"),
    });
    await Validator.validate(schema, payload).catch((reason) => {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      const {
        message,
      } = reason;
      new CustomException(
        ErrorConstant.ERROR_VALIDACION_DATOS.code,
        ErrorConstant.ERROR_VALIDACION_DATOS.message,
        message.filter(distinct),
        HttpConstant.BAD_REQUEST_STATUS.code.toString(),
      ).throw(!Types.isEmpty(reason));
    });
  },
  async getUser(payload) {
    const schema = Joi.object().keys({
      hash: Joi.string().required()
        .min(50)
        .message('El hash debe tener como minimo 50 digitos')
        .max(300)
        .message('El hash debe tener como maximo 300 digitos'),
      country: Joi.string().required()
        .valid(...Object.values(DomainConstant.CODE_COUNTRY_PHONE))
        .length(2)
        .message("El codigo de pais debe tener 2 digitos"),
    });
    await Validator.validate(schema, payload).catch((reason) => {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      const {
        message,
      } = reason;
      new CustomException(
        ErrorConstant.ERROR_VALIDACION_DATOS.code,
        ErrorConstant.ERROR_VALIDACION_DATOS.message,
        message.filter(distinct),
        HttpConstant.BAD_REQUEST_STATUS.code.toString(),
      ).throw(!Types.isEmpty(reason));
    });
  },
  // Friends
  async createFriend(payload) {
    const schema = Joi.object().keys({
      hash: Joi.string().required()
        .min(50)
        .message('El hash debe tener como minimo 50 digitos')
        .max(300)
        .message('El hash debe tener como maximo 300 digitos'),
      hash2: Joi.string().required()
        .min(50)
        .message('El hash2 debe tener como minimo 50 digitos')
        .max(300)
        .message('El hash2 debe tener como maximo 300 digitos'),
      country: Joi.string().required()
        .valid(...Object.values(DomainConstant.CODE_COUNTRY_PHONE))
        .length(2)
        .message("El codigo de pais debe tener 2 digitos"),
    });
    await Validator.validate(schema, payload).catch((reason) => {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      const {
        message,
      } = reason;
      new CustomException(
        ErrorConstant.ERROR_VALIDACION_DATOS.code,
        ErrorConstant.ERROR_VALIDACION_DATOS.message,
        message.filter(distinct),
        HttpConstant.BAD_REQUEST_STATUS.code.toString(),
      ).throw(!Types.isEmpty(reason));
    });
  },
  async listFriends(payload) {
    const schema = Joi.object().keys({
      hash: Joi.string().required()
        .min(50)
        .message('El hash debe tener como minimo 50 digitos')
        .max(300)
        .message('El hash debe tener como maximo 300 digitos'),
      country: Joi.string().required()
        .valid(...Object.values(DomainConstant.CODE_COUNTRY_PHONE))
        .length(2)
        .message("El codigo de pais debe tener 2 digitos"),
      state: Joi.string().required()
        .valid(...Object.values(DomainConstant.STAT))
        .length(3)
        .message("El codigo de pais debe tener 3 digitos"),
    });
    await Validator.validate(schema, payload).catch((reason) => {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      const {
        message,
      } = reason;
      new CustomException(
        ErrorConstant.ERROR_VALIDACION_DATOS.code,
        ErrorConstant.ERROR_VALIDACION_DATOS.message,
        message.filter(distinct),
        HttpConstant.BAD_REQUEST_STATUS.code.toString(),
      ).throw(!Types.isEmpty(reason));
    });
  },
  async createStorie(payload) {
    const schema = Joi.object().keys({
      country: Joi.string().required()
        .valid(...Object.values(DomainConstant.CODE_COUNTRY_PHONE))
        .length(2)
        .message("El codigo de pais debe tener 2 digitos"),
      image: Joi.string().optional().empty('')
        .pattern(new RegExp('^(http|https)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$'))
        .message('La foto de portada no tiene el formato de URL'),
      hash: Joi.string().required()
        .min(50)
        .message('El hash debe tener como minimo 50 digitos')
        .max(300)
        .message('El hash debe tener como maximo 300 digitos'),
    });
    await Validator.validate(schema, payload).catch((reason) => {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      const {
        message,
      } = reason;
      new CustomException(
        ErrorConstant.ERROR_VALIDACION_DATOS.code,
        ErrorConstant.ERROR_VALIDACION_DATOS.message,
        message.filter(distinct),
        HttpConstant.BAD_REQUEST_STATUS.code.toString(),
      ).throw(!Types.isEmpty(reason));
    });
  },
  async getStorie(payload) {
    const schema = Joi.object().keys({
      country: Joi.string().required()
        .valid(...Object.values(DomainConstant.CODE_COUNTRY_PHONE))
        .length(2)
        .message("El codigo de pais debe tener 2 digitos"),
      hash: Joi.string().required()
        .min(50)
        .message('El hash debe tener como minimo 50 digitos')
        .max(300)
        .message('El hash debe tener como maximo 300 digitos'),
      hash2: Joi.string().required()
        .min(50)
        .message('El hash debe tener como minimo 50 digitos')
        .max(300)
        .message('El hash debe tener como maximo 300 digitos'),
      uuid: Joi.string().required().guid({ version : 'uuidv4' })
        .message("El uuid no tiene un formato correcto")
    });
    await Validator.validate(schema, payload).catch((reason) => {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      const {
        message,
      } = reason;
      new CustomException(
        ErrorConstant.ERROR_VALIDACION_DATOS.code,
        ErrorConstant.ERROR_VALIDACION_DATOS.message,
        message.filter(distinct),
        HttpConstant.BAD_REQUEST_STATUS.code.toString(),
      ).throw(!Types.isEmpty(reason));
    });
  },
};
