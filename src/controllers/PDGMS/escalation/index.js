const escalation = module.exports;
const BASE = 'pdgms/escalation';

var {sidebar} = require('./sidebar');
const utils = require('../../utils');

escalation.dashboard = {
    get: async function (req, res) {
        var dashboard = {};
        dashboard.title = 'Escalation Dashboard';
        dashboard.sidebar = utils.sidebar(sidebar,'dashboard',{
            classes: 'active'
        });
        res.render(BASE + '/dashboard', dashboard);
    }
}
escalation.journals = {
    get: async function (req, res) {
        var journals = {};
        journals.title = 'Journals Dashboard';
        journals.sidebar = utils.sidebar(sidebar,'journals',{
            classes: 'active'
        });
        res.render(BASE + '/journals/index', journals);
    },
    single: async function (req, res) {

        let id = req.params.id;
        var journals = {};
        
        journals.sidebar = utils.sidebar(sidebar,'journals',{
            classes: 'active'
        });
        journals.data=   {
            "uid": 10,
            "title": "How to use todo list",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "stimulus": "Insight,Heuristic,Celebration",
            "created_at": "2020-01-01",
            "updated_at": "2020-01-01",
            "rating": "",
            "type": "journal",
            "isPublic": true
        };
        journals.permissions = {
            canEdit : true,
            canDelete: true,
            canComment: false,
        }
        journals.title = journals.data.title;
        res.render(BASE + '/journals/single', journals);
    }
}

