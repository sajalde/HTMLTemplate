var datatransfer = {

    transferData: function (sptocall) {

        var ajaxdata = {
            FromDate: $('#dtFromdate').val(),
            ToDate: $('#dtTodate').val(),
            SpToCall:sptocall
        };

        apiCall.ajaxCall(undefined, 'GET', 'SetupProcess/DataTransfer',ajaxdata)
        .then((res)=>{

        })
    }


}