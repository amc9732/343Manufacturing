/**
 * Created by austin on 12/4/16.
 */

var partsJson;

// Quick fix to delete old entries when hitting refresh button.

var displayTableHtml = "<tbody><tr><th>Order ID</th><th>Quantity</th><th>Model ID</th><th>Start Order</th></tr></tbody>";


$(document).ready(function(){
    manufacture();
    $('#manufacture').click(function () {
        manufacture();
    });
    $('#searchOrders').click(function () {
        searchOrders();
    });

    $('#displayTable').on('click', '#startProcess', function (e) {
        var orderID = document.getElementById("startProcess").value;
        var quantity = $("#quantity" + orderID)[0].innerText;
        var model = $("#model" + orderID)[0].innerText;

        runOrder(quantity, model);
    });



    $(function(e) {
        $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/showParts',
            context: this,
            success: function (json){
                this.partsJson = json;
            },
            error: function(error){
                console.log(error);
            }
        });
    });

});

function manufacture(){
    $.ajax({
        dataType: 'json',
        type: "GET",
        url: '/showOrders',
        context: this,
        success: function (json){
            var tableContent = '';
            $('#displayTable').html(displayTableHtml);
            console.log("Showing orders")

            $.each(json, function(key, value){
                var orderNum = value.OrderID
                tableContent += '<tr>'
                tableContent += '<td id="order' + orderNum + '">' + orderNum + '</td>';
                tableContent += '<td id="quantity' + orderNum + '">' + value.Quantity + '</td>';
                tableContent += '<td id="model' + orderNum + '">' + value.ModelID + '</td>';
                tableContent += '<td><button id="startProcess" value="'+ orderNum + '" class ="jqbutton" type="button">Start</button></td>';
                tableContent += '</tr>'

            });

            $('#displayTable').append(tableContent);
        },
        error: function(error){
            console.log(error);
        }

    });
}

function searchOrders () {
    var searchTextvalue = document.getElementById("searchText").value;
    var searchOptionValue = document.getElementById("searchOption").value;
    var searchText;
    var searchOption;
    $.ajax({
        dataType: 'json',
        type: "POST",
        url: '/searchOrders',
        data: {searchText : searchTextvalue, searchOption : searchOptionValue},
        context: this,
        success: function (json){
            console.log("Searching Orders");
            var tableContent = '';
            $('#displayTable').html(displayTableHtml);

            $.each(json, function(key, value){
                tableContent += '<tr>'
                tableContent += '<td>' + value.OrderID + '</td>';
                tableContent += '<td>' + value.Quantity + '</td>';
                tableContent += '<td>' + value.ModelID + '</td>';
                tableContent += '</tr>'
            });

            $('#displayTable').append(tableContent);
        },
        error: function(error){
            console.log(error);
        }

    });
}

function runOrder(quantity, wearableID) {
    var itemsToUpdate = [];

    var category = wearableID.charAt(1);
    var screen = wearableID.charAt(2);
    var LED = wearableID.charAt(3) + wearableID.charAt(4);
    var comfort = wearableID.charAt(5) + wearableID.charAt(6);
    var sensor = wearableID.charAt(7) + wearableID.charAt(8);
    var band = wearableID.charAt(9);
    var body = 'S' + wearableID.charAt(10);

    var partsNeeded = [screen, LED, comfort, sensor, band, body];
    debugger;

    for (var i = 0; i < 6; i++){
        if (partsNeeded[i] == '0' || partsNeeded[i] == '00'){
            //this part isn't used in this category of wearable
            debugger;
        } else {

        }
    }
}




















