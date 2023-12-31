<!-- IMPORT pdgms/projectManager/home.tpl -->
<div>
    <div class="container-fluid">
        <div class="row mt-2 px-0">
            <div class="col-10">
                <h3 class="sdlms-text-black font-weight-700">Effort Tracker</h3>
                
            </div>
            
            <div class="col-2 btn-group" role="group" aria-label="Basic example">
                <button type="button" id="employee-view-btn" class="btn border-light view-button button-primary sdlms-button"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 20 20">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg></button>
                <button type="button" id="leader-view-btn" class="btn border-light view-button button-primary sdlms-button"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-people" viewBox="0 0 20 20">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                </svg></button>
            </div>
        </div>
        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>curent team:<span>COE Lab</span></p>
        </div>
        
        <div class="row mt-2 justify-content-between bg-light pt-2 px-2 mx-3">
            <div class=" text-center sdlms-text-black font-weight-500"><h3>Project and Task Progress</h3></div>
            <div class="text-center"> <select class="months" name="months" id="months">
                    <option value="all">None</option>
                    <option value="resent">Resent</option>
                    <option value="deadline">Deadline</option>
                    <option value="priority">Priority</option>
                </select></div>
        </div>
       <div class="row">
            <div class="col-4 border-right border-dark">
                <div class=" text-center sdlms-text-black font-weight-500"><h3>Task status Growth</h3></div>
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
            <div class="col-8">
            
            <div>
       </div>
    </div>
</div>
<!-- IMPORT pdgms/projectManager/footer.tpl -->