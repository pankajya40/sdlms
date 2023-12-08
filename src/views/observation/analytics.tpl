<!-- IMPORT partials/sidebar.tpl -->
<section>

	<ul class="nav nav-pills nav-fill shadow mb-4">
		<li class="nav-item">
			<a class="nav-link h-100 border" href="/observation/report">Observation History</a>
		</li>
		<li class="nav-item">
			<a class="nav-link h-100 active" href="/observation/report/analytics">Analytics</a>
		</li>
	</ul>

    <div class="justify-content-center pt-4 mx-2">
		<h3 class="font-weight-700 mb-3 text-center">Feature coming soon!</h3>

	</div>

	<!-- IF probability -->
    <div class="justify-content-center pt-4 mx-2">
		<h5 class="font-weight-700 mb-3">Probability for getting hired</h5>
		<div class="progress" style="height: 30px;">
			<div class="progress-bar {probability.classes}" role="progressbar" aria-valuenow="{probability.value}" aria-valuemin="0" aria-valuemax="100" style="width:{probability.value}%">
				{probability.value}%
			</div>
		</div>

	</div>
    <!-- ENDIF probability -->

</section>
<!-- IMPORT partials/footer.tpl -->