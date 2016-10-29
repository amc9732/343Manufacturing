/**
 * loggedIn entry file
 *
 * This is the file that is loaded into the browser
 * when a user navigates to the loggedIn page
 *
 */

// Quick fix to delete old entries when hitting refresh button.
var displayTableHtml = "<tbody><tr><th>Name</th><th>Email</th><th>Title</th><th>Department</th><th>Salary</th><th>Superiors</th><th>Status</th></tr></tbody>";

$(document).ready(function(){
    displayEmployees();
    $('#displayEmployees').click(function () {
        displayEmployees();
    });
    $('#searchEmployees').click(function () {
        searchEmployees();
    });
});

function displayEmployees(){
    $.ajax({
        dataType: 'json',
        type: "GET",
        url: '/showEmployees',
        context: this,
        success: function (json){
            var tableContent = '';
            $('#displayTable').html(displayTableHtml);

            $.each(json, function(key, value){
                tableContent += '<tr>'
                tableContent += '<td>' + value.fullName + '</td>';
                tableContent += '<td>' + value.email + '</td>';
                tableContent += '<td>' + value.title + '</td>';
                tableContent += '<td>' + value.department + '</td>';
                tableContent += '<td>' + value.salary + '</td>';
                tableContent += '<td>' + value.superiors + '</td>';
                tableContent += '<td>' + value.stat + '</td>';
                tableContent += '</tr>'
            });

            $('#displayTable').append(tableContent);
        },
        error: function(error){
            console.log(error);
        }

     });
 }

 function searchEmployees () {
 	 var searchTextvalue = document.getElementById("searchText").value;
 	 var searchOptionValue = document.getElementById("searchOption").value;
 	 var searchText;
 	 var searchOption;
     $.ajax({
         dataType: 'json',
         type: "POST",
         url: '/searchEmployees',
 		data: {searchText : searchTextvalue, searchOption : searchOptionValue},
         context: this,
         success: function (json){
 			console.log("Searching Employees");
             var tableContent = '';
             $('#displayTable').html(displayTableHtml);

             $.each(json, function(key, value){
                 tableContent += '<tr>'
                 tableContent += '<td>' + value.fullName + '</td>';
                 tableContent += '<td>' + value.email + '</td>';
                 tableContent += '<td>' + value.title + '</td>';
 				tableContent += '<td>' + value.department + '</td>';
 				tableContent += '<td>' + value.salary + '</td>';
 				tableContent += '<td>' + value.superiors + '</td>';
 				tableContent += '<td>' + value.stat + '</td>';
 				tableContent += '</tr>'
             });

             $('#displayTable').append(tableContent);
         },
         error: function(error){
             console.log(error);
         }

      });
  }
