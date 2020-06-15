var dataprocessing = {

    Initialize: function () {
       
        common.FillMonthList('ddlMonth');
        common.FillYearList('ddlYear');

    },

    processData: function (sptocall) {

        var ajaxdata = {
            Year: $('#ddlYear').val(),
            Month: $('#ddlMonth').val(),
            ForecastingType: $('#ddlForecastingType').val(),
           /* ToDate: $('#dtTodate').val(),*/

            SpToCall:sptocall
        };

        apiCall.ajaxCall(undefined, 'GET', 'SetupProcess/DataProcessing',ajaxdata)
        .then((res)=>{

        })
    }


}