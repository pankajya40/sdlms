'use strict';



define('forum/sdlms/sharer', [
	'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js', 
	'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.js'
], function () {
	var Share = {};

	Share.init = function () {
		let asset = ajaxify.data.data;
		console.log('share init');
		app.eraseCookie('share_redirect');
		if(!asset) return;
		switch (asset.type) {
		case "eaglebuilder":
			require(['sdlms/eaglebuilder'], function () {
				let data = {
					meta: asset.meta,
					tracks: asset.tracks,
					conclusion: asset.conclusion || {},
				};

				new eagleBuilder({
					target: '#sharableAsset',
					action: 'reader',
					tid: asset.tid || asset.topicId,
					id: asset.pid || asset.id,
					with: data,
					addFeedbacks: !true,
					uid: asset.uid || asset.userId
				});
			})
			break;
		case "threadbuilder":
			require(['sdlms/threadbuilder'], function () {
				let data = {
					meta: asset.meta,
					threads: asset.threads,
					conclusion: asset.conclusion || {},
				};
				new threadBuilder({
					target: '#sharableAsset',
					action: 'reader',
					tid: asset.tid || asset.topicId,
					id: asset.pid || asset.id,
					uid: asset.uid || asset.userId,
					with: data,
					addFeedbacks: !true
				});
			})
			break;
		case "spreadsheet":
			require(['sdlms/spreadsheet'], function () {
				let SPdata = {
					data: asset.data.data,
					readonly: asset.data.readonly,
					widths: asset.data.widths,
					styles:asset.data.styles,
				};
				new spreadSheet({
					target: '#sharableAsset',
					action: 'reader',
					tid: (asset.tid || asset.topicId),
					with: SPdata,
					addFeedbacks: !true,
					uid: asset.uid,
					id: asset.pid,
					noEvents: true,
				})
			})
			break;
		case "article":
			require(['sdlms/article'], function () {
				new Article({
					target: '#sdlms-asset-article',
					action: 'reader',
					tid: asset.tid,
					with: { ...asset, user: ajaxify.data.userData },
				})
			})

		case "post":
			let target = $('.single-asset-container').parent();
			target.addClass('container justify-content-center d-flex pt-4')
			$('.single-asset-container').remove();
			if (asset.content && Array.isArray(asset.content) && asset.content.length) {
				asset.content = asset.content[0];
			} 
			require(['sdlms/post'], function () {
				new Post({
					target,
					action: 'reader',
					classes: 'pt-4 col-12 col-lg-11 col-xl-11',
					tid: asset.tid,
					with: { ...asset, user: ajaxify.data.userData },
				})
			})
			break;

		case "form":
			{
				let target = $('.single-asset-container').parent();
				// target.addClass('container justify-content-center d-flex pt-4')
				// $('.single-asset-container').remove();

				require(['sdlms/enquiryform'], function () {
					new EnquiryForm({
						target,
						header: 'DT Form response',
						classes: 'shadow d-block w-90',
						action: 'reader',
						with: { ...asset, user: ajaxify.data.userData },
					});
				})
			}
			break;

		default:
			break;
		}
	}
	return Share
})