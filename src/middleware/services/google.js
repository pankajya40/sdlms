// Import required modules
const google = module.exports;
const nconf = require('nconf');
const userAPI = require('../../api/users')
const user = require('../../user/index')
const GOOGLE = nconf.get("google")
const URL = nconf.get("url");
const axios = require('axios')

// Define a function to verify a user's Google account
google.verify = async function(req){
    let userdata = {} 

    // Function to get access token from Google API using authorization code
    async function getAccessTokenFromCode(code) {
		try {
			const { data } = await axios({
				url: `https://oauth2.googleapis.com/token`,
				method: 'post',
				data: {
					client_id:GOOGLE.GOOGLE_CLIENT,
					client_secret:GOOGLE.GOOGLE_SECRET,
					redirect_uri: [URL, GOOGLE.GOOGLE_REDIRECT_URI].join(''),
					grant_type: 'authorization_code',
					code,
				},
			});
			// Return the access token
			return data.access_token;
		} catch (error) {
			console.error('here is the error',error.response);
		}
	};

    // Function to get user info from Google API using access token
    async function getGoogleUserInfo(access_token) {
		const { data } = await axios({
			url: 'https://www.googleapis.com/oauth2/v2/userinfo',
			method: 'get',
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
		// Return the user info object
		return data;
	};

    // Get the authorization code from the request query
    let code = req.query.code;

    if (code) {
		// Get the access token from Google API using the authorization code
		let accessToken = await getAccessTokenFromCode(decodeURIComponent(req.query.code));
		// Get the user info from Google API using the access token
		let userInfo = await getGoogleUserInfo(accessToken);
		// Store the user info object in the userdata object
		userdata.userInfo = userInfo;
	}
    
    // Get the user ID using the user's email
    let userUid = await user.getUidByEmail(userdata.userInfo.email);
    

    // If user ID does not exist
    if(!userUid){
        // Create a data object to create the user
        let data = {
            email:userdata.userInfo.email,
            username: userdata.userInfo.email.match(/^([^@]+)/)[1],
            picture: userdata.userInfo.picture
        }
       

        // Create a new user using the user API
        let user = await userAPI.create("google",data);
		// Set the user ID to the new user's ID
		userUid = user.uid;
    }

    // Return the user ID
    return userUid;

}