/**
     * @author Purnima Kumar
     * @class Insight Spotter
     * @description Allows the user to intiate the Insight Spotter Pop-up Widget
     * @date 01-03-2023
*/

/**
 * @function InsightSpotter.submitInsight()
 * @function InsightSpotter.settings()
 * @function InsightSpotter.addWidget()
 * @function InsightSpotter.getEmotions()
 * @function InsightSpotter.getWisdoms()
 * @function InsightSpotter.getValues()
 * @function InsightSpotter.switchTab()
 * @function InsightSpotter.updateDescription()
 */

let count = 0;

let insightTemplates = {
  insight: {
    // HTML code for the header of the widget
    insightSpotterHeader: (id) => {
      return `
        <div>
          <p class="fs-3 mb-0 text-white header-title">Insight Spotter</p>
        </div>
        <div>
          <button id="insight-toggle" class="btn text-white p-2" title="Minimize" data-id="${id}">
            <i class="toggle-icon fa fa-solid fa-minus" data-id="${id}"></i>
          </button>
          <button id="insight-close" class="btn fs-3 p-2 text-white" title="Close" data-id="${id}">
            <svg data-id="${id}" class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 5L5 19M19 19L5 5" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      `
    },
    // HTML code for the insight container which shows the statement chosen
    insightContainer: (selectedText) => {
      return `
        <div class="insight-container mb-4">
          <p class="insight-placeholder font-weight-medium text-dark mb-0">Insight</p>
          <div name="insight" class="insight-text font-weight-light py-2">${selectedText}</div>
        </div>
      `
    },
    // HTML code for the navigation items (emotion, wisdom, value)
    navTabItem: (id, text, currentCount, active="") => {
      return `
        <li class="nav-item ${active}" role="presentation">
          <button id="${id}" class="nav-link font-weight-bold w-100 d-flex justify-content-center space-between" data-id="${currentCount}" data-toggle="tab" data-target="#${text}-pane-${currentCount}" aria-selected="true" aria-controls="${text}-pane-${currentCount}">${text}</button>
        </li>
      `
    },
    // HTML code for the reaction buttons that are present in the reaction container
    reactionBtn: (data, category, id) => {
      return `
        <button data-id="${id}" class="${data.value} reaction-btn col-md-4 d-flex flex-column align-items-center justify-content-center border-0" data-category="${category}">
          <div class="reaction-icon" data-value="${data.value}">${data.icon}</div>
          <p class="reaction-text m-0">${data.name}</p>
        </button>
      `
    },
    // HTML code the description of the chosen reaction
    description: () => {
      return `
        <div class="row">
          <div class="description-text-wrapper col-md-4 d-flex flex-column align-items-center justify-content-center">
            <span class="selected-icon"></span>
            <p class="selected-value m-0 text-center"></p>
            <p class="selected-category m-0 font-weight-normal"></p>
          </div>
            <p class="selected-description m-0 col-md-8 d-flex justify-content-center align-items-center font-weight-normal fs-1"></p>
        </div>
      `
    },
    // HTML code for the reflection section
    reflection: (id) => {
      return `
        <p class="your-reflection-text font-weight-medium text-dark mb-2 pb-1">Your reflection</p>
        <textarea name="reflection" id="reflection-text-${id}" class="form-control" rows="4" placeholder="Write your thoughts here.."></textarea>
      `
    },
    // HTML code for the submit button at the very bottom in the widget
    submitBtn: (id) => {
      return `
        <button id="submit-insight" class="sdlms-button btn text-white d-flex align-items-center justify-space-evenly border-0" data-id="${id}" type="button" title="Save Insight">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.59844 20.4004V15.0004C6.59844 14.3376 7.1357 13.8004 7.79844 13.8004H16.1984C16.8612 13.8004 17.3984 14.3376 17.3984 15.0004V21.0004M14.9984 7.20039L7.79844 7.20039C7.1357 7.20039 6.59844 6.66313 6.59844 6.00039L6.59844 2.40039M20.9959 6.59786L17.401 3.00292C17.0152 2.61713 16.4919 2.40039 15.9464 2.40039H4.45558C3.31944 2.40039 2.39844 3.32139 2.39844 4.45753V19.5432C2.39844 20.6794 3.31944 21.6004 4.45558 21.6004H19.5413C20.6774 21.6004 21.5984 20.6794 21.5984 19.5432V8.05248C21.5984 7.50689 21.3817 6.98365 20.9959 6.59786Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Save</span>
        </button>
      `
    }
  }
};

class InsightSpotter {
  constructor (selectedText, e) {
		this.left = e.pageX;
		this.top = e.pageY;
    this.selectedText = selectedText;
    count++;

    // Draggable functionality for the widget
    require(['https://unpkg.com/interactjs/dist/interact.min.js'], function (interact) {
			// InteractJS
			// drag
			interact('.draggable')
				.draggable({
					// enable inertial throwing
					inertia: false,
					// keep the element within the area of it's parent
					modifiers: [
						interact.modifiers.restrictRect({
							restriction: 'parent',
							endOnly: true,
						}),
					],
					// enable autoScroll
					autoScroll: true,

					listeners: {
						// call this function on every dragmove event
						move: dragMoveListener,

					},
				});
			// drag end
			// resize

			function dragMoveListener(event) {
				var target = event.target;
				// keep the dragged position in the data-x/data-y attributes
				var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
				var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

				// translate the element
				target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

				// update the posiion attributes
				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			}

			// this function is used later in the resizing and gesture demos
			window.dragMoveListener = dragMoveListener;
			// interactjs end
		});
    this.insightEmotions = [];
    this.insightValues = [];
    this.insightWisdoms = [];
    this.updateDescription();
    this.addWidget();
	}

  // Gets the reactions data (emotions, wisdoms, values) using the API and sets it in local storage for future use
  async settings() {
    let emotions = localStorage.getItem("insight_emotions");
    let wisdoms = localStorage.getItem("insight_wisdoms");
    let values = localStorage.getItem("insight_values");

    let self = this;

    if(!emotions || !values || !wisdoms) {
      let api = require("api");
      const routeEmotions = "/api/v3/globals/getInsightReactions?reaction=emotion";
      const routeWisdoms = "/api/v3/globals/getInsightReactions?reaction=wisdom";
      const routeValues = "/api/v3/globals/getInsightReactions?reaction=value";

      const [emotionsData, wisdomsData, valuesData] = await Promise.all([api.get(routeEmotions, {}), api.get(routeWisdoms, {}), api.get(routeValues, {})]);

      self.insightEmotions = emotionsData[0].emotions;
      localStorage.setItem("insight_emotions", JSON.stringify(self.insightEmotions));

      self.insightWisdoms = wisdomsData[0].wisdoms;
      localStorage.setItem("insight_wisdoms", JSON.stringify(self.insightWisdoms));

      self.insightValues = valuesData[0].values;
      localStorage.setItem("insight_values", JSON.stringify(self.insightValues));
    } else {
        this.insightEmotions = JSON.parse(emotions);
        this.insightWisdoms = JSON.parse(wisdoms);
        this.insightValues = JSON.parse(values);
    }
  }

  // Returns emotions data
  getEmotions() {
    return this.insightEmotions;
  }

  // Returns wisdoms data
  getWisdoms() {
    return this.insightWisdoms;
  }
  
  // Returns values data
  getValues() {
    return this.insightValues;
  }

  // Activates the default reaction when tabs are switched
  switchTab(tab, currentId) {
    if(tab === "emotion") {
      $(`[insightspotter${currentId}]`).find(".reaction-btn.excites").addClass("active");
      $(`[insightspotter${currentId}]`).find(".reaction-btn.excites").trigger("click");
    } else if(tab === "wisdom") {
      $(`[insightspotter${currentId}]`).find(".reaction-btn.interdisciplinary").addClass("active");
      $(`[insightspotter${currentId}]`).find(".reaction-btn.interdisciplinary").trigger("click");
    } else if(tab === "value") {
      $(`[insightspotter${currentId}]`).find(".reaction-btn.humility").addClass("active");
      $(`[insightspotter${currentId}]`).find(".reaction-btn.humility").trigger("click");
    }
  }

  // Adds the insight widget
  async addWidget() {

    await this.settings();

    // HTML for Widget
		$("body").append(`
    <div insightspotter${count} class="insight-spotter draggable m-5 font-weight-bold p-1 position-absolute shadow-lg"
      style= "left: ${this.left}px; top:${this.top}px;">
      <div class="insight-spotter-header d-flex justify-content-between align-items-center px-3 py-1">
        <!-- Adds the insight spotter header -->
        ${insightTemplates.insight.insightSpotterHeader(count)}
      </div>
      <div class="insightCollapse">
        <div class="p-3 insight-spotter-body">
          <!-- Insight container contains the text user selected -->
          ${insightTemplates.insight.insightContainer(this.selectedText)}

          <div class="reaction-container">
            <p class="your-reaction-text font-weight-medium text-dark mb-2 pb-1">Your reaction</p>
            <div class="reaction-tabs mb-3">
              <ul class="nav nav-tabs" role="tablist">
                <!-- Adds the tab header items (value, wisdom, emotion) -->
                ${insightTemplates.insight.navTabItem("value", "Value", count, "active")}
                ${insightTemplates.insight.navTabItem("wisdom", "Wisdom", count)}
                ${insightTemplates.insight.navTabItem("emotion", "Emotion", count)}
              </ul>
              <div class="tab-content mb-0">
                <div class="tab-pane fade show active" id="Value-pane-${count}" role="tabpanel">
                  <div class="row gap-4">
                    <!-- Adds the reaction buttons for each reaction for this tab -->
                    ${this.getValues().map((value) => insightTemplates.insight.reactionBtn(value, "value", count)).join(' ')}
                  </div>
                </div>
                <div class="tab-pane fade" id="Wisdom-pane-${count}" role="tabpanel">
                  <div class="row gap-4">
                    <!-- Adds the reaction buttons for each reaction for this tab -->
                    ${this.getWisdoms().map((wisdom) => insightTemplates.insight.reactionBtn(wisdom, "wisdom", count)).join(' ')}
                  </div>
                </div>
                <div class="tab-pane fade" id="Emotion-pane-${count}" role="tabpanel">
                  <div class="row gap-4">
                    <!-- Adds the reaction buttons for each reaction for this tab -->
                    ${this.getEmotions().map((emotion) => insightTemplates.insight.reactionBtn(emotion, "emotion", count)).join(' ')}
                  </div>
                </div>
              </div>
            </div>
            <div class="description-container">
              <!-- Adds the description items for the selected reaction -->
              ${insightTemplates.insight.description()}
            </div>
          </div>
          
          <div class="reflection-container mb-4">
            <!-- Adds the textarea for reflection -->
            ${insightTemplates.insight.reflection(count)}
          </div>
          <div class="d-flex justify-content-end">
            <!-- Adds the submit button -->
            ${insightTemplates.insight.submitBtn(count)}
          </div>
        </div>
      </div>
    </div>`);

    // Initially Humility (Value) is activated
    this.switchTab("value", count);
  }

  // Submits an insight
  submitInsight(id, statement, category, subCategory, reflection) {
    if(reflection) {
      let data = {
        statement: statement,
        category : category,
        subCategory : subCategory,
        reflection : reflection
      };
      require(["api"], function(api) {
        api.post("/insightspotter/createInsight", data).then(res => {
          notify("Successfully added a submission", "success");
          $(`[insightspotter${id}]`).find("#insight-close").trigger("click");
        }).catch((error) => {
          notify(error, "error");
        });
      })
    } else {
      notify("Please write your reflection before submitting!");
    }
  }

  // Updates the information according to the selected reaction
  updateDescription() {
    let self = this; // self -> reference to the class
    $("body").on("click", ".reaction-btn", function() {
        let currentId = $(this).attr("data-id");
        $(`[insightspotter${currentId}]`).find(".reaction-btn.active").removeClass("active");
        $(this).addClass("active");
      
        let currentIcon = $(this).find(".reaction-icon").text();
        let currentReaction = $(this).find(".reaction-text").text();
        let currentCategory = $(this).data("category");

        // Show the icon, category, and value for the selected reaction
        $(`[insightspotter${currentId}]`).find(".selected-icon").text(`${currentIcon}`);
        $(`[insightspotter${currentId}]`).find(".selected-value").text(`${currentReaction}`);
        $(`[insightspotter${currentId}]`).find(".selected-category").text(`${currentCategory}`);
      
        // Show the description of the selected reaction
        let reactions;
        let currentDesc;
        if(currentCategory == "emotion") {
          reactions = self.getEmotions();
        } else if(currentCategory == "wisdom") {
          reactions = self.getWisdoms();
        } else if(currentCategory == "value") {
          reactions = self.getValues();
        }
        reactions.map((reaction) => {
          if(reaction.name == currentReaction) {
            currentDesc = reaction.description;
          }
        })
        $(`[insightspotter${currentId}]`).find(".selected-description").text(`${currentDesc}`);
    });
  }
}

// Event Listeners
// Closes the pop-up widget when the close button is clicked
$("body").on('click', '#insight-close', '#close-icon', (event) => {
  let currentId = $(event.target).attr("data-id");
  $(`[insightspotter${currentId}]`).remove();
});

// Activates the default reaction for the chosen tab
$("body").on("click", ".nav-link", (event) => {
  let currentTab = $(event.target).attr("id");
  let currentId = $(event.target).data("id");
  InsightSpotter.prototype.switchTab(currentTab, currentId);
})

// Minimizes the pop-up widget when minimize button is clicked
$("body").on("click", '#insight-toggle', (event) => {
  let currentId = $(event.target).attr("data-id");
  $(`[insightspotter${currentId}]`).find('.insightCollapse').toggleClass('d-none');
});

// Calls the submitInsight() function when user clicks the submit button
$("body").on("click", "#submit-insight", function() {
  let currentId = $(this).attr("data-id");
  let category = $(`[insightspotter${currentId}]`).find(".selected-category").text();
  let subCategory = $(`[insightspotter${currentId}]`).find(".selected-value").text();
  let reflection = $(`#reflection-text-${currentId}`).val();
  let statement = $(`[insightspotter${currentId}]`).find(".insight-text").text();
  console.log("clicked!");
  InsightSpotter.prototype.submitInsight(currentId, statement, category, subCategory, reflection);
});