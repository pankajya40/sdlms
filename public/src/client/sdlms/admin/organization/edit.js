'use strict';

define('forum/sdlms/admin/organization/edit', ['api'], function (api) {
    var editOrganization = {};

    const STATES_API_ENDPOINT = 'https://countriesnow.space/api/v0.1/countries/states/q?country=';
    const VERIFY_URL = new RegExp('[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?');

    editOrganization.init = function () {
        
        let { organizationId, location, organization, leaders } = ajaxify.data;

        $('#organization-basic-details').find('#inputOrganizationType4')
            .find(`[value="${organization.organizationType}"]`).attr('selected', true);

        if (location.country) {
            $('#organization-address').find('#inputCountry').find(`[value="${location.country}"]`).attr('selected', true);
            editOrganization.renderStates(location);
        }

        if (organization.socialLinks.length) {
            $.each($('#organization-social-links').find('.form-group'), function (index, element) {
                element = $(element).find('input');
                let channel = element.data('channel');
                let social = organization.socialLinks.find((elem) => elem.channel == channel);
                if (social) {
                    element.val(social.url);
                }
            })
        }
        // if (leaders.length) {
        //     $.each(leaders, function (index, element) {
        //         $('#organization-leaders').append(editOrganization.leaderFormTemplate(element));
        //     });
        // } else {
        //     $('#organization-leaders').append(editOrganization.leaderFormTemplate());
        // }

        $('#inputCountry').on('change', function () {
            editOrganization.renderStates({country: $(this).val()});
        });

        $('[name="files[organization_profile]"]').on('change', function () {
            const imgUrl = URL.createObjectURL(this.files[0])
            $("#organization-profile-img").attr("src", imgUrl);
        });

        $('[name="files[organization_cover]"]').on('change', function () {
            const imgUrl = URL.createObjectURL(this.files[0])
            $("#organization-cover-img").css({
                'background': `url(${imgUrl})`
            });
        });

        $('#view-organization-profile').on('click', function () {
            ajaxify.go('/organization/' + $(this).data('id'));
        });

        $('#save-organization-details').on('click', function () {
            if ($('#inputWebsite4').val()) {
                if (!VERIFY_URL.test($('#inputWebsite4').val())) {
                    return notify('Invalid website URL, please enter a valid one', 'error');
                }
            }

            notify('Please wait...', 'info');

            let organization = new FormData($('#organization-basic-details')[0]);
            let location = editOrganization.serializeFormToObject('#organization-address');
            let phoneNumber = editOrganization.serializeFormToObject('#organization-phone');
            let email = editOrganization.serializeFormToObject('#organization-emails');

            let leaders = [];
            let socialLinks = [];
            let profileImage = document.getElementById('inputProfileImage').files[0];
            let coverImage = document.getElementById('inputCoverImage').files[0];
            let leaderImage = document.getElementById('inputLeaderImage').files[0];

            let invalidSocialLinks = [];
				
            $.each($('#organization-social-links').find('input'), function (index, element) {
                element = $(element);
                let url = element.val();
                let channel = element.data('channel')

                if (url) {
                    if (!VERIFY_URL.test(url)) {
                        invalidSocialLinks.push(channel);
                    } else {
                        socialLinks.push({
                            url,
                            channel,
                        })
                    }
                }
            })

            if (invalidSocialLinks.length) {
                return notify('Invalid URL(s) for ' + invalidSocialLinks.join(', ') + ', please provide valid URL(s)', 'error');
            }

            $.each($('#organization-leaders').find('form'), function (index, element) {
                leaders.push({...editOrganization.serializeFormToObject(element), id: $(element).data('id')});
            });

            if (profileImage) {
                organization.append('files[image_profile]', profileImage);
            }
            if (coverImage) {
                organization.append('files[image_cover]', coverImage);
            }
            if (leaderImage) {
                organization.append(`files[leaders_image_${$('#inputLeaderImage').data('id')}]`, leaderImage);
            }

            organization.append('location', JSON.stringify([location]));
            organization.append('email', JSON.stringify([email]));
            organization.append('phoneNumber', JSON.stringify([phoneNumber]));
            organization.append('socialLinks', JSON.stringify(socialLinks));
            organization.append('leaders', JSON.stringify(leaders));

            doAjax({
                type: 'PUT',
                url: '/sdlms/admin/organization/' + organizationId,
                data: organization,
                cache: false,
				contentType: false,
				processData: false,
            }).then((resp) => {
                notify('Updated successfully!', 'success');
            }).catch((err) => { 
                let { responseJSON } = err;
                notify(responseJSON.status.message, 'error');
               
            });

        });

        $('#search-users').on('keyup', function () {
            let query = $(this).val();
            if (query.length < 3) return;

            api.get('/api/users', {
                query,
                paginate: false,
            }, function (err, result) {
                if (err) {
                    return app.alertError(err.message);
                }
                $('#users-area').empty();
                
                result.users.forEach(function (user) {
                    $('#users-area').append(editOrganization.userComponent(user));
                });
                
            });
        });

        $('body').on('click', '.list-group-item', function () {
            let selected = JSON.parse($(this).attr('data-selected') || false);
            $(this).attr('data-selected', !selected);
            $(this).find('i').toggleClass('invisible');
        });

        $('#save-members').on('click', function () {
            let users = [];
            $.each($('[data-selected="true"]'), function (index, elem) {
                users.push({ uid: $(elem).data('uid'), role: ''});
            });

            if (!users.length) return;

            $('#save-members').text('Saving...').attr('disabled', true);

            api.put(`/sdlms/admin/organization/${organizationId}/memberships`, {users, action: 'add'}, function (err, result) {
                if (err) {
                    return notify(err.message, 'error');
                }
                $('#save-members').text('Save').attr('disabled', false);
                $('.close-modal').click().trigger('click');
                notify('Members added to organization', 'success');
            });
        });

        $('body').on('click', '#organization-members', function () {
        	doAjax({
        		type: 'GET',
        		url: '/sdlms/admin/organization/members/' + organizationId,
        	}).then((res) => {
                $('#memberlist-area').empty();
        		$.each(res.response.data, function (index, element) {
        			$('#memberlist-area').append(editOrganization.memberListTemplate(element));
        		});
        	}).catch((err) => {
        		return err;
        	});

        });

        $('body').on('click', '#view-dashboard', function () {
            $('.close-modal').click().trigger('click');
            ajaxify.go('/company/dashboard/' + $(this).data('uid'));
        })

    }

   


    editOrganization.serializeFormToObject = function (target) {
        if (!target) return {};
        let payload = {};

        $(target).serializeArray().reduce(function (obj, item) {
            return payload[item.name] = item.value;
        }, {});

        return payload;
    }

    editOrganization.renderStates = function (data) {
        let { country, state } = data;
        $.ajax({
            type: 'GET',
            url: STATES_API_ENDPOINT + country,
            data: {},
        }).then((resp) => {
            let { data } = resp;
            if (data) {
                let html = '<option value="" selected>Select...</option>';
                $.each(data.states, function (index, element) {
                    html += `<option value="${element.name}" >${element.name}</option>`;
                });
                $('#organization-address').find('#inputState').empty().append(html);
                if (state) {
                    $('#organization-address').find('#inputState').find(`[value="${state}"]`).attr('selected', true);
                }
            }
        }).catch((err) => { 
            let { responseJSON } = err;
            notify(responseJSON.msg, 'error');
            $('#organization-address').find('#inputState').empty().append('<option value="" selected>Select...</option>');
        })
    }

    editOrganization.userComponent = function (user) {
        return `
            <a href="#" class="list-group-item" data-username="${user.username}" data-uid="${user.uid}">
                <i class="fa fa-fw fa-check mr-2 invisible"></i>${user.username}
            </a>
        `;
    }

    editOrganization.leaderFormTemplate = function (data={}) {
        return `
            <form class="border border-1 p-3" data-id="${data.id || ''}">
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputFullName">Full Name</label>
                        <input type="text" name="fullname" value="${data.fullname || ''}" class="form-control" id="inputFullName">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputPhoneNumber">Contact number</label>
                        <input type="text" name="contact" value="${data.contact || ''}" class="form-control" id="inputPhoneNumber">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputLeaderImage">Profile image</label>
                        <input type="file" class="form-control" data-id="${data.id || ''}" name="files[leaders_image]" id="inputLeaderImage" placeholder="Profile image">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail">Email</label>
                        <input type="email" name="email" value="${data.email || ''}" class="form-control" id="inputEmail">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputPosition">Position</label>
                        <input type="text" name="position" value="${data.position || ''}" class="form-control" id="inputPosition">
                    </div>
                    <div class="form-group col-md-2">
                        <label for="inputOrder">Order</label>
                        <select id="inputOrder" name="sortOrder" class="form-control">
                            <option value="" selected>Select...</option>
                            <option>1</option>
                        </select>
                    </div>
                </div>
            </form>
        `;
    }

    editOrganization.memberListTemplate = (data) => {
        return `
        <ul class="list-group mt-1">
            <li class="list-group-item">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-2"><img src="${data.picture}" width="30px" height="30px" class="rounded-circle" alt="profile-pic"></div>
                    <div class="member_name col-7 sdlms-text-black-16px">${data.username}</div>
                    <div data-uid="${data.uid}" class="col-3 cursor-pointer sdlms-sub-text-primary-16px d-flex justify-content-sm-around" id="view-dashboard" width="16px" height="16px">View More <span><i class="fa-solid fa fa-chevron-right"></i></span>
                </div>
            </li>
        </ul>
        `;
    }

    return editOrganization;
});