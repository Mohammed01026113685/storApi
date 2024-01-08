function countdownToTargetTime(targetTime) {
    // تحديث العرض كل ثانية (1000 مللي ثانية)
    var countdownInterval = setInterval(function() {
        // حساب الفارق بين الوقت الحالي والوقت المستهدف
        var now = new Date();
        var timeDifference = targetTime - now;

        // التحقق مما إذا كان الوقت قد انتهى
        if (timeDifference <= 0) {
            clearInterval(countdownInterval); // إيقاف العد التنازلي
            document.getElementById("countdown").innerHTML = "انتهى الوقت!";
        } else {
            // حساب عدد الأيام والساعات والدقائق والثواني
            var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // عرض العد التنازلي في الصفحة
            document.getElementsByClassName('smailbox1')[0].innerHTML = `sec <br>${seconds}  `;
            document.getElementsByClassName('smailbox2')[0].innerHTML = `mins <br>${minutes}  `;
            document.getElementsByClassName('smailbox3')[0].innerHTML = `hours <br>${hours}  `;
            document.getElementsByClassName('smailbox4')[0].innerHTML = `days <br>${days}  `;
        }

    }, 1000); // تحديث الوقت كل ثانية
}

// تاريخ ووقت الانتهاء المستهدف بعد 11 يومًا و 24 ساعة
var targetTime = new Date();
targetTime.setDate(targetTime.getDate() + 11);
targetTime.setHours(targetTime.getHours() + 24);

// استدعاء الدالة لبدء العد التنازلي
countdownToTargetTime(targetTime);