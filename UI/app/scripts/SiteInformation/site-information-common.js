var siteinformationcommon = {

    Initialize: function () {
        apiCall.ajaxCallWithReturnData(undefined, 'GET', 'BussinessEntry/SiteInfo_SearchFields').then(response => {
            if (typeof response != typeof undefined) {
                siteinformationcommon.Fillcombo_SiteAvailability(response.data.siteAvailability)
                siteinformationcommon.Fillcombo_MediaType(response.data.mediaType)
                siteinformationcommon.Fillcombo_DistrictName(response.data.districtName)
                siteinformationcommon.Fillcombo_LightingType(response.data.lightingType)
                siteinformationcommon.Fillcombo_ClientName(response.data.ClientName)
                siteinformationcommon.Fillcombo_PaymentStatus(response.data.PaymentStatus)
                siteinformationcommon.Fillcombo_InvoiceStatus(response.data.InvoiceStatus)
                siteinformationcommon.Fillcombo_PhotoStatus(response.data.PhotoStatus)
                siteinformationcommon.Fillcombo_RentperSqrft(response.data.RentperSqrft)
                siteinformationcommon.Fillcombo_LightStatus(response.data.LightStatus)
                siteinformationcommon.Fillcombo_ManageBy(response.data.ManageBy)
                siteinformationcommon.Fillcombo_ContractStatus(response.data.ContractStatus)

            }
        })
    },

    InitializeAddPageControls: function () {
        return new Promise((resolve) => {
            const promisses = []
            apiCall.ajaxCallWithReturnData(undefined, 'GET', 'BussinessEntry/SiteInfo_SearchFields').then(response => {
                if (typeof response != typeof undefined) {

                    promisses.push(siteinformationcommon.Fillcombo_FK_MediaID(response.data.mediaType).then(res => { return res }))
                    promisses.push(siteinformationcommon.Fillcombo_FK_StatusID_LightingType(response.data.lightingType).then(res => { return res }))
                    promisses.push(siteinformationcommon.Fillcombo_FK_DistrictID(response.data.districtName).then(res => { return res }))
                    promisses.push(siteinformationcommon.Fillcombo_NoofStructures(response.data.NoofStructures).then(res => { return res }))
                    promisses.push(siteinformationcommon.Fillcombo_Dimensions1Sides(response.data.DimensionsSides).then(res => { return res }))
                    promisses.push(siteinformationcommon.Fillcombo_Dimensions2Sides(response.data.DimensionsSides).then(res => { return res }))
                    promisses.push(siteinformationcommon.Fillcombo_Dimensions3Sides(response.data.DimensionsSides).then(res => { return res }))
                    promisses.push(siteinformationcommon.Fillcombo_Dimensions4Sides(response.data.DimensionsSides).then(res => { return res }))
                }

                Promise.all(promisses).then(result => {                    
                    resolve(true)
                })
            })
        })
    },

    Fillcombo_SiteAvailability: function (data) {

        $('#ddlSiteAvailability').empty();
        //$('#ddlSiteAvailability').prepend('<option value="" selected> Select </option>')
        $('#ddlSiteAvailability').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_MediaType: function (data) {
        $('#ddlMediaType').empty();
        //$('#ddlMediaType').prepend('<option value="" selected> Select </option>')
        $('#ddlMediaType').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },


    Fillcombo_DistrictName: function (data) {
        $('#ddlDistrictName').empty();
        //$('#ddlDistrictName').prepend('<option value="" selected> Select Product </option>')
        $('#ddlDistrictName').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_LightingType: function (data) {
        $('#ddlLightingType').empty();
        //$('#ddlLightingType').prepend('<option value="" selected> Select Product </option>')
        $('#ddlLightingType').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_ClientName: function (data) {
        $('#ddlClientName').empty();
        //$('#ddlClientName').prepend('<option value="" selected> Select Product </option>')
        $('#ddlClientName').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_PaymentStatus: function (data) {
        $('#ddlPaymentStatus').empty();
        //$('#ddlPaymentStatus').prepend('<option value="" selected> Select Product </option>')
        $('#ddlPaymentStatus').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_InvoiceStatus: function (data) {
        $('#ddlInvoiceStatus').empty();
        //$('#ddlInvoiceStatus').prepend('<option value="" selected> Select Product </option>')
        $('#ddlInvoiceStatus').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_PhotoStatus: function (data) {
        $('#ddlPhotoStatus').empty();
        //$('#ddlPhotoStatus').prepend('<option value="" selected> Select Product </option>')
        $('#ddlPhotoStatus').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_RentperSqrft: function (data) {
        $('#ddlRentperSqrft').empty();
        //$('#ddlRentperSqrft').prepend('<option value="" selected> Select Product </option>')
        $('#ddlRentperSqrft').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_LightStatus: function (data) {
        $('#ddlLightStatus').empty();
        //$('#ddlLightStatus').prepend('<option value="" selected> Select Product </option>')
        $('#ddlLightStatus').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_ManageBy: function (data) {
        $('#ddlManageBy').empty();
        //$('#ddlManageBy').prepend('<option value="" selected> Select Product </option>')
        $('#ddlManageBy').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_ContractStatus: function (data) {
        $('#ddlContractStatus').empty();
        //$('#ddlContractStatus').prepend('<option value="" selected> Select Product </option>')
        $('#ddlContractStatus').select2({
            multiple: true,
            data: data,
            closeOnSelect: true,
            theme: 'bootstrap4',
            placeholder: {
                id: '', // the value of the option
                text: 'Select'
            },
        });
    },

    Fillcombo_FK_MediaID: function (data) {

        return new Promise((resolve) => {

            $('#ddlFK_MediaID').empty();
            $('#ddlFK_MediaID').prepend('<option value="" selected> Select </option>')
            $('#ddlFK_MediaID').select2({
                multiple: false,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',
            });

            resolve(true)

        })

    },

    Fillcombo_FK_StatusID_LightingType: function (data) {

        return new Promise((resolve) => {
            $('#ddlFK_StatusID_LightingType').empty();
            $('#ddlFK_StatusID_LightingType').prepend('<option value="" selected> Select </option>')
            $('#ddlFK_StatusID_LightingType').select2({
                multiple: false,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',

            });

            resolve(true)
        })
    },

    Fillcombo_FK_DistrictID: function (data) {

        return new Promise((resolve) => {

            $('#ddlFK_DistrictID').empty();
            $('#ddlFK_DistrictID').prepend('<option value="" selected> Select  </option>')
            $('#ddlFK_DistrictID').select2({
                multiple: false,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',
            });

            resolve(true)
        })
    },

    Fillcombo_NoofStructures: function (data) {
        return new Promise((resolve) => {
            $('#ddlNoofStructures').empty();
            $('#ddlNoofStructures').prepend('<option value="" selected> Select  </option>')
            $('#ddlNoofStructures').select2({
                multiple: false,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',

            });

            resolve(true)
        })
    },

    Fillcombo_Dimensions1Sides: function (data) {
        return new Promise((resolve) => {
            $('#ddlDimensions1_Sides').empty();
            $('#ddlDimensions1_Sides').prepend('<option value="" selected> Select  </option>')
            $('#ddlDimensions1_Sides').select2({
                multiple: false,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',

            });
            resolve(true)
        })
    },

    Fillcombo_Dimensions2Sides: function (data) {
        return new Promise((resolve) => {
            $('#ddlDimensions2_Sides').empty();
            $('#ddlDimensions2_Sides').prepend('<option value="" selected> Select  </option>')
            $('#ddlDimensions2_Sides').select2({
                multiple: false,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',
            });
            resolve(true)
        })
    },

    Fillcombo_Dimensions3Sides: function (data) {
        return new Promise((resolve) => {
            $('#ddlDimensions3_Sides').empty();
            $('#ddlDimensions3_Sides').prepend('<option value="" selected> Select  </option>')
            $('#ddlDimensions3_Sides').select2({
                multiple: false,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',

            });
            resolve(true)
        })
    },

    Fillcombo_Dimensions4Sides: function (data) {
        return new Promise((resolve) => {
            $('#ddlDimensions4_Sides').empty();
            $('#ddlDimensions4_Sides').prepend('<option value="" selected> Select  </option>')
            $('#ddlDimensions4_Sides').select2({
                multiple: false,
                data: data,
                closeOnSelect: true,
                theme: 'bootstrap4',

            });
            resolve(true)
        })
    },

}