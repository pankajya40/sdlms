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
 *  (value: T, field: string, parent: Object) => boolean, 
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

/**
 * 
 * @param {Object} obj - any object to create a deep copy of
 * @returns {Object} - a deep copy of obj
 */

const {createType, customTypes, uploadFiles} = require("./utils")

const File = createType(
    "file",
    async (file, key, parent, req) => {
        const Fields = require("./Fields")
        const $file = new Fields()
            .string("data", {required: true})
            .string("type", {required: true})
            .string("name", {required: true})
            .string("originalFilename", {required: true})
            .object("headers", new Fields().required()
                .string("content-type", {required: true})
            )
            const {valid, error} = await $file.validate(file)

        if(!valid) {
            customTypes["file"].error = `$field must be a file$(index| at index )$(name| in )`
            return false
        }
        try {
            const {url} = await uploadFiles(req, file, key)
            parent[key] = url
            return true
        }
        catch(err) {
            customTypes["file"].error = `couldn't upload $field$(index| at index )$(name| in )!`
            return false
        }
    },
    `couldn't upload $field$(index| at index )$(name| in )!`
)

const DTID = createType(
    "id",
    (id, key, parent) => {
        const lid = parseInt(id)
        if(!lid || lid < 1) return false
        parent[key] = lid
        return true
    },
    "Invalid $field${index| at index }${name| in }"
)

/**
 * 
 * @param {string} type - type of the array type
 * @returns {TypeFunc<T>}  
 */
function ArrayOf(type) {
    /**
     * @author Subham Bhattacharjee
     * @description type for arrays
     * @param {any[]} array - array to type check
     * @param {string} key - key of the field
     * @param {Object} parent - parent of the array
     * @returns {boolean}
     */
    if(!type instanceof String) throw new Error("type must either be a function or a string")
    const ArrayTypeTemp = `Array of ${(type != null ? type : {}).type != null ? (type != null ? type : {}).type : type != null ? type : "any"}`
    const ArrayType = createType(ArrayTypeTemp, type === "any" ? (array, key, parent) => Array.isArray(array) : (array, key, parent) => {
        customTypes[ArrayTypeTemp].error = `$field must be an ${ArrayTypeTemp}\${index| at index }\${name| in }!`
        if(!Array.isArray(array)) return false
        if(type in customTypes) return array.every((current, key, index) => {
            const mockParent = {[key]: array[index]}
            const result = customTypes[type](current, key, mockParent)
            parent[key][index] = mockParent[key]
            customTypes[ArrayTypeTemp].error = `$field must be a ${type} at index ${index}`
            return result
        })
        return array.every((current, index) => {
            result = typeof current === type
            customTypes[ArrayTypeTemp].error = `$field must be a ${type} at index ${index}`
            return result
        })
    }, `$field must be an ${ArrayTypeTemp}\${index| at index }\${name| in }!`, true)
    return ArrayType
}
const Time = createType("valid time", (time, key, parent) => {
        if(!Date(time)) return false
        parent[key] = Date(time)
    },
    `$field must be a valid time \${index| at index }\${name| in }!`
)

module.exports = {DTID, ArrayOf, Time, File}