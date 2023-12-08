"use strict";

const User = require('../../user');
const utils = require('./utils');
const db = require('../../database');
const { ObjectId } = require('mongodb');
const _ = require('lodash');
const attributes = module.exports;
const FLATTEN_ITERATIONS = 2;

const userFields = ['username', 'fullname', 'picture'];

attributes.response = function (data, identifier) {

    if (!Array.isArray(data)) return [];


    data = data.map(el => {
        el._attribute = `attribute:${el[identifier]}`;
        return el;
    });

    return data;

}
attributes.populate = async function (Arr = [], populate = []) {

    if (Array.isArray(Arr) && Arr.length == 0) return Arr;
    if (Array.isArray(populate) && populate.length == 0) return Arr;

    if (!Array.isArray(Arr)) Arr = [Arr];
    if (!Array.isArray(populate)) populate = [populate];

    populate = populate.filter(el => el && typeof el == 'string').map(el => el.split(':'));

    // group by first element

    let attributesKeys = Arr.map(Obj => {
        let _keys = [];
        populate.forEach(field => {
            let values = _.get(Obj, field[0] || field[1],null);
            if(!values) return;
            if(field[0].includes('.')){
                if(Array.isArray(values)) values = values.map(el => el[field[1]]);
                else values = values[field[1]];               
            }
           
            _keys.push(values);
        });
        return _keys;
    });
    
    
    Array.from({ length: FLATTEN_ITERATIONS }).forEach(() => {
        attributesKeys = _.flatten(attributesKeys);
    });
    
    attributesKeys = attributesKeys.filter(el => el && typeof el == 'string');
    let attributeResponse = await attributes.try(attributesKeys);
    attributeResponse = attributeResponse || [];

    populate.forEach(field => {
        let _field = Array.isArray(field) ? (field[1] || field[0]) : field;
        let _key = Array.isArray(field) ? field[0] : _field;

        Arr = Arr.map(Obj => {
            let values = _.get(Obj, _key, null);
            if(!values) return Obj;

            if(Array.isArray(values)){
                values = values.map(el => {
                    let _value = el[_field] || el;
                    return attributeResponse[_field].find(el => el._attribute == `attribute:${_value.split(':')[1]}`);
                });
            } else if(typeof values == 'object'){
                let _value = values[_field];
               
                if(!_value) return Obj;
                values = attributeResponse[_field].find(el => el._attribute == `attribute:${_value.split(':')[1]}`);
            } else if(typeof values == 'string'){
                values = attributeResponse[_field].find(el => el._attribute == `attribute:${values.split(':')[1]}`);
            }
            Obj = _.set(Obj, _key, values);
            return Obj;
        });
    });

    return Arr;

}
attributes.try = async function (_key, callback) {
    let response = {};

    try {
        _key = Array.isArray(_key) ? _key : [_key];
        _key = _key.filter(el => el && typeof el == 'string').map(el => el.split(':'));
        if (!_key.length) return null;

        // group by first element
        _key = utils.groupKey(_key);
        
        await Promise.all(Object.keys(_key).map(async key => {
            let value = _key[key];
            value = [...new Set(value)];
            let method = attributes[key];
            response[key] = null;
            try {
                if (typeof method === 'function') {
                    response[key] = await method(value);
                }
            } catch (error) {
                console.log(error);
            }
        }));

        return response;

    } catch (error) {

        console.log(error);
        if (typeof callback != 'function') {
            return;
        }

        if (callback.constructor.name === 'AsyncFunction') {
            return await callback(error, null);
        }
        return callback(error, null);
    }

}
attributes.sanitizeObjectId = function (value) {
    if (!value) return null;
    if (!Array.isArray(value)) value = [value];
    value = value.filter(e => ObjectId.isValid(e)).map(el => ObjectId(el));
    value = [...new Set(value)];
    if (!value.length) return null;
    return value;
}

attributes.findByIds = async function (collectionName, _ids) {

    _ids = attributes.sanitizeObjectId(_ids);
    if (!_ids) return null;

    if (!collectionName) return null;
    let data = await db.findFields(collectionName, { _id: { $in: _ids } }, []);

    return attributes.response(data, '_id');
}

attributes.user = async (value) => {

    if (!value) return null;
    if (!Array.isArray(value)) value = [value];
    value = value.map(el => parseInt(el)).filter(el => el);
    if (!value.length) return null;
    let users = await User.getUsersFields(value, userFields);
    return attributes.response(users, 'uid');

}