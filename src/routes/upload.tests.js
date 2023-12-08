const {typedFieldValidation, Fields} = require("../middleware/typedValidation")
const uid = require("uid-safe")
const path = require("path")
const os = require("os")
const fs = require("fs")
const router = module.exports = require("express").Router()
const fileUploads = require("../controllers/FIleUpload")
const File = require("../file")

// router.get("/", (req, res) => {
//     res.render("test")
// })


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

router.post("/uploads", typedFieldValidation(new Fields().file("file", {required: true})), async (req, res) => {
    res.send({url: req.body.file})
})