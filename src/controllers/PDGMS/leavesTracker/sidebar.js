module.exports = {
    sidebar: [{
        url: '/pdgms/attendance/dashboard',
        title: 'Dashboard',
        icon: 'fas fa-home',
        id: 'dashboard'
    }, {
        url: '/pdgms/attendance/leaves',
        title: 'Leaves',
        icon: 'fas fa-list',
        id: 'leaves'
    }, {
        url: '/pdgms/attendance/approveleaves',
        title: 'Approve leaves',
        icon: 'fas fa-check-circle',
        id: 'approveleaves'
    }, {
        url: '/pdgms/attendance/holidays',
        title: 'Holidays',
        icon: 'fas fa-calendar',
        id: 'holidays'
    }, {
        url: '/pdgms/attendance/statistics',
        title: 'Statistics',
        icon: 'fas fa-chart-pie',
        id: 'statistics'
    }
],  protectedMenus: ['statistics', 'approveleaves'],
};