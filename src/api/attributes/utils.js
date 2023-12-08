"use strict";

module.exports = {
    groupKey: function (_key) {
        _key = _key.reduce((acc, curr) => {
            const [key, value] = curr;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(value);
            return acc;
        }, {});
        return _key;
    },

    /**
     * 
     * @date 10-03-2023
     * @author imshawan <hello@imshawan.dev>
     * @function validateArrayOfObjects
     * @description Validates each object in an array with the requiredFields supplied in 2nd param. 
     * Returns error with proper index where the object is found to have missing properties as per supplied requiredFields.
     * 
     * @param {Array} arrayOfObjects 
     * @param {string} arrayPropName
     * @param {Array} requiredFields 
     */
    validateArrayOfObjects: function (arrayOfObjects=[], arrayPropName, requiredFields=['label', 'value']) {
        const errors = [];
    
        if (!Array.isArray(arrayOfObjects)) {
            throw new Error(`'${arrayPropName}' must be an array of objects, found ${typeof arrayOfObjects} instead`);
        }
    
        arrayOfObjects.forEach((object, index) => {
            requiredFields.forEach(field => {
                if (!object.hasOwnProperty(field) || !object[field]) {
                    errors.push(`Invalid object structure at position ${index}`)
                }
            });
        });
    
        if (errors.length) {
            throw new Error(errors);
        }
    }
}