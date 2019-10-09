// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url0 = tabs[0].url;
    var url = url0.toLowerCase();
    var url = url.replace("https://", "");
        var url = url.replace("http://", "");
        if (url.includes("/") == false) {
            url = url + "/";
        }
        if (url.includes('shaparak.ir:8080')) {
            var mabna = url.split("/");
            var mabcheck = mabna[0].split(".");
            if (mabcheck[1] == "shaparak" && mabcheck[2] == "ir:8080") {
              $("#status").attr("src","./images/secure.png");
              $("#content").css("background-color","#2ecc71")
              $("#message").text('در گاه پرداخت وارد شده معتبر است و میتوانید با خیال راحت به پرداخت خود بپردازید');
              return;
            }
        }

        var first_check = url.split("/");
        if (first_check[1] != undefined) {
            var validator = first_check[1].replace(".", "");
            var new_url = first_check[0] + '/' + validator;
            var checker = new_url.split(".");
        } else {
          $("#status").attr("src","./images/phishing.png");
          $("#content").css("background-color","#e74c3c");
          $("#message").text('در گاه پرداخت وارد شده جعلی میباشد و به هیچ وجه در این درگاه اطلاعات کارت خود را وارد نکنید');
        }
        if (checker[2] != undefined) {
            var urli = checker[2];
            var domian = urli.split("/");
        } else {
          $("#status").attr("src","./images/phishing.png");
          $("#content").css("background-color","#e74c3c");
          $("#message").text('در گاه پرداخت وارد شده جعلی میباشد و به هیچ وجه در این درگاه اطلاعات کارت خود را وارد نکنی');
        }
        if (checker[1] == "shaparak" && domian[0] == "ir" && checker[3] === undefined) {
          $("#status").attr("src","./images/secure.png");
          $("#content").css("background-color","#2ecc71");
          $("#message").text('در گاه پرداخت وارد شده معتبر است و میتوانید با خیال راحت به پرداخت خود بپردازید');
        } else {
          $("#status").attr("src","./images/phishing.png");
          $("#content").css("background-color","#e74c3c");
          $("#message").text('در گاه پرداخت وارد شده جعلی میباشد و به هیچ وجه در این درگاه اطلاعات کارت خود را وارد نکنی');
        }


      $("#report").click(function(){
        var fish = tabs[0].url;
        $.ajax({
            type: 'POST',
            url: 'https://telescam.info/home/wp-admin/admin-ajax.php',
            data: {
                'action': 'saveafishingurlduc',
                'fish': fish
            },
            success: function(textStatus) {
                if (textStatus == "down0") {
                    alert('با تشکر از همکاری شما , آدرس وارد شده با موفقیت برای مدیریت ارسال گشت و پس از تایید در لیست فیشینگ قرار خواهد گرفت.')
                } else {
                    alert(textStatus);
                }
            },
            error: function(MLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
      });
});