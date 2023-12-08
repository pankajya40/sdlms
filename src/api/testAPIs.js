// test APIs

const { param } = require("jquery");

// return {
  // [{variable_name: value , phone: "+251919878787", email: "example@example.com"}]
// }


// just as a placeholder lets assume context as a json
const context = {
  classroom: ["thread builder", "eagle builder"],
};

// get entities by contetxt API
const getEntitiesByContext = (req) => {
  if (!req.uid) {
    throw new Error("User ID is required");
  } else if (!req.body.context) {
    throw new Error("Context is required");
  }

  return context[req.body.context];
};

// get reciever list API
const getRecieverList = async (req) => {

    const collectionName= null; // name of the collection

  if (!req.uid) {
    throw new Error("User ID is required");
  }

  // could be batch, cohort or session
  // by batch only , by session only, by batch and session

  if (req.body.batchId != undefined && req.body.sessionTid != undefined) {
    const batchId = req.body.batchId;
    const sessionId = req.body.sessionTid;

    const { result } = await db.findField(collectionName,{classCategoryId: batchId, tid: sessionTid}, 'attendance'); 

    for(const user of result){
      data.map((user) => {
        data.username = user.userName,
        data.fullname = user.fullName,
        data.displayname = user.displayName,
        data.uid = user.uid
      })
    }
    return data;

  } else if (req.body.batchId != undefined) {
    const batchId = req.body.batchId;

    const { result } = await db.findField(collectionName,{classCategoryId: batchId, attendance:{ $exists: true }}, 'attendance'); // the attendance: exists isn't necessary

    const data = {};
    for(const user of result){
      data.map((user) => {
        data.username = user.userName,
        data.fullname = user.fullName,
        data.displayname = user.displayName,
        data.uid = user.uid
      })
    }
    return data;

  } else if (req.body.sessionTid != undefined) {
    const sessionTid = req.body.sessionTid;

    // a list of object that has the information of the attendance inclulding the name and the user id 
    // ! this doesn't contain the contact information of the user, that has to be queried from the user collection by using the user id
    // i didn't fetch the contact info here because it would cost more time and we want to display the data as fast as possible
    const { result } = await db.findField(collectionName,{tid: sessionTid}, 'attendance'); 

    for(const user of result){
      data.map((user) => {
        data.username = user.userName,
        data.fullname = user.fullName,
        data.displayname = user.displayName,
        data.uid = user.uid
      })
    }
    return data;

  }

  return new Error("Invalid request");
};


const getContactDetails = async (req) => {

  // get the list of uid's from the request body
  //

}

// looping through the lis of user id's , 
// fetching the values and then calling the ( get contact details ) api and 
// adding the contact details to the data returned


// get eagle builder count API
// params : 


// get data 
// input : list of user id's , list of entities

