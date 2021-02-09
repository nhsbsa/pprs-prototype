(function () {
  "use strict"
  var root = this;
  if(typeof root.GOVUK === 'undefined') { root.GOVUK = {}; }

  /*
    Cookie methods
    ==============

    Usage:

      Setting a cookie:
      GOVUK.cookie('hobnob', 'tasty', { days: 30 });

      Reading a cookie:
      GOVUK.cookie('hobnob');

      Deleting a cookie:
      GOVUK.cookie('hobnob', null);
  */
  GOVUK.cookie = function (name, value, options) {
    if(typeof value !== 'undefined'){
      if(value === false || value === null) {
        return GOVUK.setCookie(name, '', { days: -1 });
      } else {
        return GOVUK.setCookie(name, value, options);
      }
    } else {
      return GOVUK.getCookie(name);
    }
  };
  GOVUK.setCookie = function (name, value, options) {
    if(typeof options === 'undefined') {
      options = {};
    }
    var cookieString = name + "=" + value + "; path=/";
    if (options.days) {
      var date = new Date();
      date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
      cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    if (document.location.protocol == 'https:'){
      cookieString = cookieString + "; Secure";
    }
    document.cookie = cookieString;
  };
  GOVUK.getCookie = function (name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0, len = cookies.length; i < len; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  };
}).call(this);
(function () {
  "use strict"
  var root = this;
  if(typeof root.GOVUK === 'undefined') { root.GOVUK = {}; }

  GOVUK.addCookieMessage = function () {
    var message = document.getElementById('global-cookie-message'),
        hasCookieMessage = (message && GOVUK.cookie('seen_cookie_message') === null);

    if (hasCookieMessage) {
      message.style.display = 'block';
      GOVUK.cookie('seen_cookie_message', 'yes', { days: 28 });
    }
  };
}).call(this);
(function() {
  "use strict"

  // add cookie message
  if (window.GOVUK && GOVUK.addCookieMessage) {
    GOVUK.addCookieMessage();
  }

  // header navigation toggle
  if (document.querySelectorAll && document.addEventListener){
    var els = document.querySelectorAll('.js-header-toggle'),
        i, _i;
    for(i=0,_i=els.length; i<_i; i++){
      els[i].addEventListener('click', function(e){
        e.preventDefault();
        var target = document.getElementById(this.getAttribute('href').substr(1)),
            targetClass = target.getAttribute('class') || '',
            sourceClass = this.getAttribute('class') || '';

        if(targetClass.indexOf('js-visible') !== -1){
          target.setAttribute('class', targetClass.replace(/(^|\s)js-visible(\s|$)/, ''));
        } else {
          target.setAttribute('class', targetClass + " js-visible");
        }
        if(sourceClass.indexOf('js-visible') !== -1){
          this.setAttribute('class', sourceClass.replace(/(^|\s)js-visible(\s|$)/, ''));
        } else {
          this.setAttribute('class', sourceClass + " js-visible");
        }
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') !== "true");
        target.setAttribute('aria-hidden', target.getAttribute('aria-hidden') === "false");
      });
    }
  }
}).call(this);
(function () {
    var toggle = document.getElementById("expanderToggle");
    var records = document.getElementsByTagName("details");
    if (toggle != null) {
        toggle.onchange = function() {
            if (toggle.checked) {
                for (var i = 0; i < records.length; i++) {
                    records[i].classList.remove("nhsuk-expander");
                }
            } else {
                for (var i = 0; i < records.length; i++) {
                    records[i].classList.add("nhsuk-expander");
                }
            }
        }
    }
}).call(this);
(function () {
    var purchaseVolume = document.getElementById("purchase-volume");
    var netPurchaseCost = document.getElementById("net-purchase-cost");
    var addAvePurchasePrice = document.getElementById("average-purchase-price");

    purchaseVolume.onchange = function() {calcDisabledInputFields(addAvePurchasePrice, purchaseVolume.value, netPurchaseCost.value)};
    netPurchaseCost.onchange = function() {calcDisabledInputFields(addAvePurchasePrice, purchaseVolume.value, netPurchaseCost.value)};

    var salesVolume = document.getElementById("sales-volume");
    var netSalesValue = document.getElementById("net-sales-value");
    var addAveSalesPrice = document.getElementById("average-sales-price");

    salesVolume.onchange = function() {calcDisabledInputFields(addAveSalesPrice, salesVolume.value, netSalesValue.value)};
    netSalesValue.onchange = function() {calcDisabledInputFields(addAveSalesPrice, salesVolume.value, netSalesValue.value)};

}).call(this);
function calcDisabledInputFields(addAvePrice, volumeValue, netValue) {
    var sum = netValue / volumeValue;

    if (isNaN(sum) || sum == "Infinity") {
        addAvePrice.value = "";
    } else {
        addAvePrice.value = sum.toFixed(2);
    }
}
function addRow () {
    var table = document.getElementById("myTable");
    var medicineNameDropdown = document.getElementById("medicine-name");
    var found = false;
    for (var i = 1, row; row = table.rows[i]; i++) {
        if (medicineNameDropdown.value == row.cells[0].innerHTML) {
            found = true;
            for (var j = 1, col; col = row.cells[j]; j++) {
                switch(j) {
                    case 1:
                        col.innerHTML = document.getElementById("purchase-volume").value;
                        break;
                    case 2:
                        col.innerHTML = document.getElementById("net-purchase-cost").value;
                        break;
                    case 3:
                        col.innerHTML = document.getElementById("sales-volume").value;
                        break;
                    case 4:
                        col.innerHTML = document.getElementById("net-sales-value").value;
                        break;
                    case 5:
                        col.innerHTML = document.getElementById("comments-on-price-changes").value;
                        break;
                    case 6:
                        col.innerHTML = document.getElementById("average-purchase-price").value;
                        break;
                    case 7:
                        col.innerHTML = document.getElementById("average-sales-price").value;
                        break;
                }
            }
        }
    }

    if (found === false) {
        var row;
        if (window.location.href.indexOf("new") != -1) {
            row = table.insertRow(-1);
        } else {
            row = table.insertRow(table.rows.length - 1);
        }

        var cell1 = row.insertCell(0);
        cell1.innerHTML = medicineNameDropdown.value;

        var cell2 = row.insertCell(1);
        cell2.innerHTML = document.getElementById("purchase-volume").value;

        var cell3 = row.insertCell(2);
        cell3.innerHTML = document.getElementById("net-purchase-cost").value;

        var cell4 = row.insertCell(3);
        cell4.innerHTML = document.getElementById("sales-volume").value;

        var cell5 = row.insertCell(4);
        cell5.innerHTML = document.getElementById("net-sales-value").value;

        var cell6 = row.insertCell(5);
        var commentsOnPriceChanges = document.getElementById("comments-on-price-changes");
        cell6.innerHTML = commentsOnPriceChanges.options[commentsOnPriceChanges.selectedIndex].text;

        var cell7 = row.insertCell(6);
        cell7.innerHTML = document.getElementById("average-purchase-price").value;

        var cell8 = row.insertCell(7);
        cell8.innerHTML = document.getElementById("average-sales-price").value;

        var cell9 = row.insertCell(8);
        cell9.innerHTML = '<button class="button-looks-like-link" onclick="deleteRow(this)">Delete</button>'
    }
}
function editRow (row) {
    var table = document.getElementById("myTable");
    var rowIndex = row.parentNode.parentNode.rowIndex;

    for (var j = 0, col; col = table.rows[rowIndex].cells[j]; j++) {
        switch(j) {
            case 0:
                document.getElementById("medicine-name").value = col.innerHTML;
                break;
            case 1:
                document.getElementById("purchase-volume").value = col.innerHTML;
                break;
            case 2:
                document.getElementById("net-purchase-cost").value = col.innerHTML;
                break;
            case 3:
                document.getElementById("sales-volume").value = col.innerHTML;
                break;
            case 4:
                document.getElementById("net-sales-value").value = col.innerHTML;
                break;
            case 5:
                document.getElementById("additional-comments").value = col.innerHTML;
                break;
            case 6:
                document.getElementById("comments-on-price-changes").value = col.innerHTML;
                break;
            case 7:
                document.getElementById("average-purchase-price").value = col.innerHTML;
                break;
            case 8:
                document.getElementById("average-sales-price").value = col.innerHTML;
                break;
        }
    }

    deleteRow(row);
}
function deleteRow (row) {
    var rowIndex = row.parentNode.parentNode.rowIndex;
    document.getElementById("myTable").deleteRow(rowIndex);
}
(function editRow () {
    var medicineName = document.getElementById("medicine-name");
    medicineName.onchange = function() {
        var table = document.getElementById("myTable");
        var found = false;
        for (var i = 1, row; row = table.rows[i]; i++) {
            if (medicineName.value == row.cells[0].innerHTML) {
                found = true;
                for (var j = 1, col; col = row.cells[j]; j++) {
                    switch(j) {
                        case 1:
                            document.getElementById("purchase-volume").value = col.innerHTML;
                            break;
                        case 2:
                            document.getElementById("net-purchase-cost").value = col.innerHTML;
                            break;
                        case 3:
                            document.getElementById("sales-volume").value = col.innerHTML;
                            break;
                        case 4:
                            document.getElementById("net-sales-value").value = col.innerHTML;
                            break;
                        case 5:
                            document.getElementById("comments-on-price-changes").value = col.innerHTML;
                            break;
                        case 6:
                            document.getElementById("average-purchase-price").value = col.innerHTML;
                            break;
                        case 7:
                            document.getElementById("average-sales-price").value = col.innerHTML;
                            break;
                    }
                }
            } else {
                document.getElementById("purchase-volume").value = "";
                document.getElementById("net-purchase-cost").value = "";
                document.getElementById("sales-volume").value = "";
                document.getElementById("net-sales-value").value = "";
                document.getElementById("comments-on-price-changes").value = "";
                document.getElementById("average-purchase-price").value = "";
                document.getElementById("average-sales-price").value = "";
            }
            if (found) {break;}
        }
    };
}).call(this);