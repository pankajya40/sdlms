const db = require("../../database");
const ObjectId = require("mongodb").ObjectId

const task = module.exports;
const TASK = db.collections.PDGMS.TASK;

/**
 * @date 14-10-2022
 * @author Srijit Patra
 * @description The below functions deals with the CRUD Operations on tasks.
 */

/**
 *  Get Tasks by using all ids or any pair of the ids or any one of the ids (uid, taskId, projectId)
 * if uid is not mentioned then it will fetch the tasks of loggedIn user.
 * Fetching of tasks is done using the id of the creator of the task not by assignee.
*/
task.getTask = async function(data){
	
	const uid = parseInt(data.uid);
	const userId = parseInt(data.query.uid);
	const taskId = ObjectId(data.query.taskId);//mongodb objectId of task
	const projectId = data.query.projectId;//mongodb objectId of the project
	
    var keys = {};
	if(uid)
	keys = Object.assign(keys,{createdBy:uid});
	if(userId)
	keys = Object.assign(keys,{uid:userId});
	if(taskId)
	keys = Object.assign(keys,{_id:taskId});
	if(projectId)
	keys = Object.assign(keys,{_key:"project"+projectId});
	
	
	const result = await db.findFields(TASK,keys);
	if(!result)
	throw new Error("Task not found");
	return result;
}
// Create Task
task.createTask = async function (data){

	const uid = parseInt(data.uid);
	const projectId = data.body.projectId //objectId of the project

	const payload = {
		_key:"project:"+projectId,
		taskName: data.body.taskName != null ? data.body.taskName : "",
		taskDescription: data.body.taskDescription != null ? data.body.taskDescription : "",
		taskType: data.body.taskType != null ? data.body.taskType : "",
		createdBy: uid,
		preRequisite: data.body.prerequisite != null ? data.body.predatauisite : "",
		estimateDuration: data.body.estimateDuration != null ? data.body.estimateDuration : "",
		priority: data.body.priority,
		assignedTo: data.body.assignedTo,
		status: data.body.status || "NotStarted",
		currentStatus: data.body.currentStatus || "NotStarted",
		plannedStartDate : data.body.plannedStartDate,
		plannedEndDate : data.body.plannedEndDate,
		actualStartDate : data.body.actualStartDate,
		actualEndDate : data.body.actualEndDate,
		endDate : data.body.endDate,
		dueDate : data.body.dueDate,
		completeDate : data.body.completeDate,
		createdAt: Date.now(),
		updatedAt: Date.now(),
	};

	const result = await db.setField(TASK, payload); // create a new TASK

	if (!result) 
	throw new Error("Task was not defined properly");
	
	return result;
};

// Update a task by taskid 
task.updateTask = async function (data){

	const uid = parseInt(data.uid);
	const taskId = ObjectId(data.query.taskId);//mongodb objectId

	if(!taskId){
		throw new Error("Id of the task is not supplied");
	}
	var keys = {
		_id:taskId
	};

	var task = await db.findFields(TASK,keys);	

	if (!task) 
	throw new Error("Id of the Task is invalid");

	var updateCnt = 0;
	for(field in task)
	{
		if( data.body[field] && (data.body[field] != task[field].toString()))
		{
			if(isNaN(task[field]))
			task[field] = data.body[field];
			else
			task[field] = parseInt(data.body[field]);
			updateCnt+=1;
		}
	}
	if(updateCnt > 0)
	{
		task = Object.assign(task,{updatedBy:uid, updatedAt: Date.now()});
	}
	
	return result;
};

// Delete a task by taskid
//Assumption :- only creator of task can delete task.
task.deleteTask = async function (data){

	const uid = parseInt(data.uid);
	const taskId = ObjectId(data.query.taskId);//mongodb objectId

	if(!taskId){
		throw new Error("Id of the task is not supplied");
	}
	const keys = {
		_id:taskId,
		createdBy : uid
	}
	const state = await db.removeField(TASK, keys);
	if (state.result.n === 1) {
		return {
			deleted: true,
		};
	}
	return {
		deleted: false,
	};
};