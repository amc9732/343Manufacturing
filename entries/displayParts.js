/**
 * loggedIn entry file
 *
 * This is the file that is loaded into the browser
 * when a user navigates to the loggedIn page
 *
 */

// Quick fix to delete old entries when hitting refresh button.
var displayTableHtml = "<tbody><tr><th>Type</th><th>Attribute</th><th>Qunatity</th></tr></tbody>";

$(document).ready(function(){
    displayParts();
    $('#displayParts').click(function () {
        displayParts();
    });
    $('#searchParts').click(function () {
        searchParts();
    });
});

function displayParts(){
    $.ajax({
        dataType: 'json',
        type: "GET",
        url: '/showParts',
        context: this,
        success: function (json){
            var tableContent = '';
            $('#displayTable').html(displayTableHtml);

            $.each(json, function(key, value){
                tableContent += '<tr>'
                tableContent += '<td>' + value.Type + '</td>';
                tableContent += '<td>' + value.Attribute + '</td>';
                tableContent += '<td>' + value.Quantity + '</td>';
                tableContent += '</tr>'
            });

            $('#displayTable').append(tableContent);
        },
        error: function(error){
            console.log(error);
        }

     });
 }

 function searchParts () {
 	 var searchTextvalue = document.getElementById("searchText").value;
 	 var searchOptionValue = document.getElementById("searchOption").value;
 	 var searchText;
 	 var searchOption;
     $.ajax({
         dataType: 'json',
         type: "POST",
         url: '/searchParts',
 		data: {searchText : searchTextvalue, searchOption : searchOptionValue},
         context: this,
         success: function (json){
 			console.log("Searching Parts");
             var tableContent = '';
             $('#displayTable').html(displayTableHtml);

             $.each(json, function(key, value){
            	 	 tableContent += '<tr>'
                     tableContent += '<td>' + value.Type + '</td>';
                     tableContent += '<td>' + value.Attribute + '</td>';
                     tableContent += '<td>' + value.Qunatity + '</td>';
                     tableContent += '</tr>'
             });

             $('#displayTable').append(tableContent);
         },
         error: function(error){
             console.log(error);
         }

      });
  }