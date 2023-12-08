<div class="row">

	<div class="col-6 col-sm-3 col-md-3 col-lg-2">
		<a data-toggle="tab" class="card text-white text-left mb-3 btn bg-secondary leaves-dashboard-square shadow-md" href="/pdgms/attendance/leaves">
			<h1 class="pt-3 px-1">{counters.leavesApplied}</h1>
			<div class="card-body pt-0 px-1" style="font-size: 14px;">
				<div class="card-title">Leaves I've applied for</div>
			</div>
		</a>
	</div>

	<div class="col-6 col-sm-3 col-md-3 col-lg-2">
		<a data-toggle="tab" class="card text-white text-left mb-3 btn bg-secondary leaves-dashboard-square shadow-md" href="/pdgms/attendance/leaves">
			<h1 class="pt-3 px-1">{counters.leavesTaken}</h1>
			<div class="card-body pt-0 px-1" style="font-size: 14px;">
				<div class="card-title">Leaves I've taken</div>
			</div>
		</a>
	</div>

	<div class="col-6 col-sm-3 col-md-3 col-lg-2">
		<a data-toggle="tab" class="card text-white text-left mb-3 btn bg-secondary leaves-dashboard-square shadow-md">
			<h1 class="pt-3 px-1">{counters.alternativeAssignments}</h1>
			<div class="card-body pt-0 px-1" style="font-size: 14px;">
				<div class="card-title">Alternative Assignments</div>
			</div>
		</a>
	</div>

	<!-- IF isLeader -->
	<div class="col-6 col-sm-3 col-md-3 col-lg-2">
		<a data-toggle="tab" class="card text-white text-left mb-3 btn bg-secondary leaves-dashboard-square shadow-md" href="/pdgms/attendance/approveleaves">
			<h1 class="pt-3 px-1">{counters.leaveRequests}</h1>
			<div class="card-body pt-0 px-1" style="font-size: 14px;">
				<div class="card-title">Requests from team</div>
			</div>
		</a>
	</div>
	<!-- ENDIF isLeader -->

	<div class="col-6 col-sm-3 col-md-3 col-lg-2">
		<a class="card text-white text-left mb-3 btn bg-primary leaves-dashboard-square shadow-md" data-toggle="modal" data-target="#viewProfile" href="#viewProfile">
			<h1 class="pt-3 px-1">View</h1>
			<div class="card-body pt-0 px-1" style="font-size: 14px;">
				<div class="card-title">
					My Profile 
					<i data-icon="left" class="fa fa-chevron-right" aria-hidden="true"></i>
				</div>
			</div>
		</a>
	</div>

</div>