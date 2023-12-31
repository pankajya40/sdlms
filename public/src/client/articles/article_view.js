'use strict';

/**
 * @date 07-05-2022
 * @author imshawan
 * @description Aricle viewing page for the article's sub-domain
 */

define('forum/articles/article_view', ['api', 'sdlms/article', 'sdlms/comments'], function () { 
    var ArticleViewer = {};
    
    ArticleViewer.init = function () {
        let data = ajaxify.data;

        if (Object.keys(ajaxify.data.article).length != 0) {
            new Article({
                target: '#article-area',
                tid: data.article.tid,
                with: data.article,
                thoughtProcess: false,
                action: 'reader'
            });

            $('body').find('.comments-heading').text('Comments');
            
            new Comment($.extend({}, ajaxify.data.article, {
                target: '.comments-area',
                assetId: ajaxify.data.article.pid,
                type: 'article',
                uid: app.user.uid || 1,
                disableComment: !data.loggedIn,
                disableMessage: 'You need to be logged in for this.',
            }));
        }

        

    }

    return ArticleViewer;
});
