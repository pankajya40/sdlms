/**
 * @author Fardin
 * @date 04/2023
 * @description Allow user to create a side panel
 */

const sidePanel = () => {
	return `<nav class="navbar navbar-dark border-left shadow" 
	style="position: fixed; top: 0; right: 0; height: 100%; width: 65px; background-color: white;">
  <ul class="navbar-nav h-100" style="margin-top: 250%;">
    <li class="nav-item py-1">
      <button class="btn" title='Rigor Builder Feed' id='rb_feed'><img style="height: auto; width: 72px;margin-left: -26px;" src="https://static.thenounproject.com/png/57467-200.png"></button>
    </li>
    <li class="nav-item py-1">
      <button class="btn" title='Maturity Builder Feed' id='mb_feed'><img style="height: auto; width: 110%; margin-left: -65%;" src="https://static.thenounproject.com/png/944757-200.png"></button>
    </li>
	<li class="nav-item py-1">
      <button class="btn" id="is_feed" title="Insight Spotter Feed">
			<img src="https://static.thenounproject.com/png/1290313-200.png" style="height: auto; width: 40px;margin-left: -13px;" alt="" />
		</button>
	</li>
  </ul>
</nav>`;
};


class SidePanel {
	constructor() {
		this.init();
	}

	// append side panel into body
	panel() {
		$('#content').append(sidePanel());
		$('#content.sdlms-container').css({ 'width': 'calc(100% - 65px)' })
	}

	eventListener() {
		$('body')
			.on('click', '#rb_feed', () => {
				new RigorFeed();
			});
		$('body')
			.on('click', '#mb_feed', () => {
				new MaturityFeed();
			});

		// When Insight Feed is clicked, the modal is appended to the screen for Insight Feed 
		$('body').on('click', '#is_feed' ,() => {
			new InsightFeed();
		});
	}

	init() {
		this.panel();
		this.eventListener();
	}
}