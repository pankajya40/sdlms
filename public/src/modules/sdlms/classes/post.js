
/**
 * @var {class} Post
 * @description Contains the @methods or @function - to run the Post
 */

 class Post {
	constructor(data = {}) {


		if (!data.tid) {
			throw new Error("Invalid tid supplied");
		}
		this.tid = data.tid;
		this.data = data;
        this.classes = data.classes || '';
		this.assetId = data.assetId;
		this.pid = data.with ? data.with.pid : 1;
		// this.data.with = this.restore() || data.with || {};
		this.data.with = data.with || {};

		var b = document.documentElement;
		b.setAttribute("data-useragent", navigator.userAgent);
		b.setAttribute("data-platform", navigator.platform);
		this.data.queue = 0;
		this.builder(this.data.target);
	}

	/**
	 * @author imshawan
	 * @date 12/2021
	 * @name unique
	 * @type {function} 
	 * @description to get unique id 
	 * @param {String} prefix optional identifier for generated unique id {prefix + id}
	 */

	unique(prefix = "") {
		var dt = new Date().getTime();
		var uuid = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
		});
		return prefix + uuid;
	}

    log(log) {
		!this.data.log || console.log(log);
	}

	/**
	 * @author imshawan
	 * @date 12/2021
	 * @name builder
	 * @type {function} 
	 * @description Attach an  sdlms-post-builder element
	 * @param {HTML ELEMENT} HTML element to render builder default body 
	 */

	builder(target = "body") {

		this.id = this.unique("sdlms-post-");
		let $that = this;
		let $target = $(target);
		if (!$target.length) {

			/**
			 * @author imshawan
			 * @description Given target should be a valid HTML Element
			 */
			$that.log("No HTML element found For Builder Given ==>" + target);
			throw new Error(`No HTML element found while searching ${target}`);
		}
		$target.empty();
		$target.append(
			$("<sdlms-post-builder>")
			.attr({
				id: $that.id,
				class: $that.data.noAction ? "sdlms-readonly" : ''
			})
			.append(`<div class="sdlms-asset-owner" style="display:${$that.data.name || "none"} " name="${$that.data.name}" ></div>`)
			.append($that.data.action != 'reader' ?
				$("<form>").attr({
					id: "form-" + $that.id,
					novalidate: true,
					class: 'row sdlms-post-container border m-3 create p-3 sdlms-post-container needs-validation ' + ($that.data.action == 'reader' ? 'readonly' : 'create'),
				}).css({
					boxShadow: '0 1rem 1rem -0.625rem rgb(34 47 62 / 15%), 0 0 2.5rem 1px rgb(34 47 62 / 15%)',
				}).append(`<style>
				#form-${$that.id} label {
					font-weight: 600;
				}
				</style>`) : ''
			)
		);
		let $builder = $(`#form-${$that.id}`);
		$that.$builder = $builder;
		$that[$that.data.action == 'reader' ? 'reader' : 'create']($that.data.with);

	}

    create(data = null) {

		let $target = this.$builder,
			components = this.post(),
			$that = this;
    }


	/**
	 * @author imshawan
	 * @date 06-04-2022
	 * @function dateFormatter
	 * @param {Int} timestamp 
	 * @returns formatted time string
	 */
	dateFormatter (timestamp) {
        let date = new Date(timestamp)
        return `${date.getDate()} ${date.toLocaleDateString(undefined, { month: "long" })}, ${date.getFullYear()}`
    }

	/**
	 * @author imshawan
	 * @date 15/02/2022
	 * @name reader
	 * @type {function} 
	 * @description Append @post to sdlms-post-builder read mode
	 * @param {Object} data Required if @post is initied with existing @post then render it with Exisiting
	 */

	reader(data) {
		let $that = this;
		let post = $that.data.with;
		let $target = $that.data.target;
		if (!data.tid) {
			return;
		}
		$($target).append(`<div class="${$that.classes}">
			<div class="sdlms-post-builder-header mb-4">
				<p class="d-flex mb-1" style="justify-content: space-between;">
					<span class="sdlms-text-black-22px">
						Posted by <span style="color: blue;
						font-weight: 500;
						cursor: pointer;" data-user-profile="${post.user.username}">${post.user.fullname || post.user.displayname ||post.user.username}</span>
					</span>
					<span class='sdlms-text-black-22px' style="font-weight: 600; ">
						${$that.dateFormatter(post.timestamp)} 
					</span>
				</p>
			</div>
			<div class="sdlms-post-builder-container mb-2 sdlms-text-black-20px text-justify" style="word-wrap: break-word;">
				${post.content}
			</div>
		</div>`)

		$($target).on('click', `[data-user-profile]`, function () {
			let username = $(this).data('user-profile');
			ajaxify.go(`/user/${username}`);
		});
	}
}