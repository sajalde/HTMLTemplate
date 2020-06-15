var ProductionPlanforecasting = {

    Initialize: function () {
        common.FillMonthList('ddlMonth');
        common.FillYearList('ddlYear');

        apiCall.ajaxCallWithReturnData(undefined, 'GET', 'SalesForecast/ForcastingDetailsSearchFields').then(response => {
           if (typeof response != typeof undefined) {
               ProductionPlanforecasting.FillcomboProduct(response.data.products)
            }
        })
    },

    FillcomboProduct:function(data){       
            $('#ddlProductName').empty();
            $('#ddlProductName').select2({
                multiple: true,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',
                placeholder: {
                    id: '', // the value of the option
                    text: 'Select Product'
                },
            });
    }, 

    ListProductionPlan_VolumeConversion: function () {       
        var queryparams = {
            Month: $('#ddlMonth').val(),
            Year: $('#ddlYear').val(),
            Product:$('#ddlProductName').val().join(),
        }
        clearDatatable('dtList_VolumeConversion')
        apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'ProductionPlan/List_ProductionPlan_VolumeConversion').then(response => {
           
            if (typeof response != typeof undefined) {
                clearDatatable('dtList_VolumeConversion')
                ProductionPlanforecasting.onSuccess_ListVolumeConversion(response.data)
            }
        })
    },
    onSuccess_ListVolumeConversion: function (data) {       
        var dtList_VolumeConversion = $('#dtList_VolumeConversion').DataTable({
            bServerSide: false,
            bDestroy: true,
            paging: true,
            autoWidth: false,
            bStateSave: false,
            searching: true,
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
                    mData: "ForMonth", sTitle: "Mointh", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProductType", sTitle: "Product Type", sClass: "head1", bSortable: true,
                },
                {
                    mData: "Category", sTitle: "Category", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProductName", sTitle: "Product Name", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PackUnit", sTitle: "Pack Unit", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProjectionForecastQTY", sTitle: "Forecast QTY", sClass: "head1", bSortable: true,
                },
                {
                    mData: "Factor", sTitle: "Factor", sClass: "head1", bSortable: true,
                },
                {
                    mData: "FactorProjectionForecastQTY", sTitle: "Factor Projection QTY", sClass: "head1", bSortable: true,
                },
                {
                    mData: "VolumeInLtrs", sTitle: "Volume (In Ltrs)", sClass: "head1", bSortable: true,
                }
            ],

            bUseRendered: true,
            sPaginationType: "simple_numbers",
            aaSorting: [],
            "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
            "lengthChange": true,
            "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],           
            fnDrawCallback: function (oSettings) {
                var info = this.api().page.info();
                if (info.recordsTotal > 0) {
                    var tmptable = $('#dtList_VolumeConversion').DataTable();
                    tmptable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmptable, {
                        buttons: [
                            {
                                text: 'Production Planning',
                                extend: 'excel',
                                className: 'btn btn-info float-right fas fa-file-excel',
                                title: "Production Planning",
                                extension: '.xls',
                            },
                        ]
                    });
                    tmptable.buttons(0, null).container().appendTo('#export-area');
                }
                else if (info.recordsTotal <= 0) {
                    var tmptable = $('#dtList_VolumeConversion').DataTable();
                    tmptable.buttons().destroy();
                }
            },
        });
    },
    

    ListProductionPlan_VolumeCharge: function () {       
        var queryparams = {
            Month: $('#ddlMonth').val(),
            Year: $('#ddlYear').val(),
            Product:$('#ddlProductName').val().join(),
        }

        apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'ProductionPlan/List_ProductionPlan_VolumeCharge').then(response => {
           
            if (typeof response != typeof undefined) {
                clearDatatable('dtList_VolumeCharge')
                ProductionPlanforecasting.onSuccess_ListVolumeCharge(response.data)
            }
        })
    },
    onSuccess_ListVolumeCharge: function (data) {       
        var dtList_VolumeCharge = $('#dtList_VolumeCharge').DataTable({
            bServerSide: false,
            bDestroy: true,
            paging: true,
            autoWidth: false,
            bStateSave: false,
            searching: true,
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
                    mData: "ForMonth", sTitle: "Mointh", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProductName", sTitle: "Product Name", sClass: "head1", bSortable: true,
                },

                {
                    mData: "VolumeInLtrs", sTitle: "Volume(In Ltrs)", sClass: "head1", bSortable: true,
                },
                {
                    mData: "WIPInLtrs", sTitle: "WIP (In Ltrs)", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ChargeableVolumeInLtrs", sTitle: "Chargeable Volume (In Ltrs)", sClass: "head1", bSortable: true,
                },
                {
                    mData: "BatchSize", sTitle: "Batch Size", sClass: "head1", bSortable: true,
                },
                {
                    mData: "FinalChargeInLtrs", sTitle: "Final Charge (In Ltrs)", sClass: "head1", bSortable: true,
                }
            ],

            bUseRendered: true,
            sPaginationType: "simple_numbers",
            aaSorting: [],
            "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
            "lengthChange": true,
            "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],           
            fnDrawCallback: function (oSettings) {
                var info = this.api().page.info();
                if (info.recordsTotal > 0) {
                    var tmptable = $('#dtList_VolumeCharge').DataTable();
                    tmptable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmptable, {
                        buttons: [
                            {
                                text: 'Production Planning',
                                extend: 'excel',
                                className: 'btn btn-info float-right fas fa-file-excel',
                                title: "Production Planning",
                                extension: '.xls',
                            },
                        ]
                    });
                    tmptable.buttons(0, null).container().appendTo('#export-area');
                }
                else if (info.recordsTotal <= 0) {
                    var tmptable = $('#dtList_VolumeCharge').DataTable();
                    tmptable.buttons().destroy();
                }
            },
        });
    },


    ListProductionPlan_FinalChargeUnit: function () {       
        var queryparams = {
            Month: $('#ddlMonth').val(),
            Year: $('#ddlYear').val(),
            Product:$('#ddlProductName').val().join(),
        }

        apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'ProductionPlan/List_ProductionPlan_FinalChargeUnit').then(response => {
           
            if (typeof response != typeof undefined) {
                clearDatatable('dtList_FinalChargeUnit')
                ProductionPlanforecasting.onSuccess_ListFinalChargeUnit(response.data)
            }
        })
    },
    onSuccess_ListFinalChargeUnit: function (data) {       
        var dtList_FinalChargeUnit = $('#dtList_FinalChargeUnit').DataTable({
            bServerSide: false,
            bDestroy: true,
            paging: true,
            autoWidth: false,
            bStateSave: false,
            searching: true,
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
                    mData: "ForMonth", sTitle: "Mointh", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProductType", sTitle: "Product Type", sClass: "head1", bSortable: true,
                },
                {
                    mData: "Category", sTitle: "Category", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProductName", sTitle: "Product Name", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PackUnit", sTitle: "Pack Unit", sClass: "head1", bSortable: true,
                },
                {
                    mData: "FactorProjectionForecastQTY", sTitle: "Factor Projection QTY", sClass: "head1", bSortable: true,
                },
                {
                    mData: "FinalChargeInUnit", sTitle: "Final Charge In Unit", sClass: "head1", bSortable: true,
                }
            ],

            bUseRendered: true,
            sPaginationType: "simple_numbers",
            aaSorting: [],
            "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
            "lengthChange": true,
            "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],           
            fnDrawCallback: function (oSettings) {
                var info = this.api().page.info();
                if (info.recordsTotal > 0) {
                    var tmptable = $('#dtList_FinalChargeUnit').DataTable();
                    tmptable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmptable, {
                        buttons: [
                            {
                                text: 'Production Planning',
                                extend: 'excel',
                                className: 'btn btn-info float-right fas fa-file-excel',
                                title: "Production Planning",
                                extension: '.xls',
                            },
                        ]
                    });
                    tmptable.buttons(0, null).container().appendTo('#export-area');
                }
                else if (info.recordsTotal <= 0) {
                    var tmptable = $('#dtList_FinalChargeUnit').DataTable();
                    tmptable.buttons().destroy();
                }
            },
        });
    },
}