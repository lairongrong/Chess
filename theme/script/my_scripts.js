$(document).ready(function(){
    var END_HOUR = 18;
    var START_HOUR = 10;

        //JSONP to server to get teachers' information
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/teachers",
            dataType: "json",
            //jsonp: "callback",
            contentType:    'application/json',
            error: function(xhr, status, error) {
                alert(xhr.statusText);
                alert(xhr.status);
                alert(error);
            },
            success: function(data) {
                //javascript object: parse the received data and pass them to corresponding UI components
                //var teacherData = $.parseJSON(data);

                displayTeacherInfo(data);
            }
        });

        //JSONP to server to get class schedule information for each teacher
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/teachers",
            dataType: "json",
            //jsonp: "callback",
            contentType:    'application/json',
            error: function(xhr, status, error) {
                alert(xhr.statusText);
                alert(xhr.status);
                alert(error);
            },
            success: function(data) {
                //javascript object: parse the received data and pass them to corresponding UI components
                //var classSchedule = $.parseJSON(data);

                displayClassSchedule(data);
            }
        });

    function displayTeacherInfo(data)
    {
        for(var i=0; i<data.length; i++) {
            var teacherIndex = "teacher" + data[i].TeacherID;
            $("<div>").addClass(teacherIndex).addClass("row").appendTo(".main");

            //add image + teacher description
            $("<div>").addClass("col-xs-4").appendTo("." + teacherIndex);
            var teacherIntroSelector = ".col-xs-4:eq(" + i + ")";
            addTeacherIntro(teacherIntroSelector, data[i]);

            //add teacher's schedule
            $("<div>").addClass("col-xs-8").appendTo("." + teacherIndex);

            if (i != data.length - 1) {
                $("<hr>").appendTo(".main");
            }
        }
    }

    function displayClassSchedule(data)
    {
        for(var i=0; i<data.length; i++)
        {
            var classScheSelector = ".col-xs-8:eq(" + i + ")";
            addClassSchedule(classScheSelector, data[i]);
        }
    }

    function addTeacherIntro(selector, data){
        var teacherPhoto = "images/" + "teacher1.jpg";
        var teacherNameContext = "<p><b>" + data.Name +"</b></p>";
        var description = "<p>" + data.Description + "</p>";

        $("<img>").attr("src", teacherPhoto).appendTo(selector);
        $("<br>").appendTo(selector);
        $(teacherNameContext).appendTo(selector);
        $(description).addClass("text-left").appendTo(selector);
    }

    function addEmptyClassRow(selector, index)
    {
        var time = 0;
        var timeString;

        $("<tr>").appendTo(selector);
        var rowSelector = selector + " tr:eq(" + index +")";

        if (START_HOUR + index < 12) {
            time = START_HOUR + index;
            timeString = "<td>" + time + "am" + "</td>";
        }
        else if(START_HOUR + index > 12)
        {
            time = START_HOUR - 12 + index;
            timeString = "<td>" + time +"pm" + "</td>";
        }
        else
            return false;

        if(time!=12)
            $(rowSelector).append(timeString);

        //set the empty row
        for(var i=0; i<7; i++) {
            $(rowSelector).append("<td></td>");
        }
    }

    function setClassSchedule(selector, availTimeArray)
    {
          for(var i =0; i<availTimeArray.length; i++)
          {
              var rowIndex = availTimeArray[i].startHour - START_HOUR;
              var rowDataIndex = availTimeArray[i].weekday;
              var timeSpotSelector = selector + " tr:eq(" + rowIndex + ")" + " td:eq(" + rowDataIndex +")";

              $(timeSpotSelector).addClass("success");
              $("<a href=\"#\" title='加入购物车'>选课</a>").css("color", "black").appendTo(timeSpotSelector);
          }

    }

    //Create a function to generate class schedule
    function addClassSchedule(selector, data) {
        $("<table>").addClass("table table-condensed table-bordered table-hover text-center").appendTo(selector);
        //add table header
        $("<thead>").appendTo(selector + " table");
        $("<tr>").addClass("warning").appendTo(selector + " table thead");
        $(selector + " table thead tr").append("<th class='text-center'>时间</th>")
            .append("<th class='text-center'>星期一</th>")
            .append("<th class='text-center'>星期二</th>")
            .append("<th class='text-center'>星期三</th>")
            .append("<th class='text-center'>星期四</th>")
            .append("<th class='text-center'>星期五</th>")
            .append("<th class='text-center'>星期六</th>")
            .append("<th class='text-center'>星期日</th>");

        //add table body
        $("<tbody>").appendTo(selector + " table");

        //add empty row into table body
        var tableBodySelector = selector + " table tbody";
        for (var i = 0; i < (END_HOUR - START_HOUR); i++) {
            addEmptyClassRow(tableBodySelector, i);
        }

        //parse the Availability in data
        var testData = {
            "TeacherID": 1001,
            "ClassID": 1000,
            "Availability": [
                {
                    "StartTime": "9/20/2014 10:00:00 AM",
                    "EndTime": "9/20/2014 11:00:00 AM",
                    "Capacity": 20,
                    "Occupancy": 8
                },
                {
                    "StartTime": "9/10/2014 1:00:00 PM",
                    "EndTime": "9/10/2014 2:00:00 PM",
                    "Capacity": 15,
                    "Occupancy": 10
                }
            ]
        };
        var availTimeArray = [];
        for(var i=0; i<testData.Availability.length; i++)
        {
            var tmpStartTime = new Date(Date.parse(testData.Availability[i].StartTime));
            var tmpEndTime = new Date(Date.parse(testData.Availability[i].EndTime));
            var timeSlot = {
                "weekday" : tmpStartTime.getDay(),
                "startHour": tmpStartTime.getHours(),
                "endHour": tmpEndTime.getHours()
            };
            availTimeArray.push(timeSlot);
        }
        setClassSchedule(tableBodySelector, availTimeArray);

    }
})