$(document).ready(function(){
    $('button.test').click(function(){

        //JSONP to server to get teachers' information
        //Then save it into javascript object
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/teachers",
            dataType: "jsonp",
            jsonp: "callback",
            contentType:    'application/json',
            error: function(xhr, status, error) {
                alert(xhr.statusText);
                alert(xhr.status);
                alert(error);
            },
            success: function(data) {
                //javascript object: parse the received data and pass them to corresponding UI components
                var teacherData = $.parseJSON(data);

                displayTeacherInfo(teacherData);
            }
        });
    });

    function displayTeacherInfo(data)
    {
        for(var i=0; i<data.length; i++)
        {
            var teacherIndex = "teacher" + i;
            $("<div>").addClass(teacherIndex).addClass("row").appendTo(".main");

            //add image + teacher description
            $("<div>").addClass("col-xs-4").appendTo("."+teacherIndex);
            var teacherIntroSelector = ".col-xs-4:eq(" + i + ")";
            addTeacherIntro(teacherIntroSelector, data[i]);

            //add teacher's schedule
            $("<div>").addClass("col-xs-8").appendTo("."+teacherIndex);
            var classScheSelector = ".col-xs-8:eq(" + i + ")";
            addClassSchedule(classScheSelector, data[i]);

            $("<hr>").appendTo(".main");
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

    function addClassScheduleRow(selector, index, timeslots)
    {
        $("<tr>").appendTo(selector);
        var rowSelector = selector + " tr:eq(" + index +")";
        $(rowSelector).append("<td>11am</td>")
            .append("<td></td>")
            .append("<td>x</td>")
            .append("<td>x</td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td></td>");
    }

    //Create a function to generate class schedule
    function addClassSchedule(selector, data) {
        $("<table>").addClass("table table-condensed table-bordered table-hover").appendTo(selector);
        //add table header
        $("<thead>").appendTo(selector + " table");
        $("<tr>").addClass("warning").appendTo(selector + " table thead");
        $(selector + " table thead tr").append("<th>时间</th>")
            .append("<th>星期一</th>")
            .append("<th>星期二</th>")
            .append("<th>星期三</th>")
            .append("<th>星期四</th>")
            .append("<th>星期五</th>")
            .append("<th>星期六</th>")
            .append("<th>星期日</th>");

        //add table body
        $("<tbody>").appendTo(selector + " table");
        //add first row into table body
        var tableBodySelector = selector + " table tbody";
        for (var i = 0; i < 8; i++) {
            addClassScheduleRow(tableBodySelector, i, data);
        }
    }
    })