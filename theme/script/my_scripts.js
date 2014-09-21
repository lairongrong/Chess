$(document).ready(function(){
    $('button.test').click(function(){
        /*
        $.getJSON("http://glacial-inlet-2856.herokuapp.com/teachers?callback=?", function(result){
            //response data are now in the result variable
            for(var i=0; i<result.length; i++)
            {
                alert(result[i]);
            }

        });
        */
        var response;
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/teachers",
            dataType: "jsonp",
            jsonpCallback: "displayData",
            jsonp: "callback",
            contentType:    'application/json',
            error: function(xhr, status, error) {
                alert(xhr.statusText);
                alert(xhr.status);
                alert(error);
            },
            success: function() {
                alert("success");
            }
        });

        var displayData = function (data) {
            alert(data);
            console.log(data);
        };
        });
        /*

                    var className = "teacher" + " row";
                    $("<div>").addClass("teacher").addClass("row").appendTo(".main");

                    //add image + teacher description
                    $("<div>").addClass("col-xs-4").appendTo(".teacher");
                    $("<img/>").attr("src", "images/teacher1.jpg").appendTo(".col-xs-4");
                    $("<br>").appendTo(".col-xs-4");
                    $("<p><b>王老师</b></p>").appendTo(".col-xs-4");
                    $("<p> In this article I have gathered 10 Best and Useful jQuery Calendar Plugins that would allow you to incorporate cool calendar features to your websites.</p>")
                        .addClass("text-left").appendTo(".col-xs-4");

                    //add teacher's schedule
                    $("<div>").addClass("col-xs-8").appendTo(".teacher");
                    addClassSchedule("col-xs-8");
                });
         */

    function addClassSchedule(className){
        $("<table>").addClass("table table-condensed table-bordered table-hover").appendTo("." + className);
        //add table header
        $("<thead>").appendTo("table");
        $("<tr>").addClass("warning").appendTo("thead");
        $("<th>时间</th>").appendTo("thead tr");
        $("<th>星期一</th>").appendTo("thead tr");
        $("<th>星期二</th>").appendTo("thead tr");
        $("<th>星期三</th>").appendTo("thead tr");
        $("<th>星期四</th>").appendTo("thead tr");
        $("<th>星期五</th>").appendTo("thead tr");
        $("<th>星期六</th>").appendTo("thead tr");
        $("<th>星期日</th>").appendTo("thead tr");

        //add table body
        $("<tbody>").appendTo("table");

        //add first row into table body
        $("<tr>").appendTo("tbody");
        $("tbody tr:eq(0)").append("<td>10am</td>")
        .append("<td>x</td>")
        .append("<td></td>")
        .append("<td></td>")
        .append("<td>x</td>")
        .append("<td></td>")
        .append("<td>x</td>")
        .append("<td></td>");

        //add last row into table body

        $("<tr>").appendTo("tbody");
        $("tbody tr:eq(1)").append("<td>11am</td>")
        .append("<td></td>")
        .append("<td>x</td>")
        .append("<td>x</td>")
        .append("<td></td>")
        .append("<td></td>")
        .append("<td></td>")
        .append("<td></td>");

        $("<tr>").appendTo("tbody");
        $("tbody tr:eq(2)").append("<td>1pm</td>")
            .append("<td>x</td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td>x</td>")
            .append("<td></td>")
            .append("<td>x</td>")
            .append("<td></td>");

        $("<tr>").appendTo("tbody");
        $("tbody tr:eq(3)").append("<td>2pm</td>")
            .append("<td>x</td>")
            .append("<td>x</td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td>x</td>")
            .append("<td></td>");

        $("<tr>").appendTo("tbody");
        $("tbody tr:eq(4)").append("<td>3pm</td>")
            .append("<td>x</td>")
            .append("<td>x</td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td>x</td>")
            .append("<td></td>");

        $("<tr>").appendTo("tbody");
        $("tbody tr:eq(5)").append("<td>4pm</td>")
            .append("<td>x</td>")
            .append("<td>x</td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td>x</td>")
            .append("<td></td>");

        $("<tr>").appendTo("tbody");
        $("tbody tr:eq(6)").append("<td>5pm</td>")
            .append("<td>x</td>")
            .append("<td>x</td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td></td>")
            .append("<td>x</td>")
            .append("<td></td>");
    }

    });