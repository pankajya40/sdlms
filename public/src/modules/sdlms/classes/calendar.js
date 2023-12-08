/* eslint-disable no-var,prefer-template,no-undef */

var $$ = function (selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
};

/* eslint-disable */
var MOCK_CALENDARS = [{
    id: '1',
    name: 'My Calendar',
    color: '#ffffff',
    borderColor: '#9e5fff',
    backgroundColor: '#9e5fff',
    dragBackgroundColor: '#9e5fff',
},
{
    id: '2',
    name: 'Work',
    color: '#ffffff',
    borderColor: '#00a9ff',
    backgroundColor: '#00a9ff',
    dragBackgroundColor: '#00a9ff',
},
{
    id: '3',
    name: 'Family',
    color: '#ffffff',
    borderColor: '#DB473F',
    backgroundColor: '#DB473F',
    dragBackgroundColor: '#DB473F',
},
{
    id: '4',
    name: 'Friends',
    color: '#ffffff',
    borderColor: '#03bd9e',
    backgroundColor: '#03bd9e',
    dragBackgroundColor: '#03bd9e',
},
{
    id: '5',
    name: 'Travel',
    color: '#ffffff',
    borderColor: '#bbdc00',
    backgroundColor: '#bbdc00',
    dragBackgroundColor: '#bbdc00',
},
];

var EVENT_CATEGORIES = ['milestone', 'task'];

function generateRandomEvent(calendar, renderStart, renderEnd) {
    function generateTime(event, renderStart, renderEnd) {
        var startDate = moment(renderStart.getTime());
        var endDate = moment(renderEnd.getTime());
        var diffDate = endDate.diff(startDate, 'days');

        event.isAllday = chance.bool({
            likelihood: 30
        });
        if (event.isAllday) {
            event.category = 'allday';
        } else if (chance.bool({
            likelihood: 30
        })) {
            event.category = EVENT_CATEGORIES[chance.integer({
                min: 0,
                max: 1
            })];
            if (event.category === EVENT_CATEGORIES[1]) {
                event.dueDateClass = 'morning';
            }
        } else {
            event.category = 'time';
        }

        startDate.add(chance.integer({
            min: 0,
            max: diffDate
        }), 'days');
        startDate.hours(chance.integer({
            min: 0,
            max: 23
        }));
        startDate.minutes(chance.bool() ? 0 : 30);
        event.start = startDate.toDate();

        endDate = moment(startDate);
        if (event.isAllday) {
            endDate.add(chance.integer({
                min: 0,
                max: 3
            }), 'days');
        }

        event.end = endDate.add(chance.integer({
            min: 1,
            max: 4
        }), 'hour').toDate();

        if (!event.isAllday && chance.bool({
            likelihood: 20
        })) {
            event.goingDuration = chance.integer({
                min: 30,
                max: 120
            });
            event.comingDuration = chance.integer({
                min: 30,
                max: 120
            });

            if (chance.bool({
                likelihood: 50
            })) {
                event.end = event.start;
            }
        }
    }

    function generateNames() {
        var names = [];
        var i = 0;
        var length = chance.integer({
            min: 1,
            max: 10
        });

        for (; i < length; i += 1) {
            names.push(chance.name());
        }

        return names;
    }

    var id = chance.guid();
    var calendarId = calendar.id;
    var title = chance.sentence({
        words: 3
    });
    var body = chance.bool({
        likelihood: 20
    }) ? chance.sentence({
        words: 10
    }) : '';
    var isReadOnly = chance.bool({
        likelihood: 20
    });
    var isPrivate = chance.bool({
        likelihood: 20
    });
    var location = chance.address();
    var attendees = chance.bool({
        likelihood: 70
    }) ? generateNames() : [];
    var recurrenceRule = '';
    var state = chance.bool({
        likelihood: 50
    }) ? 'Busy' : 'Free';
    var goingDuration = chance.bool({
        likelihood: 20
    }) ? chance.integer({
        min: 30,
        max: 120
    }) : 0;
    var comingDuration = chance.bool({
        likelihood: 20
    }) ? chance.integer({
        min: 30,
        max: 120
    }) : 0;
    var raw = {
        memo: chance.sentence(),
        creator: {
            name: chance.name(),
            avatar: chance.avatar(),
            email: chance.email(),
            phone: chance.phone(),
        },
    };

    var event = {
        id: id,
        calendarId: calendarId,
        title: title,
        body: body,
        isReadOnly: isReadOnly,
        isPrivate: isPrivate,
        location: location,
        attendees: attendees,
        recurrenceRule: recurrenceRule,
        state: state,
        goingDuration: goingDuration,
        comingDuration: comingDuration,
        raw: raw,
    }

    generateTime(event, renderStart, renderEnd);

    if (event.category === 'milestone') {
        event.color = '#000'
        event.backgroundColor = 'transparent';
        event.borderColor = 'transparent';
        event.dragBackgroundColor = 'transparent';
    }

    return event;
}


/* eslint-disable no-var,prefer-destructuring,prefer-template,no-undef,object-shorthand,no-console */
// for testing IE11 compatibility, this file doesn't use ES6 syntax.


class Calendar {
    constructor(options) {
        this.CALENDAR_CSS_PREFIX = 'toastui-calendar-';
        this.$container = document.querySelector(options.container);
        this.target = options.target;
        this.defaults();
        this.init()
    }
    defaults() {
        this.states();
    }
    cls(className) {
        return this.CALENDAR_CSS_PREFIX + className;
    }
    states() {
        this.state = {
            activeCalendarIds: MOCK_CALENDARS.map(function (calendar) {
                return calendar.id;
            }),
            isDropdownActive: false,
        };
    }
    reload(event) {
        let events = {
            events: () => {
                var randomEvents;

                this.calendar.clear();
                randomEvents = this.helpers().generateRandomEvents(
                    this.calendar.getViewName(),
                    this.calendar.getDateRangeStart(),
                    this.calendar.getDateRangeEnd()
                );
                this.calendar.createEvents(randomEvents);
            }
        }
        events[event]();
    }
    helpers() {
        let helpers = {
            getReadableViewName: (viewType) => {
                switch (viewType) {
                    case 'month':
                        return 'Monthly';
                    case 'week':
                        return 'Weekly';
                    case 'day':
                        return 'Daily';
                    default:
                        throw new Error('no view type');
                }
            },
            displayRenderRange: () => {
                var rangeStart = this.calendar.getDateRangeStart();
                var rangeEnd = this.calendar.getDateRangeEnd();
                this.elements('navbarRange').textContent = this.helpers().getNavbarRange(rangeStart, rangeEnd, this.calendar.getViewName());
            },
            setDropdownTriggerText: () => {
                var viewName = this.calendar.getViewName();
                this.elements('buttonText').textContent = this.helpers().getReadableViewName(viewName);
            },
            toggleDropdownState: () => {
                this.state.isDropdownActive = !this.state.isDropdownActive;
                this.elements('dropdown').classList.toggle('is-active', this.state.isDropdownActive);
                this.elements('dropdownTriggerIcon').classList.toggle(this.cls('open'), this.state.isDropdownActive);
            },
            setAllCheckboxes: (checked) => {
                let $that = this;
                var checkboxes = $$('.sidebar-item > input[type="checkbox"]');
                checkboxes.forEach(function (checkbox) {
                    checkbox.checked = checked;
                    $that.helpers().setCheckboxBackgroundColor(checkbox);
                });
            },
            setCheckboxBackgroundColor: (checkbox) => {
                var calendarId = checkbox.value;
                var label = checkbox.nextElementSibling;
                console.log(checkbox, label)
                var calendarInfo = MOCK_CALENDARS.find(function (calendar) {
                    return calendar.id === calendarId;
                });
                if (!calendarInfo) {
                    calendarInfo = {
                        backgroundColor: '#2a4fa7',
                    };
                }
                if(label) { label.style.setProperty(
                    '--checkbox-' + calendarId,
                    checkbox.checked ? calendarInfo.backgroundColor : '#fff'
                );
                }
            },
            initCheckbox: () => {
                let $that = this;
                var checkboxes = $$('input[type="checkbox"]');

                checkboxes.forEach(function (checkbox) {
                    $that.helpers().setCheckboxBackgroundColor(checkbox);
                });
            },
            getNavbarRange: (tzStart, tzEnd, viewType) => {
                var start = tzStart.toDate();
                var end = tzEnd.toDate();
                var middle;
                if (viewType === 'month') {
                    middle = new Date(start.getTime() + (end.getTime() - start.getTime()) / 2);

                    return moment(middle).format('YYYY-MM');
                }
                if (viewType === 'day') {
                    return moment(start).format('YYYY-MM-DD');
                }
                if (viewType === 'week') {
                    return moment(start).format('YYYY-MM-DD') + ' ~ ' + moment(end).format('YYYY-MM-DD');
                }
                throw new Error('no view type');
            },
            generateRandomEvents: (viewName, renderStart, renderEnd) => {
                var i, j;
                var event, duplicateEvent;
                var events = [];

                MOCK_CALENDARS.forEach(function (calendar) {
                    for (i = 0; i < chance.integer({
                        min: 20,
                        max: 50
                    }); i += 1) {
                        event = generateRandomEvent(calendar, renderStart, renderEnd);
                        events.push(event);

                        if (i % 5 === 0) {
                            for (j = 0; j < chance.integer({
                                min: 0,
                                max: 2
                            }); j += 1) {
                                duplicateEvent = JSON.parse(JSON.stringify(event));
                                duplicateEvent.id += `-${j}`;
                                duplicateEvent.calendarId = chance.integer({
                                    min: 1,
                                    max: 5
                                }).toString();
                                duplicateEvent.goingDuration = 30 * chance.integer({
                                    min: 0,
                                    max: 4
                                });
                                duplicateEvent.comingDuration = 30 * chance.integer({
                                    min: 0,
                                    max: 4
                                });
                                events.push(duplicateEvent);
                            }
                        }
                    }
                });

                return events;
            }
        }
        return helpers;
    }

    update() {
        let helpers = this.helpers();
        helpers.setDropdownTriggerText();
        helpers.displayRenderRange();
        this.reload('events');
    }
    events() {
        let $that = this;
        this.elements('dropdownTrigger').addEventListener('click', this.helpers().toggleDropdownState);

        this.elements('prevButton').addEventListener('click', function () {
            $that.calendar.prev();
            $that.update();
        });
        this.elements('nextButton').addEventListener('click', function () {
            $that.calendar.next();
            $that.update();
        });
        this.elements('todayButton').addEventListener('click', function () {
            $that.calendar.today();
            $that.update();
        });
        this.elements('dropdownContent').addEventListener('click', function (e) {
            var targetViewName;

            if ('viewName' in e.target.dataset) {
                targetViewName = e.target.dataset.viewName;
                $that.calendar.changeView(targetViewName);
                $that.elements('checkboxCollapse').disabled = targetViewName === 'month';
                $that.helpers().toggleDropdownState();
                $that.update();
            }
        });
        this.elements('checkboxCollapse').addEventListener('change', function () {
            if ('checked' in e.target) {
                cal.setOptions({
                    week: {
                        collapseDuplicateEvents: !!e.target.checked,
                    },
                    useDetailPopup: !e.target.checked,
                });
            }
        });
        this.elements('sidebar').addEventListener('click', function (e) {
            if ('value' in e.target) {
                let helpers = $that.helpers();
                if (e.target.value === 'all') {
                    if ($that.state.activeCalendarIds.length > 0) {
                        $that.calendar.setCalendarVisibility($that.state.activeCalendarIds, false);
                        $that.state.activeCalendarIds = [];
                        helpers.setAllCheckboxes(false);
                    } else {
                        $that.state.activeCalendarIds = MOCK_CALENDARS.map(function (calendar) {
                            return calendar.id;
                        });
                        $that.calendar.setCalendarVisibility($that.state.activeCalendarIds, true);
                        helpers.setAllCheckboxes(true);
                    }
                } else if ($that.state.activeCalendarIds.indexOf(e.target.value) > -1) {
                    $that.state.activeCalendarIds.splice($that.state.activeCalendarIds.indexOf(e.target.value), 1);
                    $that.calendar.setCalendarVisibility(e.target.value, false);
                    helpers.setCheckboxBackgroundColor(e.target);
                } else {
                    $that.state.activeCalendarIds.push(e.target.value);
                    $that.calendar.setCalendarVisibility(e.target.value, true);
                    helpers.setCheckboxBackgroundColor(e.target);
                }
            }
        })
    }
    instanceEvents() {
        let $that = this;
        this.calendar.on({
            clickMoreEventsBtn: function (btnInfo) {
                console.log('clickMoreEventsBtn', btnInfo);
            },
            clickEvent: function (eventInfo) {
                console.log('clickEvent', eventInfo);
            },
            clickDayName: function (dayNameInfo) {
                console.log('clickDayName', dayNameInfo);
            },
            selectDateTime: function (dateTimeInfo) {
                console.log('selectDateTime', dateTimeInfo);
            },
            beforeCreateEvent: function (event) {
                console.log('beforeCreateEvent', event);
                event.id = chance.guid();

                $that.calendar.createEvents([event]);
                $that.calendar.clearGridSelections();
            },
            beforeUpdateEvent: function (eventInfo) {
                var event, changes;

                console.log('beforeUpdateEvent', eventInfo);

                event = eventInfo.event;
                changes = eventInfo.changes;

                $that.calendar.updateEvent(event.id, event.calendarId, changes);
            },
            beforeDeleteEvent: function (eventInfo) {
                console.log('beforeDeleteEvent', eventInfo);

                $that.calendar.deleteEvent(eventInfo.id, eventInfo.calendarId);
            },
        });
    }
    getEventTemplate(event, isAllday) {
        var html = [];
        var start = moment(event.start.toDate().toUTCString());
        if (!isAllday) {
            html.push('<strong>' + start.format('HH:mm') + '</strong> ');
        }

        if (event.isPrivate) {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push(' Private');
        } else {
            if (event.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (event.attendees.length > 0) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (event.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            html.push(' ' + event.title);
        }

        return html.join('');
    }
    init() {
        let $that = this;
        this.calendar = new tui.Calendar(this.target, {
            calendars: MOCK_CALENDARS,
            useFormPopup: true,
            useDetailPopup: true,
            eventFilter: eventFilter.bind(this),
            template: {
                allday: function (event) {
                    return $that.getEventTemplate(event, true);
                },
                time: function (event) {
                    return $that.getEventTemplate(event, false);
                },
            },
        });

        function eventFilter(event) {
            var currentView = $that.calendar.getViewName();
            if (currentView === 'month') {
                return ['allday', 'time'].includes(event.category) && event.isVisible;
            }
            return event.isVisible;
        }
        this.instanceEvents();
        this.events();
        this.helpers().initCheckbox();
        this.update();

    }
    elements(name) {
        let elems = {
            navbarRange: '.navbar--range',
            prevButton: '.prev',
            nextButton: '.next',
            todayButton: '.today',
            dropdown: '.dropdown',
            dropdownTrigger: '.dropdown-trigger',
            dropdownTriggerIcon: '.dropdown-icon',
            dropdownContent: '.dropdown-content',
            checkboxCollapse: '.checkbox-collapse',
            sidebar: '.calendar-sidebar',
            buttonText: '.dropdown .button-text'
        }
        return this.$container.querySelector(elems[name]);
    }
}

new Calendar({
    container: '.app-container',
    target: '#app'
});