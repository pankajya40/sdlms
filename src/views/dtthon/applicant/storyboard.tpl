<style>
	.sdlms-container {
		padding: 0px;
	}

	.description-icon {
		padding: 6px;
	}

	.dtthon-asset--body {
		height: 400px;
		overflow: auto;
	}

	.asset-description--text {
		background: blue;
		color: white;
		border-radius: 6px;
		position: absolute;
		transform: translate(-130%, 10px);
	}

	.dtthon-asset--description {
		opacity: 75%;
	}
</style>


<script src="https://unpkg.com/interactjs/dist/interact.min.js"></script>

<!-- IMPORT dtthon/applicant/partials/faq.tpl -->

<div class="row navbar navbar-expand-lg navbar-light pt-3 pb-0">
	<div class="col-8 bold-font mb-2 pl-0 project-header">{project.title}</div>
	<!-- IF !isSubmitted -->
	<!-- IF isSubmissionOwner -->
	<div class="align-self-lg-baseline col-4 d-flex justify-content-end pl-0 submitbtn-area" style="display:none">
		<button type="submit" id="project-action-btn" class="sdlms-button button-primary button-lg align-items-center" style="position:fixed; z-index:1000;">
			Submit Project
		</button>
	</div>
	<!-- ENDIF isSubmissionOwner-->
	<!-- ENDIF !isSubmitted -->
</div>



<!-- IF (project.category == "Course") -->
<!-- IF isSubmitted -->
<!-- IF isSubmissionOwner -->
<!-- IMPORT dtthon/applicant/partials/certificatecard.tpl -->
<!-- ENDIF isSubmissionOwner-->
<!-- ENDIF isSubmitted -->
<!-- END -->

<!-- IF project.scorecardId -->
<!-- IF (project.category == "Selection") -->
<!-- IF (submissions.evalStatus == "not_started") -->
<!-- IF isSubmitted -->
<!-- IF isSubmissionOwner -->
<!-- IMPORT dtthon/applicant/partials/evaluatecard.tpl -->
<!-- ENDIF isSubmissionOwner-->
<!-- ENDIF isSubmitted -->
<!-- END  -->
<!-- END  -->
<!-- ENDIF project.scorecardId -->


<!-- IF (submissions.evalStatus == "evaluated") -->
<!-- IF isSubmitted -->
<!-- IMPORT dtthon/applicant/partials/viewcard.tpl -->
<!-- ENDIF isSubmitted -->
<!-- END (submissions.evalStatus == "evaluated") -->


<div id="applicant-storyboard_container" class="applicant-storyboard mx-auto col-md-12 tab-content">

</div>
<div class="applicant-storyboard mx-auto col-md-12 tab-content">
	<!-- IF (project.category == "Event") -->
	<!-- IF isSubmitted -->
	<!-- IF !isSubmissionOwner -->
	<!-- IMPORT dtthon/applicant/partials/evaluatescore.tpl -->
	<!-- END !isSubmissionOwner -->
	<!-- END isSubmitted -->
	<!-- END (project.category == "Event") -->
</div>
<!-- IF journeyboard -->
<div class="col-md-4 p-md-2 applicant-sidebar" collapse>
	<div class="dtThone-journey-board sdlms-section position-fixed" style="z-index: 5; left: 0; top: 70px; height: calc(100% - 65px); border-top-left-radius: 0;" collapse-right>
		<div class="sdlms-section-header justify-content-between align-items-center shadow-none secondary-header cursor-pointer font-weight-500 sdlms-text-white-22px d-flex" style="border-top-left-radius: 0px;">
			<div class="sdlms-text-white-17px text-center" collapse-header>
				Journey Board
			</div>
			<span class="pl-3">
				<i class="fa fa-arrow-circle-left" aria-hidden="true" style="font-size: x-large;" collapse-menu-icon></i>
			</span>
		</div>
		<div class="sdlms-section-body w-100 p-3" style="overflow: scroll;top: 110px;left:0; height: calc(100% - 15vh);">
			<div expanded-tasks>
				<ol></ol>
			</div>
			<div class="col-2" collapsed-tasks>
				<div number-list></div>
			</div>
		</div>
	</div>
</div>
<!-- ENDIF journeyboard -->
<!-- <div class="d-none justify-content-end">
	<div class="sdlms-card mr-1" style="position: absolute!important;" id="chatboxcard">
	</div>
</div> -->
<div class="fixed-bottom position-right">
	<div class="d-flex justify-content-between">
		<div>
			<div class="square-60-px rounded-circle bordered-brand-btn mb-2" data-toggle="modal" data-target="#faqModal">
				<button class="info-button">
					<i class="fa fa-question" aria-hidden="true"></i>
				</button>
			</div>
			<!-- IF (project.category != "Project") -->
			<!-- <div class="square-60-px rounded-circle bordered-brand-btn mb-2" id="discussion-open-btn">
				<button class="info-button">
					<img src="https://blog.deepthought.education/wp-content/uploads/2022/08/discussion.svg" />
				</button>
			</div>
			<div class="square-60-px rounded-circle bordered-brand-btn mb-2" id="toc-btn">
				<button class="info-button">
					<img src="https://sdlms.deepthought.education/assets/uploads/files/files/toc-icon.svg" style="height:35px;" />
				</button>
			</div> -->
			<!-- ENDIF (project.category != "Project") -->

			<!-- <div class="square-60-px rounded-circle bordered-brand-btn mb-2 d-none" id="discussion-close-btn">
                <button class="speed-dial_button speed-dial_button--primary">
                    <img src="https://blog.deepthought.education/wp-content/uploads/2022/08/close-btn-white.svg">
                </button>
            </div> -->
		</div>
	</div>
	<!-- <div class="size-mobile-widget bg-white primary-rounded-top shadow" style="display: none;" id="discussion-widget-container"></div> -->
</div>

<!-- <div class="fixed-top position-stick-right mt-96-px max-width-500">
	<div class="bg-white sdlms-section-right d-flex" id="task-notice-body">
		<div class="d-flex flex-column justify-content-between sdlms-section-right button-secondary py-3 p-2 align-items-center" id="close-notice-btn" role="button">
			<button class="border-0 bg-transparent">
				<img src="https://blog.deepthought.education/wp-content/uploads/2022/08/close-btn-white.svg">
			</button>
			<p class="upright-text-lr mb-0 mt-4 sdlms-text-white-16px">Notice Board</p>
		</div>
		<p id="task-notice-text" class="mb-0 p-3">{noticeBoard.notice}</p>
	</div>
	<div class="d-none flex-column justify-content-between sdlms-section-right button-secondary py-3 p-2 align-items-center" role="button" id="open-notice-btn">
		<button class="border-0 bg-transparent" id="close-notice-btn">
			<img src="https://blog.deepthought.education/wp-content/uploads/2022/08/white-plus-icon.svg" style="width:20px;">
		</button>
		<p class="upright-text-lr mb-0 mt-4 sdlms-text-white-16px">Notice Board</p>
	</div>
</div> -->
<!-- <div class="modal fade" id="discussionRoomModal" tabindex="-1" role="dialog" aria-labelledby="discussionRoomModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content" id="targetedmodal">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="overflow: auto;">
			</div>
			<div class=" d-flex justify-content-md-center modal-footer p-0">
			</div>
		</div>
	</div>
</div> -->