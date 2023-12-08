const moment = require('moment')
module.exports = {
    content: {
        tools: {
            description: 'A utility belt of sorts. Keep the most frequently used tools at your arms reach.',
            items: [
                {
                    url: `https://dev.deepthought.education/toc/calendar/${moment(Date.now()).format("YYYY/MM/DD")}`,
                    title: 'TOC',
                    description: 'A place to manage your productivity. Plan your day, execute your plans and then analyze your tasks in weekly, daily, hourly and minutes duration.',
                    icon: 'fa fa-calendar-check-o',
                },
                {
                    url: 'https://sdlms.deepthought.education/monitor',
                    title: 'Live Classroom',
                    description: 'All your sessions: A list of all your upcoming and previous sessions. Go back to your favourite session and build up the threads.',
                    icon: 'fa fa-users',
                },
                {
                    url: 'https://pdgms.deepthought.education/pdgms/attendance/dashboard',
                    title: 'Attendance Tracker',
                    description: 'For requesting and approving leaves of your team.',
                    icon: 'fa fa-hand-paper-o',
                },
                {
                    url: 'https://sdlms.deepthought.education/myassets/threadbuilders',
                    title: 'Threadbuilder',
                    description: 'Create an instant Threadbuilder for taking mindful notes on-the-go						',
                    icon: 'fas fa-lightbulb',
                },
                {
                    url: 'https://sdlms.deepthought.education/myassets/eaglebuilders',
                    title: 'Eaglebuilder',
                    description: 'Witness the entire discussion through the eyes of an eagle. See how one concept connects to the other and forms a big picture.',
                    icon: 'fa fa-eye',
                },
                {
                    url: 'https://dtthon.deepthought.education/dtthon/applicant/dashboard',
                    title: 'DTthon Dashboard',
                    description: 'View all the DT Thons that you have applied to in the past.',
                    icon: 'fa fa-address-book-o',
                }, 
                {
                    url: 'https://mobile.deepthought.education/mobile/message/list',
                    title: 'Discussion room',
                    description: 'Learn socially by engaging in asynchronous discussions with Students, Teachers, Researchers and Entrepreneurs.',
                    icon: 'fas fa-atom',
                },
                {
                    url: 'https://pdgms.deepthought.education/observation',
                    title: 'Observation panel',
                    description: 'A place to store and capture your daily observations, as an observer.',
                    icon: 'fa fa-eye',
                },
                // {
                //     url: 'https://dev.deepthought.education/batches',
                //     title: 'Batches and cohorts	',
                //     description: 'Learn socially by engaging in asynchronous discussions with Students, Teachers, Researchers and Entrepreneurs.',
                //     icon: 'fa fa-users',
                // },
            ],
        },

        sdlms: {
            description: 'Grow your knowledge and understanding by investing in assets each asset helps you think uniquely, capturing different levels of understanding',
            items: [
                {
                    url: 'https://sdlms.deepthought.education/monitor',
                    title: 'Live Classroom',
                    description: 'All your sessions: A list of all your upcoming and previous sessions. Go back to your favourite session and build up the threads.',
                    icon: 'fa fa-users',
                },
                {
                    url: 'https://sdlms.deepthought.education/myassets/threadbuilders',
                    title: 'Threadbuilder',
                    description: 'A meta-cognitive tool that helps you think about your thinking. Cature insights, make interpretations and identify the processes used too.',
                    icon: 'fa fa-calendar-check-o',
                },
                {
                    url: 'https://sdlms.deepthought.education/myassets/eaglebuilders',
                    title: 'Eaglebuilder',
                    description: 'Witness the entire discussion through the eyes of an eagle. See how one concept connects to the other and forms a big picture.',
                    icon: 'fa fa-eye',
                },
                {
                    url: 'https://sdlms.deepthought.education/myassets/articles',
                    title: 'Articles',
                    description: 'Article: Write long-form text articles using a rich CMS. Share the articles with others and engage in discusisons to bring in systheis to your understanding.',
                    icon: 'fa fa-newspaper-o',
                },
                // {
                //     url: 'https://sdlms.deepthought.education/myassets/quizes',
                //     title: 'Quizzez',
                //     description: 'Quizzes: Solve and create interesting quizzes. Quizzes that help you sit on the boundary between wha the topic explains and what it prohibits.',
                //     icon: 'fa fa-comments-o',
                // },
                // {
                //     url: 'https://sdlms.deepthought.education/myassets/spreadsheets',
                //     title: 'Spreadsheets',
                //     description: 'DT Sheets: A spreadsheet customized to optimize the experience of viwing data in rows and colomns.',
                //     icon: 'fa fa-table',
                // },
                {
                    url: 'https://sdlms.deepthought.education/classes',
                    title: 'Create New Session',
                    description: 'Create/Schedule a new live experience and invite others to join.',
                    icon: 'fa fa-envelope-open',
                },
                {
                    url: 'https://sdlms.deepthought.education/teachingstyles',
                    title: 'Teaching Styles',
                    description: 'Teaching Styles: Modify the threadbuilder and the class structre as per your own teaching style				',
                    icon: 'fa fa-black-tie',
                },
                {
                    url: 'https://sdlms.deepthought.education/curriculums',
                    title: 'Curriculum',
                    description: 'Quizzes: Solve and create interesting quizzes. Quizzes that help you sit on the boundary between wha the topic explains and what it prohibits.',
                    icon: 'fa fa-pie-chart',
                },
                // {
                //     url: 'https://pdgms.deepthought.education/question-builder.html',
                //     title: 'Question Builder',
                //     description: 'Learn to ask questions, choose the category and select from the templates, the type of questions you want to ask.',
                //     icon: 'fa fa-question-circle',
                // },
                // {
                //     url: 'https://dev.deepthought.education/batches',
                //     title: 'Rigor builder',
                //     description: 'Discuss with others, build discussions and question the reasons given. Build deeper understanding and rigor in your discusisons.',
                //     icon: 'fa fa-line-chart',
                // },
            ],

        },

        dtthon: {
            description: 'A platform to design courses, projects and various frameworks for learning or growth.',
            items: [
                {
                    url: 'https://dtthon.deepthought.education/dtthon/applicant/dashboard',
                    title: 'Dashboard',
                    description: 'View all the DT Thons that you have applied to in the past.',
                    icon: 'fa fa-address-book-o',
                },
                {
                    url: 'https://dtthon.deepthought.education/dtthon/applicant/explore',
                    title: 'Explore',
                    description: 'Discover new interesting projects and challenges to grow your thinking.',
                    icon: 'fa fa-hand-pointer-o',
                },
                {
                    url: 'https://dtthon.deepthought.education/dtthon/creator/dashboard',
                    title: 'Creator Dashboard',
                    description: 'Manage & evaluate the projects, courses and selection processes made by people from your organizaiton.',
                    icon: 'fa fa-user',
                },
                {
                    url: 'https://dtthon.deepthought.education/scorecard/dashboard#',
                    title: 'Social Scorecard Dashboard',
                    description: 'Scorecards are a way of giving the power to people to evaluate processes and DtThons.',
                    icon: 'fa fa-address-card-o',
                },
            ],
        },

        pdgms: {
            description: 'Develop Strategies and strengthen your team.',
            items: [
                {
                    url: 'https://pdgms.deepthought.education/pdgms/attendance/dashboard',
                    title: 'Attendance Tracker',
                    description: 'For requesting and approving leaves of your team.',
                    icon: 'fa fa-hand-paper-o',
                },
                {
                    url: 'https://pdgms.deepthought.education/pdgms/escalation',
                    title: 'Escalation engine',
                    description: 'A place to celebrate your small victories and airing your concerns to your seniors.',
                    icon: 'fa fa-line-chart',
                },
                {
                    url: 'https://dev.deepthought.education/toc/calendar/2022/12/16',
                    title: 'TOC',
                    description: 'A place to manage your productivity. Plan your day, execute your plans and then analyze your tasks in weekly, daily, hourly and minutes duration.',
                    icon: 'fa fa-calendar-check-o',
                },
                {
                    url: 'https://pdgms.deepthought.education/pdgms/kpitracker',
                    title: 'KPI Tracker',
                    description: 'Help your team track their weekly and monthly KPIs.',
                    icon: 'fa fa-thumb-tack',
                },
                {
                    url: 'https://pdgms.deepthought.education/observation',
                    title: 'Batches and cohorts',
                    description: 'Manage and edit your groups/cohorts',
                    icon: 'fa fa-users',
                },
                {
                    url: 'https://pdgms.deepthought.education/observation',
                    title: 'Observation panel',
                    description: 'A place to store and capture your daily observations, as an observer.',
                    icon: 'fa fa-eye',
                },
                // {
                //     url: 'https://pdgms.deepthought.education/myassets/threadbuilders',
                //     title: 'Project manager',
                //     description: 'Track and manage your various projects and deliverables.',
                //     icon: 'fa fa-file',
                // },
            ],
        },
    },
};

