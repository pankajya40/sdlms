let paginationTemplates = {

        container:function(data){
            return `<nav class="pagination justify-content-center pt-2"> <ul class="pagination d-flex justify-content-center">${data || ''}</ul></nav>`
        },
        previous:function(url){
            return `<li class="page-item mr-2"><a data-href="${url}" data-navigation class="page-link ${!url ?'disabled' : ''}" href="#">
            <span aria-hidden="true" class="p-2">
                <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 21.1797L5.72863 12L15 2.82031L12.1457 -1.24766e-07L-5.24537e-07 12L12.1457 24L15 21.1797Z" fill="#0029FF" fill-opacity="0.8"></path>
                </svg>
            </span></a></li>`
        },
        details:function(current_page,last_page){
            return ` <li class="page-item mt-2"><span>${current_page} of ${last_page+1}</span></li>`
        },
        next:function(url){
            return `<li class="page-item ml-2"><a data-href="${url}" data-navigation  class="page-link ${!url ?'disabled' : ''}" href="#">
            <span aria-hidden="true" class="p-2">
                <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-9.25794e-07 2.82031L9.27137 12L-1.2328e-07 21.1797L2.85431 24L15 12L2.85431 -1.24766e-07L-9.25794e-07 2.82031Z" fill="#0029FF" fill-opacity="0.8"></path>
                </svg>
            </span></a></li>`
        }
}

class Pagination {
    constructor(options) {
        this.target = $(options.target)
        this.onChange = options.onChange;
        this.data = options.data;
    }

    paginate(data){
        this.target.html(paginationTemplates.container(paginationTemplates.previous(data.prev_page_url) + paginationTemplates.details(data.to,data.last_page) +paginationTemplates.next(data.next_page_url)))
        this.events();
    }

    events(){
        let $that = this;
        $(this.target).find('[data-navigation]:not(.disabled)').on('click',function(){
            let href= $(this).data('href');
            
            if(typeof $that.onChange == 'function') $that.onChange(href,{})
        })
    }
}

// let pagination = new Pagination({
//     target:'#ab .pagination-container',
//     onChange: renderPagination
// });

// function renderPagination(url,data){
//     let url = data.href;
//     // api(url).then


//     pagination.paginate(res)

// }