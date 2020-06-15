var salesforecastingComparison = {


    Initialize: function () {

        common.FillMonthList('ddlMonth');
        common.FillYearList('ddlYear');

        apiCall.ajaxCallWithReturnData(undefined, 'GET', 'SalesForecast/ForcastingComparison_SearchFields').then(response => {


            if (typeof response != typeof undefined) {
                salesforecastingComparison.FillcomboProduct(response.data.products)
                salesforecastingComparison.FillcomboDivision(response.data.divisions)
                salesforecastingComparison.FillcomboStockLocation(response.data.stocklocations)
            }
        })

    },

    FillcomboProduct: function (data) {

        $('#ddlProductName').empty();
        //$('#ddlProductName').prepend('<option value="" selected> Select Product </option>')
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

    FillcomboDivision: function (data) {

        $('#ddlDivision').empty();
        // $('#ddlDivision').prepend('<option value="0" selected> Select Division </option>')
        $('#ddlDivision').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select Division'
            },
        });

    },

    FillcomboStockLocation: function (data) {

        $('#ddlStockLocation').empty();
        // $('#ddlStockLocation').prepend('<option value="" selected> Select Location </option>')
        $('#ddlStockLocation').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select Location'
            },
        });

    },

    ListSalesForecastingComparison: function (ReInitializeCache) {


        var queryparams = {
            Month: $('#ddlMonth').val(),
            Year: $('#ddlYear').val(),
            Product: $('#ddlProductName').val().join(),
            Division: $('#ddlDivision').val().join(),
            Location: $('#ddlStockLocation').val().join()
        }
        if(typeof ReInitializeCache!==typeof undefined ){
            queryparams["ReInitializeCache"]=true
        }


        apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'SalesForecast/SalesForecastingComparison').then(response => {

            if (typeof response != typeof undefined) {
                clearDatatable('dtListSalesForecastingComparison')
                salesforecastingComparison.onSuccess_ListSalesForecastingComparison(response.data)
            }
        })
    },
    onSuccess_ListSalesForecastingComparison: function (data) {
        var dtListSalesForecastingComparison = $('#dtListSalesForecastingComparison').DataTable({
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
                    mData: "HQ", sTitle: "HQ", sClass: "head1", bSortable: true,
                },
                {
                    mData: "DepotName", sTitle: "Depot", sClass: "head1", bSortable: true,
                },
                {
                    mData: "DivisionName", sTitle: "Division", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProductCode", sTitle: "Product Code", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProductName", sTitle: "Product Name", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PackUnit", sTitle: "Pack Unit", sClass: "head1", bSortable: true,
                },
                {
                    mData: "Logistics_ProjectionSalesQTY", sTitle: "Logistics", sClass: "head1", bSortable: true,
                },
                {
                    mData: "Marketing_ProjectedSaleQTY", sTitle: "Marketing", sClass: "head1", bSortable: true,
                },
                {
                    mData: "DifferencePersentage", sTitle: "Difference(%)", sClass: "head1", bSortable: true,
                    mRender:function(data){
                        return data+"%"
                    }
                },
                {
                    mData: "NextMonth_ForecastingQTY", sTitle: "Forecasting", sClass: "head1", bSortable: true,
                },
                {
                    mData: "NextMonth_FinialForecastingQTY", sTitle: "Final Forecasting", sClass: "head1", bSortable: true,
                },
                {
                    mData: "IsAutoCalculate", defaultContent: '', sTitle: "", sClass: "head1", bSortable: false,
                    mRender: function (data, type, row, meta) {
                        if (data == false) {

                            var markup = '<a  href="javascript:void(0)" onclick="salesforecastingComparison.onRowEditClick(this)">'
                            markup += '      <i class="fas fa-edit" aria-hidden="true"></i>'
                            markup += '   </a>'
                            markup += '<a  href="javascript:void(0)" onclick="salesforecastingComparison.onRowSaveClick(this,' + row.SaleComparisonID + ')" style="display:none">'
                            markup += '      <i class="fas fa-save" aria-hidden="true"></i>'
                            markup += '   </a>'
                            markup += '<a  href="javascript:void(0)" onclick="salesforecastingComparison.onRowUndoClick(this)" style="display:none">'
                            markup += '      <i class="fas fa-undo-alt" aria-hidden="true"></i>'
                            markup += '   </a>'

                            return markup;

                        }
                    }
                },
                {
                    mData: "SaleComparisonID", sTitle: "ID", sClass: "head1", bSortable: true,
                },
            ],

            bUseRendered: true,
            sPaginationType: "simple_numbers",
            aaSorting: [],
            "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
            "lengthChange": true,
            "lengthMenu": [[100, 200, 300, -1], [100, 200, 300, "All"]],
            fnDrawCallback: function (oSettings) {
                var info = this.api().page.info();
                if (info.recordsTotal > 0) {
                    var tmptable = $('#dtListSalesForecastingComparison').DataTable();
                    tmptable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmptable, {
                        buttons: [
                            {
                                text: ' Export Sale Forecasting Comparison ',
                                extend: 'excel',
                                className: 'btn btn-info float-right fas fa-file-excel',
                                title: "SalesForecastingComparison",
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
                    var tmptable = $('#dtListSalesForecastingComparison').DataTable();
                    tmptable.buttons().destroy();
                }

            },
            createdRow: function( row, data, dataIndex ) {
                if ( parseFloat(data.DifferencePersentage) >10 ) {
                  $(row).css({"background-color": '#ffcccb' });
                }
              }
        });
    },

    onRowEditClick(element, row) {
        $(element).hide()
        $(element).nextAll('a').show()
        let $row = $(element).closest("tr");
        let $td = $row.find("td:eq(10)");
        let txt = $td.text();
        $td.html("").append("<input type='text' value=\"" + txt + "\">");
    },
    onRowSaveClick: function (element, SaleComparisonID) {
        let $row = $(element).closest("tr");
        let $td = $row.find("td:eq(10)");
        let txt = $td.find("input").val()

        apiCall.ajaxCall(undefined, 'POST', 'SalesForecast/SalesForecastingComparisonSave',
            { SaleComparisonID: SaleComparisonID, NextMonth_FinialForecastingQTY: txt }
        ).then(res => {
            if (res.success == 1) {
                
                salesforecastingComparison.ListSalesForecastingComparison(true)
            }
        })
            .done(() => {
                $(element).hide()
                $(element).prev('a').show()
                bootbox.alert("Sales Forecasting Comparison added.");
                // $td.html(txt)
            })


    },
    onRowUndoClick: function (element) {
        $(element).hide()
        $(element).prev('a').hide()
        let firsta = $(element).parent().find('a')[0]
        $(firsta).show()
        let $row = $(element).closest("tr");
        let $td = $row.find("td:eq(10)");
        let txt = $td.find("input").val()
        $td.html(txt)
    }

}