/**
 * loggedIn entry file
 *
 * This is the file that is loaded into the browser
 * when a user navigates to the loggedIn page
 *
 */

// Quick fix to delete old entries when hitting refresh button.
var displayTableHtml = "<tbody><tr><th>Name</th><th>HourlyCost</th><th>ProductionRate</th><th>Price</th></tr></tbody>";

$(document).ready(function(){
    displayMachines();
    $('#displayMachines').click(function () {
        displayMachines();
    });
    $('#searchMachines').click(function () {
        searchMachines();
    });
});

function displayMachines(){
    $.ajax({
        dataType: 'json',
        type: "GET",
        url: '/showMachines',
        context: this,
        success: function (json){
            var tableContent = '';
            $('#displayTable').html(displayTableHtml);

            $.each(json, function(key, value){
                tableContent += '<tr>'
                tableContent += '<td>' + value.Name + '</td>';
                tableContent += '<td>' + value.HourlyCost + '</td>';
                tableContent += '<td>' + value.ProductionRate + '</td>';
                tableContent += '<td>' + value.Price + '</td>';
                tableContent += '</tr>'
            });

            $('#displayTable').append(tableContent);
        },
        error: function(error){
            console.log(error);
        }

     });
 }

 function searchMachines () {
 	 var searchTextvalue = document.getElementById("searchText").value;
 	 var searchOptionValue = document.getElementById("searchOption").value;
 	 var searchText;
 	 var searchOption;
     $.ajax({
         dataType: 'json',
         type: "POST",
         url: '/searchMachines',
 		data: {searchText : searchTextvalue, searchOption : searchOptionValue},
         context: this,
         success: function (json){
 			console.log("Searching Machines");
             var tableContent = '';
             $('#displayTable').html(displayTableHtml);

             $.each(json, function(key, value){
                 tableContent += '<tr>'
                 tableContent += '<td>' + value.Name + '</td>';
                 tableContent += '<td>' + value.HourlyCost + '</td>';
                 tableContent += '<td>' + value.ProductionRate + '</td>';
                 tableContent += '<td>' + value.Price + '</td>';
 				tableContent += '</tr>'
             });

             $('#displayTable').append(tableContent);
         },
         error: function(error){
             console.log(error);
         }

      });
  }
