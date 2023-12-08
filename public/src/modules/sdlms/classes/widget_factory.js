class Widget_Factory{
    constructor(data) {
        
        this.tid = data.tid;
        this.data = data;
        this.target = data.target;
        this.type = data.type;
        this.hideDefault = data.hideDefault || false;
        this.id = this.unique('asset-');
        let asset = data.asset || {};
        this.asset = asset;
        this.templates =  Template.others({...this.asset,...{id:this.id}});
        this.view = this.asset.asset_type == 'input_asset' ? 'input' : 'display';
        $(this.target).append(this.templates.applicant.container());
        this.target = `#${this.id}`;
        (this.view == 'input' && $.inArray(this.type,['eaglebuilder','threadbuilder','spreadsheet','form','quiz','article']) > -1 ) ?         
        'function' === typeof this[this.type] ? this[this.type]() : this.default() :
        $(this.target).html(this.filter());
        iFrameResize({ log: true }, `#frame-${this.id}`)
        this.events();
    }
    events () {
        let $that = this;
        $(this.data.target).find('[save-applicant-asset]').on('click',function(){

            let data  = {};

            if($that.submitting) return notify('Please wait..', 'info');

            $that.submitting = true;
            if(typeof $that.$builder == 'object') data = $that.$builder.getJSON();
            else data = {content:$($that.data.target).find('[name="asset_description"]').val()};

            $that.submitting = true;
            require(['api'], function (api) {
                api.put('/apps/submission/asset', $that.payload(data))
                    .then(function (res) {
                        if(!res.pid) return;

                        $that.asset.pid  = res.pid;
                        notify('Asset saved successfully', 'success');

                        try {
                            $that.$builder.$builder.trigger('make:clean');
                        } catch (error) {
                            
                        }
                        
                    }).catch((error) => {
                        console.log(error);
                        notify('Error saving asset', 'error')
                    }).finally(() => {
                        $that.submitting = false;
                    });
            })
        })
    }
    payload(content){
        let payload =  {
            pid:this.data.pid,
            task_id:this.data.task_id,
            asset: {
                 asset_id:this.asset.asset_id,
                 pid : this.asset.pid,
                 content:content || {},
                 asset_content_type:this.type,
             }
        }
        return payload;
    }
    default() {
        console.log('default');
    }
    filter(){
        return this.templates[this.type] && 
        'function' === typeof this.templates[this.type][this.view] ? 
        this.templates[this.type][this.view]() : 
        this.templates.other.display();
    }
    unique(prefix = "") {
		var dt = new Date().getTime();
		var uuid = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
		});
		return prefix + uuid;
	}
    eaglebuilder() {
        let data = {
            meta: this.asset.content.meta,
            tracks: this.asset.content.tracks,
            conclusion: this.asset.content.conclusion || {},
        };
		let config = {
			target: this.target,
			action: "builder",
			tid: this.tid,
			uid: this.uid,
            hideDefault: this.hideDefault,
			noTracking: true,  
            with:data,
            lookup_id: this.asset.asset_id, 
			noDraft: true,
		}
	    this.$builder = new eagleBuilder(config);
    }

    threadbuilder(){
        let data = {
            meta: this.asset.content.meta,
            threads: this.asset.content.threads,
            conclusion: this.asset.content.conclusion || {},
        };
        let config = {
			target: this.target,
			action: "builder",
			tid: this.tid,
			uid: this.uid,
            with:data,
            hideDefault: this.hideDefault,
			noTracking: true,
            lookup_id: this.asset.asset_id, 
			noDraft: true,
		}
	    this.$builder =  new threadBuilder(config);
    }
    article(){
        let config = {
            uid: this.uid,
            target:  this.target,
            tid: this.tid,
            with: this.asset.content,
            hideDefault: this.hideDefault,
            classes:' shadow-none m-0',
            richTextMenubar: true,
            
        };
        this.$builder =  new Article(config);
    }
    form(){
        let config ={
            target: '.form-creator',
            classes: 'shadow-none d-block',
            action: 'create',
            hideHeader: true,
            hideDefault: this.hideDefault,
            with: this.asset.content,
        }
        this.$builder = new EnquiryForm(config);
    }
    spreadsheet(){
        this.asset.content.data = this.asset.content.data || {};
        let SPdata = {
            data: this.asset.content.data,
            readonly: this.asset.content.readonly,
            widths:  this.asset.content.widths,
            styles: this.asset.content.styles,
        };
        this.$builder =  new spreadSheet({
            target: this.target,
            action: 'builder',
            tid: (this.tid),
            with: SPdata,
            hideDefault: this.hideDefault,
            lookup_id: this.asset.asset_id, 
            addFeedbacks: !true,
            uid: this.uid,
            noEvents: true,
        })
    }
}

