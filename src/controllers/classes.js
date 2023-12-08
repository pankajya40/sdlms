const classesController = module.exports;
const privileges = require('../privileges');

classesController.get = async function (req, res, next) {
    let uid = parseInt(req.uid);
    /**
	 * @date 10-01-2023
	 * @author imshawan
	 * @description Making everyone a teacher, based on requirements by subhangi & merwin
	 */
    // let isTeacher = await privileges.users.isTeacher(uid);
    // if (!isTeacher) {
    //     return res.redirect('/');
    // }
    res.render("sdlms/classes", { title: "Manage sessions" });
};
