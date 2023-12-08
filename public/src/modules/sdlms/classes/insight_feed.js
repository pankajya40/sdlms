/**
  * @author Purnima Kumar
  * @class InsightFeed
  * @description Allows the user to intiate the Insight Feed
  * @date 27-03-2023
 */

/**
 * @function InsightFeed.addModal()
 * @function InsightFeed.addInights()
 * @function InsightFeed.showInsightsData()
 * @function InsightFeed.createJudgement()
 * @function InsightFeed.addJudgements()
 * @function InsightFeed.infiniteScroller()
 * @function InsightFeed.events()
 * @function InsightFeed.removeEvents()
 */

let insightFeedTemplate  = {
  // HTML code for the modal
  modal: () => {
    return `
    <div class="modal modal_outer right_modal fade" id="insight-feed" tabindex="-1" role="dialog" aria-labelledby="insight-feed-label" style="padding-right: 0; display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0 py-0 rounded-0">
          <div class="modal-header">
            <h5 class="modal-title" id="insight-feed-label">Insight Feed</h5>
          </div>
          <div class="modal-body overflow-auto">
            <!-- This is the feeds section -->
            <div class="feeds-container">
              <div id="filters-container" class="mb-3 px-2 d-flex align-items-center">
                <input id="my-insights" class="mr-2" type="checkbox" name="my-insights">
                <label for="my-insights" class="mb-0 my-insights-text">My insights only</label>
              </div>
              <div id="feeds"></div>
            </div>
            <!-- This is the Insight view (user chooses an insight and here they see all the information for the insight, including reflection & judgements) -->
            <div class="insight-view-container d-none">
              <button title="Back" class="d-flex align-items-center mb-3 border-0 back-btn px-3-2 py-1-2">
                <i class="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                <span>Back</span>
              </button>
              <div id="insight-view"></div>
              <div>
                <h6 class="font-weight-medium mb-3">Judgements</h6>
                <div id="prev-judgements"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  },
  user: (url, username) => {
    return `
      <div class="user-informantion d-flex align-items-center mb-2">
        <img src="${url}" class="rounded-circle user-image mr-2" alt="" />
        <p class="username m-0">${username}</p>
      </div>
    `
  },
  category: (category, subCategory) => {
    return `
    <div class="category-information d-flex align-items-center mb-4">
      <p class="category tag font-weight-medium mb-0 cat-${category}">${category}</p>
      <p class="sub-category tag font-weight-medium m-0 subcat-${subCategory}">${subCategory}</p>
    </div>
    `
  },
  // HTML code for one showing one insight in the list
  insightCard: (url, username, statement, category, subCategory, id) => {
    return `
      <div class="insight-container px-2 py-3 mb-3" id="${id}">
        ${insightFeedTemplate.user(url, username)}
        ${insightFeedTemplate.category(category, subCategory)}
        <div class="statement-conatiner mb-3">
          <p class="statement mb-0">
            ${statement.length >= 116 ? `${statement.substr(0, 116)}...` : statement}
          </p>
        </div>
        <div class="call-to-action d-flex justify-content-end w-100">
        <button id="${id}" class="see-more-btn sdlms-button button-primary px-3-2 py-1-2 sdlms-text-white-16px d-flex align-items-center justify-content-center font-weight-500 ml-auto">See more</button>
        </div>
      </div>
    `
  },
  // HTML code to add the judgements
  judgements: (data) => {
    return `
      ${data.length ? `${data.map((el) => {
        return ` 
          <div class="judgement-container mb-4 p-3">
            ${insightFeedTemplate.user(el.userData.uploadedpicture || el.userData.picture, el.userData.username || el.userData.fullname)}
            <div class="p-1">
              <p class="judgement-text scrollable m-0" id="${el._id}">${el.judgement}</p>
            </div>
          </div>`}).join("")}` 
        : `` }
    `
  },
  // HTML code the Insight view
  insightView: (uid, url, username, statement, category, subCategory, id, reflection) => {
    return `
      ${insightFeedTemplate.user(url, username)}
      ${insightFeedTemplate.category(category, subCategory)}
      <div class="statement-container mb-4">
        <h6 class="font-weight-medium mb-2">Statement</h6>
        <div class="scrollable-container p-3">
          <p class="statement scrollable m-0">${statement}</p>
        </div>
      </div>
      <div class="reflection-container mb-4">
        <h6 class="font-weight-medium mb-2">Reflection</h6>
        <div class="scrollable-container p-3">
          <p class="reflection scrollable m-0">${reflection}</p>
        </div>
      </div>
      ${app.user.uid == uid ? `` : `
        <div class="new-judgement-container mb-3">
          <h6 class="font-weight-medium mb-3">Write Judgement</h6>
          <textarea class="form-control new-judgement" rows="4" cols="50" placeholder="Type your judgement here.."></textarea>
        </div>
        <div class="call-to-action d-flex justify-content-end w-100 mb-4">
          <button id="${id}" class="submit-btn sdlms-button button-primary px-3-2 py-1-2 sdlms-text-white-16px d-flex align-items-center justify-content-center font-weight-500 ml-auto">Submit</button>
        </div>
      `}
    `
  }
}

class InsightFeed {
  constructor() {
    this.addModal();
    this.events();
    this.showInsights("/insightspotter/getInsights", {});
    this.loading = false;
  }

  // Adds the feed modal to the page
  addModal() {
    $("body").append(`${insightFeedTemplate.modal()}`);
    let self = this;
    // Add the show class when modal is added and remove the modal when hidden.bs.modal event is triggered
    let $modal = $("#insight-feed");
    (($modal) => {$modal.modal('show');
    $modal.on('hidden.bs.modal', () => {
      $modal.remove();
      self.removeEvents(); // Disable event listeners when modal closed
    });
  })($modal);

    // Attach the infinite scroll event listener
    this.infiniteScroller($("#insight-feed").find(".modal-body"));
  }

  // Appends the insights or judgements when user scrolls
  infiniteScroller(element) {
    const self = this;
		$(element).on('scroll', function () {
			if (self.loading) {
        return;
      }
			let {scrollTop, scrollHeight, clientHeight} = this;
			let feedNextPageURL = $(element).attr("feed-next-page-url");
			let judgementNextPageURL = $(element).attr("judgement-next-page-url");
			if ((scrollTop + clientHeight >= scrollHeight * 0.8) && feedNextPageURL && $(".insight-view-container").hasClass("d-none")) {
        this.loading = true;
        // check the filter
        if($("#my-insights").checked) {
          self.showInsights(feedNextPageURL, {records: "self"});
        } else {
          self.showInsights(feedNextPageURL);
        }
      } 
      if((scrollTop + clientHeight >= scrollHeight * 0.8) && judgementNextPageURL && $(".feeds-container").hasClass("d-none")) {
        this.loading = true;
        self.showJudgements(judgementNextPageURL);
			}
		});
  }

  // Adds all the insights in the modal
  showInsights(nextPageURL, data = {}) {
    this.loading = true;
    const self = this;
    const API_URL = nextPageURL || "/insightspotter/getInsights/"
    require(["api"], function(api) {
      api.get(API_URL, data).then((res) => {
        // Change the next page url attribute according to the response
        $("#insight-feed").find(".modal-body").attr("feed-next-page-url", res.next_page_url);
        let data = res.data;
        data.map((el) => {
          $("#insight-feed").find("#feeds").append(insightFeedTemplate.insightCard(el.uploadedpicture || el.userData.picture, el.userData.username || el.userData.fullname, el.statement, el.category, el.subCategory, el._id));
        });
        self.loading = false;
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  // Shows all the judgements in the modal
  showJudgements(nextPageURL, id) {
    this.loading = true;
    const self = this;
    const API_URL = nextPageURL || `/insightspotter/getJudgements/${id}`;
    require(["api"], function(api) {
    api.get(API_URL, {}).then((res) => {
      $("#insight-feed").find(".modal-body").attr("judgement-next-page-url", res.next_page_url);
      if(res.current_page == 0 && res.next_page == null && res.data.length == 0) {
        $("#prev-judgements").html(`<p class="text-center default-text">No judgements have been given.</p>`);
      } else {
        $(".insight-view-container").find("#prev-judgements").append(insightFeedTemplate.judgements(res.data));
      }
      self.loading = false;
    }).catch((error) => {
      console.log(error);
    });
  });
  }

  // Shows the reflection & judgements for one insight
  showInsightData(id) {
    let self = this;
    require(["api"], function(api) {
      // Get the particular insight & reflection & display
      api.get(`/insightspotter/getInsight/${id}`, {}).then((res) => {
        $("#insight-feed").find("#insight-view").html(insightFeedTemplate.insightView(res.uid, res.userData.uploadedpicture || res.userData.picture, res.userData.username || res.userData.fullname, res.statement, res.category, res.subCategory, res._id, res.reflection));
      }).catch((error) => {
        console.log(error);
      });
      // Get all the judgements for this insight & display
      self.showJudgements(`/insightspotter/getJudgements/${id}`, id);
    });
  }

  // Creates a new judgement
  createJudgement(currentId, data) {
    require(["api"], function(api) {
      api.post(`/insightspotter/createjudgement/${currentId}`, data).then((res) => {
        notify("Judgement sucessfully added", "success");
        $(".insight-view-container").find(".new-judgement").val(""); // Reset textarea value after judgement is saved
        // Show the insight in modal once saved
        let username = app.user.username || app.user.userfullname;
        let url = app.user.uploadedpicture || app.user.picture;
        // Remove the default text if present
        $("#prev-judgements").find(".default-text").remove();
        $("#prev-judgements").prepend(`
          <div class="judgement-container mb-4 p-3">
            ${insightFeedTemplate.user(url, username)}
            <div class="p-3">
              <p class="judgement-text scrollable m-0">${data.judgement}</p>
            </div>
          </div>
        `);
      }).catch((error) => {
        notify(error, "error");
        console.log(error);
      });
    });
  }

  // Event Listeners for the class
  events() {
    let self = this; // self -> Reference to the class

    // Open the particular insight when user clicks
    $("#insight-feed").on("click", ".see-more-btn", function() {
      let currentId = this.id;
      self.showInsightData(currentId);
      $("#insight-feed").find(".feeds-container").addClass("d-none");
      $("#insight-feed").find(".insight-view-container").removeClass("d-none");
    });

    // Add new judgement
    $("#insight-feed").on("click", ".submit-btn", function() {
      let currentId = this.id;
      let judgement = $(".insight-view-container").find(".new-judgement").val();
      let category = $(".insight-view-container").find(".category").text();
      if(judgement) {
        let data = {
          judgement: judgement,
          category: category
        };
        self.createJudgement(currentId, data);
      } else {
        notify("Please write a judgement");
      }
    });
    
    // Toggle view when back button is clicked
    $("#insight-feed").on("click", ".back-btn", function() {
      $("#insight-feed").find(".insight-view-container").addClass("d-none");
      // Empties the data in insight view so that when user opens another insight new data is shown
      $(".insight-view-container").find("#insight-view").empty();
      $(".insight-view-container").find("#prev-judgements").empty();
      $("#insight-feed").find(".feeds-container").removeClass("d-none");
    });

    // Shows the user only their insights when they check the filter
    $("#insight-feed").on("change", "#my-insights", function() {
      $("#feeds").empty() // To reload the data when user click on the filter
      if(this.checked) {
        self.showInsights("/insightspotter/getInsights", {records: "self"});
      } else {
        self.showInsights("/insightspotter/getInsights");
      }
    });
  }

  // Removes all the event listeners in the modal
  removeEvents() {
    $("#insight-feed").off("click", "#insight-feed");
    $("#insight-feed").off("click", "see-more-btn");
    $("#insight-feed").off("click", "submit-btn");
    $("#insight-feed").off("click", "back-btn");
    $("#insight-feed").off("click", "#my-insights");
  }
}