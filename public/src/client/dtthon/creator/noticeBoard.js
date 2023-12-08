"use strict";

/* globals define */

define("forum/dtthon/creator/noticeBoard", ["api"], function(api) {
  var noticeboard = {};
  noticeboard.init = function() {
    let {tid} = ajaxify.data;

    $(".backBtn").on("click", function() {
      ajaxify.go(`/dtthon/creator/microDashboard/${ajaxify.data.tid}`);
    });  

    $('#select-task').on('change', function () {
      let id = $(this).val();
      api.get('/apps/notice', {id}).then((resp) => {
        if (resp.notice) {
          $('[name="notice"]').attr('data-task-id', resp.taskId).val(resp.notice);
        } else {
          $('[name="notice"]').attr('data-task-id', null).val('');
        }

      }).catch((err) => notify(err.message, 'error'));
    });


    $('#notice-form').on('submit', function (e) {
      e.preventDefault();
      
      let taskId = $('#select-task').val();
      let taskNumber = $('#select-task').find(`[value="${taskId}"]`).data('task-number');
      let notice = $('[name="notice"]');

      notify('Please wait...', 'info');
      
      if (notice.data('task-id')) {
          api.put('/apps/notice/' + taskId, {projectTid: tid, taskId, notice: notice.val()}).then((resp) => {
            console.log(resp)
            notify('Updated successfully', 'success');
            ajaxify.refresh();
          })
          .catch((err) => notify(err.message, 'error'));
      } else {
          api.post('/apps/notice', {projectTid: tid, taskId, taskNumber, notice: notice.val()}).then((resp) => {
            console.log(resp)
            notify('Created successfully', 'success');
            ajaxify.refresh();
          })
          .catch((err) => notify(err.message, 'error'));
      }
    });
  }

  return noticeboard;
});