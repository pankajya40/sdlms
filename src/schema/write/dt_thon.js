const { Fields, DTID } = require("../../middleware").typedValidation;

const $project = new Fields()
	.id("cid")
	.string("title")
	.string("status", { enum: ["published", "draft", "closed", "visible"] })
	.string("description")
	.string("short_description")
	.string("category", { enum: ["Project", "Course", "Selection", "Event"] })
	.string("commitment")
	.string("commitment_type")
	.string("deadline", { format: "date" })
	.array("pre_requisites", { type: "string" })
	.string("project_image")
	.array("learning_outcomes", { type: "string" })
	.array("faqs");

	const $createProject = Fields.copy($project)
	.addOptions("title", {
		required: true,
	})
	
const $editProject = Fields.copy($project).id("tid", { required: true });
const $getProjects = new Fields()
	.id("tid")
	.string("isRecruiter")
	.time("fromDate")
	.time("from")
	.time("toDate")
	.time("to")
	.id("cid")
	.add("page")
	.add("limitBy", { type: ["string", "number"] });

const $deleteProject = new Fields().id("tid", { required: true });

const $task = new Fields()
	.string("task_title")
	.string("task_description")
	.string("status", {
		enum: ["done", "notstartyet", "ongoing", "reassigned"],
	});

const $addTask = new Fields()
	.id("tid", { required: true })
	.object(
		"task",
		Fields.copy($task).required().addOptions("task_title", { required: true })
	);

const $editTask = new Fields()
	.id("tid", { required: true })
	.id("task_id", { required: true })
	.object("task", Fields.copy($task).required());
const $deleteTask = new Fields()
	.id("tid", { required: true })
	.id("task_id", { required: true });

const $asset = new Fields()
	.string("asset_title")
	.string("asset_description")
	.string("asset_type", { enum: ["input_asset", "display_asset"] })
	.string("asset_content_type", {
		enum: [
			"threadbuilder",
			"eaglebuilder",
			"spreadsheet",
			"article",
			"reflection",
			"quiz",
			"form",
			"image",
			"audio",
			"video",
			"docs",
			"other",
		],
	})
	.string("asset_content", { type: "string" })

const $addAsset = new Fields()
	.id("tid")
	.id("task_id")
	.object("asset", Fields.copy($asset).required());

const $editAsset = new Fields()
	.id("tid")
	.id("task_id")
	.id("asset_id")
	.object("asset", Fields.copy($asset).required());
const $deleteAsset = new Fields()
	.id("tid", {required: true})
	.id("task_id", {required: true})
	.id("asset_id", {reuired: true});

const $submissionTasks = new Fields()
    .id("task_id", {required: true})
    .array("assets", new Fields()
        .required()
        .id("asset_id", {required: true})
        .id("content")
        .any("content_data")
    )

const $getSubmissions = new Fields().id("uid").id("pid").id("tid").string("isRecruiter");
const $createSubmission = new Fields()
    .id("tid", {required: true})
    .time("timestamp")
    .array("tasks", new Fields()
        .id("task_id", {required: true})
        .array("assets", new Fields()
            .required()
            .id("asset_id", {required: true})
            .id("content_pid")
            .any("content")
        )
    )
const $updateSubmission = new Fields()
    .id("pid", {required: true})
    .array("tasks", new Fields()
        .id("task_id", {required: true})
        .array("assets", new Fields()
            .required()
            .id("asset_id", {required: true})
            .id("content_pid")
            .any("content")
        )
    )
	
const $submitSubmission = new Fields()
    .id("pid", {required: true})
    /* .array("tasks", new Fields()
        .id("task_id", {required: true})
        .array("assets", new Fields()
            .required()
            .id("asset_id", {required: true})
            .id("content_pid")
            .any("content")
    )) */
const $reviewSubmission = new Fields()
	.id("pid", { required: true })
	.string("status", { enum: ["re_asigned", "rejeted", "accepted"] });

const $faq = new Fields()
	.string("question")
	.string("answer");

	
const $addFaq = new Fields()
	.id("tid", { required: true })
	.object(
		"faq",
		Fields.copy($faq).required());

const $editFaq = new Fields()
	.id("tid", { required: true })
	.id("faqId", { required: true })
	.object("faq", Fields.copy($faq).required());

const $deleteFaq = new Fields()
	.id("tid", { required: true })
	.id("faqId", { required: true });



module.exports = {
	$project,
	$createProject,
	$editProject,
	$getProjects,
	$deleteProject,
	$task,
	$addTask,
	$editTask,
	$deleteTask,
	$asset,
	$addAsset,
	$editAsset,
	$deleteAsset,
	$getSubmissions,
	$createSubmission,
	$updateSubmission,
	$submitSubmission,
	$reviewSubmission,
	$faq,
	$addFaq,
	$editFaq,
	$deleteFaq
};
	