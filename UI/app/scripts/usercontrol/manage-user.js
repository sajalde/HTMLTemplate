var manageuser = {

	initializeControls: function () {

		return new Promise(function (resolve, reject) {

			resolve(
				common.GetUserRoles().then(response => {
					if (typeof response != typeof undefined) {
						manageuser.FillComboUserRole(response.data)
					}
				}),
				manageuser.FillComboTitle()

			)

		})
	},


	FillComboUserRole: function (data) {

		$('#ddlUserRole').empty();
		$('#ddlUserRole').prepend('<option value="0" selected> Select Role </option>')
		$('#ddlUserRole').select2({
			multiple: false,
			data: data,
			closeOnSelect: true,
			theme: 'bootstrap4'
		})
        /*.on('select2:select', meter_reading._onmeterNameChange)
            .on('select2:unselect', meter_reading._onmeterNameChange);*/

	},
	FillComboTitle: function () {

		//$('#ddlTitle').empty();
		$('#ddlTitle').select2({
			multiple: false,
			closeOnSelect: true,
			theme: 'bootstrap4'
		})


	},


	ListUsers: function () {

		apiCall.ajaxCall(null, 'GET', 'UserControl/ListUser')
			.done(function (response) {
				manageuser.onSuccess_ListUsers(response)
			})

	},
	onSuccess_ListUsers: function (response) {

		var dtUselist = $('#dtUselist').DataTable({
			bServerSide: false,
			bDestroy: true,
			paging: true,
			autoWidth: false,
			bStateSave: false,
			searching: false,
			lengthChange: false,
			data: response.data,
			language: {
				paginate: {
					previous: "<",
					next: ">"
				},
				info: "Showing _START_ - _END_ of _TOTAL_ users",
			},
			aoColumns: [

				{
					mData: "Name", sTitle: "Name", sClass: "head1", bSortable: true,
				},
				{
					mData: "Role", sTitle: "Role", sClass: "head1", bSortable: true,
				},
				{
					mData: null, defaultContent: "", sTitle: "Edit", sClass: "head1", bSortable: true,
					mRender: function (data, type, full) {
						var markup = '<a href="javascript:void(0)" onclick="manageuser.GetUserByID(' + full.UserID + ')">Edit</a>'
						return markup;
					}
				},

			],

			bUseRendered: true,
			sPaginationType: "simple_numbers",
			aaSorting: [],

            /*fnDrawCallback: function (oSettings) {
                var info = this.api().page.info();
                if (info.recordsTotal > 0) {
                    var tmptable = $('#dtSMREmployeeList').DataTable();
                    tmptable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmptable, {
                        buttons: [
                            {
                                text: 'Export',
                                extend: 'excel',
                                className: 'btn select-smr-btn-light-blue',
                                title: "SMR_Employee",
                                extension: '.xls',
                                exportOptions: {
                                    stripHtml: false,
                                    format: {
                                        body: function (data, column, row) {
                                            
                                            return (column === 18 && column === 19 && column === 14) ? data.replace(/\n/g, '"&CHAR(10)&"') : data.replace(/(&nbsp;|<([^>]+)>)/ig, "");;
                                        }
                                    },
                                    columns: [2, 5, 13, 14, 15,16,17, 18,6,11]
                                    
                                },
                                customize: function (xlsx) {
                                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
                                    var col = $('col', sheet);
                                    $('row c', sheet).attr('s', '55');
                                    $(col[3]).attr('width', 40);
                                }
                            },
                        ]
                    });
                    tmptable.buttons(0, null).container().appendTo('#export-area');
                }
                else if (info.recordsTotal <= 0) {
                    var tmptable = $('#dtSMREmployeeList').DataTable();
                    tmptable.buttons().destroy();
                }
               
            }*/
		});

	},
	OpenAddModal: function (OpenCallBack) {
		CreateModal('modAddUser', 'pages/usercontrol/manage-user-add.html', function () {
			resetControls("formAddUser")
			manageuser.initializeControls().then(() => {
				if (typeof OpenCallBack != typeof undefined) {

					OpenCallBack()
					OpenCallBack = undefined
				}
			})
		})



	},
	CloseAddModal: function () {
		$("#modAddUser").modal('hide')
		onModalHidden('modAddUser', function () {
			resetControls("formAddUser")
		})
	},
	AddUpdateUser: function () {


		if ($("#hdnUserID").val() <= 0) {
			if (fieldValidation('formAddUser') == true) {
				apiCall.ajaxCall('formAddUser', 'POST', 'UserControl/AddUser')
					.done(function (response) {

						if (response.success == 1) {
							resetControls("formAddUser")
							manageuser.reloadDatatable();
							showToastSuccessMessage(response.message)
						}
						else {
							showToastErrorMessage(response.message)
						}
					})
			}
		}
		else if ($("#hdnUserID").val() > 0) {

			$('#txtPassword').prop('required', false)	
			if (fieldValidation('formAddUser') == true) {
				apiCall.ajaxCall('formAddUser', 'POST', 'UserControl/UpdateUser')
					.done(function (response) {
						if (response.success == 1) {
							resetControls("formAddUser")
							manageuser.reloadDatatable();
							showToastSuccessMessage(response.message)
							$('#txtPassword').prop('required', true)
						}
					})
			}
		}


	},

	GetUserByID: function (UserID) {

		var obj = { UserID: UserID }
		manageuser.OpenAddModal(function () {
			apiCall.ajaxCallWithReturnData(obj, "GET", 'UserControl/GetUserByID')
				.done(function (response) {

					apiCall.bindModel('formAddUser', response.data)
				})
		})
	},
	reloadDatatable: function () {
		clearDatatable("dtUselist")
		this.ListUsers();
	},

	removeWhiteSpace: function () {
		let value = event.target.value
		$(event.target).val(value.replace(/\s/g, ''))
	}


}


