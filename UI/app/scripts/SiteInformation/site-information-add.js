var siteinformationadd={
    globEditedSiteID:0,
    AddUpdateSiteInfo: function () {
        if (fieldValidation('formSiteInfo') == true) {
            if ($("#hdnPK_SiteID").val() <= 0) {

                apiCall.ajaxCall('formSiteInfo', 'POST', 'BussinessEntry/AddNewSite').then((res) => {
                    if (res.success == 1) {
                        resetControls('formSiteInfo')
                        bootbox.alert("Data saved successfully .");
                    }
                })
            }
            if ($("#hdnPK_SiteID").val() > 0) {

                apiCall.ajaxCall('formSiteInfo', 'POST', 'BussinessEntry/UpdateSite').then((res) => {
                    if (res.success == 1) {
                        resetControls('formSiteInfo')
                        bootbox.alert("Data updated successfully .");
                    }
                })
            }
        }
    },

    ListofBooking: function (ReInitializeCache) {
        var bookingqueryparams = {
            SiteID:$('#hdnPK_SiteID').val(),
        }
        if (typeof ReInitializeCache !== typeof undefined) {
            bookingqueryparams["ReInitializeCache"] = true
        }

        apiCall.ajaxCallWithReturnData(bookingqueryparams, 'GET', 'BussinessEntry/ListSiteBooking').then(response => {
            if (typeof response != typeof undefined) {
                clearDatatable('dtListofBooking')
                siteinformationadd.onSuccess_ListofBooking(response.data)
            }
        })
    },
    onSuccess_ListofBooking: function (data) {
        var dtListofBooking = $('#dtListofBooking').DataTable({
            bServerSide: false,
            bDestroy: true,
            paging: true,
            autoWidth: false,
            bStateSave: false,
            searching: false,
            data: data,

            language: {
                paginate: {
                    previous: "<",
                    next: ">"
                },
                info: "Showing _START_ - _END_ of _TOTAL_ readings",
            },
            aoColumns: [
                {
                    mData: "BookingID", sTitle: "ID", sClass: "head1", bSortable: true,  bVisible: false,
                },
                {
                    mData: "ClientName", sTitle: "Client", sClass: "head1", bSortable: true,
                },            
                {
                    mData: "ContractStartDate", sTitle: "Start Date", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ContractEndDate", sTitle: "End Date", sClass: "head1", bSortable: true,
                },            
                {
                    mData: null, sTitle: "Rent", sClass: "text-center head1", bSortable: true, bVisible: true,
                    mRender: function (data, type, full) {
                        return  full.TotalMontlyRent  + '[' + full.RentPerSQFT +']'
                    }
                },  
                {
                    mData: "ContractStatus", sTitle: "Contract Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PhotoStatus", sTitle: "Photo Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "InvoiceStatus", sTitle: "Invoice Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PaymentStatus", sTitle: "Payment Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ManageBy", sTitle: "ManageBy", sClass: "head1", bSortable: true,
                }              
            ],

            bUseRendered: true,
            sPaginationType: "simple_numbers",
            aaSorting: [],
            "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
            "lengthChange": false,
            "lengthMenu": [[20, 30, 300, -1], [20, 30, 300, "All"]],
            fnDrawCallback: function (oSettings) {
                var infobooking = this.api().page.info();
                if (infobooking.recordsTotal > 0) {
                    var tmpbookingtable = $('#dtListofBooking').DataTable();
                    tmpbookingtable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmpbookingtable, {
                        buttons: [
                            {
                                text: 'Export Booking Information',
                                extend: 'excel',
                                className: 'btn btn-info float-right fas fa-file-excel',
                                title: "Site Booking",
                                extension: '.xls',
                                /*exportOptions: {
                                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                                },*/
                            },
                        ]
                    });
                    tmpbookingtable.buttons(0, null).container().appendTo('#export-area');
                }
                else if (infobooking.recordsTotal <= 0) {
                    var tmpbookingtable = $('#dtListofBooking').DataTable();
                    tmpbookingtable.buttons().destroy();
                }
            },

        });
    }
}