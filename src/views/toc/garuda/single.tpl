<script src="/assets/src/client/toc/calendar.js"></script>
<link href="https://cdn.rawgit.com/nizarmah/calendar-javascript-lib/master/calendarorganizer.min.css" rel="stylesheet" />

<section>
    <div class="w-100 d-flex">
        <div class="calendar-container">
            <div id="calendarContainer"></div>
            <div class="noteOftheDay">
                <label
                    class="noteOftheDayLabel sdlms-text-black-25px mt-2 font-weight-500 w-100 text-center">Celebration
                    of the day</label>
                <textarea class="form-control" id="notes" placeholder="Write here ..."></textarea>
            </div>
        </div>
        
        <div class="calendar-container-wrapper">
            <div class="w-100 d-flex flex-wrap">
                <form id="toc" class="w-100">
                    <div class="d-flex justify-content-md-between w-100">
                        <button id="prev-week" class="btn button-primary">Previous</button>
                    <button id="next-week" class="btn button-primary">Next</button>
                    </div>
                    
                    <table class="toc-table w-100">
                        <thead>
                            <tr>
                                <th class="w-auto">Time Codes</th>
                                <th class="w-auto">Monday</th>
                                <th class="w-auto">Tuesday</th>
                                <th class="w-auto">Wednesday</th>
                                <th class="w-auto">Thrusday</th>
                                <th class="w-auto">Friday</th>
                                <th class="w-auto">Saturday</th>
                            </tr>
                        </thead>
                        <tbody id="tocBody">
                          
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
</section>