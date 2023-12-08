module.exports = {
    sidebar: [{
        url: '/observation',
        title: 'Home',
        icon: 'fas fa fa-list',
        id: 'home'
    }, {
        url: '/observation',
        title: 'Consent',
        icon: 'fas fa fa-play',
        id: 'consent'
    },{
        url: '/observation/introduction',
        title: 'Introduction',
        icon: 'fas fa fa-info-circle',
        id: 'introduction'
    }, {
        url: '/observation/page/why-observation',
        title: 'Why Observation?',
        icon: 'fas fa fa-question-circle',
        id: 'why-observation'
    }, {
        url: '/observation/reflections',
        title: 'Reflections',
        icon: 'fas fa fa-th-list',
        id: 'reflections'
    }, {
        url: '/observation/sign-off',
        title: 'Sign-off',
        icon: 'fas fa fa-sign-out',
        id: 'sign-off'
    }, {
        url: '/observation/page/thank-you',
        title: 'Thank you',
        icon: 'fas fa fa-smile-o',
        id: 'thank-you'
    }, /* {
        url: '/observation/report',
        title: 'Reports',
        icon: 'fas fa fa-flag',
        id: 'report'
    }, */{
        url: '/observation/page/take-a-tour',
        title: 'Take a tour',
        icon: 'fas fa fa-eye',
        id: 'take-a-tour'
    }, {
        url: '/observation/explore',
        title: 'Explore',
        icon: 'fas fa fa-binoculars',
        id: 'explore'
    },
    //     url: '/observation/events',
    //     title: 'Events',
    //     icon: 'fas fa fa-bullhorn',
    //     id: 'events'
     {
        url: '/observation/leaderboard',
        title: 'Leaderboard',
        icon: 'fas fa fa-bar-chart',
        id: 'leaderboard'
    }, {
        url: '/observation/public/faqs',
        title: 'FAQs',
        icon: 'fa fa-question-circle-o',
        id: 'faqs'
    }, {
        url: '/observation/admin',
        title: 'Admin',
        icon: 'fas fa fa-user-secret',
        id: 'admin'
    }, 
    
],  protectedMenus: ['admin'],
};