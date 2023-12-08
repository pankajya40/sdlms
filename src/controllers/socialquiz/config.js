module.exports = {
    quiz: {
        sidebar: [{
            url: '/quiz/dashboard',
            title: 'Quiz Dashboard',
            icon: 'fas fa-list',
            id: 'dashboard'
        },
        {
            url: '/quiz/create',
            title: 'Create Quiz',
            icon: 'fas fa-plus',
            id: 'create'
        }
        ]
    },
    mcq: {
        sidebar: [{
            url: '/mcq/dashboard',
            title: 'MCQ Dashboard',
            icon: 'fas fa-list',
            id: 'dashboard'
        },
        {
            url: '/mcq/create',
            title: 'Create MCQ',
            icon: 'fas fa-plus',
            id: 'create'
        }
        ]
    },
    protectedMenus: []
};