var saleforecastsummary = {


    Initialize: function () {

        common.MonthList().then((res) => {
            saleforecastsummary.FillMonthList(res.data)
        })

        common.YearList().then((res) => {
            saleforecastsummary.FillYearList(res.data)
        })



    },

    FillMonthList: function (data) {

        $('#ddlMonth').empty();
        $('#ddlMonth').prepend('<option value="0" selected> Select Month </option>')
        $('#ddlMonth').select2({
            multiple: false,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4'
        });

    },

    FillYearList: function (data) {

        $('#ddlYear').empty();
        $('#ddlYear').prepend('<option value="0" selected> Select Year </option>')
        $('#ddlYear').select2({
            multiple: false,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4'
        });

    },

    ListSalesForecastSummary: function () {

        var queryparams = {
            Month: $('#ddlMonth').val(),
            Year: $('#ddlYear').val(),
        }
       

        apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'SalesForecast/SalesForecastSummary').then(response => {
            if (typeof response != typeof undefined) {
                clearDatatable('dtSalesForecastSummary')
                saleforecastsummary.onSuccess_ListSalesForecastSummary(response.data)
            }
        })
    },
    onSuccess_ListSalesForecastSummary: function (data) {

        var dtSalesForecastSummary = $('#dtSalesForecastSummary').DataTable({
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
                    mData: "ProductName", sTitle: "ProductName", sClass: "head1", bSortable: true,
                },
                {
                    mData: "ProductCode", sTitle: "ProductCode", sClass: "head1", bSortable: true,
                },
                {
                    mData: "PackUnit", sTitle: "PackUnit", sClass: "head1", bSortable: true,
                },
                {
                    mData: "Next_ProjectionSalesQTY", sTitle: "ProjectionSalesQTY", sClass: "head1", bSortable: true,
                },
                

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
                    var tmptable = $('#dtSalesForecastSummary').DataTable();
                    tmptable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmptable, {
                        buttons: [
                            {
                                text: 'Export',
                                extend: 'excel',
                                className: 'btn btn-info float-right fas fa-file-excel',
                                title: "SalesForecastSummary",
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
                    var tmptable = $('#dtSalesForecastSummary').DataTable();
                    tmptable.buttons().destroy();
                }

            },
            // createdRow: function (row, data, index) {

            //     var css = {}

            //     if (parseFloat(data.AmountReceived) > parseFloat(data.TotalSalesAmount)) {
            //         css["border-left"] = "solid 2px green"

            //     }
            //     if (parseFloat(data.AmountReceived) < parseFloat(data.TotalSalesAmount)) {
            //         css["border-left"] = "solid 2px red"

            //     }

            //     $(row).css(css);
            // }

        });


    },

}