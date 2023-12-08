const {Fields} = require('../../middleware/typedValidation')

const $getTemplate = new Fields()
    .id("tid")
    .string("limitBy")
    .string("page")
const $deleteTemplate = new Fields()
    .id("tid", {required: true})

const $getThoughtProccess = new Fields()
    .id("tid")
    .string("limitBy")
    .string("page")
const $createThoughtProccess = new Fields()
    .string("description", {required: true})
    .array("questions", new Fields()
        .required()
        .string("content", {required: true})
        .string("answer", {required: true})
        .string("summarisation", {required: true})
        .string("icon")
    )
const $updateThoughtProccess = new Fields()
    .id("tid")
    .string("description")
    .array("questions", new Fields()
        .id("question_id")
        .string("content")
        .string("answer")
        .string("summarisation")
        .string("icon")
    )
const $deleteThoughtProccess = new Fields()
    .id("tid", {required: true})

module.exports = {
    $getTemplate,
    $deleteTemplate,
    $getThoughtProccess,
    $createThoughtProccess,
    $updateThoughtProccess,
    $deleteThoughtProccess
}