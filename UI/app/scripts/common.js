var common = {

    CurrentDatetime: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/CurrentDatetime')
    },
    CurrentDate: function () {
        //console.log(localStorage.getItem('sysdate'))
        if (sessionStorage.getItem('sysdate') == null) {
            return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/CurrentDate')
        }
        else {
            return new Promise((resolve, reject) => {
                resolve({ data: sessionStorage.getItem('sysdate') })
            })
        }

    },

    CurrentTime: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/CurrentTime')
    },

    MemoNumber: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/MemoNumber')
    },

    BillType: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/BillType')
    },

    Items: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/Items')
    },

    Customers: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/Customers')
    },
    SalesPersons: function () {

        let result = []
        return new Promise((resolve, reject) => {
            $.when(common.GetUsersByRole(5), common.GetUsersByRole(4)).done((res1, res2) => {
                var staffs = res1[0].data
                var manages = res2[0].data
                result = staffs.concat(manages)
                resolve({data:result})
            })
        })

        //return common.GetUsersByRole(5)
        // return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/SalesPersons')
    },

    CardType: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/CardType')
    },

    ExpensesGroup: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetExpensesGroups')
    },

    GetLoggedinUser: function () {


        return new Promise((resolve, reject) => {
            apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetLoggedinUser')
                .then(response => {
                    $("#spanUserName").empty()
                    $("#pUserName").empty()
                    $("#spanUserName").text(response.data)
                    $("#pUserName").text(response.data)
                    return response;
                })
                .then(response => {
                    resolve(response)
                })

        })
    },

    MeterNames: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetMeterNames')
    },

    GetProcuctCategories: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetProcuctCategories')
    },
    GetGSTSlab: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetGSTSlab')
    },
    GetUOM: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetUOM')
    },
    GetFinancialYear: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetFinancialYear')
    },
    GetCountry: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetCountry')
    },
    GetState: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetState')
    },
    GetMeterlastClosing: function (MeterID) {
        return apiCall.ajaxCallWithReturnData({ MeterID: MeterID }, 'GET', 'Common/GetMeterlastClosing')
    },

    GetCurrencyDenomination: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetCurrencyDenomination')
    },

    GetVendors: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetVendors')
    },

    GetEmployees: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetEmployees')
    },

    GetBanks: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetBanks')
    },

    GetUserRoles: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetUserRoles')
    },

    /**
     * 
     * @param {number} RoleID 
     *   
     * | RoleID| Name |
        |--|--|
        |1|System Admin|
        |2|Administrator|
        |3|Users|
        |4|Manager|
        |5|Staff|  
     *
     */
    GetUsersByRole: function (RoleID) {
        return apiCall.ajaxCallWithReturnData({ RoleID: RoleID }, 'GET', 'Common/GetUsersByRole')
    },

    MonthList: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/MonthList')
    },

    YearList: function () {
        return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/YearList')
    },

}