const { Fields } = require('../../../middleware/typedValidation')

const $createOrganization = new Fields()
    .string("name", {required: true})
    .string("sector", {required: true})
    .string("employeeRange", {required: true})
    .string("website")
    .string("about")
    .array("location", new Fields()
        .string("addressLine1", {required: true})
        .string("addressLine2", {required: true})
        .string("city", {required: true})
        .string("state", {required: true})
        .string("country", {required: true})
        .string("pincode", {required: true}))
    

module.exports = {
    $createOrganization
}