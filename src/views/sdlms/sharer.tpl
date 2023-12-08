{{message}}
 <!-- IF hideHeader -->
 <style>
	header {
		display: none !important;
	}
	.sdlms-container{
		width:100% !important;
		padding:0 0 1rem 0 !important;
	}
    .single-asset-container{
        box-shadow:none !important;
        padding-top:0 !important;
    }
 </style>
 <!-- END hideHeader -->
<!-- IF (data.type == "article") -->
    <div id="sdlms-asset-article"></div>
<!-- ELSE -->
    <div id="sharableAsset" class="single-asset-container"></div>
<!-- END -->