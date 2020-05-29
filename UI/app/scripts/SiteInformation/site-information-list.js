var siteinformationlist = {

    ListofSites: function (ReInitializeCache) {
        var queryparams = {
            SiteName: $('#txtSitename').val(),
            SiteAvailability: $('#ddlSiteAvailability').val().join(),
            MediaType: $('#ddlMediaType').val().join(),
            DistrictName: $('#ddlDistrictName').val().join(),
            LightingType: $('#ddlLightingType').val().join(),
            PaymentStatus: $('#ddlPaymentStatus').val().join(),
            InvoiceStatus: $('#ddlInvoiceStatus').val().join(),
            PhotoStatus: $('#ddlPhotoStatus').val().join(),
            RentperSqrft: $('#ddlRentperSqrft').val().join(),
            LightStatus: $('#ddlLightStatus').val().join(),
            ManageBy: $('#ddlManageBy').val().join(),
            ContractStatus: $('#ddlContractStatus').val().join(),
        }
        if (typeof ReInitializeCache !== typeof undefined) {
            queryparams["ReInitializeCache"] = true
        }

        apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'BussinessEntry/ListSite').then(response => {
            if (typeof response != typeof undefined) {
                clearDatatable('dtListofSites')
                siteinformationlist.onSuccess_ListofSites(response.data)
            }
        })
    },
    onSuccess_ListofSites: function (data) {
        var dtListofSites = $('#dtListofSites').DataTable({
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
                    mData: "SiteID", sTitle: "ID", sClass: "head1", bSortable: true, bVisible: false,
                },
                {
                    mData: "PhotoLink", defaultContent: "", sTitle: "Photo", sClass: "head1", bSortable: false,
                    mRender: function (data, type, full) {
                        let id = GetQueryStringParams(data, 'id')

                        var markup = '<a href="https://drive.google.com/thumbnail?id=' + id + '" data-toggle="lightbox" data-title="' + full.SiteName + '">'
                        markup += '     <img src="https://drive.google.com/uc?id=' + id + '&e=view" alt="' + full.SiteName + '" class="img-fluid">'
                        markup += '   </a>'

                        //var markup = '<a href="javascript:void(0)" onclick="siteinformationlist.OpenGoogleDriveImage(' + data + ')">Photo</a>'
                        return markup;
                    }
                },

                {
                    mData: "SiteName", sTitle: "Site Name", sClass: "head1", bSortable: true,
                    mRender: function (data, type, full) {
                        var markup = '<a href="javascript:void(0)" onclick="siteinformationlist.OpenEntryTab(' + full.SiteID + ')">' + data + '</a>'
                        return markup;
                    }
                },
                {
                    mData: "SiteAvailability", sTitle: "Availability", sClass: "head1", bSortable: true,
                },

                {
                    mData: "MediaType", sTitle: "Media", sClass: "head1", bSortable: true,
                },
                {
                    mData: "DistrictName", sTitle: "District", sClass: "head1", bSortable: true,
                },
                {
                    mData: "LightingType", sTitle: "Lighting", sClass: "head1", bSortable: true,
                },
                {
                    mData: "NoofStructures", sTitle: "Structures", sClass: "head1", bSortable: true,
                },
                {
                    mData: "TotalAreaInSQFT", sTitle: "Area(m2)", sClass: "head1", bSortable: true,
                },
                {
                    mData: null, sTitle: "Dimensions", sClass: "text-center head1", bSortable: true, bVisible: true,
                    mRender: function (data, type, full) {
                        return full.Dimensions1 + ',' + full.Dimensions2 + ',' + full.Dimensions3 + ',' + full.Dimensions4
                    }
                },
                {
                    mData: "ClientName", sTitle: "Client Name", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ContractStatus", sTitle: "Contract Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PaymentStatus", sTitle: "Payment Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "InvoiceStatus", sTitle: "Invoice Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PhotoStatus", sTitle: "Photo Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "RentPerSqrt", sTitle: "Rent/m2", sClass: "head1", bSortable: true,
                },
                {
                    mData: "RentPermonth", sTitle: "Monthly Rent", sClass: "head1", bSortable: true,
                },
                {
                    mData: "LightStatus", sTitle: "Light Status", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ManageBy", sTitle: "Manage By", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PreviousClient", sTitle: "PreviousClient", sClass: "head1", bSortable: true,
                },
            ],

            bUseRendered: true,
            sPaginationType: "simple_numbers",
            aaSorting: [],
            "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
            "lengthChange": false,
            "lengthMenu": [[20, 30, 300, -1], [20, 30, 300, "All"]],
            fnDrawCallback: function (oSettings) {
                var info = this.api().page.info();
                if (info.recordsTotal > 0) {
                    var tmptable = $('#dtListofSites').DataTable();
                    tmptable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmptable, {
                        buttons: [
                            {
                                text: 'Export Site Information',
                                extend: 'excel',
                                className: 'btn btn-info float-right fas fa-file-excel',
                                title: "Site Information",
                                extension: '.xls',
                                /*exportOptions: {
                                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                                },*/
                            },
                        ]
                    });
                    tmptable.buttons(0, null).container().appendTo('#export-area');
                }
                else if (info.recordsTotal <= 0) {
                    var tmptable = $('#dtListofSites').DataTable();
                    tmptable.buttons().destroy();
                }
            },
            createdRow: function (row, data, dataIndex) {
                if (data.PaymentStatus === "OK" && data.PhotoStatus === "OK" && data.LightStatus === "OK") {

                    $(row).css({'background-color': '#64c98e'})
                }
                else{
                    $(row).css({'background-color': '#e09494'})
                }

            },

        })

    },

    OpenEntryTab: function (SiteID) {

        if ($('ul#myTab > li').length >= 2) {
            bootbox.alert('Close and reopen tab.')
            return false;
        }

        var liMarkup = `<li class="nav-item active" id="liaddsiteInfo">
                    <a class="nav-link active" id="addsiteInfo-tab" data-toggle="tab" href="#addsiteInfo" role="tab" aria-controls="add"
                    aria-selected="false">Add/Edit Site Information
                    <button class="close"  type="button" title="Remove this page">&nbsp;&nbsp;<i class="fa fa-times" aria-hidden="true"></i></button>
                    </a>
                    </li>`
        $('#myTab').append(liMarkup)
        $('#home-tab').removeClass('active')

        $.get("pages/SiteInfo/SiteInfo_add.html?siteid="+SiteID+"", function (data, status) {
            $('#myTabContent').append(data)
            $('#home').removeClass('active').removeClass('show')
            createDatePicker()
            siteinformationadd.globEditedSiteID=SiteID;
            

        })

        $('#myTab').on('click', '.close', function () {
            var tabID = $(this).parents('a').attr('href');
            $(this).parents('li').remove();
            $(tabID).remove();
            $('#divInvoiceDetails').remove()
            $('.tab-content #home').addClass('active')
            $('.nav-tabs a:first').tab('show');
        });
    },

}