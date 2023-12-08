<script src="/assets/src/client/toc/garuda/calendar.js"></script>
<link href="https://cdn.rawgit.com/nizarmah/calendar-javascript-lib/master/calendarorganizer.min.css" rel="stylesheet"/>
<!-- IMPORT toc/partials/style.tpl -->
<!-- IMPORT toc/partials/header.tpl -->
<style>
    .common-border-radius{
        border-radius: 20px;
    }
</style>

<section>
    <div class="w-100 d-flex px-5">

            <div class="w-100 d-flex flex-wrap">
                <form id="toc" class="w-100">
                    <div class="d-flex justify-content-md-between w-100 common-border-radius p-2 mb-3">
                        <button id="prev-week" class="btn button-tertiary common-border-radius"><i class="fa fa-arrow-left" aria-hidden="true"></i> Previous Week</button>
                    <button id="next-week" class="btn button-tertiary common-border-radius">Next Week <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                    </div>
                    <!-- <div class="d-flex w-100 p-2 mb-3">
                        <button type="button" class="btn btn-primary button-primary common-border-radius" data-toggle="modal" data-target="#calendarmodal">
                            <!-- IF weekduration-->
                            {weekduration}
                            <!-- ELSE -->
                            Calendar
                            <!--END IF weekduration -->
                        </button>
                    </div> -->
                    <table class="toc-table w-100 sdlms-section">
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
</section>
 <!-- IMPORT toc/garuda/partials/calendarmodal.tpl -->
<!-- IMPORT toc/partials/footer.tpl -->