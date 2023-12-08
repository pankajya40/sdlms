const BASE = '/generators/joiningletter'

module.exports = {
    sidebar: [{
        url: BASE,
        title: 'Home',
        icon: 'fas fa fa-home',
        id: 'index'
    }, {
        url: BASE + '/letters',
        title: 'Letters',
        icon: 'fas fa fa-envelope',
        id: 'letters'
    }, {
        url: BASE + '/templates',
        title: 'Templates',
        icon: 'fas fa fa-file-code-o',
        id: 'templates'
    },
],  protectedMenus: [],
};