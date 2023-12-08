<div class="d-flex add-journal-button-parent">
    <!-- <div class="border p-1 cursor-pointer my-auto btn btn-secondary btn-sm" id="prev-day"><i class="fas fa-chevron-left" aria-hidden="true"></i><small class="my-auto mx-1">Prev</small></div> -->
    <div class="ml-auto">
        <button class="btn button-primary common-border-radius add-journal-button"><i class="fa fa-plus" aria-hidden="true"></i> Journal</button>
    </div>
</div>
<div class="card add-journal-card d-none">
    <div class="d-flex close-add-journal">
        <div class="ml-auto"><i class="fa fa-times mr-2 mt-2" aria-hidden="true"></i></div>
    </div>
    <div class="card-body">
        <form id="journal">
            <div class="form-group">
                <textarea name="content" class="form-control" rows="3" placeholder="Journal your day !" style="resize:none" maxlength="300" required ></textarea>
            </div>
            <div class="form-group">
                <div class="align-items-center d-flex form-group">
                    <label for="options" class="font-weight-bold mb-0 pr-3">Category :</label>
                    <div class="row">
                        <div class="">
                            <div class="form-check">
                                <input class="form-check-input hideCheckbox" type="checkbox" value="Heuristic" id="heuristic" name="category" />
                                <label class="emoji form-check-label" for="heuristic" title="Heuristic">💡</label>
                            </div>
                        </div>

                        <div class="">
                            <div class="form-check">
                                <input class="form-check-input hideCheckbox" type="checkbox" value="Celebration" id="celebration" name="category" />
                                <label class="form-check-label emoji" for="celebration" title="Celebration"> 🎉</label>
                            </div>
                        </div>

                        <div class="">
                            <div class="form-check">
                                <input class="form-check-input hideCheckbox" type="checkbox" value="Insight" id="insight" name="category" />
                                <label class="form-check-label emoji" for="insight" title="Insight">🤔</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="align-items-center d-flex form-group">
                    <label for="options" class="font-weight-bold mb-0 pr-3">Feeling</label>
                    <div class="row">
                        <div class="">
                            <div class="form-check">
                                <input class="form-check-input hideCheckbox" type="checkbox" value="Motivation" id="motivation" name="feeling" />
                                <label class="emoji form-check-label" for="motivation" title="Motivation">💪</label>
                            </div>
                        </div>

                        <div class="">
                            <div class="form-check">
                                <input class="form-check-input hideCheckbox" type="checkbox" value="Speculation" id="speculation" name="feeling" />
                                <label class="emoji form-check-label" for="speculation" title="Speculation">💭</label>
                            </div>
                        </div>
                        <div class="">
                            <div class="form-check">
                                <input class="form-check-input hideCheckbox" type="checkbox" value="Observation" id="observation" name="feeling" />
                                <label class="emoji form-check-label" for="observation" title="Observation">🔍</label>
                            </div>
                        </div>
                        <div class="">
                            <div class="form-check">
                                <input class="form-check-input hideCheckbox" type="checkbox" value="Myth buster" id="mythbuster" name="feeling" />
                                <label class="emoji form-check-label" for="mythbuster" title="Myth Buster">💥</label>
                            </div>
                        </div>
                    </div>
                </div>
                <datalist id="feelings">
                    <option value="Observation"> </option>
                    <option value="Myth Buster"> </option>
                </datalist>
            </div>
            <button id="addjournal" type="submit" class="btn btn-primary button-primary float-right rounded-sm sdlms-button">Save</button>
            <button type="reset" class="btn btn-secondary float-right mr-2">Clear</button>
        </form>
    </div>
</div>
<div class="p-0" journalSection></div>