/**
 * @author Unknown
 * @date 12/2021
 * @description Allow user to build the threads based on @tid and @uid with update and private,public mode
 * @name Session as @name Topic
 * @returns @Challenge
 */

/**
 * @var {class} Challenge
 * @description Contains the @methods or @function - to run the Challenge
 * @function Challenge.init
 * @function Challenge.unique
 * @function Challenge.log
 * @function Challenge.builder
 * @function Challenge.thread
 * @function Challenge.create
 */

class Challenge extends Template {
  constructor(data = {}) {
    /**
     * @author Unknown
     * @description Tid is required to init a thread builder
     */

    if (!data.tid) {
      throw new Error('Invalid tid supplied');
    }
    super();
    this.tid = data.tid;
    this.data = data;
    this.target = data.target;
    this.data.with = data.with || {};
    this.lookup_id = data.lookup_id || null;
    this.builder(this.target)
  }

  unique(prefix = '') {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return prefix + uuid;
  }

  log(log) {
    !this.data.log || console.log(log);
  }

  builder(target = 'body') {
    this.id = this.unique('sdlms-thread-');
    const $that = this;
    const $target = $(target);

    if (!$target.length) {
      $that.log('No HTML element found For Builder Given ==>' + target);
      throw new Error(`No HTML element found while searching ${target}`);
    }
    $target.append(
      $('<sdlms-challenge>')
        .attr({
          id: $that.id,
          class: 'p-3 d-block mb-3' + ($that.data.noAction ? 'sdlms-readonly' : ''),
        })
        .append(
          $('<form>').attr({
            id: 'form-' + $that.id,
            class: 'sdlms-form-elements ' + ($that.data.action == 'reader' ? 'readonly' : 'create'),
          })
        )
    );
    const $builder = $(`#form-${$that.id}`);


    $that.$builder = $builder;
    $that.create($that.data.with);

  }

  create(data = null) {

    let $target = this.$builder,
      templates = Template.challenge(data),
      $that = this;

    $target.html(function () {
      return (templates.header.editable() + templates.container((templates.options() + templates.type() + templates.custom() + templates.description() + templates.action())))
    })

    $target.on('change', '[name="asset_type"]', function () {
      let type = $(this).val();
      if (type == 'input_asset') {
        $target.find('[asset-display-link]').hide()
      } else {
        $target.find('[asset-display-link]').show()
      }
    });

    function characterCount() {
      let ML = $(this).attr("maxlength");
      let CL = $(this).val().length;
      if (CL >= ML) {
        return alert("You have reached the maximum number of characters.");
      } else {
        $(this).next().find("[show-characters]").text(CL);
      }
    }
    $target.on("input", `[name="asset_description"]`, characterCount);

    $target.on('click', '.add-asset-title', function () {
      let title = $target.find('[name="asset_title"]').val();
      if (title) $target.find('[header-asset-div]').html(templates.header.static(title));
    })

    $target.on('click', '[edit-title]', function () {
      let title = $target.find('[content="text"]').text();
      $target.find('[header-asset-div]').replaceWith(templates.header.editable(title));
    });

    $target.on('change', '[name="asset_content_type"]', function (e, data = {}) {
      if (data.ignore) return;
      let type = $target.find('[name="asset_type"]').val();
      $target.find('[name="asset_content"]').parents('[asset-display-link]').show();
      if (type == 'display_asset') {
        if ($.inArray($(this).val(), ['eaglebuilder', 'threadbuilder']) > -1 && confirm(`Would you like to explore ${$(this).val() + 's'}?`)) {
          window.assets_window ? window.assets_window.close() : null;
          window.assets_window = window.open(`/myassets/${$(this).val() + 's'}?no_sidebar=1&no_header=1`, '', `width=${$(window).width() * 0.9}, height=${$(window).height() * 0.9}`);
        }

      } else {
        if ($.inArray($(this).val(), ['form']) > -1 && confirm(`Would you like to create ${$(this).val() + 's'}?`)) {

          $("#CreateForm").modal("show");
          $target.find('[name="asset_content"]').parents('[asset-display-link]').hide();
          require(["sdlms/enquiryform"], function () {
            let data = new EnquiryForm({
              target: '#CreateForm .modal-body',
              header: 'Create Form',
              classes: 'shadow-lg d-block',
              action: 'create', //Modes: create, answer, reader
              with: {}
            })
            $("#getForm").off('click').on("click", function () {
              let formdata = data.getJSON();
              $target.find('[name="asset_content"]').val(JSON.stringify(formdata));
              $("#CreateForm").modal("hide")
            });
            $("#CreateForm").off('hidden.bs.modal').on('hidden.bs.modal', function () {
              let formdata = data.getJSON();
              $target.find('[name="asset_content"]').val(JSON.stringify(formdata));
            })


          })
        }
      }
    });

    $target.on('change', '[name="asset_type"]', function (e, data = {}) {
      if (data.ignore) return;
      $target.find('[name="asset_content_type"]').trigger('change');
    });

    $target.on('click', '[remove-asset]', async function () {
      let asset_id = $(this).attr('remove-asset');
      if (isNaN(asset_id)) return $target.parent('sdlms-challenge').remove();
      let $buttons = $(this).parents('.task-asset-action').first().find('button');
      $buttons.attr('disabled', true);

      require(['api'], function (api) {

        api.del(`/apps/asset`, {
          asset_id: Number(asset_id),
          task_id: Number($that.data.task_id),
          tid: Number($that.tid)
        }).then(function (res) {
          if (res.deleted) $target.parent('sdlms-challenge').remove();
          else console.log('Error while deleting asset');
          $buttons.attr('disabled', false);
        }).catch((error) => {
          notify(error.message, "error");
        });;

      });

    });

    $target.on('submit', async function (e) {
      e.preventDefault();
      let data = $target.serializeArray();
      let payload = {};
      let $buttons = $(this).find('button');
      let $form = $(this);
      data.forEach(function (item) {
        payload[item.name] = item.value;
      })
      payload.asset_id = payload.asset_id || Number(payload.asset_id);
      if (payload.asset_type == "display_asset" && payload.asset_content == "") {
        alert("Please enter the Link");
        return;
      }
     
      let hasLinkError = false;
      $buttons.prop('disabled', true);
      // if (payload.asset_type == "display_asset" && payload.asset_content != "") {
      //   await doAjax({
      //       url:payload.asset_content,
      //       method:"get"
      //   }).then(function(res){}).catch(function(err){
      //       hasLinkError = true;
      //       alert("Please enter a valid Link");
      //       $buttons.prop('disabled', !true);
      //   });
      // }

      // if (hasLinkError) return false;
      require(['api'], function (api) {
        api[payload.asset_id && payload.asset_id > 0 ? 'put' : 'post'](`/apps/asset`, {
          asset: payload,
          asset_id: Number(payload.asset_id),
          task_id: Number($that.data.task_id),
          tid: Number($that.tid)
        }).then(function (res) {

          notify('Asset saved Successfully', 'success');
          $buttons.prop('disabled', !true);
          $form.find('[name="asset_id"]').val(res.asset_id);
          $form.find('[remove-asset]').attr('remove-asset', res.asset_id);
        }).catch((error) => {
          notify(error.message, "error");
          $buttons.prop('disabled', !true);
        });;
      })

    })
  }

}

// class Asset {
//     constructor( data = {} ) {
//         this.target = data.target;
//         this.task_id = data.task_id;
//         this.tid = data.tid;
//         this.builder();
//     }

//     id() {
//         var stamp = new Date().getTime();
//         var uuid = "xxxxxxxx_xxxx_xxxx_yxxx_xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//                 var r = (stamp + Math.random() * 16) % 16 | 0;
//                 stamp = Math.floor(stamp / 16);
//                 return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
//             }
//         );
//         return uuid.replaceAll("_", "-");
//     }

//     builder() {
//         var assetID = this.id();
//         let $that = this;

//         console.log($($that.target))
//         if(!$($that.target)){
//             return
//         }
//         $($that.target).append(`
//         <div class="col-md-6 my-2 mx-auto mb-5">
//           <div class="sdlms-section sdlms-form-elements">
//               ${}
//           </div>
//         </div>`);

//         $(`[assetID]`).on("click", `[add-to-headerAsset${assetID}]`, function () {
//             let value = $(`#asset_heading${assetID}`).val();
//             let assetTitle = `
//         `;
//             $(this).parents("[header-asset-div]").html(assetTitle);
//           });

//           $("[assetID]").on("input", `[description${assetID}]`, this.characterCount);
//           $("[assetID]").on("input", `[reflectionInput${assetID}]`, this.characterCount);

//           $("[assetID]").on("change", `[assetTypeDropdown${assetID}]`, function () {
//             if ($(`[assetTypeDropdown${assetID}]`).val() == "display_asset") {
//               $(`[assetContentDropdown${assetID}]`).on("change", function () {
//                 let content = $(`[assetContentDropdown${assetID}]`).val();
//                 if (content == "ot") {
//                   $(`[linkTypeDropdown${assetID}]`).show();
//                 } else {
//                   $(`[linkTypeDropdown${assetID}]`).hide();
//                 }
//                 if (content == "tb" || content == "eb" || content == "ar" || content == "ss") {
//                   $(`[storeLink${assetID}]`).show();
//                 } else {
//                   $(`[storeLink${assetID}]`).hide();
//                 }
//               });
//             }
//           });




//           $("[assetID]").on("change", `[linkContentDropdown${assetID}]`, function () {
//             $(`[linkTypeDropdown${assetID}]`).hide();
//             $(`[customOption${assetID}]`).show();
//           });

//           $(`[customArrow${assetID}]`).on("click", function () {
//             console.log("hello");
//             $(`[customOption${assetID}]`).hide();
//             $(`[linkTypeDropdown${assetID}]`).show();
//           });

//           $("[assetID]").on("click", `[edit-icon${assetID}]`, function () {
//               $(`[createAsset${assetID}]`).hide();
//               $(`[SaveAsset${assetID}]`).removeClass("change-class")
//           })


//           $("[assetID]").on("click", `[createAsset${assetID}]`, function () {
//             $("#finish-btn").show();
//             $(`[createAsset${assetID}]`).prop("disabled",true);
//             $(`[delete-icon${assetID}]`).show();
//             $(`[edit-icon${assetID}]`).show();
//             var assetContent = $(`[assetContentDropdown${assetID}]`).val();
//             var linkContent = $(`[linkContentDropdown${assetID}]`).val();
//             var assetType = $(`[assetTypeDropdown${assetID}]`).val();
//             var contentType, displayAssetLink = null, displayAssetImage = null, displayAssetVideo = null, displayAssetDocs = null;
//             console.log( $(`[reflectionInput${assetID}]`).val());

//             if(assetType == "none" || assetContent == "none") {
//               alert("Please select an asset type and content");
//             }

//             switch (assetContent) {
//               case "re":
//                 contentType = "reflection";
//                 break;

//               case "tb":
//                 contentType = "tb";
//                 break;

//               case "eb":
//                 contentType = "eb";
//                 break;

//               case "ar":
//                 contentType = "article";
//                 break;

//               case "qz":
//                 contentType = "quiz";
//                 break;

//               case "ot":
//                 contentType = "other";
//                 if (assetType == "display_asset") {
//                   switch (linkContent) {
//                     case "img":
//                       displayAssetImage = $(`[displayAssetLink${assetID}]`).val();
//                       break;
//                     case "video":
//                       displayAssetVideo = $(`[displayAssetLink${assetID}]`).val();
//                       break;
//                     case "docs":
//                       displayAssetDocs = $(`[displayAssetLink${assetID}]`).val();
//                       break;
//                     case "audio":
//                       displayAssetLink = $(`[displayAssetLink${assetID}]`).val();
//                       break;
//                   }
//                 }
//                 break;
//                 case "fo":
//                   contentType = "form";
//                   break;

//               case "ss":
//                   contentType = "spreadsheet";
//                   break;
//             }

//             let assetData1 = {
//               tid: $that.tid,
//               task_id: $that.task_id,
//               asset: {
//                 asset_title: $(`[assetSelectionLabel${assetID}]`).text(),
//                 asset_description: $(`[description${assetID}]`).val(),
//                 asset_type: assetType,
//                 asset_content: contentType,
//                 asset_url: displayAssetLink,
//                 asset_image: displayAssetImage,
//                 asset_video: displayAssetVideo,
//                 asset_docs: displayAssetDocs,
//                 asset_reflection: $(`[reflection${assetID}]`).val(),
//               },
//             };

//             let assetData2 = {
//               tid: $that.tid,
//               task_id: $that.task_id,
//               asset: {
//                 asset_title: $(`[assetSelectionLabel${assetID}]`).text(),
//                 asset_description: $(`[description${assetID}]`).val(),
//                 asset_type: assetType,
//                 asset_content: contentType,
//               },
//             };

//             let payload = assetType == "display_asset" ? assetData1 : assetData2;
//             require(['api'],function(api){
//               api.post(`/apps/asset`, payload).then(function (res) {
//                 console.log(res);
//               });
//             })
//           });

//           $(`[assetID]`).on("click", `[delete-icon${assetID}]`, function () {
//               $(this).parents("[AssetID]").remove();
//               var assetDeleted = {
//                 tid: $that.tid,
//                 task_id: $that.task_id,
//                   //asset_id:,
//               }
//               api.delete(`/apps/asset`, assetDeleted).then(function (res) {
//                   console.log(res);
//               })
//             });
//         }

//         characterCount () {
//           let ML = $(this).attr("maxlength");
//           let CL = $(this).val().length;
//           if (CL >= ML) {
//             return alert("You have reached the maximum number of characters.");
//           } else {
//             $(this).next().find("[show-characters]").text(CL);
//           }
//         }
// }
