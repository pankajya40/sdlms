const { Fields, DTID } = require("../../middleware").typedValidation;

const sendMessage = new Fields()
    .id("uid")
    .string("title", {minLength: 5})
    .string("message")
    .string("url")
    .any("data")