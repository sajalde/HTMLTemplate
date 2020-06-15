var salesforecasting = {


    Initialize: function () {
       
        common.FillMonthList('ddlMonth');
        common.FillYearList('ddlYear');

        apiCall.ajaxCallWithReturnData(undefined, 'GET', 'SalesForecast/ForcastingDetailsSearchFields').then(response => {


           if (typeof response != typeof undefined) {
               salesforecasting.FillcomboProduct(response.data.products)
               salesforecasting.FillcomboDivision(response.data.divisions)
               salesforecasting.FillcomboStockLocation(response.data.stocklocations)
            }
        })

    },

    FillcomboProduct:function(data){
       
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

    FillcomboDivision:function(data){
       
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

FillcomboStockLocation:function(data){
       
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

    ListSalesForecasting: function () {       

       
        var queryparams = {
            Month: $('#ddlMonth').val(),
            Year: $('#ddlYear').val(),
            Product:$('#ddlProductName').val().join(),
            Division:$('#ddlDivision').val().join(),
            Location:$('#ddlStockLocation').val().join()
        }


        apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'SalesForecast/SalesForecasting').then(response => {
           
            if (typeof response != typeof undefined) {
                clearDatatable('dtListSalesForecasting')
                salesforecasting.onSuccess_ListListSalesForecasting(response.data)
            }
        })
    },
    onSuccess_ListListSalesForecasting: function (data) {       
        var dtListSalesForecasting = $('#dtListSalesForecasting').DataTable({
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
                    mData: "ProjectedQTY", sTitle: "Projected QTY", sClass: "head1", bSortable: true,
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
                    var tmptable = $('#dtListSalesForecasting').DataTable();
                    tmptable.buttons().destroy();
                    new $.fn.DataTable.Buttons(tmptable, {
                        buttons: [
                            {
                                text: ' Export Sales Forecasting',
                                extend: 'excel',
                                className: 'btn btn-info float-right fas fa-file-excel',
                                title: "SalesForecasting",
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
                    var tmptable = $('#dtListSalesForecasting').DataTable();
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