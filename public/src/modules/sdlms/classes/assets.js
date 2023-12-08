class Assets {
	constructor(data) {

		this.tid = Number(data.tid) || null;
		if (!this.tid) throw new Error('tid is required');

		this.uid = Number(data.uid) || null;
		if (!this.uid) throw new Error('uid is required');

		this.readonly = data.readonly || false;
		this.instances = {};
		this.assets = data.assets.map(e =>{
			((!$(e.target).length) && this.error({
				type: 'Not Exist',
				message: e.target,
			}));
			e.pid = Number(e.pid) || null;
			return e;
		}).filter(e => Number(e.pid));

		if (!this.haveAssets()) throw new Error('Assets: pids or types or assets are required');
		if (this.haveDuplicateAssets()) throw new Error('Assets: duplicate assets pids');
		if (this.haveDuplicateTargets()) throw new Error('Assets: targets must be unique');

		this.map();
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

	haveDuplicateAssets() {
		return ((new Set(this.assets.map(a => a.pid)).size) < this.assets.length);
	}
	haveDuplicateTargets() {
		return ((new Set(this.assets.map(a => a.target)).size) < this.assets.length);
	}
    contains(a=[],b=[]) {
        return a.some(r=> b.indexOf(r) >= 0);
    }
  
	haveAssets() {
		return this.assets.length;
	}

	error(err) {
		console.error(`Assets: ${err.type} ${err.message || ''}`);
	}
	modifyAssetByindex(data, index) {
		if (index > -1) this.$builders[index] = $.extend(true, this.$builders[index], data);
	}
	modifyAssetByPid(data, pid) {
		this.modifyAssetByindex(data, this.$builders.findIndex(e => e.pid == pid));
	}
	modifyAsset(data, index) {
		this.modifyAssetByindex(data, this.pids.indexOf(data.pid));
	}
	get(pid) {
		return this.$builders[this.$builders.findIndex(e => e.pid == pid)]
	}

	async map() {

		let $that = this;
		let pids = this.assets.map(e => e.pid).join(',');

		this.$builders = this.assets.map((elem, index) => new Object({
			target: elem.target,
			pid: elem.pid,
			temp_id: this.unique('asset-'),
			config: elem.config
		}));

		console.log('Assets: map', pids);
		console.log('Assets: map', this.$builders);

		require(['api'], function (api) {
			api.get(`/sdlms/pids?pids=${pids}&tid=${$that.tid}`, {}).then(res => {
				res.map((e, i) => $that.modifyAssetByPid(e, Number(e.pid)));
				$that.init();
			})
		})

	}
	add(assets) {

		

		assets = assets.map(e =>{
			((!$(e.target).length) && this.error({
				type: 'Not Exist',
				message: e.target,
			}));
			e.pid = Number(e.pid) || null;
			return e;
		}).filter(e => Number(e.pid));


		if((new Set([...assets.map(a => a.pid),...this.assets.map(a => a.pid)]).size) <[...assets,...this.assets].length) throw new Error('Assets: duplicate assets pids');
		if((new Set([...assets.map(a => a.target),...this.assets.map(a => a.target)]).size) <[...assets,...this.assets].length) throw new Error('Assets: duplicate assets targets');

        let $that = this;
		this.assets = [...this.assets, ...assets];

		let $builders = assets.map((elem, index) => new Object({
			target: elem.target,
			pid: elem.pid,
			temp_id: this.unique('asset-'),
			config: elem.config
		}));

		this.$builders = [...this.$builders, ...$builders];
		let pids = assets.map(e => e.pid).join(',');
		require(['api'], function (api) {
			api.get(`/sdlms/pids?pids=${pids}&tid=${$that.tid}`, {}).then(res => {
				res.map((e, i) => $that.modifyAssetByPid(e, Number(e.pid)));
				$that.update($builders);
			})
		})
	}
	init() {
		this.$builders.forEach(asset => this.render(asset));
	}
	update($builders) {
		$builders.forEach(asset => this.render(asset));
	}
	render(asset) {
		asset.code = 1;
		switch ((asset.type)) {
			case 'eaglebuilder':
				this.getEagleBuilder(asset);
				break;

			case 'threadbuilder':
				this.getThreadBuilder(asset);
				break;

			case 'spreadsheet':
				this.getSpreadSheet(asset);
				break;

			case "article":
				this.getArticle(asset);
				break;
			
			case 'form':
				this.getForm(asset);
				break;

			default:
				asset.status = 'Not Found';
				asset.code = 0;
				$(asset.target).html(`<pre>${JSON.stringify(asset, null, 2)}</pre>`);
				break;
		}
	}
	getThreadBuilder(request) {

		if (typeof threadBuilder != 'function') {
			$(request.target).html(`<pre>${JSON.stringify({
                status:'Missing Class ThreadBuilder'
            })}</pre>`);
			this.error({
				type: 'Missing Class',
				message: 'ThreadBuilder'
			});
			return
		};

		let data = {
			meta: request.meta,
			threads: request.threads,
			conclusion: request.conclusion || {},
		};

		let config = {
			target: request.target,
			action: this.readonly ? 'reader' : "builder",
			tid: this.tid,
			uid: this.uid,
			id: request.pid || request.id,
			with: data,
			noTracking: true,
			noDraft: true,
			lookup_id: request.temp_id

		};

		if (request.config && typeof request.config == 'object') config = $.extend(true, config, request.config);

        let asset = new threadBuilder(config);
		this.instances[request.temp_id] = asset;
	}

	getEagleBuilder(request) {

		if (typeof eagleBuilder != 'function') {
			$(request.target).html(`<pre>${JSON.stringify({
                status:'Missing Class EagleBuilder'
            })}</pre>`);
			this.error({
				type: 'Missing Class',
				message: 'Eaglebuider'
			});
			return
		};

		let data = {
			meta: request.meta,
			tracks: request.tracks,
			conclusion: request.conclusion || {},
		};

		let config = {
			target: request.target,
			action: this.readonly ? 'reader' : "builder",
			tid: this.tid,
			uid: this.uid,
			id: request.pid || request.id,
			with: data,
			noTracking: true,
			noDraft: true,
			lookup_id: request.temp_id
		}

		if (request.config && typeof request.config == 'object') config = $.extend(true, config, request.config);

		let asset = new eagleBuilder(config);
		this.instances[request.temp_id] = asset;
	}
	getSpreadSheet(request) {

		if (typeof spreadSheet != 'function') {
			$(request.target).html(`<pre>${JSON.stringify({
                status:'Missing Class SpreadSheet'
            })}</pre>`);
			this.error({
				type: 'Missing Class',
				message: 'SpreadSheet'
			});
			return
		};
		request.data = request.data || {};

		let data = {
			data: request.data.data,
			readonly: this.readonly,
			widths: request.data.widths,
			styles: request.data.styles,
		};

		let config = {
			target: request.target,
			action: this.readonly ? 'reader' : "builder",
			tid: this.tid,
			uid: this.uid,
			with: data,
			id: request.pid,
			noEvents: true,
			noTracking: true,
			noDraft: true,
			lookup_id: request.temp_id
		}

		if (request.config && typeof request.config == 'object') config = $.extend(true, config, request.config);

		let asset = new spreadSheet(config);
		this.instances[request.temp_id] = asset;
	}


    getArticle(request){
		if (typeof Article != 'function') {
			$(request.target).html(`<pre>${JSON.stringify({
                status:'Missing Class Article'
            })}</pre>`);
			this.error({
				type: 'Missing Class',
				message: 'Article'
			});
			return
		}	

		let config = {
            uid: request.uid,
            target:  request.target,
            tid: request.tid,
            with: request,
            classes:' shadow-none m-0',
            richTextMenubar: true,
			action: this.readonly ? 'reader' : "builder",
			lookup_id: request.temp_id
            
        };

		if (request.config && typeof request.config == 'object') config = $.extend(true, config, request.config);

        let asset =  new Article(config);
		this.instances[request.temp_id] = asset;
    
    }

    getForm(request){
		if (typeof EnquiryForm != 'function') {
			$(request.target).html(`<pre>${JSON.stringify({
                status:'Missing Class EnquiryForm'
            })}</pre>`);
			this.error({
				type: 'Missing Class',
				message: 'EnquiryForm'
			});
			return
		}	
        let config ={
            target: request.target,
            classes: 'shadow-none d-block',
			action: this.readonly ? 'reader' : "create",
            with: request,
			lookup_id: request.temp_id
        }
		if (request.config && typeof request.config == 'object') config = $.extend(true, config, request.config);

		let asset = new EnquiryForm(config);
		this.instances[request.temp_id] = asset;
    }


	save() {
		if (this.readonly) return false;
		return new Promise((resolve, reject) => {
			let $that = this;
			let resp = [];
			let assets = Promise.all(Object.keys(this.instances).map(instance => this.instances[instance].save()));
			assets.then(res => {
				res.forEach((asset, index) => {
					resp.push({
						tid: $that.tid,
						pid: Number(asset.pid || asset.id),
						type: asset.type,
						target: $that.$builders.find(e => e.temp_id == asset.lookup_id).target,
					})
				});
				resolve(resp);
			}).catch(err => {
				reject(err);
			})
		});
	}
    destroy(pid) {
        pid = Number(pid);
        let $builder = this.$builders.find(e => e.pid == pid);
        if (!$builder) throw new Error('Builder not found');

        let target = $builder.target;
        // this.targets =   this.targets.filter(e => e != target);
        this.$builders = this.$builders.filter(e => e.target != target);
        this.assets =    this.assets.filter(e => e != pid);
        delete this.instances[$builder.temp_id];

        $($builder.target).empty();
    }
}

// let masters = new Assets({
// 	tid: 822,
// 	uid: 32,
// 	readonly: !true,
// 	assets:[{
// 		pid:5196,
// 		target:'.elem1',
// 		config:{
// 			noTracking: true,
// 			noDraft: true,
// 			action: 'builder',
// 		}
// 	},{
// 		pid:5195,
// 		target:'.elem2',
// 		config:{
// 			noTracking: true,
// 			noDraft: true,
// 			action: 'reader',
// 		}
// 	}]
// });