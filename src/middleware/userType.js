/**
 * @date 05-07-2022
 * @author Srijit Patra
 * @description this is a middleware function that checks for a specific user type.
 */

const User = require("../user");
const controllers = {
	helpers: require('../controllers/helpers'),
};
module.exports = (type) => {
    return async (req,res,next)=>{
        var uid = parseInt(req.query.uid);
        var found =  await User.checkUserType(uid,type); // checkUserType should be created
        if(!found)
        return controllers.helpers.formatApiResponse(400, res, new Error(`Access Denied!. Are you a ${type}?`));
        return next();
    }
}