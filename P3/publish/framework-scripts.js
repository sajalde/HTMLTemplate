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
  ajaxFileUpload: function ajaxFileUpload(fileuploadelement, Url, Parameters) {
    var formData = new FormData();

    if (_typeof(Parameters) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) || Parameters !== null) {
      $.each(Parameters, function (key, value) {
        formData.append(key, value);
      });
    }

    if (window.FormData !== undefined) {
      var fileUpload = $("#" + fileuploadelement).get(0);
      var files = fileUpload.files;

      if (files.length <= 0) {
        return alert("PLease select a file.");
      } // Create FormData object
      // Looping over all files and add it to FormData object


      for (var i = 0; i < files.length; i++) {
        // Adding one more key to FormData object   
        formData.append(files[i].name, files[i]);
      }

      return $.ajax({
        url: apiEndpoint + Url,
        type: "POST",
        contentType: false,
        // Not to set any content header
        processData: false,
        // Not to process data
        data: formData
      });
    } else {
      return alert("FormData is not supported.");
    }
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
  },
  FillMonthList: function FillMonthList(element) {
    this.MonthList().then(function (res) {
      $('#' + element).empty();
      $('#' + element).prepend('<option value="0" selected> Select</option>');
      $('#' + element).select2({
        multiple: false,
        data: res.data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
    });
  },
  FillYearList: function FillYearList(element) {
    this.YearList().then(function (res) {
      $('#' + element).empty();
      $('#' + element).prepend('<option value="0" selected> Select</option>');
      $('#' + element).select2({
        multiple: false,
        data: res.data,
        closeOnSelect: true,
        theme: 'bootstrap4'
      });
    });
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
      aaSorting: [],
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
    xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token")); //xhr.setRequestHeader('Cache-Control', 'private');
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

GetQueryStringParams = function GetQueryStringParams(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');

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

var config = {
  apiEndpoint: "http://localhost:5000/api/" //  apiEndpoint : "http://localhost/p3api/api/"
  //apiEndpoint : "http://111.93.160.6:98/api/"

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

var importfactoryproductiontarget = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
  },
  ListPPFactoryProductionTarget: function ListPPFactoryProductionTarget() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val()
    };
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'ProductionPlan/List_FactoryProductionTarget').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtListPPFactoryProductionTarget');
        importfactoryproductiontarget.onSuccess_ListPPFactoryProductionTarget(response.data);
      }
    });
  },
  onSuccess_ListPPFactoryProductionTarget: function onSuccess_ListPPFactoryProductionTarget(data) {
    var month = $('#ddlMonth').select2('data')[0].text;
    var year = $('#ddlYear').select2('data')[0].text;
    var dtListPPFactoryProductionTarget = $('#dtListPPFactoryProductionTarget').DataTable({
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "ID",
        sTitle: "ID",
        sClass: "head1",
        bSortable: false,
        bVisible: false
      }, {
        mData: "ForMonth",
        sTitle: "For Month",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductCode",
        sTitle: "Product Code",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "Pack Unit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "FinalUnits_QTY",
        sTitle: "Units",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtListPPFactoryProductionTarget').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Download Factory Production Target',
              extend: 'excel',
              className: 'btn btn-info float-right ',
              //fas fa-file-excel
              title: "FactoryProductionTarget",
              extension: '.xls'
            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtListPPFactoryProductionTarget').DataTable();
          tmptable.buttons().destroy();
        }
      }
    });
  },
  UploadExcel_FactoryProductionTarget: function UploadExcel_FactoryProductionTarget() {
    apiCall.ajaxFileUpload('FileUpload1', 'ProductionPlan/UploadExcel_FactoryProductionTarget').then(function (res) {
      clearDatatable('dtListPPFactoryProductionTarget');

      if (res.success == 1) {
        importsalesprojection.onSuccess_ListPPFactoryProductionTarget(res.data);
      }
    });
  },
  SaveExcel_FactoryProductionTarget: function SaveExcel_FactoryProductionTarget() {
    var tabledata = $('#dtListPPFactoryProductionTarget').dataTable().fnGetData();
    console.log(tabledata);
    apiCall.ajaxCall(undefined, 'POST', 'ProductionPlan/SaveExcel_FactoryProductionTarget', {
      FactoryProductionTarget_Data: tabledata
    });
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var importPhysicianSamplePlan = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
  },
  UploadExcel_FactoryProductionTarget: function UploadExcel_FactoryProductionTarget() {
    if ($('#ddlYear').val() == "0" && $('#ddlMonth').val() == "0") {
      showToastErrorMessage("Year and Month can not be blank.Select Year and Month");
      return false;
    }

    var parameters = {
      Year: $('#ddlYear').val(),
      Month: $('#ddlMonth').val()
    };
    apiCall.ajaxFileUpload('FileUpload1', 'ProductionPlan/UploadExcel_PhysicianSamplePlan', parameters).then(function (res) {
      clearDatatable('dtList_PhysicianSamplePlan');

      if (res.success == 1) {
        importPhysicianSamplePlan.onSuccess_List_PhysicianSamplePlan(res.data);
      }
    });
  },
  List_PhysicianSamplePlan: function List_PhysicianSamplePlan() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val()
    };
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'ProductionPlan/List_PhysicianSamplePlan').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtList_PhysicianSamplePlan');
        importPhysicianSamplePlan.onSuccess_List_PhysicianSamplePlan(response.data);
      }
    });
  },
  onSuccess_List_PhysicianSamplePlan: function onSuccess_List_PhysicianSamplePlan(data) {
    var dtList_PhysicianSamplePlan = $('#dtList_PhysicianSamplePlan').DataTable({
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "ID",
        sTitle: "ID",
        sClass: "head1",
        bSortable: false,
        bVisible: false
      }, {
        mData: "MonthName",
        sTitle: "For Month",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "Pack Unit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PhysicianSampleQTY",
        sTitle: "Units",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtList_PhysicianSamplePlan').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Download Factory Production Target',
              extend: 'excel',
              className: 'btn btn-info float-right ',
              //fas fa-file-excel
              title: "FactoryProductionTarget",
              extension: '.xls'
            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtList_PhysicianSamplePlan').DataTable();
          tmptable.buttons().destroy();
        }
      }
    });
  },
  SaveExcel_PhysicianSamplePlan: function SaveExcel_PhysicianSamplePlan() {
    if ($('#ddlYear').val() == "0" && $('#ddlMonth').val() == "0") {
      showToastErrorMessage("Year and Month can not be blank.Select Year and Month");
      return false;
    }

    var tabledata = $('#dtList_PhysicianSamplePlan').dataTable().fnGetData();

    if (tabledata.length > 0) {
      apiCall.ajaxCall(undefined, 'POST', 'ProductionPlan/SaveExcel_PhysicianSamplePlan', {
        sampledata: tabledata,
        year: $('#ddlYear').val(),
        month: $('#ddlMonth').val()
      }).then(function (res) {
        if (res.success == true) {
          $("#FileUpload1").val('');
          $('#ddlYear').val('0').trigger('change');
          $('#ddlMonth').val('0').trigger('change');
          clearDatatable('dtList_PhysicianSamplePlan');
        }
      });
    }
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var pro_dataprocessing = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
  },
  CallAPI: function CallAPI(sptocall, customizedtext) {
    customizedtext = _typeof(customizedtext) == (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) ? '' : "Please Press Next ".concat(customizedtext, " to Process Planning");

    if ($('#ddlYear').val() == "0" && $('#ddlMonth').val() == "0") {
      showToastErrorMessage("Year and Month can not be blank.Select Year and Month");
      return false;
    }

    var ajaxdata = {
      Year: $('#ddlYear').val(),
      Month: $('#ddlMonth').val(),
      SpToCall: sptocall
    };
    apiCall.ajaxCall(undefined, 'GET', 'ProductionPlan/ProductionPlaning_DataProcessing', ajaxdata).then(function (res) {
      if (res.success == true) {
        showToastSuccessMessage("Task Completed Successfully. ".concat(customizedtext));
      }
    });
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ProductionPlanforecasting = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
    apiCall.ajaxCallWithReturnData(undefined, 'GET', 'SalesForecast/ForcastingDetailsSearchFields').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        ProductionPlanforecasting.FillcomboProduct(response.data.products);
      }
    });
  },
  FillcomboProduct: function FillcomboProduct(data) {
    $('#ddlProductName').empty();
    $('#ddlProductName').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select Product'
      }
    });
  },
  ListProductionPlan_VolumeConversion: function ListProductionPlan_VolumeConversion() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val(),
      Product: $('#ddlProductName').val().join()
    };
    clearDatatable('dtList_VolumeConversion');
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'ProductionPlan/List_ProductionPlan_VolumeConversion').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtList_VolumeConversion');
        ProductionPlanforecasting.onSuccess_ListVolumeConversion(response.data);
      }
    });
  },
  onSuccess_ListVolumeConversion: function onSuccess_ListVolumeConversion(data) {
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "ForMonth",
        sTitle: "Mointh",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductType",
        sTitle: "Product Type",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Category",
        sTitle: "Category",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "Pack Unit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProjectionForecastQTY",
        sTitle: "Forecast QTY",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Factor",
        sTitle: "Factor",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "FactorProjectionForecastQTY",
        sTitle: "Factor Projection QTY",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "VolumeInLtrs",
        sTitle: "Volume (In Ltrs)",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtList_VolumeConversion').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Production Planning',
              extend: 'excel',
              className: 'btn btn-info float-right fas fa-file-excel',
              title: "Production Planning",
              extension: '.xls'
            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtList_VolumeConversion').DataTable();
          tmptable.buttons().destroy();
        }
      }
    });
  },
  ListProductionPlan_VolumeCharge: function ListProductionPlan_VolumeCharge() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val(),
      Product: $('#ddlProductName').val().join()
    };
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'ProductionPlan/List_ProductionPlan_VolumeCharge').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtList_VolumeCharge');
        ProductionPlanforecasting.onSuccess_ListVolumeCharge(response.data);
      }
    });
  },
  onSuccess_ListVolumeCharge: function onSuccess_ListVolumeCharge(data) {
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "ForMonth",
        sTitle: "Mointh",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "VolumeInLtrs",
        sTitle: "Volume(In Ltrs)",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "WIPInLtrs",
        sTitle: "WIP (In Ltrs)",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ChargeableVolumeInLtrs",
        sTitle: "Chargeable Volume (In Ltrs)",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "BatchSize",
        sTitle: "Batch Size",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "FinalChargeInLtrs",
        sTitle: "Final Charge (In Ltrs)",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtList_VolumeCharge').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Production Planning',
              extend: 'excel',
              className: 'btn btn-info float-right fas fa-file-excel',
              title: "Production Planning",
              extension: '.xls'
            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtList_VolumeCharge').DataTable();
          tmptable.buttons().destroy();
        }
      }
    });
  },
  ListProductionPlan_FinalChargeUnit: function ListProductionPlan_FinalChargeUnit() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val(),
      Product: $('#ddlProductName').val().join()
    };
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'ProductionPlan/List_ProductionPlan_FinalChargeUnit').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtList_FinalChargeUnit');
        ProductionPlanforecasting.onSuccess_ListFinalChargeUnit(response.data);
      }
    });
  },
  onSuccess_ListFinalChargeUnit: function onSuccess_ListFinalChargeUnit(data) {
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "ForMonth",
        sTitle: "Mointh",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductType",
        sTitle: "Product Type",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Category",
        sTitle: "Category",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "Pack Unit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "FactorProjectionForecastQTY",
        sTitle: "Factor Projection QTY",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "FinalChargeInUnit",
        sTitle: "Final Charge In Unit",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtList_FinalChargeUnit').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Production Planning',
              extend: 'excel',
              className: 'btn btn-info float-right fas fa-file-excel',
              title: "Production Planning",
              extension: '.xls'
            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtList_FinalChargeUnit').DataTable();
          tmptable.buttons().destroy();
        }
      }
    });
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var salesprojection = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
  },
  Listsalesprojection: function Listsalesprojection() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val(),
      ForecastingType: $('#ddlForecastingType').val()
    };
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'SalesForecast/ListImportProjection').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtListsalesprojection');
        salesprojection.onSuccess_Listsalesprojection(response.data);
      }
    });
  },
  onSuccess_Listsalesprojection: function onSuccess_Listsalesprojection(data) {
    var month = $('#ddlMonth').select2('data')[0].text;
    var year = $('#ddlYear').select2('data')[0].text;
    var dtListsalesprojection = $('#dtListsalesprojection').DataTable({
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "ID",
        sTitle: "ID",
        sClass: "head1",
        bSortable: false,
        bVisible: false
      }, {
        mData: "ForecastingType",
        sTitle: "Type",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "HQ",
        sTitle: "HQ",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Depot",
        sTitle: "Depot",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Division",
        sTitle: "Division",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductCode",
        sTitle: "Product Code",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "Pack Unit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProjectedTotalSalesQTY",
        sTitle: "Projected QTY For",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[100, 200, 300, -1], [100, 200, 300, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtListsalesprojection').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Download Sales Projection',
              extend: 'excel',
              className: 'btn btn-info float-right ',
              //fas fa-file-excel
              title: "SalesProjection",
              extension: '.xls'
              /*exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                },*/

            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtListsalesprojection').DataTable();
          tmptable.buttons().destroy();
        }
      }
    });
  },
  uploadProjection: function uploadProjection() {
    apiCall.ajaxFileUpload('FileUpload1', 'SalesForecast/UploadProjection').then(function (res) {
      clearDatatable('dtListsalesprojection');

      if (res.success == 1) {
        salesprojection.onSuccess_Listsalesprojection(res.data);
      }
    });
  },
  updateProjection: function updateProjection() {
    //let tabledata=JSON.stringify($('#dtListsalesprojection').dataTable().fnGetData());
    var tabledata = $('#dtListsalesprojection').dataTable().fnGetData();
    console.log(tabledata);
    apiCall.ajaxCall(undefined, 'POST', 'SalesForecast/UpdateProjection', {
      ProjectionData: tabledata
    });
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var saleforecastsummary = {
  Initialize: function Initialize() {
    common.MonthList().then(function (res) {
      saleforecastsummary.FillMonthList(res.data);
    });
    common.YearList().then(function (res) {
      saleforecastsummary.FillYearList(res.data);
    });
  },
  FillMonthList: function FillMonthList(data) {
    $('#ddlMonth').empty();
    $('#ddlMonth').prepend('<option value="0" selected> Select Month </option>');
    $('#ddlMonth').select2({
      multiple: false,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4'
    });
  },
  FillYearList: function FillYearList(data) {
    $('#ddlYear').empty();
    $('#ddlYear').prepend('<option value="0" selected> Select Year </option>');
    $('#ddlYear').select2({
      multiple: false,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4'
    });
  },
  ListSalesForecastSummary: function ListSalesForecastSummary() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val()
    };
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'SalesForecast/SalesForecastSummary').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtSalesForecastSummary');
        saleforecastsummary.onSuccess_ListSalesForecastSummary(response.data);
      }
    });
  },
  onSuccess_ListSalesForecastSummary: function onSuccess_ListSalesForecastSummary(data) {
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "ProductName",
        sTitle: "ProductName",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductCode",
        sTitle: "ProductCode",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "PackUnit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Next_ProjectionSalesQTY",
        sTitle: "ProjectionSalesQTY",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[10, 20, 30, -1], [10, 20, 30, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtSalesForecastSummary').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Export',
              extend: 'excel',
              className: 'btn btn-info float-right fas fa-file-excel',
              title: "SalesForecastSummary",
              extension: '.xls'
              /*exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                },*/

            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtSalesForecastSummary').DataTable();
          tmptable.buttons().destroy();
        }
      } // createdRow: function (row, data, index) {
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
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var salesforecasting = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
    apiCall.ajaxCallWithReturnData(undefined, 'GET', 'SalesForecast/ForcastingDetailsSearchFields').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        salesforecasting.FillcomboProduct(response.data.products);
        salesforecasting.FillcomboDivision(response.data.divisions);
        salesforecasting.FillcomboStockLocation(response.data.stocklocations);
      }
    });
  },
  FillcomboProduct: function FillcomboProduct(data) {
    $('#ddlProductName').empty(); //$('#ddlProductName').prepend('<option value="" selected> Select Product </option>')

    $('#ddlProductName').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select Product'
      }
    });
  },
  FillcomboDivision: function FillcomboDivision(data) {
    $('#ddlDivision').empty(); // $('#ddlDivision').prepend('<option value="0" selected> Select Division </option>')

    $('#ddlDivision').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select Division'
      }
    });
  },
  FillcomboStockLocation: function FillcomboStockLocation(data) {
    $('#ddlStockLocation').empty(); // $('#ddlStockLocation').prepend('<option value="" selected> Select Location </option>')

    $('#ddlStockLocation').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select Location'
      }
    });
  },
  ListSalesForecasting: function ListSalesForecasting() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val(),
      Product: $('#ddlProductName').val().join(),
      Division: $('#ddlDivision').val().join(),
      Location: $('#ddlStockLocation').val().join()
    };
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'SalesForecast/SalesForecasting').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtListSalesForecasting');
        salesforecasting.onSuccess_ListListSalesForecasting(response.data);
      }
    });
  },
  onSuccess_ListListSalesForecasting: function onSuccess_ListListSalesForecasting(data) {
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "HQ",
        sTitle: "HQ",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "DepotName",
        sTitle: "Depot",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "DivisionName",
        sTitle: "Division",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductCode",
        sTitle: "Product Code",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "Pack Unit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProjectedQTY",
        sTitle: "Projected QTY",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[100, 200, 300, -1], [100, 200, 300, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtListSalesForecasting').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: ' Export Sales Forecasting',
              extend: 'excel',
              className: 'btn btn-info float-right fas fa-file-excel',
              title: "SalesForecasting",
              extension: '.xls'
              /*exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                },*/

            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtListSalesForecasting').DataTable();
          tmptable.buttons().destroy();
        }
      } // createdRow: function (row, data, index) {
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
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var salesforecastingComparison = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
    apiCall.ajaxCallWithReturnData(undefined, 'GET', 'SalesForecast/ForcastingComparison_SearchFields').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        salesforecastingComparison.FillcomboProduct(response.data.products);
        salesforecastingComparison.FillcomboDivision(response.data.divisions);
        salesforecastingComparison.FillcomboStockLocation(response.data.stocklocations);
      }
    });
  },
  FillcomboProduct: function FillcomboProduct(data) {
    $('#ddlProductName').empty(); //$('#ddlProductName').prepend('<option value="" selected> Select Product </option>')

    $('#ddlProductName').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select Product'
      }
    });
  },
  FillcomboDivision: function FillcomboDivision(data) {
    $('#ddlDivision').empty(); // $('#ddlDivision').prepend('<option value="0" selected> Select Division </option>')

    $('#ddlDivision').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select Division'
      }
    });
  },
  FillcomboStockLocation: function FillcomboStockLocation(data) {
    $('#ddlStockLocation').empty(); // $('#ddlStockLocation').prepend('<option value="" selected> Select Location </option>')

    $('#ddlStockLocation').select2({
      multiple: true,
      data: data,
      closeOnSelect: true,
      theme: 'bootstrap4',
      placeholder: {
        id: '',
        // the value of the option
        text: 'Select Location'
      }
    });
  },
  ListSalesForecastingComparison: function ListSalesForecastingComparison(ReInitializeCache) {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val(),
      Product: $('#ddlProductName').val().join(),
      Division: $('#ddlDivision').val().join(),
      Location: $('#ddlStockLocation').val().join()
    };

    if (_typeof(ReInitializeCache) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
      queryparams["ReInitializeCache"] = true;
    }

    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'SalesForecast/SalesForecastingComparison').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtListSalesForecastingComparison');
        salesforecastingComparison.onSuccess_ListSalesForecastingComparison(response.data);
      }
    });
  },
  onSuccess_ListSalesForecastingComparison: function onSuccess_ListSalesForecastingComparison(data) {
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "HQ",
        sTitle: "HQ",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "DepotName",
        sTitle: "Depot",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "DivisionName",
        sTitle: "Division",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductCode",
        sTitle: "Product Code",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "Pack Unit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Logistics_ProjectionSalesQTY",
        sTitle: "Logistics",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Marketing_ProjectedSaleQTY",
        sTitle: "Marketing",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "DifferencePersentage",
        sTitle: "Difference(%)",
        sClass: "head1",
        bSortable: true,
        mRender: function mRender(data) {
          return data + "%";
        }
      }, {
        mData: "NextMonth_ForecastingQTY",
        sTitle: "Forecasting",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "NextMonth_FinialForecastingQTY",
        sTitle: "Final Forecasting",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "IsAutoCalculate",
        defaultContent: '',
        sTitle: "",
        sClass: "head1",
        bSortable: false,
        mRender: function mRender(data, type, row, meta) {
          if (data == false) {
            var markup = '<a  href="javascript:void(0)" onclick="salesforecastingComparison.onRowEditClick(this)">';
            markup += '      <i class="fas fa-edit" aria-hidden="true"></i>';
            markup += '   </a>';
            markup += '<a  href="javascript:void(0)" onclick="salesforecastingComparison.onRowSaveClick(this,' + row.SaleComparisonID + ')" style="display:none">';
            markup += '      <i class="fas fa-save" aria-hidden="true"></i>';
            markup += '   </a>';
            markup += '<a  href="javascript:void(0)" onclick="salesforecastingComparison.onRowUndoClick(this)" style="display:none">';
            markup += '      <i class="fas fa-undo-alt" aria-hidden="true"></i>';
            markup += '   </a>';
            return markup;
          }
        }
      }, {
        mData: "SaleComparisonID",
        sTitle: "ID",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[100, 200, 300, -1], [100, 200, 300, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtListSalesForecastingComparison').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: ' Export Sale Forecasting Comparison ',
              extend: 'excel',
              className: 'btn btn-info float-right fas fa-file-excel',
              title: "SalesForecastingComparison",
              extension: '.xls'
              /*exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                },*/

            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtListSalesForecastingComparison').DataTable();
          tmptable.buttons().destroy();
        }
      },
      createdRow: function createdRow(row, data, dataIndex) {
        if (parseFloat(data.DifferencePersentage) > 10) {
          $(row).css({
            "background-color": '#ffcccb'
          });
        }
      }
    });
  },
  onRowEditClick: function onRowEditClick(element, row) {
    $(element).hide();
    $(element).nextAll('a').show();
    var $row = $(element).closest("tr");
    var $td = $row.find("td:eq(10)");
    var txt = $td.text();
    $td.html("").append("<input type='text' value=\"" + txt + "\">");
  },
  onRowSaveClick: function onRowSaveClick(element, SaleComparisonID) {
    var $row = $(element).closest("tr");
    var $td = $row.find("td:eq(10)");
    var txt = $td.find("input").val();
    apiCall.ajaxCall(undefined, 'POST', 'SalesForecast/SalesForecastingComparisonSave', {
      SaleComparisonID: SaleComparisonID,
      NextMonth_FinialForecastingQTY: txt
    }).then(function (res) {
      if (res.success == 1) {
        salesforecastingComparison.ListSalesForecastingComparison(true);
      }
    }).done(function () {
      $(element).hide();
      $(element).prev('a').show();
      bootbox.alert("Sales Forecasting Comparison added."); // $td.html(txt)
    });
  },
  onRowUndoClick: function onRowUndoClick(element) {
    $(element).hide();
    $(element).prev('a').hide();
    var firsta = $(element).parent().find('a')[0];
    $(firsta).show();
    var $row = $(element).closest("tr");
    var $td = $row.find("td:eq(10)");
    var txt = $td.find("input").val();
    $td.html(txt);
  }
};
"use strict";

var dataprocessing = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
  },
  processData: function processData(sptocall) {
    var ajaxdata = {
      Year: $('#ddlYear').val(),
      Month: $('#ddlMonth').val(),
      ForecastingType: $('#ddlForecastingType').val(),

      /* ToDate: $('#dtTodate').val(),*/
      SpToCall: sptocall
    };
    apiCall.ajaxCall(undefined, 'GET', 'SetupProcess/DataProcessing', ajaxdata).then(function (res) {});
  }
};
"use strict";

var datatransfer = {
  transferData: function transferData(sptocall) {
    var ajaxdata = {
      FromDate: $('#dtFromdate').val(),
      ToDate: $('#dtTodate').val(),
      SpToCall: sptocall
    };
    apiCall.ajaxCall(undefined, 'GET', 'SetupProcess/DataTransfer', ajaxdata).then(function (res) {});
  }
};
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var importsalesprojection = {
  Initialize: function Initialize() {
    common.FillMonthList('ddlMonth');
    common.FillYearList('ddlYear');
  },
  Listimportsalesprojection: function Listimportsalesprojection() {
    var queryparams = {
      Month: $('#ddlMonth').val(),
      Year: $('#ddlYear').val(),
      ForecastingType: $('#ddlForecastingType').val()
    };
    apiCall.ajaxCallWithReturnData(queryparams, 'GET', 'SalesForecast/ListImportProjection').then(function (response) {
      if (_typeof(response) != (typeof undefined === "undefined" ? "undefined" : _typeof(undefined))) {
        clearDatatable('dtListimportsalesprojection');
        importsalesprojection.onSuccess_Listimportsalesprojection(response.data);
      }
    });
  },
  onSuccess_Listimportsalesprojection: function onSuccess_Listimportsalesprojection(data) {
    var month = $('#ddlMonth').select2('data')[0].text;
    var year = $('#ddlYear').select2('data')[0].text;
    var dtListimportsalesprojection = $('#dtListimportsalesprojection').DataTable({
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
        info: "Showing _START_ - _END_ of _TOTAL_ readings"
      },
      aoColumns: [{
        mData: "ID",
        sTitle: "ID",
        sClass: "head1",
        bSortable: false,
        bVisible: false
      }, {
        mData: "ForecastingType",
        sTitle: "Type",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "HQ",
        sTitle: "HQ",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Depot",
        sTitle: "Depot",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "Division",
        sTitle: "Division",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductCode",
        sTitle: "Product Code",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProductName",
        sTitle: "Product Name",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "PackUnit",
        sTitle: "Pack Unit",
        sClass: "head1",
        bSortable: true
      }, {
        mData: "ProjectedTotalSalesQTY",
        sTitle: "Projected QTY For",
        sClass: "head1",
        bSortable: true
      }],
      bUseRendered: true,
      sPaginationType: "simple_numbers",
      aaSorting: [],
      "dom": '<<"float-right"l>f<t><"#df"<"float-left" i><"float-right pagination pagination-sm p-1"p>>>',
      "lengthChange": true,
      "lengthMenu": [[100, 200, 300, -1], [100, 200, 300, "All"]],
      fnDrawCallback: function fnDrawCallback(oSettings) {
        var info = this.api().page.info();

        if (info.recordsTotal > 0) {
          var tmptable = $('#dtListimportsalesprojection').DataTable();
          tmptable.buttons().destroy();
          new $.fn.DataTable.Buttons(tmptable, {
            buttons: [{
              text: 'Download Sales Projection',
              extend: 'excel',
              className: 'btn btn-info float-right ',
              //fas fa-file-excel
              title: "SalesProjection",
              extension: '.xls'
              /*exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                },*/

            }]
          });
          tmptable.buttons(0, null).container().appendTo('#export-area');
        } else if (info.recordsTotal <= 0) {
          var tmptable = $('#dtListimportsalesprojection').DataTable();
          tmptable.buttons().destroy();
        }
      }
    });
  },
  uploadProjection: function uploadProjection() {
    apiCall.ajaxFileUpload('FileUpload1', 'SalesForecast/UploadProjection').then(function (res) {
      clearDatatable('dtListimportsalesprojection');

      if (res.success == 1) {
        importsalesprojection.onSuccess_Listimportsalesprojection(res.data);
      }
    });
  },
  updateProjection: function updateProjection() {
    //let tabledata=JSON.stringify($('#dtListimportsalesprojection').dataTable().fnGetData());
    var tabledata = $('#dtListimportsalesprojection').dataTable().fnGetData();
    console.log(tabledata);
    apiCall.ajaxCall(undefined, 'POST', 'SalesForecast/UpdateProjection', {
      ProjectionData: tabledata
    });
  }
};