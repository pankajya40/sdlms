"use strict";

const winston = require("winston");
const axios = require("axios");
const db = require("../../../database");
const user = require("../../../user");
const adminSchema = require('../../../schema/write/admin');
const { constants } = require("../../../constants");
const { SDLMS, noImage } = constants;

const { organization } = adminSchema;
const collectionName = db.collections.SDLMS.ORGANIZATION;

const organizationController = module.exports;

organizationController.get = async function (req, res, next) {
    let { id } = req.params;

    let orgData = await db.findField(collectionName, {type: "organization", organizationId: parseInt(id)});
    if (!orgData) {
        throw new Error('Invalid organization Id: ' + id);
    }
    
    let { location, email, socialLinks, phoneNumber, leaders, image, organizationId } = orgData;
    location = location.length ? location[0] : {};

    const organizationPayload = {
        location,
        organization: orgData,
        location,
        email,
        socialLinks,
        phoneNumber,
        leaders,
        coverImage: image.find(i => i.type == 'cover'),
        profileImage: image.find(i => i.type == 'profile') || {image: noImage},
        organizationId
    };

    organizationPayload.address = `${location.city ? location.city + ', ' : ''}${location.state ? location.state + ', ' : ''}${location.country || ''}`;

    if (orgData.website) {
        organizationPayload.website = orgData.website.replace(/(^\w+:|^)\/\//, '');
    }

    organizationPayload.title = orgData.name;

    res.render('sdlms/admin/organization/profile', organizationPayload);
}

organizationController.createOrganization = async function (req, res, next) {
    const organizationPayload = {};

    organizationPayload.title = "Create organization";
    organizationPayload.organizationTypes = SDLMS.organizationTypes;

    res.render('sdlms/admin/organization/create', organizationPayload);
}

organizationController.updateOrganization = async function (req, res, next) {
    const uid = parseInt(req.uid);
    let { id } = req.params;
    let orgData = await db.findField(collectionName, {type: "organization", organizationId: parseInt(id)});
    if (!orgData) {
        throw new Error('Invalid organization Id: ' + id);
    }

    let countries = await db.findField(db.collections.DEFAULT, {_key: 'rest:countries'});

	if (!countries) {
		const { data } = await axios.get('https://restcountries.com/v3.1/all');
		await db.setField(db.collections.DEFAULT, { _key: 'rest:countries', data })
		countries = data;
	} else {
		countries = countries['data'];
	}

    let countriesData = countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((elem) => elem.name.common);
    
    const { location, email, socialLinks, phoneNumber, leaders, image, organizationId, adminUids } = orgData;

  
    const editOrganization = {
        organizationId,
        location: location.length ? location[0] : {},
        email,
        socialLinks,
        phoneNumber,
        leaders,
        image,
        coverImage: image.find(i => i.type == 'cover'),
        profileImage: image.find(i => i.type == 'profile') || {image: noImage},
        countries: countriesData,
        editAccess: adminUids.includes(uid),
    };
    delete orgData.adminUids;

    editOrganization.title = "Create organization";
    editOrganization.validSocialChannels = organization.validSocialChannels;
    editOrganization.validContactTypes = organization.validContactTypes;
    editOrganization.validEmailTypes = organization.validEmailTypes;
    editOrganization.organizationTypes = SDLMS.organizationTypes;
    editOrganization.organization = orgData;

    res.render('sdlms/admin/organization/edit', editOrganization);
}