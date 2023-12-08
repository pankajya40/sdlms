module.exports = {
    sidebar: [{
        url: '/content/post',
        title: 'Post Content',
        icon: 'fas fa fa-list',
        id: 'post'
    }, {
        url: '/content/view',
        title: 'View Content',
        icon: 'fa fa-eye',
        id: 'view'
    }],
    settings: {
        workingHoursRange: [11,23],
        holidays : ["sunday"],
        divideHoursinSlots: 2,
        types:[{
            label: 'Meeting',
            value: 'meeting',
            bg: '#FF6347',
            text: '#000000'
        },{
            label: 'Discussion',
            value: 'discussion',
            bg: '#EE82EE',
            text: '#000000'
        },{
            label: 'Task',
            value: 'task',
            bg: '#306EFF',
            text: '#000000'
        },{
            label: 'Break',
            value: 'break',
            bg: '#FFE87C',
            text: '#000000'
        },{
            label: 'Call',
            value: 'call',
            bg: '#7FFFD4',
            text: '#000000'
        },{
            label: 'TOC',
            value: 'toc',
            bg: '#FF77FF',
            text: '#000000'
        },{
            label: 'Other Task',
            value: 'other task',
            bg: '#ead1dc',
            text: '#000000'
        },{
            label: 'Workshop',
            value: 'workshop',
            bg: '#EE9A4D',
            text: '#000000'
        },{
            label: 'Event',
            value: 'event',
            bg: '#F8B88B',
            text: '#000000'
        },{
            label: 'LDI',
            value: 'ldi',
            bg: '#CD7F32',
            text: '#000000'
        },{
            label: 'Learning',
            value: 'learning',
            bg: '#50C878',
            text: '#000000'
        },{
            label: 'Leave',
            value: 'leave',
            bg: '#6aa84f',
            text: '#000000'
        },{
            label: 'Class',
            value: 'class',
            bg: '#dd7e6b',
            text: '#000000'
        },{
            label: 'Other',
            value: 'Other',
            bg: '#cccccc',
            text: '#000000'
        }]
    }
};