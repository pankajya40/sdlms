'use strict';


/* globals define */

define('forum/mobile/assetsExplore/assets', ['api'], function (api) {
    var assetsExplore = {};
    const $target = $('.assets-area');
    const {icons, assetstypes} = ajaxify.data;
    console.log("hello world!");
    const type = ajaxify.data.type.type;
    
    $('body').on("click", '[get-share-link]', function () {
        let link = $(this).attr("get-share-link");
        let $this = $(this);
        let expiry = $(this).attr("data-expiry");
        let type = $(this).data("type");
        console.log(type);
        console.log(link);
        api.post('/sdlms/sharer', {
            pid: $(this).data("pid"),
            type: type,
            expireAt: Date.now() + (1000 * 60 * 60 * 24 * 1)
        }).then((response) => {
            let link = `${response.link}`;
            //let tid = $('selector').data('tid')
            $this.attr("get-share-link", response.link);
            $this.attr("data-expiry", response.expireAt);
            ajaxify.go(link);
            // app.copyText(link);
        }).catch((error) => {
            if (error.message) notify(error.message, 'error');
        })

    }),
   

    assetsExplore.init = function () {
        let currentPageUrl = type ? `/app/assets?limit=10&page=0&type=${type}` : '/app/assets?limit=10&page=0' ;
        let nextPageUrl = '';
        const options = { threshold: 1, root: null,
            rootMargin: "0px", }

            const typealt = `${type}`.charAt(0).toUpperCase() 

            const remainingtype = `${type}`.slice(1);

            const totaltype = typealt + remainingtype;
            
            $('.assets-header').html(`
            <i class="fa-chevron-left fas m-2 backbutton" aria-hidden="true"></i>
            <h4 class="bold-font mb-4">${totaltype}</h4>`)

            $(".backbutton").on("click",function(){ 
                location.href = `/mobile/assets/`
            })
        
            function populateNextPage (url) {
            console.log(url);
            return new Promise((resolve, reject) => {
                assetsExplore.getNewAssets(url).then(res =>   {
                    console.log(res)
                    let {data=[], next_page_url} = res;
                    $.each(data, function (i, e) {
                        $target.append(assetsExplore.assetCard(e));
                    });
        
                    resolve(next_page_url);
                });
            })
        }

        function populatePageData (query='') {
            $target.empty();

            populateNextPage(currentPageUrl + '&term=' + String(query)).then((nextUrl) => {
                currentPageUrl = nextPageUrl;
                nextPageUrl = nextUrl;
                
                const onIntersection = () => {
                    if (currentPageUrl != nextPageUrl && nextPageUrl) {
    
                        populateNextPage(nextPageUrl).then((nextUrl) => {
                            currentPageUrl = nextPageUrl;
                            nextPageUrl = nextUrl;
                        })
                    }
                };
        
                const oberver = new IntersectionObserver(onIntersection, options);
                oberver.disconnect()
                oberver.observe(document.getElementById("assets-end"));
            })
        }

        populatePageData();

        $('#search-assets').on('submit', function (e) {
            e.preventDefault();
            let term = $(this).find('input').val();
            populatePageData(term);
        });
        

    },

    assetsExplore.getNewAssets = function (url) {
        return new Promise((resolve, reject) => {
            console.log(resolve);
            api.get(url, {})
                .then((response) => console.log(resolve(response)))
                .catch((error) => reject(error.message));
        });
    },


    assetsExplore.assetCard = function (data) {
        console.log(data)
        return `
        
        <div class="col-12 col-md-6 col-lg-4 mb-3">
            <div class="card mb-2 mx-auto d-flex" style="border-radius: 10px; box-shadow: 0 3px 8px rgb(0, 0, 0, 0.3); overflow:scroll"  >
                <div class="card-body p-3 d-flex" data-type="${data.type}" data-tid="${data.tid}" id="assets-selector"  get-share-link="${data.sharer ? data.sharer.link: false}" data-expiry="${data.sharer ? data.sharer.expireAt : 0}"  data-pid="${data.pid}">
                <div class="my-auto" style="background: #0029ff; border-radius: 20px; width:25px; height:25px;">
                <i style="font-size: 14px; margin: 5px; color: #fff;" class="${icons[data.type]}" aria-hidden="true"></i>
            </div>
                <div class="ml-2">
            <div style="font-size: 14px;" class="mb-0 bold-medium-font">${data.title}</div>
            <p style="font-size: 14px;" class="card-text mb-1">${data.content}</p>
                </div>
            </div>
            </div>
            </div>`;
    };

    return assetsExplore;
});