/**
 * @template T
 * @typedef {{
 *  eq?: T,
 *  equal?: T,
 *  enum?: T,
 *  required?: boolean,
 *  requires?: string[],
 *  requiresFieldsToBeEqual?: {[string]: any}
 * }} BasicOptions
 * @typedef {BasicOptions<T> & {
 *  lt?: T,
 *  lte?: T,
 *  gt?: T,
 *  gte?: T,
 *  range?: T
 * }} OptionsWithNoType
 * @typedef {{
 *  (value: T, field: string, parent: Object, req: Object) => boolean, 
 *  error: string, 
 *  type: string, 
 *  isArray?: boolean
 * }} TypeFunc
 * @typedef {{
 *  type?: string,
 *  required?: boolean,
 *  requires?: string[],
 *  requiresFieldsToBeEqual?: {[string]: any}
 * }} OptionsForArray
 * @typedef {OptionsWithNoType<T> & {
 *  type?: (string|TypeFunc)
 * }} Options
 */
const winston = require("winston")

/**
 * 
 * @param {Object} obj - any object to create a deep copy of
 * @returns {Object} - a deep copy of obj
 */
const {isObject, customTypes} = require("./utils")
const Fields = require("./Fields")
module.exports = () => {
    Fields.register(
        "type",
        async (actual, type, key, parent, req, res) => {
            const typeValidation = async (type) => type in customTypes
                ? await (async () => {
                    const result = customTypes[type](actual, key, parent, req, res)
                    return result instanceof Promise ? await result : result
                })() : (
                    type === "any" ? true : (
                        Array.isArray(type) ? await (async () => {
                            const result = await Promise.all(
                                type.map(type => Fields.validationFunctions.type(actual, type, key, parent, req, res))
                            )
                            return result.some(r => r)
                        })() : typeof actual === type
                    )
                )
            return await typeValidation(type)
        },
        (type) => (type != null ? type : {}).error != null ? (type != null ? type : {}).error : `$field must be a ${type}\${index| at index }\${name| in }!`
    )
    Fields.register(
        "eq",
        (actual, value, key, parent) => typeof actual !== "object" ? actual === value : JSON.stringify(actual) === JSON.stringify(value),
        `$field\${index| at index } must be equal to \${value}\${name| in }!`
    )
    Fields.register(
        "equal",
        (actual, value, key, parent) => typeof actual !== "object" ? actual === value : JSON.stringify(actual) === JSON.stringify(value),
        `$field\${index| at index } must be equal to \${value}\${name| in }!`
    )
    Fields.register(
        "gt",
        (actual, value, key, parent) => actual > value,
        `$field\${index| at index } must be greater than \${value}\${name| in }!`
    )
    Fields.register(
        "gte",
        (actual, value, key, parent) => actual >= value,
        `$field\${index| at index } must be greater than or equal to \${value}\${name| in }!`
    )
    Fields.register(
        "lt",
        (actual, value, key, parent) => actual < value,
        `$field\${index| at index } must be less than \${value}\${name| in }!`
    )
    Fields.register(
        "lte",
        (actual, value, key, parent) => actual <= value,
        `$field\${index| at index } must be less than or equal to \${value}\${name| in }!`
    )
    Fields.register(
        "range",
        (actual, range, key, parent) => actual <= Math.max(...range) && actual >= Math.min(...range),
        `$field\${index| at index } must be within range \${value}\${name| in }!`,
        range => (range != null ? range : {}).join(", ")
    )
    Fields.register(
        'minLength',
        (actual, minLength, key, parent) => actual.length > minLength,
        `$field\${index| at index } must have more characters than $value\${name| in }`
    )
    Fields.register(
        'maxLength',
        (actual, maxLength, key, parent) => actual.length < maxLength,
        `$field\${index| at index } must have less characters than $value\${name| in }`
    )
    Fields.register(
        "enum",
        (actual, range, key, parent) => range.some(value => typeof actual !== "object" ? actual === value : JSON.stringify(actual) === JSON.stringify(value)),
        `$field\${index| at index } must be "\${value}"\${name| in }!`,
        enumArray => {
            return (enumArray != null ? enumArray : {}).join("\", \"").replace(/\,(\s[^,]*)$/, " or$1")
        }
    )
    Fields.register(
        "requires", 
        (actual, requiresFields, key, parent) => {
            return requiresFields.every(field => parent[field] != null)
        }, 
        `"\${value}" is required for \$field\${index| at index}\${name| in }`,
        requires => (requires != null ? requires : []).join("\", \"").replace(/\,(\s[^,]*)$/, " and$1")
    )
    Fields.register(
        "requiresFieldsToBeEqual", 
        (actual, requiresFieldsToBeEqualTo, key, parent) => {
            return Object.keys(requiresFieldsToBeEqualTo).every(field => {
                if(
                    isObject(requiresFieldsToBeEqualTo[field]) 
                    || requiresFieldsToBeEqualTo[field] instanceof Array
                ) {
                    try {
                        expectedJson = JSON.stringify(requiresFieldsToBeEqualTo[field])
                        actualJson = JSON.stringify(parent[field])
                        return actualJson === expectedJson
                    } catch (error) {
                        if(error instanceof TypeError) return false
                        throw error
                    }
                }
                return requiresFieldsToBeEqualTo[field] === parent[field]
            })
        },
        `\${value} for \$field\${index| at index }\${name| in }!`,
        requiresFieldsToBeEqual => Object.keys(requiresFieldsToBeEqual != null ? requiresFieldsToBeEqual : {}).map(field => {
            return `${field} must be "${requiresFieldsToBeEqual[field]}"`
        }).join(", ").replace(/\,(\s[^,]*)$/, " and$1")
    )
}