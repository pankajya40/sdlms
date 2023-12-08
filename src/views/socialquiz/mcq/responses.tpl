<style>
  .table th,
  .table td {
    min-width: 400px;
}
.table td div{
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    width: 100%;
}
</style>
<section>
    <div class="w-100 d-flex justify-content-end position-absolute pr-3 wrapper-actionable-items">
        <button class="sdlms-button button-secondary button-lg mr-3" id="dowloadCSV">Download CSV</button>
    </div>
    <div class="card p-3">
        <div class="table-responsive">
            <table class="table" id="responses">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <!-- BEGIN mcq.questions -->
                        <th scope="col">{mcq.questions.title}
                            <!-- IF mcq.questions.isRequired  --> <span class="text-danger">*</span>
                            <!-- END mcq.questions.isRequired -->
                        </th>
                        <!-- END mcq.questions -->
                    </tr>
                </thead>

                <tbody>
                    <!-- BEGIN mcq.responses -->
                    <tr>
                        <td> <div>{mcq.responses.user} </div></td>
                        <!-- BEGIN mcq.responses.questions -->
                        <td> <div>{mcq.responses.questions.answer}</div> </td>
                        <!-- END mcq.responses.questions -->
                    </tr>
                    <!-- END mcq.responses -->
                </tbody>
            </table>
        </div>
    </div>
</section>


