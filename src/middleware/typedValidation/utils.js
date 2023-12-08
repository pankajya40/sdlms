/**
 * @template T
 * @typedef {{
 *  (value: T, field: string, parent: Object) => boolean, 
 *  error: string, 
 *  type: string, 
 *  isArray?: boolean
 * }} TypeFunc
 */

/**
 * 
 * @param {Object} obj - any object to create a deep copy of
 * @returns {Object} - a deep copy of obj
 */

 const uid = require("uid-safe")
 const path = require("path")
 const os = require("os")
 const fs = require("fs")
 const fileUploads = require("../../controllers/FIleUpload")
 const File = require("../../file")

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}
function isObject(object) {
    return object != null && (typeof object === "function" || typeof object === "object")
}

const customTypes = {}

/**
 * 
 * @param {string} type - name of the type
 * @param {(value: any, key: string, parent: object, req?: object, res?: object) => Promise<boolean> | boolean} typeValidator - function to validate the given type
 * @param {string} error 
 * @param {boolean} isArray 
 * @returns {string}
 */
function createType(type, typeValidator, error, isArray=false) {
    if(!type) throw new Error("type is required")
    if(!typeValidator instanceof Function) throw new Error("typeValidator must be a function")
    if(!error) throw new Error("error is required")
    typeValidator.error = error
    typeValidator.isArray = isArray
    customTypes[type] = typeValidator
    return type
}

const uploadFiles = async (req, file, fieldName) => {
    const fileBuffer = Buffer.from(file.data, "base64")
    const maybeExtension = file.name.match(/\..+$/)
    const extension = maybeExtension == null ? "" : maybeExtension[0]
    const name = `${uid.sync(18)}.${extension}`
    const filePath = path.join(os.tmpdir(), name)
    await fs.promises.writeFile(filePath, fileBuffer, "base64")
    const {size} = await fs.promises.stat(filePath)
    const result = file.type.includes("image") ?
        await fileUploads.uploadAsImage(req, {...file, path: filePath, size, fieldName})
        : await fileUploads.uploadAsFile(req, {...file, path: filePath, size, fieldName})
    File.delete(file.path)
    return result
}

module.exports = {deepCopy, isObject, createType, customTypes, uploadFiles}