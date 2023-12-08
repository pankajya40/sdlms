class dashboard_table {
    constructor() {
        this.target = data.target;
        this.columns = data.columns;
        this.formatter = data.formatter;
        this.template  = templates.table;
        this.pagination = templates.pagination;
    }

    render(url){
        $.getJSON(url).then(({response})=>{
            console.log(response)
            $(this.target).html(`<sdlms-table></sdlms-table>`);
            $(this.target).find('sdlms-table').html(this.template .container({
                html:( this.template .header({columns:this.columns}) +  this.template.body(this.formatter(response.data)))
            })).append(this.paginate(response));
            this.events()
        });
        
        
    }
    paginate(data){
        return this.pagination.container({
            html:(this.pagination.previous(data.prev_page_url) + this.pagination.next(data.next_page_url))
        })
    }
    events(){
        let $that = this;
        $(this.target).find('[data-navigation]:not(.disabled)').on('click',function(){
            let href= $(this).data('href');
             $that.render(href)
        })
    }
}