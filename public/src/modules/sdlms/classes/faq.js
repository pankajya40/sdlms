let FAQTemplates = {
	faq: {
		container: (data) => {
			return `<div class="container" ></div>`;
		},
		question: (index = 0, data) => {
			return `<label>Question </label><input type="text" name="question" required class="form-control border border-secondary">`;
		},
		answer: (index = 0, data) => {
			return `<label style="margin-top: 10px;">Answer</label><textarea id="faq-answer" type="text" name="answer"  class="form-control border border-secondary"></textarea><hr>`;
		},
		add: (data) => {
			return `<button type="button" class="add sdlms-button button-primary button-lg mr-3">Add</button>`;
		},
		submit: (data) => {
			return `<button type="submit" class="submit sdlms-button button-primary button-lg">submit</button>`;
		},       
	},
};

class FAQ {
	constructor(data) {
		this.target = data.target;
		$(this.target).append(`<form></form>`);
		this.target = $(this.target).find("form");
		this.onSuccess = data.onSuccess;
		this.build();
	}
	build() {
		$(this.target).append(FAQTemplates.faq.container());
		// $(this.target).append(`<div class="action p-3 d-flex justify-content-end">${FAQTemplates.faq.add() + FAQTemplates.faq.submit()} </div>`);
		$(this.target).append(`<div class="action p-3 d-flex justify-content-end">${FAQTemplates.faq.submit()} </div>`);
		this.add();

		$(`#faq-answer`).tinymce({
            height: 270,
            width: '100%',
			menubar: false,
			branding: false,
			paste_data_images: false,
			automatic_uploads: false,
			responsive: true,
			plugins: [
			'advlist', 'autolink', 'lists', 'link', 'charmap',
			'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
			'insertdatetime', 'wordcount'
			],
			toolbar: 'undo redo fullscreen | bold italic backcolor | ' +
			'bullist numlist outdent indent | removeformat'
		});

		this.events();
	}
	add() {
		let index = $(this.target).find(".single-faq").length;
		$(this.target)
			.find(`.container`)
			.append(`<div class="single-faq border-bottom py-3">${FAQTemplates.faq.question(index) + FAQTemplates.faq.answer(index)}</div>`);
	}
	events() {
        let $this = this;
		// $(this.target).find(".add").on("click", () => {
		// 	this.add();
		// });
		$(this.target).on("submit", (e) => {
			e.preventDefault();
			// let data = $(this.target).serializeArray();
			// console.log(data);
			let data = $this.getJSON();
			
			 require(['api'], function (api) {
				let {tid} = ajaxify.data;
				api.post('/apps/faq',{tid:tid,
					question: data.question,
					answer: data.answer}).then(res => {
						if ($this.onSuccess && typeof $this.onSuccess === 'function') {
							$this.onSuccess(res);
						}
					})
				.catch(error => console.log(error))
			 })
		 
		});
        $(this.target).on('click', '[remove]', function(){
		if($($this.target).find('.single-faq').length < 2) {
                return alert('cannot remove all the faq')

            }
            $(this).parents('.single-faq').first().remove();
        })
	}
	getJSON () {
		return {
		// 	let data = $(this.target).serializeObject();
		// return data.faqs;
			question: $(this.target).find("[name='question']").val(),
			answer: $("#faq-answer").val(),
		}
			
	};
   
}
       

/* <u remove><svg remove-subthread="" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 420px;">
            <path d="M0.785714 12.4444C0.785714 13.3 1.49286 14 2.35714 14H8.64286C9.50714 14 10.2143 13.3 10.2143 12.4444V3.11111H0.785714V12.4444ZM2.35714 4.66667H8.64286V12.4444H2.35714V4.66667ZM8.25 0.777778L7.46429 0H3.53571L2.75 0.777778H0V2.33333H11V0.777778H8.25Z" fill="#323232"></path>
        </svg></u> */