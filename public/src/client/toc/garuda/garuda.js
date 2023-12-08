
// 
"use strict";

/* globals define */

define("forum/toc/garuda/garuda",
  ["api", 'forum/toc/journal', 'mobile/classes/mobiletoc',],
  function (api, journal) {
    var toc = {};
    toc.isDirty = false;
    toc.data = null;
    toc.DELAY_IN_SAVE = 1000;
    toc.tConvert = (time) => {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? ' AM' : ' PM';
        time[0] = +time[0] % 12 || 12;
      }
      return time.join('');
    }
    toc.currentDate = ajaxify.data.selectedDate;
    function getPreviousWeek(isoWeek) {
      const [year, week] = isoWeek.split('-W');
      const weekNumber = parseInt(week, 10);
      let previousYear = parseInt(year, 10);
      let previousWeekNumber = weekNumber - 1;

      if (previousWeekNumber === 0) {
        previousWeekNumber = 52;
        previousYear--;
      }

      const previousWeek = `${previousYear}-W${previousWeekNumber.toString().padStart(2, '0')}`;

      return previousWeek;
    }
    function getISOWeekNumber(date) {
      let fixeddate = new Date(date);
      // Set the target date to Monday of the current week
      let target = new Date(fixeddate.getTime());

      target.setDate(target.getDate() - target.getDay() + 1);

      // Get the year and week number of the target date
      let year = target.getFullYear();
      let weekNumber = Math.floor((target.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

      // Adjust the week number if necessary (week 1 might belong to the previous year)
      if (weekNumber === 0) {
        year--;
        weekNumber = getISOWeekNumber(new Date(year, 11, 31));
      } else if (weekNumber > 52) {
        year++;
        weekNumber = 1;
      }

      // Return the year and week number as a string
      return year + '-W' + weekNumber.toString().padStart(2, '0');
    }
    function getNextWeek(isoWeek) {
      const [year, week] = isoWeek.split('-W');
      const weekNumber = parseInt(week, 10);
      let nextYear = parseInt(year, 10);
      let nextWeekNumber = weekNumber + 1;

      if (nextWeekNumber > 52) {
        nextWeekNumber = 1;
        nextYear++;
      }

      const nextWeek = `${nextYear}-W${nextWeekNumber.toString().padStart(2, '0')}`;

      return nextWeek;
    }
    toc.init = () => {
      console.log('here')
      journal.init()
      toc.data = (ajaxify.data.toc || {})
      toc.pid = toc.data.pid
      toc.data = toc.data.data || {};

      toc.editable = ajaxify.data.editable;
      toc.calendar = new Calendar("calendarContainer", "small",
        ["Monday", 3], ["#3683f0", "#0029FF", "#ffffff", "#ffecb3"],
        { currentDate: new Date(ajaxify.data.selectedDate) }
      );
      console.log(toc)
      console.log(toc.calendar)
      $("#notes").height($(window).height() - $('#calendarContainer').height() - 135);

      let settings = ajaxify.data.settings;
      try {
        settings.divideHoursinSlots = Number(ajaxify.data.toc.data.slotshours || settings.divideHoursinSlots)
      } catch (error) {
        console.log(error)
      }

      let { workingHoursRange, holidays, divideHoursinSlots } = settings;
      divideHoursinSlots = divideHoursinSlots || 4;
      let hours = Number(workingHoursRange[1]) - Number(workingHoursRange[0]);
      hours = Array.from({ length: hours }, (v, i) => i + Number(workingHoursRange[0]));
      let minutes = Array.from({ length: divideHoursinSlots }, (v, i) => i * (60 / divideHoursinSlots));
      let slots = {};
      hours.forEach((hour, ind) => {
        slots[hour] = minutes.map(minute => `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
        slots[hour] = slots[hour].map((time, index) => {
          return [toc.tConvert(time), toc.tConvert(slots[hour][index + 1] || (`${String(hour + 1).padStart(2, '0')}:00`))];
        })
      })
      let html = '';
      Object.keys(slots).forEach((hour, index) => html += toc.template().single(slots[hour], index));
      $("#tocBody").html(html);
      $("#notes").val(toc.data.note || '');
      toc.events();
    };

    toc.events = () => {
      $("body").on("click", ".no-ajaxify", function () {
        let url = $(this).data("href");
        location.href = url;
      })
      $(".garuda").addClass("active");
      $('#content').on('keydown', function (event) {
        //console.log("here")
        if (event.key === 'Enter' && $(this).val().trim() !== '') {
          //console.log('here')
          const content = $(this).val().trim();
          console.log(content)
          const contentContainer = $('<div>').addClass('capsule');
          const displayContent = content.length > 10 ? content.substring(0, 10) + '...' : content;
          contentContainer.text(displayContent);
          $(this).parent.prepend(contentContainer);
          $(this).val('');
        }
      });

      toc.calendar.setOnClickListener('days-blocks', function () {
        if (toc.isDirty) return alert('Please save your changes first');
        let date = new Date(toc.calendar.date);
        console.log('date from 90', date)
        console.log('here :', toc.getISOWeekNumber(date))
        let url = `/toc/garuda/${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
        console.log(url)

        if (ajaxify.data.reqUID) url += `/${ajaxify.data.reqUID}`;
        ajaxify.go(url);
        $('.modal-backdrop').remove();
      });

      $("#next-week").on("click", function (e) {
        e.preventDefault();
        location.href = "/toc/garuda/" + getNextWeek(ajaxify.data.week);
      })

      $("#prev-week").on("click", function (e) {
        e.preventDefault();
        location.href = "/toc/garuda/" + getPreviousWeek(ajaxify.data.week);
      })

      $('#toc').on('change', 'select.input', function () {
        let data = $(this).find('option:selected').data() || {};
        $(this).css({
          'background-color': data.bg,
          'color': data.text
        });
      });
      $('#toc').find('select').each(function () {
        $(this).val($(this).attr('value'));
        $(this).trigger('change')
      })

      if (toc.editable) {
        $('#toc').on('input change', '.input', function () {
          toc.isDirty = true;
        });
        $('#toc').on('input change', '.input', debounce(function () {
          toc.dirty();
        }, toc.DELAY_IN_SAVE));

        $('#notes').on('input', debounce(function () {
          toc.dirty();
        }, toc.DELAY_IN_SAVE));
      }

      $(window).on('beforeunload', function () {
        if (toc.isDirty) return 'You have unsaved changes';
      });

      $("body").on("click", "#grow-button", function (e) {
        e.preventDefault();
        location.href = `/toc/grow/${getISOWeekNumber(moment().format("YYYY/MM/DD"))}`;
      });

      $("body").on("click", "#garuda-button", function (e) {
        e.preventDefault();
        location.href = `/toc/garuda/${getISOWeekNumber(moment().format("YYYY/MM/DD"))}`;
      });

      if(ajaxify.data.day){
        $("th.w-auto:gt(0)").each(function(index, element) {
          const $th = $(element);
          const day = $th.text();
          
          if (day === ajaxify.data.day) {
            $th.css("background-color", "var(--primary-background-color)");
          }
        });
      } 

    }

    toc.dirty = () => {
      if (!toc.editable) return;
      toc.isDirty = true;
      let data = $('#toc').serializeObject();
      let payload = {
        pid: toc.pid,
        weekNum: ajaxify.data.week,
        data: { note: $('#notes').val(), ...data, slotshours: ajaxify.data.settings.divideHoursinSlots },

      }
      console.log(payload.weekNum)
      api[toc.pid ? 'put' : 'post']('/toc', payload).then(res => {
        toc.pid = toc.pid || res.pid;
        toc.isDirty = !true;
      }).catch(err => {
        console.log(err);
      });

    };

    toc.getValueByIndex = (ind1, ind2, name) => {
      try {
        return toc.data.slots[Number(ind1)][Number(ind2)][name] || '';
      } catch (error) {
        return '';
      }
    }

    toc.getISOWeekNumber = (date) => {
      // Set the target date to Monday of the current week
      let target = new Date(date.getTime());
      target.setDate(target.getDate() - target.getDay() + 1);
      // Get the year and week number of the target date
      let year = target.getFullYear();
      let weekNumber = Math.floor((target.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

      // Adjust the week number if necessary (week 1 might belong to the previous year)
      if (weekNumber === 0) {
        year--;
        weekNumber = getISOWeekNumber(new Date(year, 11, 31));
      } else if (weekNumber > 52) {
        year++;
        weekNumber = 1;
      }
      // Return the year and week number as a string
      return year + '-W' + weekNumber.toString().padStart(2, '0');
    }

    toc.getNextMonday = (dateStr) => {
      // Parse the input date string and create a Date object
      const date = new Date(dateStr);

      // Calculate the number of days until the next Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilMonday = (8 - date.getDay()) % 7;

      // If the input date is a Monday, add 7 days to get the date of the following Monday
      const daysToAdd = daysUntilMonday === 0 ? 7 : daysUntilMonday;

      // Create a new Date object for the next Monday by adding the number of days until Monday (or 7 days) to the input date
      const nextMonday = new Date(date.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // converting daysToAdd to miliseconds 

      // Format the next Monday date as "YYYY/MM/DD" and return it
      const nextMondayStr = `${nextMonday.getFullYear()}/${(nextMonday.getMonth() + 1).toString().padStart(2, '0')}/${nextMonday.getDate().toString().padStart(2, '0')}`;
      return nextMondayStr;
    }

    toc.getPreviousWeekMonday = (dateStr) => {
      // Parse the input date string and create a Date object
      const date = new Date(dateStr);

      // Calculate the number of days since the previous Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysSinceMonday = date.getDay() === 0 ? 6 : date.getDay() - 1;

      // Calculate the number of days to subtract to get to the Monday of the previous week
      const daysToSubtract = daysSinceMonday + 7;

      // Create a new Date object for the Monday of the previous week by subtracting the number of days to subtract from the input date
      const previousWeekMonday = new Date(date.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);

      // Format the previous week's Monday date as "YYYY/MM/DD" and return it
      const previousWeekMondayStr = `${previousWeekMonday.getFullYear()}/${(previousWeekMonday.getMonth() + 1).toString().padStart(2, '0')}/${previousWeekMonday.getDate().toString().padStart(2, '0')}`;
      return previousWeekMondayStr;
    }

    toc.template = () => {
      let components = {
        single: function (data, ind) {
          let options = (ajaxify.data.settings.types || []).map(type => `<option data-bg="${type.bg}" data-text="${type.text}" style="background:${type.bg};color:${type.text}" value="${type.value}">${type.label}</option>`);
          return data.map((item, index) => {
            return (`<tr>` +
              `<td class="time-slot"><small>${item[0]} : ${item[1]}</small></td>` +
              (!index ? `<td rowspan="${data.length}"><textarea id="content" ${toc.editable ? '' : 'disabled'} name="slots[${ind}][${index}][Monday]" class="input">${toc.getValueByIndex(ind, index, 'Monday')}</textarea></td>
                   <td rowspan="${data.length}"><textarea id="content" ${toc.editable ? '' : 'disabled'} name="slots[${ind}][${index}][Tuesday]" class="input">${toc.getValueByIndex(ind, index, 'Tuesday')}</textarea></td>
                   <td rowspan="${data.length}"><textarea id="content" ${toc.editable ? '' : 'disabled'} name="slots[${ind}][${index}][Wednesday]" class="input">${toc.getValueByIndex(ind, index, 'Wednesday')}</textarea></td>
                   <td rowspan="${data.length}"><textarea id="content" ${toc.editable ? '' : 'disabled'} name="slots[${ind}][${index}][Thursday]" class="input">${toc.getValueByIndex(ind, index, 'Thursday')}</textarea></td>
                   <td rowspan="${data.length}"><textarea id="content" ${toc.editable ? '' : 'disabled'} name="slots[${ind}][${index}][Friday]" class="input">${toc.getValueByIndex(ind, index, 'Friday')}</textarea></td>
                   <td rowspan="${data.length}"><textarea id="content" ${toc.editable ? '' : 'disabled'} name="slots[${ind}][${index}][Saturday]" class="input">${toc.getValueByIndex(ind, index, 'Saturday')}</textarea></td>` : '')
              + `</tr>`)
          }).join('');
        }
      }

      return components;
    }

    return toc;
  });