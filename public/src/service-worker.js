
var VERSION = cacheBuster;
var DOCUMENTS = 'sdlms';
console.log(self)
const CACHE_URLS = ['https://cdn.jsdelivr.net', 'https://cdnjs.cloudflare.com', 'https://unpkg.com', 'https://fonts.googleapis.com',self.origin];
const RESTRICTED = ['api/','sdlms.deepthought.education','socket.io','.png','.jpg','.jpeg','tinymce'];
var cacheAssests = [
					'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js', 
					'https://unpkg.com/spacetime@6.16.2/builds/spacetime.min.js',
					'https://kit.fontawesome.com/696d1d32bb.js', 
					'https://bossanova.uk/jspreadsheet/v4/jexcel.js', 
					'https://bossanova.uk/jspreadsheet/v4/jexcel.css', 
					'https://jsuites.net/v4/jsuites.js', 
					'https://jsuites.net/v4/jsuites.css', 
					'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css', 
					"https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;600;700&display=swap",
					'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js', 
					'/plugins/nodebb-plugin-markdown/styles/school-book.css', 
					'/assets/nodebb.min.js', 
					'/assets/src/modules/composer.js', 
					'/assets/src/modules/composer/uploads.js',
					'/assets/src/modules/composer/drafts.js', 
					'/assets/src/modules/composer/tags.js', 
					'/assets/src/modules/composer/categoryList.js', 
					'/assets/src/modules/composer/resize.js', 
					'/assets/src/modules/composer/autocomplete.js', 
					'/assets/templates/composer.tpl', 
					'/assets/language/en-GB/topic.json', 
					'/assets/language/en-GB/modules.json', 
					'/assets/language/en-GB/tags.json', 
					'/assets/src/modules/highlight.js', 
					'/assets/language/en-GB/markdown.json', 
					'https://ka-f.fontawesome.com/releases/v5.15.4/webfonts/free-fa-solid-900.woff2', 
					'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2', 
					'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2', 
					"https://fonts.gstatic.com/s/opensans/v29/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4n.ttf",					
					'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2', 
					'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2', 
					'/assets/src/modules/tmb/monitorBoard.js', 
					'/assets/templates/modules/taskbar.js', 
					'/assets/src/modules/api.js', 
					'/assets/src/modules/sdlms/eaglebuilder.js', 
					'/assets/src/modules/sdlms/spreadsheet.js', 
					'/assets/src/modules/topicThumbs.js', 
					'/assets/src/modules/uploader.js', 
					'/assets/src/modules/jquery-form.js', 
					'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2'
				];

self.addEventListener('install', e => {
	e.waitUntil(
		caches
			.open(VERSION)
			.then((cache) => cache.addAll(cacheAssests))
			.then(() => self.skipWaiting())

			// skipWaiting() forces the waiting service worker to become the active service worker
	)
})

// v1; olf
// v2; new

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return cacheNames.filter(cacheName => cacheName != VERSION);
		}).then(cachesToDelete => {
			return Promise.all(cachesToDelete.map(cacheToDelete => {
				return caches.delete(cacheToDelete);
			}));
		}).then(() => self.clients.claim())
		// claim() makes the service worker the active service worker for all pages
	);
})
// v2; new
function is(request){
	this.get = function(){
		return request.method.toLowerCase() == 'get';
	}
	this.self = function(){
		return request.url.startsWith(self.location.origin);
	}
	this.restricted = function(){
		return RESTRICTED.some(restricted => request.url.includes(restricted));
	}
	this.documents = function(){
		return (request.destination == 'document' && request.url.startsWith(self.location.origin))
	}
	this.search = function(){
		return (request.destination == 'document' && request.url.includes('?'))
	}
	return this;
}
function shouldCache({ request }) {
	request.is = new is(request);
	return request.is.get() && !request.is.documents() && !request.is.restricted();
}

self.addEventListener('fetch', event => {

	//cache the run time document  when they are  not for admin
	// console.log('fetch', event.request.url);
	if (!shouldCache(event)) return;

	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			if (cachedResponse) return cachedResponse;
			return caches.open(event.request.destination == 'document' ? DOCUMENTS : VERSION).then(cache => {
				return fetch(event.request).then(response => {
					if (response.status == 200) return cache.put(event.request.url, response.clone()).then(() => {
						return response;
					});
				});
			});
		})
	);
});