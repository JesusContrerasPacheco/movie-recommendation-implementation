/* jshint esversion: 9 */

const validateCustom = (schema, value, helpers, customType, auxValues) => {
    const validation = schema.validate(value);
    const {
      error,
    } = validation;
    if (error) {
      const {
        details,
      } = error;
      const {
        context,
      } = details[0];
      const {
        _rules,
      } = helpers.schema;
  
      const rules = _rules;
      const nameRule = rules[0].name;
  
      let tipoDocumento;
      switch (nameRule) {
        case 'dni':
          tipoDocumento = 'DNI';
          break;
        case 'ruc':
          tipoDocumento = 'RUC';
          break;
        case 'diplomatico':
          tipoDocumento = 'CARNET DE DIPLOMATICO';
          break;
        case 'ce':
          tipoDocumento = 'CARNET EXTRANJERIA';
          break;
        case 'pasaporte':
          tipoDocumento = 'PASAPORTE';
          break;
        default:
          tipoDocumento = 'numeroDocumento';
          break;
      }
  
      const {
        limit,
        valids,
      } = context;
      return helpers.error(customType, {
        limit,
        valids,
        value,
        auxValues,
        tipoDocumento,
      });
    }
    return value;
  };
  
  module.exports = (joi) => {
    return {
      type: 'string',
      base: joi.string(),
      messages: {
        'document.string.length': 'El campo {{#label}} debe tener {{#limit}} caracteres',
        'document.string.min': 'El campo {{#label}} debe tener un mínimo de {{#limit}} caracteres',
        'document.string.max': 'El campo {{#label}} debe tener un máximo de {{#limit}} caracteres',
        'document.any.only': 'El campo {{#label}} debe tener uno de estos valores {{#valids}}',
        'document.string.pattern.base': 'El campo {{#label}} no cumple con el formato',
        'document.only.startwith': 'El campo {{#label}} debe empezar con uno de estos valores {{#valids}}',
        'document.only.isValid': 'El campo {{#label}} debe tener uno de estos valores {{#auxValues}}',
        'document.wrong.format': 'El "{{#tipoDocumento}}" con número "{{#value}}" ingresado no es válido',
        'document.string.empty': 'El campo "{{#label}}" no debe estar vacio',
      },
      rules: {
        isValid: {
          multi: true,
          method(valids, showValids) {
            return this.$_addRule({
              name: 'isValid',
              args: {
                valids,
                showValids,
              },
            });
          },
          args: [{
              name: 'valids',
              ref: true,
              assert: (value) => Array.isArray(value),
              message: 'El valor debe de ser del tipo array.',
            },
            {
              name: 'showValids',
              ref: true,
              assert: (value) => Array.isArray(value),
              message: 'El valor debe de ser del tipo array.',
            },
          ],
          validate(value, helpers, args) {
            const {
              valids,
              showValids,
            } = args;
  
            const
              schema = joi.string().valid(...Object.values(valids));
            const newValue = showValids;
            return validateCustom(schema, value, helpers, 'document.only.isValid', newValue);
          },
        },
        startWith: {
          multi: true,
          method(valids, position) {
            return this.$_addRule({
              name: 'startWith',
              args: {
                valids,
                position,
              },
            });
          },
          args: [{
              name: 'valids',
              ref: true,
              assert: (value) => Array.isArray(value),
              message: 'El valor debe de ser del tipo array.',
            },
            {
              name: 'position',
              ref: true,
              assert: (value) => Number.isInteger(value),
              message: 'El valor debe de ser del tipo number.',
            },
          ],
          validate(value, helpers, args) {
            const {
              valids,
              position,
            } = args;
            const
              schema = joi.string().valid(...Object.values(valids));
            const newValue = value.substring(0, position);
            return validateCustom(schema, newValue, helpers, 'document.only.startwith');
          },
        },
  
        dni: {
          multi: true,
          method() {
            return this.$_addRule({
              name: 'dni',
            });
          },
          validate(value, helpers) {
            const schema = joi.string()
              .pattern(new RegExp('^[0-9]+$'))
              .length(8);
  
            return validateCustom(schema, value, helpers, 'document.wrong.format');
          },
        },
  
        ruc: {
          method() {
            return this.$_addRule('ruc');
          },
          validate(value, helpers) {
            const schema = joi.string()
              .pattern(new RegExp('^[0-9]+$'))
              .length(11)
              .pattern(new RegExp('^10|20[0-9]+$'));
  
            return validateCustom(schema, value, helpers, 'document.wrong.format');
          },
        },
  
        pasaporte: {
          method() {
            return this.$_addRule('pasaporte');
          },
          validate(value, helpers) {
            const schema = joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9]+$'))
              .min(8)
              .max(10);
  
            return validateCustom(schema, value, helpers, 'document.wrong.format');
          },
        },
  
        ce: {
          method() {
            return this.$_addRule('ce');
          },
          validate(value, helpers) {
            const schema = joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9]+$'))
              .min(7)
              .max(11);
  
            return validateCustom(schema, value, helpers, 'document.wrong.format');
          },
        },
  
        diplomatico: {
          method() {
            return this.$_addRule('diplomatico');
          },
          validate(value, helpers) {
            const schema = joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9]+$'))
              .min(8)
              .max(12);
  
            return validateCustom(schema, value, helpers, 'document.wrong.format');
          },
        },
  
        sexo: {
          method() {
            return this.$_addRule('sexo');
          },
          validate(value, helpers) {
            const values = ['M', 'F'];
            const schema = joi.string().valid(...Object.values(values));
  
            return validateCustom(schema, value, helpers, 'document.any.only');
          },
        },
  
      },
  
    };
  };
  