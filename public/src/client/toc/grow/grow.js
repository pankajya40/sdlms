"use strict";


/* globals define */
define("forum/toc/grow/grow", ["api", 'forum/toc/journal', 'mobile/classes/mobiletoc',
    'https://cdn.tiny.cloud/1/edmnvohc18gntwb9upy6g9m8s1u0blu4kqij2acxxdgghk1r/tinymce/6/tinymce.min.js',
    'https://cdn.jsdelivr.net/npm/@tinymce/tinymce-jquery@1/dist/tinymce-jquery.min.js',
    "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"
],
    function (api, journal) {

        function convertwhatsapp(inputText) {
            // Replace <strong> tags with * (bold)
            inputText = inputText.replace(/<strong\b[^>]*>(.*?)<\/strong>/gi, '*$1*');
          
            // Replace <em> tags with _ (italics)
            inputText = inputText.replace(/<em\b[^>]*>(.*?)<\/em>/gi, '_$1_');
          
            // Replace <u> tags with ~ (strikethrough)
            inputText = inputText.replace(/<u\b[^>]*>(.*?)<\/u>/gi, '~$1~');
          
            // Replace <a> tags with [link](url)
            inputText = inputText.replace(/<a\b[^>]*href="(.*?)">(.*?)<\/a>/gi, '[$2]($1)');
          
            // Replace &nbsp; with zero-width space (\u200B)
            inputText = inputText.replace(/&nbsp;/g, '\u200B');
          
            // Remove all other HTML tags
            inputText = inputText.replace(/<[^>]+>/g, '');
          
            return inputText;
          }
              
        function getPreviousWeek(isoWeek) {
            const [year, week] = isoWeek.split('-W');
            const weekNumber = parseInt(week, 10);
            let previousYear = parseInt(year, 10);
            let previousWeekNumber = weekNumber - 1;

            if (previousWeekNumber === 0) {
                previousWeekNumber = 52;
                previousYear--;
            }

            const previousWeek = `${previousYear}-W${previousWeekNumber.toString().padStart(2, '0')}`;

            return previousWeek;
        }
        function getISOWeekNumber(date) {
            let fixeddate = new Date(date);
            // Set the target date to Monday of the current week
            let target = new Date(fixeddate.getTime());

            target.setDate(target.getDate() - target.getDay() + 1);

            // Get the year and week number of the target date
            let year = target.getFullYear();
            let weekNumber = Math.floor((target.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

            // Adjust the week number if necessary (week 1 might belong to the previous year)
            if (weekNumber === 0) {
                year--;
                weekNumber = getISOWeekNumber(new Date(year, 11, 31));
            } else if (weekNumber > 52) {
                year++;
                weekNumber = 1;
            }

            // Return the year and week number as a string
            return year + '-W' + weekNumber.toString().padStart(2, '0');
        }
        function getNextWeek(isoWeek) {
            const [year, week] = isoWeek.split('-W');
            const weekNumber = parseInt(week, 10);
            let nextYear = parseInt(year, 10);
            let nextWeekNumber = weekNumber + 1;

            if (nextWeekNumber > 52) {
                nextWeekNumber = 1;
                nextYear++;
            }

            const nextWeek = `${nextYear}-W${nextWeekNumber.toString().padStart(2, '0')}`;

            return nextWeek;
        }

        const MAX_WORDS = 50;
        const reflections = ajaxify.data.reflections;
        var grow = {};
        grow.currentDate = ajaxify.data.currentDate;
        grow.Templates = MobileTOCTemplate.grow();
        // ,"https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0/js/select2.full.js"
        grow.getISOWeekNumber = (date) => {
            console.log(date)
            let fixeddate = new Date(date);
            // Set the target date to Monday of the current week
            let target = new Date(fixeddate.getTime());

            target.setDate(target.getDate() - target.getDay() + 1);

            // Get the year and week number of the target date
            let year = target.getFullYear();
            let weekNumber = Math.floor((target.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

            // Adjust the week number if necessary (week 1 might belong to the previous year)
            if (weekNumber === 0) {
                year--;
                weekNumber = getISOWeekNumber(new Date(year, 11, 31));
            } else if (weekNumber > 52) {
                year++;
                weekNumber = 1;
            }

            // Return the year and week number as a string
            return year + '-W' + weekNumber.toString().padStart(2, '0');
        }
        grow.getNextMonday = (dateStr) => {
            // Parse the input date string and create a Date object
            const date = new Date(dateStr);

            // Calculate the number of days until the next Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
            const daysUntilMonday = (8 - date.getDay()) % 7;

            // If the input date is a Monday, add 7 days to get the date of the following Monday
            const daysToAdd = daysUntilMonday === 0 ? 7 : daysUntilMonday;

            // Create a new Date object for the next Monday by adding the number of days until Monday (or 7 days) to the input date
            const nextMonday = new Date(date.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // converting daysToAdd to miliseconds 

            // Format the next Monday date as "YYYY/MM/DD" and return it
            const nextMondayStr = `${nextMonday.getFullYear()}/${(nextMonday.getMonth() + 1).toString().padStart(2, '0')}/${nextMonday.getDate().toString().padStart(2, '0')}`;
            console.log(nextMondayStr)
            return nextMondayStr;
        }

        grow.getPreviousWeekMonday = (dateStr) => {
            // Parse the input date string and create a Date object
            const date = new Date(dateStr);

            // Calculate the number of days since the previous Monday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
            const daysSinceMonday = date.getDay() === 0 ? 6 : date.getDay() - 1;

            // Calculate the number of days to subtract to get to the Monday of the previous week
            const daysToSubtract = daysSinceMonday + 7;

            // Create a new Date object for the Monday of the previous week by subtracting the number of days to subtract from the input date
            const previousWeekMonday = new Date(date.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);

            // Format the previous week's Monday date as "YYYY/MM/DD" and return it
            const previousWeekMondayStr = `${previousWeekMonday.getFullYear()}/${(previousWeekMonday.getMonth() + 1).toString().padStart(2, '0')}/${previousWeekMonday.getDate().toString().padStart(2, '0')}`;
            console.log(previousWeekMondayStr)
            return previousWeekMondayStr;
        }


        grow.getEditorWordsCount = () => {
            var editor = tinymce.activeEditor.plugins.wordcount;
            return editor.body.getWordCount();
        }

        grow.events = () => {
            $("body").on("click", ".no-ajaxify", function () {
                let url = $(this).data("href");
                location.href = url;
            })
            $(".grow").addClass("active");
            $("#reflectionarea").tinymce({
                height: 400,
                width: '100%',
                menubar: false,
                branding: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'table', 'code', 'wordcount'
                ],
                toolbar: 'undo redo fullscreen link | bold italic | ' +
                    'bullist numlist outdent indent | removeformat'
            });


            $('#submit-reflection-button').on('click', function () {
                let content = $('#reflectionarea').val();
                //const {_id} = observationDetails;

                if (grow.getEditorWordsCount() < MAX_WORDS) {
                    return notify(`The reflection needs to be atleast of ${MAX_WORDS} words`, 'error');
                }

                console.log(content)
                api.post('/toc/reflection', {
                    content,
                    observationDetails: _id
                })
                    .then((res) => {
                        console.log(res)
                        setTimeout(() => ajaxify.go('/toc/grow'), 1000);
                        notify('Reflection submitted successfully!', 'success');
                    })
                    .catch((err) => notify(err.message, 'error'));
            })

            $("#learningreflectionarea").tinymce({
                height: 400,
                width: '100%',
                menubar: false,
                branding: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'table', 'code', 'wordcount'
                ],
                toolbar: 'undo redo fullscreen link | bold italic | ' +
                    'bullist numlist outdent indent | removeformat'
            });

            $("#addlearninginput").keypress(function (event) {
                if (event.keyCode === 13) { // check if enter key is pressed
                    event.preventDefault(); // prevent default action of enter key
                    if ($("body").find("#learningillustration").length > 0) {
                        $("#learningillustration").replaceWith(`
                            <ul class="list-group mb-3" id="learningcontainer">
                            </ul>
                            `);

                    }
                    let data = {}
                    var inputVal = $("#addlearninginput").val();
                    if (inputVal !== "") {
                        // // create new capsule element and append to container
                        data.learning = inputVal;
                        api.post(`/toc/learning/${ajaxify.data.week}`, data)
                            .then(res => {
                                console.log(res)
                                var capsule = $(`<li class="d-flex justify-content-lg-between list-group-item px-5" id="learning-${res._id}">
                                <div class="d-flex flex-column w-100"> 
                                <div class="d-flex justify-content-between">
                                <div>
                                    <input data-id="${res._id}" class="form-check-input" type="checkbox" value="" id="for${res._id}" learningcheck/>
                                    <label id="label-${res._id}" class="form-check-label todo-text" for="for${res._id}">
                                        ${inputVal}
                                    </label>
                                </div>
                                <i class="far fa-trash-alt cursor-pointer" aria-hidden="true" id="deletelearning" data-id="${res._id}"></i>
                                </div>
                                <div class="d-none mt-2" reflectionmodal-${res._id}>
                                        <textarea placeholder="Please write a reflection what learnings you got." class="form-control mt-2" id="learningreflectionmodal${res._id}" rows="5" style="
                                        resize: none;
                                    " id="reflection-${res._id}"></textarea>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 22 22" fill="none" class="float-lg-right mt-1 cursor-pointer" save-reflection-button data-id="${res._id}">
                                    <path d="M5.5999 19.4V14C5.5999 13.3373 6.13716 12.8 6.7999 12.8H15.1999C15.8626 12.8 16.3999 13.3373 16.3999 14V20M13.9999 6.20002L6.7999 6.20002C6.13716 6.20002 5.5999 5.66276 5.5999 5.00002L5.5999 1.40002M19.9974 5.5975L16.4024 2.00255C16.0166 1.61676 15.4934 1.40003 14.9478 1.40002H3.45705C2.3209 1.40002 1.3999 2.32102 1.3999 3.45717V18.5429C1.3999 19.679 2.3209 20.6 3.45705 20.6H18.5428C19.6789 20.6 20.5999 19.679 20.5999 18.5429V7.05211C20.5999 6.50652 20.3832 5.98328 19.9974 5.5975Z" stroke="black" stroke-width="2" stroke-linecap="round"></path>
                                    </svg>
                                    </div>
                                    </div>
                            </li>`);
                                $("#learningcontainer").append(capsule);
                                $("#addlearninginput").val(""); // clear the input field
                                $("[addReflection]").removeAttr('disabled')
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                }
            });

            $('#submitlearning').on('click', function (e) {
                e.preventDefault();
                let data = $('#learningdata').serializeArray();
                console.log(data)

            })

            $('body').on('click', '[learningcheck]', function (e) {
                const id = $(this).data('id');
                if ($(this).is(":checked") == true) {
                    console.log('hejdf')
                    $(`[reflectionmodal-${id}]`).removeClass('d-none').fadeIn();
                }

                $('body').on('click', '[save-reflection-button]', function (e) {
                    //let id = $(this).data('id');
                    let reflection = $(`#learningreflectionmodal${id}`).val()
                    console.log(reflection)
                    api.put(`/toc/learning/${id}`, {
                        reflection: reflection
                    })
                        .then(res => {
                            $(`[reflectionmodal-${id}]`).replaceWith(`<div class="mx-auto p-1" id='message${id}'>Saved</div>`);
                            setTimeout(function () {
                                $(`#message${id}`).remove().fadeOut(); // Removes all child elements and text content
                            }, 1500);
                            api.put(`/toc/learning/${id}`, {
                                isAcomplished: $('[learningcheck]').is(":checked")
                            })
                                .then(res => {
                                    console.log(res)
                                    $(`#label-${id}`).toggleClass('task-complete');
                                    setTimeout(function () {
                                        location.reload();
                                    }, 2000);
                                    //$('#learning').modal('hide')
                                    //$('#learningreflection').modal('show');
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })

            })

            $('body').on('click', '#deletelearning', function (e) {
                let id = $(this).data('id');
                api.del(`/toc/learning/${id}`)
                    .then(res => {
                        $(`#learning-${id}`).remove()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })

            $('body').on('click', '#addreflectionfortheday', function () {
                let reflection = $('#reflectionarea').val();
                let ISOweek = ajaxify.data.week;

                if (grow.getEditorWordsCount() < MAX_WORDS) {
                    notify(`The reflection needs to be atleast of ${MAX_WORDS} words`, 'error');
                    throw new Error(`The reflection needs to be atleast of ${MAX_WORDS} words`, 'error');
                }

                let today = moment().format("YYYY/MM/DD")
                api.post(`/toc/grow/reflection/${ISOweek}`, {
                    reflection,
                    today
                })
                    .then((res) => {
                        console.log(res)
                        api.put('/toc/grow/streak', {})
                            .then(res => {
                                console.log(res)
                                notify('Your reflection was submitted!', "success");
                                setTimeout(function () {
                                    location.reload();
                                }, 1500); // delay for 1500 milliseconds.
                            })
                            .catch(err => {
                                notify(`${err.message}`, "error")
                            })
                        //location.href = "/toc/grow/" + grow.currentDate;

                    })
                    .catch((err) => {
                        notify(`err.message`, `error`)
                    });
            })

            $("#next-week").on("click", function (e) {
                e.preventDefault();
                location.href = "/toc/grow/" + getNextWeek(ajaxify.data.week);
            })

            $("#prev-week").on("click", function (e) {
                e.preventDefault();
                location.href = "/toc/grow/" + getPreviousWeek(ajaxify.data.week);
            })

            $('body').on("click", "[show-reflection]", function () {
                let id = $(this).data("id");
                $(`[reflectionmodal-${id}]`).toggleClass('d-none');
            })

            $("body").on("click", "#grow-button", function (e) {
                e.preventDefault();
                location.href = `/toc/grow/${getISOWeekNumber(moment().format("YYYY/MM/DD"))}`;
            });

            $("body").on("click", "#garuda-button", function (e) {
                e.preventDefault();
                location.href = `/toc/garuda/${getISOWeekNumber(moment().format("YYYY/MM/DD"))}`;
            });

            $('body').on("click", "[publishreflection]", function () {
                let id = $(this).data("id");
                api.put("/toc/learning/" + id, {
                    isPublished: true
                })
                    .then(res => {
                        notify('Published', 'success')
                        setTimeout(() => location.reload());
                    })
                    .catch(error => {
                        console.log(error)
                        notify('Failed', 'error');
                    })
            })

            $('body').on('click', '#delete', function () {
                let id = $(this).data('id');
                api.del('/toc/deletetodo/' + id, {})
                    .then(res => {
                        console.log(res)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })

            $("body").on("click", "[deletereflectionbutton]", function () {
                let id = $(this).data("id");
                api.del("/toc/grow/reflection/" + id, {})
                    .then(res => {
                        console.log(res)
                        location.reload()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })

            $("body").on("click", "[sharereflectionbutton]", function () {
                console.log('hello ins share reflection')
                let id = $(this).data("id");
                let reflection = $(`#reflection${id}`).html()
                if (reflection) {
                    reflection = convertwhatsapp(reflection);
                    var url = "https://web.whatsapp.com/send?text=" + encodeURIComponent(reflection);
                    setTimeout(() => {
                        notify("Opening WhatsApp", "success")
                        window.open(url, "_blank");
                    }, 1000)
                }
            })

            $("body").on("click", "#closeaddreflection", function () {
                $("#addreflectioncard").addClass("d-none")
                $("#addreflectionbutton").removeClass("d-none")
            })

            $("body").on("click", "#addreflectionbutton", function () {
                $("#addreflectioncard").removeClass("d-none")
                $("#addreflectionbutton").addClass("d-none")
            })

        }

        // grow.convertToWhatsAppMessage = (reflection) => {
        //     // create a temporary div element to hold the HTML code
        //     const tempDiv = document.createElement('div');
        //     tempDiv.innerHTML = reflection;

        //     // get all the paragraphs, strong and emphasis tags
        //     const paragraphs = tempDiv.getElementsByTagName('p');
        //     const strongTags = tempDiv.getElementsByTagName('strong');
        //     const emphasisTags = tempDiv.getElementsByTagName('em');

        //     // create the WhatsApp message variable
        //     let message = '';

        //     // iterate over the paragraphs and append their inner text to the message variable
        //     for (let i = 0; i < paragraphs.length; i++) {
        //       message += paragraphs[i].innerText + '\n\n';
        //     }

        //     // iterate over the strong tags and append their inner text to the message variable with an asterisk on either side
        //     for (let i = 0; i < strongTags.length; i++) {
        //       message += '*' + strongTags[i].innerText + '*\n\n';
        //     }

        //     // iterate over the emphasis tags and append their inner text to the message variable with an underscore on either side
        //     for (let i = 0; i < emphasisTags.length; i++) {
        //       message += '_' + emphasisTags[i].innerText + '_\n\n';
        //     }

        //     // get the ordered and unordered lists
        //     const orderedList = tempDiv.getElementsByTagName('ol')[0];
        //     const unorderedList = tempDiv.getElementsByTagName('ul')[0];

        //     // if there is an ordered list, iterate over its list items and append their inner text to the message variable with a number and period in front
        //     if (orderedList) {
        //       const listItems = orderedList.getElementsByTagName('li');
        //       for (let i = 0; i < listItems.length; i++) {
        //         message += (i + 1) + '. ' + listItems[i].innerText + '\n';
        //       }
        //       message += '\n';
        //     }

        //     // if there is an unordered list, iterate over its list items and append their inner text to the message variable with a bullet in front
        //     if (unorderedList) {
        //       const listItems = unorderedList.getElementsByTagName('li');
        //       for (let i = 0; i < listItems.length; i++) {
        //         message += '\u2022 ' + listItems[i].innerText + '\n';
        //       }
        //       message += '\n';
        //     }

        //     // get the link if present and add it to the message with a description if available
        //     const link = tempDiv.getElementsByTagName('a')[0];
        //     if (link) {
        //       const linkText = link.innerText || link.href;
        //       const linkHref = link.href;
        //       message += linkText + ': ' + linkHref + '\n';
        //     }

        //     return message;
        // }


        grow.appendReflections = () => {
            if (reflections.length == 0) {
                $('[reflectionscontainer]').append(`<img src="https://res.cloudinary.com/duhtmh8hp/image/upload/v1679874805/12643942_5024147_qg2dii.jpg" class="mx-auto w-50" />`)
            }
            reflections.map((item, index) => {
                if (index == 0) {
                    $('[reflectionscontainer]').append(grow.Templates.startReflection(item));
                }
                if (index > 0 && index < 5) {

                    $('[reflectionscontainer]').append(grow.Templates.midReflectionLeft(item));

                }
                if (index == 5) {

                    $('[reflectionscontainer]').append(grow.Templates.endReflection(item));

                }
            })
        }

        // grow.carousel = () => {
        //     let data = ajaxify.data.publicReflections;
        //     let container = grow.Templates;
        //     data.map((item, index) => {
        //         $("[library]").append(container.reflection(item))
        //     })
        // }

        grow.getStreak = async () => {
            api.get('/toc/grow/streak', {})
                .then(res => {
                    console.log(res)
                    $("[streakcount]").append(res.currentStreak);
                    // console.log(res)
                    $("[streakupdatetime]").append(res.updatedAt);
                })
                .catch(error => {
                    console.log(error)
                })
        }

        grow.feed = async function (uid) {
            let RECORD_PER_PAGE = 4;
            let loading = true;
            let loadedItems = 0;
            let card = (card, index) => {
                // 	return `<div class="card" style="width: 18rem;">
                // 	<div class="card-body">

                // 	  <div class="d-flex justify-content-between">
                // 	 <h6 class="card-subtitle mb-2 text-muted">${card.category}</h6>
                // 	<h6 class="card-subtitle mb-2 text-muted">${moment(card.createdAt).format('dd MMM YY')}</h6>
                // 		</div>
                // 	  <p class="card-text">${card.content}</p>

                // 		<div class="d-flex justify-content-end text-muted">
                // 			  <h6>${card.reason}</h6>
                // 			</div>


                // 	</div>
                //   </div>`;
                return grow.Templates.publishedReflections(card);
            }; //  will change

            let $feedsContainer = $('.reflectionCarousel'); //  will change
            $feedsContainer.empty();
            $feedsContainer.addClass('owl-carousel')
            let load = async function (params = {}, url, cb) {

                params.uid = uid;
                if (url) {
                    let urlParams = new URLSearchParams(url.split('?')[1]);
                    params = {
                        params,
                        ...Object.fromEntries(urlParams)
                    };
                    url = url.split('?')[0];

                }

                params = {
                    ...params,
                    limit: RECORD_PER_PAGE
                };

                await api.get(url || `/toc/learning/publicreflections`, params) //url  will change
                    .then(res => {
                        let {
                            data
                        } = res;

                        if (data.length == 0) {
                            console.log('no data to show')
                            $('[nodatatoshow]').replaceWith(`<div class="owl-carousel owl-theme quote-carousel">
                        <div class="item">
                          <blockquote class="blockquote">
                            <p class="mb-0">We do not learn from experience... we learn from reflecting on experience.</p>
                            <footer class="blockquote-footer">John Dewey</footer>
                          </blockquote>
                        </div>
                        <div class="item">
                          <blockquote class="blockquote">
                            <p class="mb-0">Reflective practice is the ability to reflect on one's actions so as to engage in a process of continuous learning.</p>
                            <footer class="blockquote-footer">Donald Schön</footer>
                          </blockquote>
                        </div>
                        <div class="item">
                          <blockquote class="blockquote">
                            <p class="mb-0">Reflection is an important human activity in which people recapture their experience, think about it, mull it over and evaluate it. It is this working with experience that is important in learning.</p>
                            <footer class="blockquote-footer">David Boud</footer>
                          </blockquote>
                        </div>
                        <div class="item">
                          <blockquote class="blockquote">
                            <p class="mb-0">Reflection is a process of reviewing an experience of practice in order to describe, analyze, evaluate and so inform learning about practice.</p>
                            <footer class="blockquote-footer">Jan Fook</footer>
                          </blockquote>
                        </div>
                        <div class="item">
                          <blockquote class="blockquote">
                            <p class="mb-0">Reflection is a key component of self-regulation. It is through reflection that we learn to identify our strengths and areas for growth.</p>
                            <footer class="blockquote-footer">Carol Dweck</footer>
                          </blockquote>
                        </div>
                      </div>`)

                            $('.quote-carousel').owlCarousel({
                                loop: true,
                                autoplay: true,
                                autoplayTimeout: 5000,
                                autoplayHoverPause: true,
                                nav: false,
                                dots: true,
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    600: {
                                        items: 1
                                    },
                                    1000: {
                                        items: 1
                                    }
                                }
                            });
                        }

                        let showItem = loadedItems;
                        let html = data.map(card).join('');


                        if (loadedItems) {
                            $feedsContainer.trigger('destroy.owl.carousel');
                            $feedsContainer.find('.owl-stage-outer').children().unwrap();
                            $feedsContainer.removeClass("owl-center owl-loaded owl-text-select-on");
                        }

                        $feedsContainer.append(html);
                        $feedsContainer.attr('next_page_url', res.next_page_url);
                        loadedItems += data.length;
                        if (loadedItems) {
                            $('[feed-container]').toggleClass('d-none d-flex');
                            cb && cb(showItem - 1);
                        };

                    }).catch(err => {
                        console.log(err);
                    }).finally(() => {
                        loading = false;
                    })
            }

            let callback = function (showItem = 0) {
                console.log('callback', showItem);
                $feedsContainer.owlCarousel({
                    loop: !true,
                    center: true,
                    margin: 30,
                    nav: true,
                    autoplay: false,
                    autoHeight: true,
                    dots: false,
                    items: 1,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 1
                        },
                        1000: {
                            items: 2
                        }
                    },
                    navText: [
                        '<i class="fas fa-chevron-left"></i>',
                        '<i class="fas fa-chevron-right"></i>'
                    ],
                    startPosition: showItem < 0 ? 0 : showItem,
                });
                $('.owl-stage-outer').addClass('custom-height-carousel');

                $feedsContainer.on('changed.owl.carousel', function (e) {

                    let itemRemain = e.item.count - (e.item.index + 1);
                    let nextPageURL = $feedsContainer.attr('next_page_url');
                    console.log(itemRemain, loadedItems);
                    if (itemRemain === 0 && !loading && nextPageURL) {
                        console.log('load more');
                        loading = true;
                        load({}, nextPageURL, callback);
                    }
                })


            }

            load({}, null, callback);
        }



        grow.init = () => {
            journal.init()
            console.log('here in grow')
            grow.events();
            grow.appendReflections();
            grow.getStreak()
            grow.feed()
            api.get('/toc/learning/publicreflections', {})
                .then(res => console.log(res))
                .catch(err => console.log(err))
            // grow.carousel();
        };


        return grow;

    });