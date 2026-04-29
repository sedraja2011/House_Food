$(document).ready(function() {
    $(".Show_details").change(function() {
        var More_details = $(this).closest('tr').next('.details');
        if ($(this).is(':checked')) {
            More_details.show(); 
        } else {
            More_details.hide();
        }
    });

    $(".Continue-btn").click(function() {
        var Meals_count = $(".select:checked").length;
        if (Meals_count >= 1) {
            $("#Order_form").show(); 
        } else {
            alert("يرجى اختيار وجبة واحدة على الأقل");
        }
    });

    $("#Order_form").submit(function(event) {
        var name = $(".Name").val();
        var bank_Id = $(".Bank_account").val();
        var date = $(".Date_order").val();
        var mobile = $(".Mobile_num").val();

        var Acceptable_name = /^[A-Za-z]+\s[A-Za-z]+$/;
        var Acceptable_ID = /^\d{6}$/;
        var Acceptable_date = /^\d{2}-\d{2}-\d{4}$/;
        var Acceptable_num = /^09(3|4|5|6|8|9)\d{7}$/;

        if (name !== "" && !Acceptable_name.test(name)) {
            alert("يرجى ادخال الاسم والكنية باللغة الانكليزية");
            return;
        } 
        
        if (bank_Id === "" || !Acceptable_ID.test(bank_Id)) {
            alert("رقم الحساب المصرفي مطلوب ويجب أن يتكون من 6 أرقام");
            return;
        }

        if (date !== "" && !Acceptable_date.test(date)) {
            alert("ادخل التاريخ على الشكل dd-mm-yyyy");
            return;
        }

        if (mobile !== "" && !Acceptable_num.test(mobile)) {
            alert("ادخل رقم هاتف صحيح يتبع شبكتي MTN وسيرياتيل");
            return;
        }

        var Total = 0;
        var Meals_details = "";

        $(".select:checked").each(function() {
            var Row = $(this).closest('tr');
            var Meal_name = Row.find('td:eq(3)').text(); 
            var Meal_Price = Row.find('td:eq(2)').text();
            
            var Price = parseInt(Meal_Price.replace(/[^\d]/g, ''));
            
            Total = Total + Price;
            Meals_details = Meals_details + Meal_name + " (" + Price + " ل.س)\n";
        });

        var Tax = (Total * 0.10);
        var Pay_amount = Total - Tax;

        alert("تم إرسال الطلب بنجاح!\n\n" +
              "الوجبات المختارة:\n" + Meals_details + "\n" +
              "المجموع الإجمالي: " + Total + " ل.س\n" +
              "قيمة الضريبة (10%): " + Tax + " ل.س\n" +
              "المبلغ الصافي بعد الحسم: " + Pay_amount + " ل.س");
    });
});