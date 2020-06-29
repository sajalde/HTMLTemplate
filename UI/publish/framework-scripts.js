"use strict";

//http://pandiyachendur.blogspot.com/2009/11/javascript-to-convert-indian-rupees-in.html
var AmountInWord = {
  inWord: function inWord(num) {
    var junkVal = num;
    junkVal = Math.floor(junkVal);
    var obStr = new String(junkVal);
    var numReversed = obStr.split("");
    var actnumber = numReversed.reverse();

    if (Number(junkVal) >= 0) {//do nothing
    } else {
      alert('wrong Number cannot be converted');
      return false;
    }

    if (Number(junkVal) == 0) {
      console.log(obStr + '' + 'Rupees Zero Only');
      return false;
    }

    if (actnumber.length > 9) {
      alert('Oops!!!! the Number is too big to covertes');
      return false;
    }

    var iWords = ["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];
    var ePlace = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
    var tensPlace = ['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];
    var iWordsLength = numReversed.length;
    var totalWords = "";
    var inWords = new Array();
    var finalWord = "";
    var j = 0;

    for (var i = 0; i < iWordsLength; i++) {
      switch (i) {
        case 0:
          if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
            inWords[j] = '';
          } else {
            inWords[j] = iWords[actnumber[i]];
          }

          inWords[j] = inWords[j];
          break;

        case 1:
          tens_complication();
          break;

        case 2:
          if (actnumber[i] == 0) {
            inWords[j] = '';
          } else if (actnumber[i - 1] != 0 && actnumber[i - 2] != 0) {
            inWords[j] = iWords[actnumber[i]] + ' Hundred and';
          } else {
            inWords[j] = iWords[actnumber[i]] + ' Hundred';
          }

          break;

        case 3:
          if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
            inWords[j] = '';
          } else {
            inWords[j] = iWords[actnumber[i]];
          }

          if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
            inWords[j] = inWords[j] + " Thousand";
          }

          break;

        case 4:
          tens_complication();
          break;

        case 5:
          if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
            inWords[j] = '';
          } else {
            inWords[j] = iWords[actnumber[i]];
          }

          inWords[j] = inWords[j] + " Lakh";
          break;

        case 6:
          tens_complication();
          break;

        case 7:
          if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
            inWords[j] = '';
          } else {
            inWords[j] = iWords[actnumber[i]];
          }

          inWords[j] = inWords[j] + " Crore";
          break;

        case 8:
          tens_complication();
          break;

        default:
          break;
      }

      j++;
    }

    function tens_complication() {
      if (actnumber[i] == 0) {
        inWords[j] = '';
      } else if (actnumber[i] == 1) {
        inWords[j] = ePlace[actnumber[i - 1]];
      } else {
        inWords[j] = tensPlace[actnumber[i]];
      }
    }

    inWords.reverse();

    for (i = 0; i < inWords.length; i++) {
      finalWord += inWords[i];
    }

    return finalWord;
  },
  Convert: function Convert(num) {
    var rupees = this.inWord(num);
    var paisa;
    var val = String(num);

    if (val.indexOf('.') != -1) {
      val = val.substring(val.indexOf('.') + 1, val.length);

      if (val.length == 0 || parseInt(val) <= 0) {
        paisa = "zero paisa only .";
      } else {
        paisa = this.inWord(val) + " paisa only .";
      }
    } else {
      paisa = "zero paisa only .";
    } //console.log(rupees + " rupees and " + paisa)


    return 'Rs. ' + rupees + " and " + paisa;
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Ref reading
 * https://stackoverflow.com/a/6394826
 * [Reason: CORS request not HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp)
 * 
 * 
 */

/*
 var apiEndpoint = "http://localhost:5000/api/"
var apiEndpoint = "http://ec2-18-218-30-23.us-east-2.compute.amazonaws.com:81/api/"
*/
var apiEndpoint = config.apiEndpoint;
var apiCall = {
  /**
   * 
   * 
   * 
   * 
   *
   */
  ajaxCall: function ajaxCall(ParentForm, RequestType, Url, AjaxData) {
    var queryParams = '';
    var formatedData = {};
    var xhr;
    formatedData = _typeof(AjaxData) === (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) ? this.prepareAjaxCallData(ParentForm) : AjaxData;

    if (RequestType == "GET" && _typeof(ParentForm) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) || ParentForm !== null) {
      $.each(formatedData, function (key, value) {
        queryParams += key + '=' + value + '&';
      });
      queryParams = queryParams.slice(0, -1);
    }

    switch (RequestType) {
      case 'GET':
        xhr = $.ajax({
          type: 'GET',
          url: queryParams == '' ? apiEndpoint + Url : apiEndpoint + Url + '?' + queryParams,
          contentType: "application/json; charset=utf-8",
          dataType: "json" //context: this,

        });
        break;

      case 'POST':
        xhr = $.ajax({
          type: 'POST',
          url: apiEndpoint + Url,
          data: JSON.stringify(formatedData),
          contentType: "application/json; charset=utf-8",
          dataType: "json" //context: this,

        });
        break;
    }

    return xhr;
  },
  ajaxCallWithReturnData: function ajaxCallWithReturnData(ApiParameter, RequestType, Url) {
    var queryParams = '';
    var xhr;

    if (RequestType == "GET" && _typeof(ApiParameter) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) || ApiParameter !== null) {
      $.each(ApiParameter, function (key, value) {
        queryParams += key + '=' + value + '&';
      });
      queryParams = queryParams.slice(0, -1);
    } //console.log(DataFormat == 'object' ? JSON.stringify(formatedData) : formatedData)


    switch (RequestType) {
      case 'GET':
        xhr = $.ajax({
          type: 'GET',
          async: true,
          url: queryParams == '' ? apiEndpoint + Url : apiEndpoint + Url + '?' + queryParams,
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        });
        break;

      case 'POST':
        xhr = $.ajax({
          type: 'POST',
          url: apiEndpoint + Url,
          data: JSON.stringify(ApiParameter),
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        });
        break;
    }

    return xhr;
  },
  prepareAjaxCallData: function prepareAjaxCallData(parentForm) {
    var formatedData = {};
    $('#' + parentForm).find(':input').each(function (index, element) {
      /*
        console.log(element)
        console.log($(element).is("input"))
        console.log($(element).get(0).tagName)
        console.log($(element).attr('id'))
        console.log($(element).attr('type'))             
       */
      if ($(element).attr('data-ParameterName') !== undefined) {
        switch ($(element).get(0).tagName) {
          case 'INPUT':
            if ($(element).attr('type') == 'checkbox') {
              formatedData[$(element).attr('data-ParameterName')] = $(element).is(":checked") ? true : false;
            } else if ($(element).attr('type') == 'radio') {
              $('[name="' + $(element).attr('name') + '"]').each(function (ri, radio) {
                if (_typeof($(radio).attr('data-ParameterName')) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
                  if ($(radio).is(":checked")) {
                    formatedData[$(radio).attr('data-ParameterName')] = true;
                  } else {
                    formatedData[$(radio).attr('data-ParameterName')] = false;
                  }
                }
              });
            } else {
              formatedData[$(element).attr('data-ParameterName')] = $(element).val();
            }

            break;

          case 'SELECT':
            if ($.isArray($(element).val())) {
              var multiselectvalue = $(element).val();
              formatedData[$(element).attr('data-ParameterName')] = multiselectvalue.join(',');
            } else {
              formatedData[$(element).attr('data-ParameterName')] = $(element).val();
            }

            break;

          case 'TEXTAREA':
            if ($(element).hasClass('editor')) {
              formatedData[$(element).attr('data-ParameterName')] = $(element).summernote('code');
            } else {
              formatedData[$(element).attr('data-ParameterName')] = $(element).val();
            }

            break;
        }
      }
    }); //console.log(formatedData)

    return formatedData;
  },
  bindModel: function bindModel(parentForm, data) {
    //console.log(data)
    $.each(data, function (key, value) {
      $('#' + parentForm).find("[data-ParameterName='" + key + "']").each(function (index, element) {
        /*
          console.log(element)
          console.log($(element).is("input"))
          console.log($(element).get(0).tagName)
          console.log($(element).attr('id'))
          console.log($(element).attr('type'))             
         */
        if ($(element).attr('data-ParameterName') !== undefined) {
          switch ($(element).get(0).tagName) {
            case 'INPUT':
              if ($(element).attr('type') == 'checkbox') {
                var checkboxValue = value == 1 ? true : false;
                $(element).prop('checked', checkboxValue);
              }
              /* else if ($(element).attr('type') == 'radio') {
                   $('[name="' + $(element).attr('name') + '"]').each(function (ri, radio) {
                          if (typeof $(radio).attr('data-ParameterName') != typeof undefined) {
                              if ($(radio).is(":checked")) {
                               formatedData[$(radio).attr('data-ParameterName')] = true
                           }
                           else {
                               formatedData[$(radio).attr('data-ParameterName')] = false
                           }
                       }
                   })
                  }*/
              else {
                  $(element).val(value);
                }

              break;

            case 'SELECT':
              value = value == null ? 0 : value;
              var multiple = $(element).prop('multiple'); // For some browsers, `attr` is undefined; for others,
              // `attr` is false.  Check for both.

              if (_typeof(multiple) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) && multiple === true) {
                if (value.split(',').length <= 0) {
                  $(element).val(0).trigger('change');
                } else {
                  $(element).val(value.split(',')).trigger('change');
                }
              } else {
                $(element).val(value).trigger('change');
              }

              break;

            case 'TEXTAREA':
              if ($(element).hasClass('editor')) {
                $(element).summernote('code', value);
              } else {
                $(element).val(value);
              }

              break;
          }
        }
      });
    });
  }
};
"use strict";

var common = {
  CurrentDatetime: function CurrentDatetime() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/CurrentDatetime');
  },
  CurrentDate: function CurrentDate() {
    //console.log(localStorage.getItem('sysdate'))
    if (sessionStorage.getItem('sysdate') == null) {
      return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/CurrentDate');
    } else {
      return new Promise(function (resolve, reject) {
        resolve({
          data: sessionStorage.getItem('sysdate')
        });
      });
    }
  },
  CurrentTime: function CurrentTime() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/CurrentTime');
  },
  MemoNumber: function MemoNumber() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/MemoNumber');
  },
  BillType: function BillType() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/BillType');
  },
  Items: function Items() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/Items');
  },
  Customers: function Customers() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/Customers');
  },
  SalesPersons: function SalesPersons() {
    var result = [];
    return new Promise(function (resolve, reject) {
      $.when(common.GetUsersByRole(5), common.GetUsersByRole(4)).done(function (res1, res2) {
        var staffs = res1[0].data;
        var manages = res2[0].data;
        result = staffs.concat(manages);
        resolve({
          data: result
        });
      });
    }); //return common.GetUsersByRole(5)
    // return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/SalesPersons')
  },
  CardType: function CardType() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/CardType');
  },
  ExpensesGroup: function ExpensesGroup() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetExpensesGroups');
  },
  GetLoggedinUser: function GetLoggedinUser() {
    return new Promise(function (resolve, reject) {
      apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetLoggedinUser').then(function (response) {
        $("#spanUserName").empty();
        $("#pUserName").empty();
        $("#spanUserName").text(response.data);
        $("#pUserName").text(response.data);
        return response;
      }).then(function (response) {
        resolve(response);
      });
    });
  },
  MeterNames: function MeterNames() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetMeterNames');
  },
  GetProcuctCategories: function GetProcuctCategories() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetProcuctCategories');
  },
  GetGSTSlab: function GetGSTSlab() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetGSTSlab');
  },
  GetUOM: function GetUOM() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetUOM');
  },
  GetFinancialYear: function GetFinancialYear() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetFinancialYear');
  },
  GetCountry: function GetCountry() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetCountry');
  },
  GetState: function GetState() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetState');
  },
  GetMeterlastClosing: function GetMeterlastClosing(MeterID) {
    return apiCall.ajaxCallWithReturnData({
      MeterID: MeterID
    }, 'GET', 'Common/GetMeterlastClosing');
  },
  GetCurrencyDenomination: function GetCurrencyDenomination() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetCurrencyDenomination');
  },
  GetVendors: function GetVendors() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetVendors');
  },
  GetEmployees: function GetEmployees() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetEmployees');
  },
  GetBanks: function GetBanks() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetBanks');
  },
  GetUserRoles: function GetUserRoles() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetUserRoles');
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
  GetUsersByRole: function GetUsersByRole(RoleID) {
    return apiCall.ajaxCallWithReturnData({
      RoleID: RoleID
    }, 'GET', 'Common/GetUsersByRole');
  },
  MonthList: function MonthList() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/MonthList');
  },
  YearList: function YearList() {
    return apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/YearList');
  }
};
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var dashboard = {
  GetMeterReading: function GetMeterReading() {
    apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Dashboard/GetMeterReading').then(function (response) {
      return response.data;
    }).then(function (data) {
      //console.log(data)
      var months = [];
      Array.from(new Set(data.map(function (s) {
        return s.Month;
      }))).map(function (month) {
        months.push(month);
      });
    });
  },
  ListCreditSale: function ListCreditSale() {
    clearDatatable('creditsalelist');
    apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Dashboard/CreditSalesList').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        dashboard.onSuccess_ListCreditSale(response.data);
      }
    });
  },
  onSuccess_ListCreditSale: function onSuccess_ListCreditSale(data) {
    var _$$DataTable;

    var dtVaultTransfer = $('#creditsalelist').DataTable((_$$DataTable = {
      bServerSide: false,
      bDestroy: true,
      paging: true,
      autoWidth: false,
      bStateSave: false,
      searching: false,
      data: data,
      lengthChange: false,
      info: false,
      pageLength: 10,
      //aaSorting: [],
      order: [],
      language: {
        paginate: {
          previous: "<",
          next: ">"
        },
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "Invoice_Date",
        sTitle: "Date",
        sClass: "head1"
      }, {
        mData: 'Staff',
        sTitle: "By",
        sClass: "head1"
      }, {
        mData: 'ExpensesHead',
        sTitle: "ExpensesHead",
        sClass: "head1"
      }, {
        mData: 'Amount',
        sTitle: "Amount",
        sClass: "head1"
      }],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>'
    }, _defineProperty(_$$DataTable, "lengthChange", true), _defineProperty(_$$DataTable, "lengthMenu", [[10, 20, 30, -1], [10, 20, 30, "All"]]), _defineProperty(_$$DataTable, "bUseRendered", true), _defineProperty(_$$DataTable, "drawCallback", function drawCallback() {
      $('.dataTables_paginate > .pagination').addClass('pagination pagination-sm m-0 float-right');
    }), _$$DataTable));
  },
  FillMonthList: function FillMonthList() {
    common.MonthList().then(function (res) {
      $('#ddlMonth').empty();
      $('#ddlMonth').prepend('<option value="0" selected> Select Month </option>');
      $('#ddlMonth').select2({
        multiple: false,
        data: res.data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
    });
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
//http://stackoverflow.com/a/14081487
jQuery(function ($) {
    $.validator.addMethod('date',
    function (value, element) {
        if (this.optional(element)) {
            return true;
        }
        //alert(1)

        var ok = true;
        try {
            // console.log(new Date(value))
            //element.parseDate('DD/MM/YYYY', value);
        }
        catch (err) {
            console.log(err)
            ok = false;
        }
        return ok;
    });
});

jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "date-uk-pre": function (a) {
        var ukDatea = a.split('/');
        return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
    },

    "date-uk-asc": function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "date-uk-desc": function (a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

$.fn.dataTable.moment('DD/MM/YYYY HH:mm');*/

/*
NProgress.configure({ trickle: true, showSpinner: true });
*/

/*$(document).ajaxStart(function () {
    NProgress.start();
    console.log('ajaxStart')
     $("#root").faLoading('fa-sync-alt');
});
$(document).ajaxStop(function () {
    NProgress.done();    
    console.log('ajaxStop')
    $("#root").faLoadingStop();
});


$(document).ajaxComplete(function (event, xhr, settings) {
    //console.log('ajaxComplete')

});*/
moment.locale('en');
/**
 * scripts array for all pages 
 */
//

var scripts = ['framework-scripts.js'];
/*window.onerror = function (msg, url, lineNo, columnNo, error) {
    var errmsg = msg.toLowerCase();
    var substring = "script error";
    if (typeof errmsg==typeof this.String && errmsg.indexOf(substring) > -1) {
        alert('Script Error: See Browser Console for Detail');
    } else {
        var message = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');

        alert(message);
    }

    return false;
};*/

/*$.Deferred.exceptionHook = function (err, stackTrace) {
    // 'err' is what you throw in your deferred's catch.
    window.dispatchEvent(new CustomEvent('error', {
        detail: err
    }));
}*/

NProgress.configure({
  showSpinner: false
});
/**
 * 
 */

$.getMultiScripts = function (arr, path) {
  var _arr = $.map(arr, function (scr) {
    return $.getScript((path || "") + scr);
  });

  _arr.push($.Deferred(function (deferred) {
    $(deferred.resolve);
  }));

  return $.when.apply($, _arr);
};

window.onload = function () {} //console.log('window.onload')

/*This Now added in Index.html
$.getMultiScripts(scripts, "").then(function () {
    console.log("all scripts loaded");
    loadHtml("pages/home.html")
    addnavigation();
});
*/
;

$.ajaxSetup({
  cache: false,
  beforeSend: function beforeSend(xhr) {
    //$("#root").faLoading('fa-sync-alt');
    xhr.setRequestHeader('Access-Control-Allow-Origin', null);
    xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
  },
  complete: function complete() {//console.log('ajaxSetup-complete')
    //$("#root").faLoadingStop();
  }
});
$(document).ajaxStart(function () {
  $("#root").faLoading('fa-sync-alt');
  NProgress.start();
});
$(document).ajaxStop(function () {
  NProgress.done();
  $("#root").faLoadingStop();
});
/*$(document).ajaxComplete(function (event, xhr, settings) {
    $("#root").faLoadingStop();
    NProgress.done();
    

});*/

$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
  NProgress.done();

  switch (jqxhr.status) {
    case 401:
      $('#root').load('pages/shared/mod-session-lost.html', function (responseText, textStatus, jqXHR) {
        $("#modal-danger").modal({
          backdrop: 'static'
        }).on('shown.bs.modal', function (e) {
          $("#modal-danger #sessionlost").show();
        }).modal('show');
      });
      break;
  }

  return false;
});
/**
 * Load HTML with ajax into index.html=>root div
 * @param {*} FilePath 
 */

function loadHtml(FilePath, element) {
  $('a.nav-link').each(function (index, el) {
    $(el).removeClass('active');
  });
  $(element).addClass('active');
  $('#root').empty();
  return new Promise(function (resolve, reject) {
    resolve($('#root').load(FilePath, function (responseText, textStatus, jqXHR) {
      // console.log(responseText)
      // console.log(textStatus)
      // console.log(jqXHR)
      $('h1.text-dark').removeClass('text-dark').addClass('text-white');
      validateRequiredField();
      fieldValidationNumeric();
      createDatePicker();
      createTimePicker();
      $("input:text").on('click', function () {
        $(this).select();
      });
    }));
  });
}
/**
 * add a click event listner to menu link for loading HTML 
 */


function addnavigation() {
  $("a.nav-link").each(function (index, element) {
    var attr = $(element).attr('data-filepath'); // For some browsers, `attr` is undefined; for others,
    // `attr` is false.  Check for both.

    if (_typeof(attr) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) && attr !== false) {
      $(element).on('click', function () {
        loadHtml(attr, element).then(function () {
          console.info('Page Loaded !!!!');
        });
      });
    }
  });
}
/**
 * check a datatable instance exists or not
 */


isDataTableExits = function isDataTableExits(dataTableID) {
  return $.fn.DataTable.isDataTable("#" + dataTableID + "");
};
/**
 * empty datatable instance
 */


emptyDataTable = function emptyDataTable(dataTableID) {
  $("#" + dataTableID + "").empty();
};
/**
 * destroy datatable instance
 */


destroyDataTable = function destroyDataTable(dataTableID) {
  //  $("#" + dataTableID + "").dataTable().fnDestroy();
  //https://datatables.net/forums/discussion/comment/93067/#Comment_93067
  $("#" + dataTableID + "").DataTable().destroy();
};

clearDatatable = function clearDatatable(dataTableID) {
  if (isDataTableExits(dataTableID) == true) {
    destroyDataTable(dataTableID);
    emptyDataTable(dataTableID);
  }
};
/**
 * notification configuration
 */


var toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

showToastSuccessMessage = function showToastSuccessMessage(message) {
  toast.fire({
    type: 'success',
    title: message
  });
};

showToastErrorMessage = function showToastErrorMessage(message) {
  toast.fire({
    type: 'error',
    title: message
  });
};
/**
 * clear form's element
 */


resetControls = function resetControls(formid
/*, objFieldsValue*/
) {
  /*
      assign objFieldsValue with some value when need to set value into field after reset
      checkboxValue => true/false ; default =>true
      dropdownValue => selectedvalue [any numeric] ;  default =>0
  */
  var fieldDefaultValue = {
    checkboxValue: true,
    dropdownValue: 0,
    selectedIndex: 0
  };
  /* if ('undefined' !== typeof objFieldsValue) {
       for (var i in objFieldsValue) {
           if ('undefined' !== typeof objFieldsValue[i]) {
               fieldDefaultValue[i] = objFieldsValue[i];
           }
       }
   }*/

  $('.validationerror').remove();
  $('#' + formid).find(':input').each(function (index, element) {
    /*
    In future We can bellow values
    console.log(element)
    console.log($(element).is("input"))
    console.log($(element).get(0).tagName)
    console.log($(element).attr('id'))
    console.log($(element).attr('type'))            
    */
    //if ($(element).attr('type') != 'hidden') {
    switch ($(element).get(0).tagName) {
      case 'INPUT':
        if (typeof $(element).attr('type') == 'undefined' || $(element).attr('type') == 'text' || $(element).attr('type') == 'email' || $(element).attr('type') == 'tel' || $(element).attr('type') == 'password') {
          $(element).val('');
          $(element).removeClass('is-invalid');
        } else {
          switch ($(element).attr('type')) {
            case 'checkbox':
              $(element).prop('checked', false);
              break;

            case 'hidden':
              $(element).val('0');
              break;
          }
        }

        break;

      case 'SELECT':
        $(element).val(fieldDefaultValue.dropdownValue).trigger('change');
        /*if (fieldDefaultValue.selectedIndex != "") {
            $(element)[0].selectedIndex = fieldDefaultValue.selectedIndex;
        }
        else {
            $(element).val(fieldDefaultValue.dropdownValue).trigger('change');
        }
          if ('undefined' !== typeof $(element).attr('combodefaultvalue')) {
            $(element).val($(element).attr('combodefaultvalue')).trigger('change');
        }*/

        break;

      case 'TEXTAREA':
        $('.editor').summernote('reset');
        $(element).val('');
        break;
    } //}

  });
};
/**
 * creating new modal
 * need to add bellow markup on which page need the modal
 * <div class="modal fade" role="dialog" id="modAddSample" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">

          </div>
        </div>
      </div>

     ModalID=> id="modAddSample"
     FilePath => file location from which modal content will creating
     CreateModalCallBack => method fires after showing the modal
 */


CreateModal = function CreateModal(ModalID, FilePath, CreateModalCallBack) {
  $.get(FilePath, function (responseText, textStatus, jqXHR) {
    $('#root').append(responseText);
    var modal = $("#" + ModalID).modal({
      backdrop: 'static'
    }).on('shown.bs.modal', function (e) {
      validateRequiredField();
      fieldValidationNumeric();
      createDatePicker();
      createTimePicker();
      $("input:text").on('click', function () {
        $(this).select();
      });

      if (_typeof(CreateModalCallBack) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        CreateModalCallBack();
        CreateModalCallBack = undefined;
      }
    }).on('hidden.bs.modal', function (e) {
      $(modal).remove();
    }).modal('show');
  });
};

onModalShown = function onModalShown(ModalID, ShownCallBack) {
  $('#' + ModalID).on('shown.bs.modal', function (e) {
    // do something...
    if (_typeof(ShownCallBack) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
      ShownCallBack();
    }
  });
};

onModalHidden = function onModalHidden(ModalID, HiddenCallback) {
  $('#' + ModalID).on('hidden.bs.modal', function (e) {
    if (_typeof(HiddenCallback) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
      HiddenCallback();
    }
  });
};
/**
 * call before submit a form to check any required field empty or not.
 * add required prop to element to mark as required
 */


fieldValidation = function fieldValidation(parentForm) {
  var invalidcount = 0;
  var invalidelement;
  $('#' + parentForm).find(':input').each(function (index, element) {
    //console.log($(element))
    if ($(element).attr('type') != "hidden") {
      if ($(element).prop('required') && ($(element).val() == "" || $(element).val() == 0)) {
        invalidelement = $(element);
        invalidcount++;
        return false;
      }

      if ($(element).prop('numeric') == true && $.isNumeric($(element).val()) === false) {
        invalidelement = $(element);
        invalidcount++;
        return false;
      }
    }

    ;
  });

  if (invalidcount > 0) {
    var validationmessage = document.getElementById('' + $(invalidelement).attr('id') + '').hasAttribute('data-validationmessage') == true ? $(invalidelement).attr('data-validationmessage') : 'Required field.Enter value.';
    $(invalidelement).addClass('is-invalid');
    $('.validationerror').remove();
    $(invalidelement).parent().append('<label class="validationerror text-danger">' + validationmessage + '</label>');
    /*$('<label class="validationerror text-danger">' + validationmessage + '</label>')
        .insertAfter($(invalidelement))*/

    $('.modal').animate({
      scrollTop: $(invalidelement).offset().top
    }, 2000);
    $(invalidelement).focus();
    return false;
  } else if (invalidcount == 0) {
    return true;
  }
};
/**
 * call before submit a form to check any required field empty or not.
 * add required prop to element to mark as required
 */


specificFieldValidation = function specificFieldValidation(controls) {
  var invalidcount = 0;
  var invalidelement; // controls.forEach(function (element, index) {

  $.each(controls, function (index, element) {
    //console.log($(element))
    element = $('#' + element);

    if ($(element).attr('type') != "hidden") {
      if ($(element).prop('required') && ($(element).val() == "" || $(element).val() == 0)) {
        invalidelement = $(element);
        invalidcount++;
        return false;
      }

      if ($(element).prop('numeric') == true && $.isNumeric($(element).val()) === false) {
        invalidelement = $(element);
        invalidcount++;
        return false;
      }
    }

    ;
  });

  if (invalidcount > 0) {
    var validationmessage = document.getElementById('' + $(invalidelement).attr('id') + '').hasAttribute('data-validationmessage') == true ? $(invalidelement).attr('data-validationmessage') : 'Required field.Enter value.';
    $(invalidelement).addClass('is-invalid');
    $('.validationerror').remove();
    $(invalidelement).parent().append('<label class="validationerror text-danger">' + validationmessage + '</label>');
    /*$('<label class="validationerror text-danger">' + validationmessage + '</label>')
        .insertAfter($(invalidelement))*/

    $('.modal').animate({
      scrollTop: $(invalidelement).offset().top
    }, 2000);
    $(invalidelement).focus();
    return false;
  } else if (invalidcount == 0) {
    return true;
  }
};
/**
 * on document.ready() inputs with numeric prop , a keypress hendler added to allow only numeric value to elemnts.
 * add numeric prop to element to mark as numeric field
 */


fieldValidationNumeric = function fieldValidationNumeric() {
  $('input[type=text]').each(function (index, element) {
    if (_typeof($(element).attr('numeric')) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
      $(element).on('keypress', function (e) {
        if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
          return false;
        }
      });
    }
  });
};
/**
 * on document.ready()  , a onchange hendler added to check inputs with required prop has value
 * and then remove validation error. 
 */


validateRequiredField = function validateRequiredField() {
  $('input,select').each(function (index, element) {
    if ($(element).attr('type') != "hidden") {
      $(element).on('change', function () {
        if ($(element).prop('required') && ($(element).val() != "" || $(element).val() > 0)) {
          $(element).removeClass('is-invalid');
          $('.validationerror').remove();
        }
      });
    }
  });
};
/**
 * creating datepicker .
 * ElementID => on which elemt datepicker is needed.
 */


createDatePickerByID = function createDatePickerByID(ElementID) {
  $('#' + ElementID).datetimepicker({
    format: 'DD/MM/YYYY',
    useCurrent: false,
    allowInputToggle: true
  });
};

createDatePicker = function createDatePicker() {
  $('div.date').each(function (index, element) {
    //console.log($(element).hasClass('time'))
    if (!$(element).hasClass('time')) {
      $(element).datetimepicker({
        defaultDate: sessionStorage.getItem('sysdate') == null ? new Date() : moment(sessionStorage.getItem('sysdate'), "DD/MM/YYYY"),
        format: $(element).hasClass('time') ? 'LT' : 'DD/MM/YYYY'
      }).on('dp.change', function (e) {
        $(this).find(":input").val(moment(e.date).format('DD/MM/YYYY'));
        $(this).find(":input").trigger("change");
      });
    }
  });
};

createTimePicker = function createTimePicker() {
  //console.log($('div.date.time'))
  $('div.date.time').datetimepicker({
    format: 'LT'
  });
};

GetQueryStringParams = function GetQueryStringParams(url, sParam) {
  var sPageURL = _typeof(url) == (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) ? window.location.search.substring(1) : url;
  var urlspliter = sPageURL.includes('&') ? '&' : '?';
  var sURLVariables = sPageURL.split(urlspliter);

  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] == sParam) {
      return decodeURIComponent(sParameterName[1]);
    }
  }
};

openErrorModal = function openErrorModal() {
  $.get('pages/shared/mod-gen-error.html', function (responseText, textStatus, jqXHR) {
    $('#root').append(responseText);
    $("#modal-danger").modal({
      backdrop: 'static'
    }).modal('show');
  });
};

parseDecimal = function parseDecimal(value) {
  //https://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
  var parsedvalue = $.isNumeric(value) == true ? parseFloat(value) : 0;
  var roundvalue = parsedvalue % 1 != 0 ? parsedvalue : Math.round(parsedvalue).toFixed(2);
  return roundvalue;
};

sortListofObjectArray = function sortListofObjectArray(field, reverse, primer) {
  //https://stackoverflow.com/a/979325/4336330
  var key = primer ? function (x) {
    return primer(x[field]);
  } : function (x) {
    return x[field];
  };
  reverse = !reverse ? 1 : -1;
  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  };
};
//console.log(page)
//page('/home', index)
// page('/user/:user', show)
// page('/user/:user/edit', edit)
// page('/user/:user/album', album)
// page('/user/:user/album/sort', sort)
// page('*', notfound)
//page.base('/')
"use strict";
"use strict";

var globaldatefunction = {
  month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
"use strict";

var config = {
  //apiEndpoint : "http://localhost:5000/api/"
  //apiEndpoint : "http://localhost/BellsAPI/api/"
  apiEndpoint: "http://ec2-18-222-240-83.us-east-2.compute.amazonaws.com/Bellsapi/api/"
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var login = {
  /**
  * notification configuration
  */
  Toast: Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  }),
  logintoSystem: function logintoSystem() {
    $("#btnLogin").prop('disabled', true);
    $("#loginloader").show().addClass('fa-spin');
    apiCall.ajaxCall('formLogin', 'GET', 'Auth/token').done(function (data, textStatus, jqXHR) {
      $("#loginloader").hide().removeClass('fa-spin');
      $("#btnLogin").prop('disabled', false);

      if (data.access_token) {
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem('sysdate', moment(new Date()).format('DD/MM/YYYY'));
        window.location.href = "index.html"; //page.redirect('./');
      }
    }).fail(function (jqXHR, textStatus, errorThrown) {
      /*console.log(jqXHR)
      console.log(textStatus)
      console.log(errorThrown)*/
      $("#loginloader").hide().removeClass('fa-spin');
      $("#btnLogin").prop('disabled', false);
      login.runEffect();
      login.Toast.fire({
        type: 'error',
        title: 'Invalid Username or Passrord'
      });
    });
  },
  runEffect: function runEffect() {
    {
      $("#divlogin").effect('shake', null, 500, function () {
        setTimeout(function () {
          $("#divlogin").removeAttr("style").hide().fadeIn();
        }, 1000);
        return false;
      });
    }
    ;
  },
  GetBingImageofTheDay: function GetBingImageofTheDay() {
    return new Promise(function (resolve, reject) {
      apiCall.ajaxCallWithReturnData(undefined, 'GET', 'Common/GetBingImageofTheDay').then(function (res) {
        if (_typeof(res) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
          localStorage.setItem('bgimage', res.data.imageurl);
          localStorage.setItem('bgimage_source', res.data.source);
          return res.data.imageurl;
        }
      }).then(function (imgurl) {
        resolve(imgurl);
      });
    });
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var sitebooking = {
  Initialize: function Initialize() {
    apiCall.ajaxCallWithReturnData(undefined, 'GET', 'BussinessEntry/SiteInfo_SearchFields').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        sitebooking.Fillcombo_ClientName(response.data.ClientName);
        sitebooking.Fillcombo_ManageBy(response.data.ManageBy);
      }
    });
  },
  Fillcombo_ClientName: function Fillcombo_ClientName(data) {
    $('#ddlFK_ClientID').empty();
    $('#ddlFK_ClientID').prepend('<option value="" selected> Select </option>');
    $('#ddlFK_ClientID').select2({
      multiple: false,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4'
    });
  },
  Fillcombo_ManageBy: function Fillcombo_ManageBy(data) {
    $('#ddlFK_UserID_ManageBy').empty();
    $('#ddlFK_UserID_ManageBy').prepend('<option value="" selected> Select </option>');
    $('#ddlFK_UserID_ManageBy').select2({
      multiple: false,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4'
    });
  },
  OpenSitebookingModal: function OpenSitebookingModal() {
    CreateModal('modAddSitebooking', 'pages/SiteBooking/site-booking-add.html', function () {
      resetControls("formSiteBook");
      sitebooking.Initialize();
    });
  },
  CloseSitebookingModal: function CloseSitebookingModal() {
    $("#modAddSitebooking").modal('hide');
    onModalHidden('modAddSitebooking', function () {
      resetControls("formSiteBook");
    });
  },
  ContractDateChange: function ContractDateChange() {
    var startdate = $('#txtContractStartDate').val();
    var enddate = $('#txtContractEndDate').val();

    if (startdate != '' && enddate != '') {
      startdate = moment(startdate, 'DD/MM/YYYY').format('M/D/YYYY');
      enddate = moment(enddate, 'DD/MM/YYYY');
      console.log(startdate, enddate);
    }
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var siteinformationadd = {
  globEditedSiteID: 0,
  AddUpdateSiteInfo: function AddUpdateSiteInfo() {
    if (fieldValidation('formSiteInfo') == true) {
      if ($("#hdnPK_SiteID").val() <= 0) {
        apiCall.ajaxCall('formSiteInfo', 'POST', 'BussinessEntry/AddNewSite').then(function (res) {
          if (res.success == 1) {
            resetControls('formSiteInfo');
            bootbox.alert("Data saved successfully .");
          }
        });
      }

      if ($("#hdnPK_SiteID").val() > 0) {
        apiCall.ajaxCall('formSiteInfo', 'POST', 'BussinessEntry/UpdateSite').then(function (res) {
          if (res.success == 1) {
            resetControls('formSiteInfo');
            bootbox.alert("Data updated successfully .");
          }
        });
      }
    }
  },
  ListofBooking: function ListofBooking(ReInitializeCache) {
    var bookingqueryparams = {
      SiteID: $('#hdnPK_SiteID').val()
    };

    if (_typeof(ReInitializeCache) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
      bookingqueryparams["ReInitializeCache"] = true;
    }

    apiCall.ajaxCallWithReturnData(bookingqueryparams, 'GET', 'BussinessEntry/ListSiteBooking').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtListofBooking');
        siteinformationadd.onSuccess_ListofBooking(response.data);
      }
    });
  },
  onSuccess_ListofBooking: function onSuccess_ListofBooking(data) {
    var dtListofBooking = $('#dtListofBooking').DataTable({
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "BookingID",
        sTitle: "ID",
        sClass: "head1",
        bSortable: true,
        bVisible: false
      }, {
        mData: "ClientName",
        sTitle: "Client",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ContractStartDate",
        sTitle: "Start Date",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ContractEndDate",
        sTitle: "End Date",
        sClass: "head1",
        bSortable: true
      }, {
        mData: null,
        sTitle: "Rent",
        sClass: "text-center head1",
        bSortable: true,
        bVisible: true,
        mRender: function mRender(data, type, full) {
          return full.TotalMontlyRent + '[' + full.RentPerSQFT + ']';
        }
      }, {
        mData: "ContractStatus",
        sTitle: "Contract Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PhotoStatus",
        sTitle: "Photo Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "InvoiceStatus",
        sTitle: "Invoice Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PaymentStatus",
        sTitle: "Payment Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ManageBy",
        sTitle: "ManageBy",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": false,
      "lengthMenu": [[20, 30, 300, -1], [20, 30, 300, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var infobooking = this.api().page.info();

        if (infobooking.recordsTotal > 0) {
          var tmpbookingtable = $('#dtListofBooking').DataTable();
          tmpbookingtable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmpbookingtable, {
            buttons: [{
              text: 'Export Booking Information',
              extend: 'excel',
              className: 'btn btn-info float-right fas fa-file-excel',
              title: "Site Booking",
              extension: '.xls'
              /*exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
              },*/

            }]
          });
          tmpbookingtable.buttons(0, null).container().appendTo('#export-area');
        } else if (infobooking.recordsTotal <= 0) {
          var tmpbookingtable = $('#dtListofBooking').DataTable();
          tmpbookingtable.buttons().destroy();
        }
      }
    });
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var siteinformationcommon = {
  Initialize: function Initialize() {
    apiCall.ajaxCallWithReturnData(undefined, 'GET', 'BussinessEntry/SiteInfo_SearchFields').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        siteinformationcommon.Fillcombo_SiteAvailability(response.data.siteAvailability);
        siteinformationcommon.Fillcombo_MediaType(response.data.mediaType);
        siteinformationcommon.Fillcombo_DistrictName(response.data.districtName);
        siteinformationcommon.Fillcombo_LightingType(response.data.lightingType);
        siteinformationcommon.Fillcombo_ClientName(response.data.ClientName);
        siteinformationcommon.Fillcombo_PaymentStatus(response.data.PaymentStatus);
        siteinformationcommon.Fillcombo_InvoiceStatus(response.data.InvoiceStatus);
        siteinformationcommon.Fillcombo_PhotoStatus(response.data.PhotoStatus);
        siteinformationcommon.Fillcombo_RentperSqrft(response.data.RentperSqrft);
        siteinformationcommon.Fillcombo_LightStatus(response.data.LightStatus);
        siteinformationcommon.Fillcombo_ManageBy(response.data.ManageBy);
        siteinformationcommon.Fillcombo_ContractStatus(response.data.ContractStatus);
      }
    });
  },
  InitializeAddPageControls: function InitializeAddPageControls() {
    return new Promise(function (resolve) {
      var promisses = [];
      apiCall.ajaxCallWithReturnData(undefined, 'GET', 'BussinessEntry/SiteInfo_SearchFields').then(function (response) {
        if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
          promisses.push(siteinformationcommon.Fillcombo_FK_MediaID(response.data.mediaType).then(function (res) {
            return res;
          }));
          promisses.push(siteinformationcommon.Fillcombo_FK_StatusID_LightingType(response.data.lightingType).then(function (res) {
            return res;
          }));
          promisses.push(siteinformationcommon.Fillcombo_FK_DistrictID(response.data.districtName).then(function (res) {
            return res;
          }));
          promisses.push(siteinformationcommon.Fillcombo_NoofStructures(response.data.NoofStructures).then(function (res) {
            return res;
          }));
          promisses.push(siteinformationcommon.Fillcombo_Dimensions1Sides(response.data.DimensionsSides).then(function (res) {
            return res;
          }));
          promisses.push(siteinformationcommon.Fillcombo_Dimensions2Sides(response.data.DimensionsSides).then(function (res) {
            return res;
          }));
          promisses.push(siteinformationcommon.Fillcombo_Dimensions3Sides(response.data.DimensionsSides).then(function (res) {
            return res;
          }));
          promisses.push(siteinformationcommon.Fillcombo_Dimensions4Sides(response.data.DimensionsSides).then(function (res) {
            return res;
          }));
        }

        Promise.all(promisses).then(function (result) {
          resolve(true);
        });
      });
    });
  },
  Fillcombo_SiteAvailability: function Fillcombo_SiteAvailability(data) {
    $('#ddlSiteAvailability').empty(); //$('#ddlSiteAvailability').prepend('<option value="" selected> Select </option>')

    $('#ddlSiteAvailability').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_MediaType: function Fillcombo_MediaType(data) {
    $('#ddlMediaType').empty(); //$('#ddlMediaType').prepend('<option value="" selected> Select </option>')

    $('#ddlMediaType').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_DistrictName: function Fillcombo_DistrictName(data) {
    $('#ddlDistrictName').empty(); //$('#ddlDistrictName').prepend('<option value="" selected> Select Product </option>')

    $('#ddlDistrictName').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_LightingType: function Fillcombo_LightingType(data) {
    $('#ddlLightingType').empty(); //$('#ddlLightingType').prepend('<option value="" selected> Select Product </option>')

    $('#ddlLightingType').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_ClientName: function Fillcombo_ClientName(data) {
    $('#ddlClientName').empty(); //$('#ddlClientName').prepend('<option value="" selected> Select Product </option>')

    $('#ddlClientName').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_PaymentStatus: function Fillcombo_PaymentStatus(data) {
    $('#ddlPaymentStatus').empty(); //$('#ddlPaymentStatus').prepend('<option value="" selected> Select Product </option>')

    $('#ddlPaymentStatus').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_InvoiceStatus: function Fillcombo_InvoiceStatus(data) {
    $('#ddlInvoiceStatus').empty(); //$('#ddlInvoiceStatus').prepend('<option value="" selected> Select Product </option>')

    $('#ddlInvoiceStatus').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_PhotoStatus: function Fillcombo_PhotoStatus(data) {
    $('#ddlPhotoStatus').empty(); //$('#ddlPhotoStatus').prepend('<option value="" selected> Select Product </option>')

    $('#ddlPhotoStatus').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_RentperSqrft: function Fillcombo_RentperSqrft(data) {
    $('#ddlRentperSqrft').empty(); //$('#ddlRentperSqrft').prepend('<option value="" selected> Select Product </option>')

    $('#ddlRentperSqrft').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_LightStatus: function Fillcombo_LightStatus(data) {
    $('#ddlLightStatus').empty(); //$('#ddlLightStatus').prepend('<option value="" selected> Select Product </option>')

    $('#ddlLightStatus').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_ManageBy: function Fillcombo_ManageBy(data) {
    $('#ddlManageBy').empty(); //$('#ddlManageBy').prepend('<option value="" selected> Select Product </option>')

    $('#ddlManageBy').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_ContractStatus: function Fillcombo_ContractStatus(data) {
    $('#ddlContractStatus').empty(); //$('#ddlContractStatus').prepend('<option value="" selected> Select Product </option>')

    $('#ddlContractStatus').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select'
      }
    });
  },
  Fillcombo_FK_MediaID: function Fillcombo_FK_MediaID(data) {
    return new Promise(function (resolve) {
      $('#ddlFK_MediaID').empty();
      $('#ddlFK_MediaID').prepend('<option value="" selected> Select </option>');
      $('#ddlFK_MediaID').select2({
        multiple: false,
        data: data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
      resolve(true);
    });
  },
  Fillcombo_FK_StatusID_LightingType: function Fillcombo_FK_StatusID_LightingType(data) {
    return new Promise(function (resolve) {
      $('#ddlFK_StatusID_LightingType').empty();
      $('#ddlFK_StatusID_LightingType').prepend('<option value="" selected> Select </option>');
      $('#ddlFK_StatusID_LightingType').select2({
        multiple: false,
        data: data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
      resolve(true);
    });
  },
  Fillcombo_FK_DistrictID: function Fillcombo_FK_DistrictID(data) {
    return new Promise(function (resolve) {
      $('#ddlFK_DistrictID').empty();
      $('#ddlFK_DistrictID').prepend('<option value="" selected> Select  </option>');
      $('#ddlFK_DistrictID').select2({
        multiple: false,
        data: data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
      resolve(true);
    });
  },
  Fillcombo_NoofStructures: function Fillcombo_NoofStructures(data) {
    return new Promise(function (resolve) {
      $('#ddlNoofStructures').empty();
      $('#ddlNoofStructures').prepend('<option value="" selected> Select  </option>');
      $('#ddlNoofStructures').select2({
        multiple: false,
        data: data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
      resolve(true);
    });
  },
  Fillcombo_Dimensions1Sides: function Fillcombo_Dimensions1Sides(data) {
    return new Promise(function (resolve) {
      $('#ddlDimensions1_Sides').empty();
      $('#ddlDimensions1_Sides').prepend('<option value="" selected> Select  </option>');
      $('#ddlDimensions1_Sides').select2({
        multiple: false,
        data: data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
      resolve(true);
    });
  },
  Fillcombo_Dimensions2Sides: function Fillcombo_Dimensions2Sides(data) {
    return new Promise(function (resolve) {
      $('#ddlDimensions2_Sides').empty();
      $('#ddlDimensions2_Sides').prepend('<option value="" selected> Select  </option>');
      $('#ddlDimensions2_Sides').select2({
        multiple: false,
        data: data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
      resolve(true);
    });
  },
  Fillcombo_Dimensions3Sides: function Fillcombo_Dimensions3Sides(data) {
    return new Promise(function (resolve) {
      $('#ddlDimensions3_Sides').empty();
      $('#ddlDimensions3_Sides').prepend('<option value="" selected> Select  </option>');
      $('#ddlDimensions3_Sides').select2({
        multiple: false,
        data: data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
      resolve(true);
    });
  },
  Fillcombo_Dimensions4Sides: function Fillcombo_Dimensions4Sides(data) {
    return new Promise(function (resolve) {
      $('#ddlDimensions4_Sides').empty();
      $('#ddlDimensions4_Sides').prepend('<option value="" selected> Select  </option>');
      $('#ddlDimensions4_Sides').select2({
        multiple: false,
        data: data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
      resolve(true);
    });
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var siteinformationlist = {
  ListofSites: function ListofSites(ReInitializeCache) {
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
      ContractStatus: $('#ddlContractStatus').val().join()
    };

    if (_typeof(ReInitializeCache) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
      queryparams["ReInitializeCache"] = true;
    }

    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'BussinessEntry/ListSite').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtListofSites');
        siteinformationlist.onSuccess_ListofSites(response.data);
      }
    });
  },
  onSuccess_ListofSites: function onSuccess_ListofSites(data) {
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "SiteID",
        sTitle: "ID",
        sClass: "head1",
        bSortable: true,
        bVisible: false
      }, {
        mData: "PhotoLink",
        defaultContent: "",
        sTitle: "Photo",
        sClass: "head1",
        bSortable: false,
        mRender: function mRender(data, type, full) {
          var id = GetQueryStringParams(data, 'id');
          var markup = '<a href="https://drive.google.com/thumbnail?id=' + id + '" data-toggle="lightbox" data-title="' + full.SiteName + '">';
          markup += '     <img src="https://drive.google.com/uc?id=' + id + '&e=view" alt="' + full.SiteName + '" class="img-fluid">';
          markup += '   </a>'; //var markup = '<a href="javascript:void(0)" onclick="siteinformationlist.OpenGoogleDriveImage(' + data + ')">Photo</a>'

          return markup;
        }
      }, {
        mData: "SiteName",
        sTitle: "Site Name",
        sClass: "head1",
        bSortable: true,
        mRender: function mRender(data, type, full) {
          var markup = '<a href="javascript:void(0)" onclick="siteinformationlist.OpenEntryTab(' + full.SiteID + ')">' + data + '</a>';
          return markup;
        }
      }, {
        mData: "SiteAvailability",
        sTitle: "Availability",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "MediaType",
        sTitle: "Media",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "DistrictName",
        sTitle: "District",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "LightingType",
        sTitle: "Lighting",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "NoofStructures",
        sTitle: "Structures",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "TotalAreaInSQFT",
        sTitle: "Area(m2)",
        sClass: "head1",
        bSortable: true
      }, {
        mData: null,
        sTitle: "Dimensions",
        sClass: "text-center head1",
        bSortable: true,
        bVisible: true,
        mRender: function mRender(data, type, full) {
          return full.Dimensions1 + ',' + full.Dimensions2 + ',' + full.Dimensions3 + ',' + full.Dimensions4;
        }
      }, {
        mData: "ClientName",
        sTitle: "Client Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ContractStatus",
        sTitle: "Contract Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PaymentStatus",
        sTitle: "Payment Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "InvoiceStatus",
        sTitle: "Invoice Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PhotoStatus",
        sTitle: "Photo Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "RentPerSqrt",
        sTitle: "Rent/m2",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "RentPermonth",
        sTitle: "Monthly Rent",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "LightStatus",
        sTitle: "Light Status",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ManageBy",
        sTitle: "Manage By",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PreviousClient",
        sTitle: "PreviousClient",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": false,
      "lengthMenu": [[20, 30, 300, -1], [20, 30, 300, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtListofSites').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Export Site Information',
              extend: 'excel',
              className: 'btn btn-info float-right fas fa-file-excel',
              title: "Site Information",
              extension: '.xls'
              /*exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
              },*/

            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtListofSites').DataTable();
          tmptable.buttons().destroy();
        }
      },
      createdRow: function createdRow(row, data, dataIndex) {
        if (data.PaymentStatus === "OK" && data.PhotoStatus === "OK" && data.LightStatus === "OK") {
          $(row).css({
            'background-color': '#64c98e'
          });
        } else {
          $(row).css({
            'background-color': '#e09494'
          });
        }
      }
    });
  },
  OpenEntryTab: function OpenEntryTab(SiteID) {
    if ($('ul#myTab > li').length >= 2) {
      bootbox.alert('Close and reopen tab.');
      return false;
    }

    var liMarkup = "<li class=\"nav-item active\" id=\"liaddsiteInfo\">\n                    <a class=\"nav-link active\" id=\"addsiteInfo-tab\" data-toggle=\"tab\" href=\"#addsiteInfo\" role=\"tab\" aria-controls=\"add\"\n                    aria-selected=\"false\">Add/Edit Site Information\n                    <button class=\"close\"  type=\"button\" title=\"Remove this page\">&nbsp;&nbsp;<i class=\"fa fa-times\" aria-hidden=\"true\"></i></button>\n                    </a>\n                    </li>";
    $('#myTab').append(liMarkup);
    $('#home-tab').removeClass('active');
    $.get("pages/SiteInfo/SiteInfo_add.html?siteid=" + SiteID + "", function (data, status) {
      $('#myTabContent').append(data);
      $('#home').removeClass('active').removeClass('show');
      createDatePicker();
      siteinformationadd.globEditedSiteID = SiteID;
    });
    $('#myTab').on('click', '.close', function () {
      var tabID = $(this).parents('a').attr('href');
      $(this).parents('li').remove();
      $(tabID).remove();
      $('#divInvoiceDetails').remove();
      $('.tab-content #home').addClass('active');
      $('.nav-tabs a:first').tab('show');
    });
  }
};
"use strict";
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var manageuser = {
  initializeControls: function initializeControls() {
    return new Promise(function (resolve, reject) {
      resolve(common.GetUserRoles().then(function (response) {
        if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
          manageuser.FillComboUserRole(response.data);
        }
      }), manageuser.FillComboTitle());
    });
  },
  FillComboUserRole: function FillComboUserRole(data) {
    $('#ddlUserRole').empty();
    $('#ddlUserRole').prepend('<option value="0" selected> Select Role </option>');
    $('#ddlUserRole').select2({
      multiple: false,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4'
    });
    /*.on('select2:select', meter_reading._onmeterNameChange)
        .on('select2:unselect', meter_reading._onmeterNameChange);*/
  },
  FillComboTitle: function FillComboTitle() {
    //$('#ddlTitle').empty();
    $('#ddlTitle').select2({
      multiple: false,
      closeOnSelect: true,
      theme: 'bootstrap4'
    });
  },
  ListUsers: function ListUsers() {
    apiCall.ajaxCall(null, 'GET', 'UserControl/ListUser').done(function (response) {
      manageuser.onSuccess_ListUsers(response);
    });
  },
  onSuccess_ListUsers: function onSuccess_ListUsers(response) {
    var dtUselist = $('#dtUselist').DataTable({
      bServerSide: false,
      bDestroy: true,
      paging: true,
      autoWidth: false,
      bStateSave: false,
      searching: false,
      lengthChange: false,
      data: response.data,
      language: {
        paginate: {
          previous: "<",
          next: ">"
        },
        info: "Showing _START_ - _END_ of _TOTAL_ users"
      },
      aoColumns: [{
        mData: "Name",
        sTitle: "Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Role",
        sTitle: "Role",
        sClass: "head1",
        bSortable: true
      }, {
        mData: null,
        defaultContent: "",
        sTitle: "Edit",
        sClass: "head1",
        bSortable: true,
        mRender: function mRender(data, type, full) {
          var markup = '<a href="javascript:void(0)" onclick="manageuser.GetUserByID(' + full.UserID + ')">Edit</a>';
          return markup;
        }
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: []
      /*fnDrawCallback: function (oSettings) {
          var info = this.api().page.info();
          if (info.recordsTotal > 0) {
              var tmptable = $('#dtSMREmployeeList').DataTable();
              tmptable.buttons().destroy();
              new $.fn.DataTable.Buttons(tmptable, {
                  buttons: [
                      {
                          text: 'Export',
                          extend: 'excel',
                          className: 'btn select-smr-btn-light-blue',
                          title: "SMR_Employee",
                          extension: '.xls',
                          exportOptions: {
                              stripHtml: false,
                              format: {
                                  body: function (data, column, row) {
                                      
                                      return (column === 18 && column === 19 && column === 14) ? data.replace(/\n/g, '"&CHAR(10)&"') : data.replace(/(&nbsp;|<([^>]+)>)/ig, "");;
                                  }
                              },
                              columns: [2, 5, 13, 14, 15,16,17, 18,6,11]
                              
                          },
                          customize: function (xlsx) {
                              var sheet = xlsx.xl.worksheets['sheet1.xml'];
                              var col = $('col', sheet);
                              $('row c', sheet).attr('s', '55');
                              $(col[3]).attr('width', 40);
                          }
                      },
                  ]
              });
              tmptable.buttons(0, null).container().appendTo('#export-area');
          }
          else if (info.recordsTotal <= 0) {
              var tmptable = $('#dtSMREmployeeList').DataTable();
              tmptable.buttons().destroy();
          }
         
      }*/

    });
  },
  OpenAddModal: function OpenAddModal(OpenCallBack) {
    CreateModal('modAddUser', 'pages/usercontrol/manage-user-add.html', function () {
      resetControls("formAddUser");
      manageuser.initializeControls().then(function () {
        if (_typeof(OpenCallBack) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
          OpenCallBack();
          OpenCallBack = undefined;
        }
      });
    });
  },
  CloseAddModal: function CloseAddModal() {
    $("#modAddUser").modal('hide');
    onModalHidden('modAddUser', function () {
      resetControls("formAddUser");
    });
  },
  AddUpdateUser: function AddUpdateUser() {
    if ($("#hdnUserID").val() <= 0) {
      if (fieldValidation('formAddUser') == true) {
        apiCall.ajaxCall('formAddUser', 'POST', 'UserControl/AddUser').done(function (response) {
          if (response.success == 1) {
            resetControls("formAddUser");
            manageuser.reloadDatatable();
            showToastSuccessMessage(response.message);
          } else {
            showToastErrorMessage(response.message);
          }
        });
      }
    } else if ($("#hdnUserID").val() > 0) {
      $('#txtPassword').prop('required', false);

      if (fieldValidation('formAddUser') == true) {
        apiCall.ajaxCall('formAddUser', 'POST', 'UserControl/UpdateUser').done(function (response) {
          if (response.success == 1) {
            resetControls("formAddUser");
            manageuser.reloadDatatable();
            showToastSuccessMessage(response.message);
            $('#txtPassword').prop('required', true);
          }
        });
      }
    }
  },
  GetUserByID: function GetUserByID(UserID) {
    var obj = {
      UserID: UserID
    };
    manageuser.OpenAddModal(function () {
      apiCall.ajaxCallWithReturnData(obj, "GET", 'UserControl/GetUserByID').done(function (response) {
        apiCall.bindModel('formAddUser', response.data);
      });
    });
  },
  reloadDatatable: function reloadDatatable() {
    clearDatatable("dtUselist");
    this.ListUsers();
  },
  removeWhiteSpace: function removeWhiteSpace() {
    var value = event.target.value;
    $(event.target).val(value.replace(/\s/g, ''));
  }
};
"use strict";

var modifyrights = {
  testt: function testt() {
    alert('modifyrights');
  }
};
"use strict";