<style>
	#progressbar {
		margin-bottom: 30px;
		overflow: hidden;
		color: #455A64;
		padding-left: 0px;
		margin-top: 30px
	}

	#progressbar li {
		list-style-type: none;
		font-size: 12px;
		width: 23.33%;
		float: left;
		position: relative;
		font-weight: 400;
		color: #455A64 !important;

	}

	#progressbar #step1:before {
		content: "1";
		color: #fff;
		width: 26px;
		margin-left: 15px !important;
		padding-left: 10px !important;
	}


	#progressbar #step2:before {
		content: "2";
		color: #fff;
		width: 26px;

	}

	#progressbar #step3:before {
		content: "3";
		color: #fff;
		width: 26px;
		margin-right: 15px !important;
		padding-right: 10px !important;
	}

    #progressbar #step4:before {
		content: "4";
		color: #fff;
		width: 26px;
		margin-right: 15px !important;
		padding-right: 10px !important;
	}

	#progressbar li:before {
		line-height: 26px;
		display: block;
		font-size: 12px;
		background: #999999;
		border-radius: 50%;
		margin: auto;
	}

	#progressbar li:after {
		content: '';
		width: 121%;
		height: 2px;
		background: #999999;
		position: absolute;
		left: 0%;
		right: 0%;
		top: 15px;
		z-index: -1;
	}

	#progressbar li:nth-child(2):after {
		left: 50%;
	}

	#progressbar li:nth-child(1):after {
		left: 25%;
		width: 121%;
	}

	#progressbar li:nth-child(3):after {
		left: 25% !important;
		width: 50% !important;
	}

	#progressbar li:nth-child(4):after {
		left: -18% !important;
		width: 100%!important;
	}


	#progressbar li.active:before,
	#progressbar li.active:after {
		background: var(--primary-background-color);
	}
</style>
<!-- IF stage -->
<div class="w-100" style="left: 0; position: absolute; top: 75px;">
    <div class="row px-3 justify-content-end">
        <div class="col-12 col-md-5 ">
            <ul id="progressbar" class="justify-content-end d-flex mb-1 mr-2">
                <li class="step0 <!-- IF stage.video_reflection --> active <!-- ELSE --> text-muted <!-- ENDIF stage.video_reflection -->" id="step1">Video reflection</li>
                <li class="step0 text-center <!-- IF stage.observation --> active <!-- ELSE --> text-muted <!-- ENDIF stage.observation -->" id="step2">Observation</li>
                <li class="step0 text-right <!-- IF stage.sign_off_reflections --> active <!-- ELSE --> text-muted <!-- ENDIF stage.sign_off_reflections -->" id="step3">Sign-off reflections</li>
                <li class="step0 text-right step-complete <!-- IF stage.observation_complete --> active <!-- ELSE --> text-muted <!-- ENDIF stage.observation_complete -->" id="step4">Complete</li>
            </ul>
        </div>
    </div>
</div>
<!-- ENDIF stage -->