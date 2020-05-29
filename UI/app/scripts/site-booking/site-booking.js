var sitebooking = {

    Initialize: function () {
        apiCall.ajaxCallWithReturnData(undefined, 'GET', 'BussinessEntry/SiteInfo_SearchFields').then(response => {
            if (typeof response != typeof undefined) {
                sitebooking.Fillcombo_ClientName(response.data.ClientName)
                sitebooking.Fillcombo_ManageBy(response.data.ManageBy)
            }
        })
    },

    Fillcombo_ClientName: function (data) {
        $('#ddlFK_ClientID').empty();
        $('#ddlFK_ClientID').prepend('<option value="" selected> Select </option>')
        $('#ddlFK_ClientID').select2({
            multiple: false,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',

        });
    },

    Fillcombo_ManageBy: function (data) {
        $('#ddlFK_UserID_ManageBy').empty();
        $('#ddlFK_UserID_ManageBy').prepend('<option value="" selected> Select </option>')
        $('#ddlFK_UserID_ManageBy').select2({
            multiple: false,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
        });
    },

    OpenSitebookingModal: function () {
        CreateModal('modAddSitebooking', 'pages/SiteBooking/site-booking-add.html', function () {
            resetControls("formSiteBook")
            sitebooking.Initialize()

        })
    },
    CloseSitebookingModal: function () {
        $("#modAddSitebooking").modal('hide')
        onModalHidden('modAddSitebooking', function () {
            resetControls("formSiteBook")
        })
    },
    ContractDateChange: function () {

        let startdate = $('#txtContractStartDate').val()
        let enddate = $('#txtContractEndDate').val()

        if (startdate != '' && enddate != '') {
            startdate = moment(startdate, 'DD/MM/YYYY').format('M/D/YYYY')
            enddate = moment(enddate, 'DD/MM/YYYY')
            console.log(startdate, enddate)
        }

    }


}