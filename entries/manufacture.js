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
        var orderID = e.target.value;
        var quantity = $("#quantity" + orderID)[0].innerText;
        var model = $("#model" + orderID)[0].innerText;


	debugger;
        runOrder(quantity, model);
    });


    //Pull current quantities from DB
    $.ajax({
        dataType: 'json',
        type: "GET",
        url: '/showParts',
        context: this,
        success: function (json){
            partsJson = json;
        },
        error: function(error){
            console.log(error);
        }
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
    var itemsToUpdate = [quantity];
    var enoughQuantity = true; //flag to stop if one component does not have enough quantity

    var category = wearableID.charAt(1);
    var screen = wearableID.charAt(2);
    var LED = wearableID.charAt(3) + wearableID.charAt(4);
    var comfort = wearableID.charAt(5) + wearableID.charAt(6);
    var sensor = wearableID.charAt(7) + wearableID.charAt(8);
    var band = wearableID.charAt(9);
    var body = 'S' + wearableID.charAt(10);

    var partsNeeded = {"Screen" : screen, "LED" : LED, "Comfort" : comfort, "Sensor" : sensor, "Band" : band, "Body" : body};

    $.each(partsNeeded, function(partName, partValue) {
        if (partValue == '0' || partValue == '00'){
            //this part isn't used in this category of wearable
        } else {
            $.each(partsJson, function(key, value) {
                //Find associated value in DB copy
                if (value.Type == partName && value.Attribute == partValue){
                    //Check if quantity is enough
                    if (value.Quantity >= quantity) {
                        itemsToUpdate.push(value.Description);
                        return true;
                    } else {
                        alert ("Not enough " + value.Description + "'s available!\r\rYou need " + quantity + " to complete this order, but only " +  value.Quantity + " exist.");
                        enoughQuantity = false;
                        return true;
                    }
                }
            });
        }
    });
    $.each(partsJson, function(key, value) {
        if (value.Type == "USB"){
            if (value.Quantity >= quantity) {
                itemsToUpdate.push(value.Description);
            } else {
                alert ("Not enough " + value.Description + "'s available!\r\rYou need " + quantity + " to complete this order, but only " +  value.Quantity + " exist.");
                enoughQuantity = false;
            }
        }
        if (value.Type == "Chip"){
            if (value.Quantity >= quantity) {
                itemsToUpdate.push(value.Description);
            } else {
                alert ("Not enough " + value.Description + "'s available!\r\rYou need " + quantity + " to complete this order, but only " +  value.Quantity + " exist.");
                enoughQuantity = false;
            }
        }
    });

    if (enoughQuantity){
        //Update DB
        $.ajax({
            dataType: 'json',
            type: "POST",
            url: '/updateQuantity',
            data: {itemsToUpdate : itemsToUpdate},
            context: this,
            success: function (json){
                console.log("Updating Quantities");
            },
            error: function(error){
                console.log(error);
            }

        }).then(
            $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: function (json){
                    partsJson = json;
                },
                error: function(error){
                    console.log(error);
                }
            })
        );


    }
}




















