

//loggedIn entry file
//
// This is the file that is loaded into the browser
// when a user navigates to the loggedIn page
//


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

    $('#displayTable').on('click', '#startProcess', function () {
        var orderID = document.getElementById("startProcess").value;
        $(function(e) {
            $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showOrders',
                context: this,
                success: function (json){

                $.each(json, function(key, value){
                    if (value.OrderID == orderID){
                        runOrder(value.ModelID, value.Quantity);
                    }
                });

                },
                error: function(error){
                    console.log(error);
                }
            });
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
                tableContent += '<tr>'
                tableContent += '<td>' + value.OrderID + '</td>';
                tableContent += '<td>' + value.Quantity + '</td>';
                tableContent += '<td>' + value.ModelID + '</td>';
                tableContent += '<td><button id="startProcess" value="'+ value.OrderID + '" class ="jqbutton" type="button">Start</button></td>';
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

function runOrder(wearableID, quantity) {
    var category = wearableID.charAt(1);
    var screen = wearableID.charAt(2);
    var LED = wearableID.charAt(3) + wearableID.charAt(4);
    var comfort = wearableID.charAt(5) + wearableID.charAt(6);
    var sensor = wearableID.charAt(7) + wearableID.charAt(8);
    var band = wearableID.charAt(9);
    var body = wearableID.charAt(10);

    var machineLine = [];
    var partsNeeded = [];

    console.log("1");
    // add body forming step to machine line
    if (screen == "0") {
        console.log("boo");
         $(function(e) {
            $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showProcess',
                context: this,
                success: function (json){

                    $.each(json, function(key, value){
                        if (value.PartType == "SBody"){
                            machineLine[machineLine.length] = value.Machine;

                        }
                    });

                },
                error: function(error){
                    console.log(error);
                }

             });
         });
    }
    else {
        $(function(e) {
                    $.ajax({
                        dataType: 'json',
                        type: "GET",
                        url: '/showProcess',
                        context: this,
                        success: function (json){

                            $.each(json, function(key, value){
                                if (value.PartType == "LBody"){
                                    machineLine[machineLine.length] = value.Machine;
                                }
                            });

                        },
                        error: function(error){
                            console.log(error);
                        }

                    });
        });
    }

    // add body part needed to array
    if (body == "B") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Body" && value.Attribute == "B"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    } else if (body == "G") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Body" && value.Attribute == "G"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    } else if (body == "S") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Body" && value.Attribute == "S"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    }

    // add chip installation step to machine line
    $(function(e) {
        $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/showProcess',
            context: this,
            success: function (json){

                $.each(json, function(key, value){
                    if (value.PartType == "Chip"){
                        machineLine[machineLine.length] = value.Machine;
                    }
                });

            },
            error: function(error){
                console.log(error);
            }

        });
    });

    function getData() {
        return $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/showParts',
            context: this,
            success: handleData,
            error: function(error){
                console.log(error);
            }

        });
    };


    function handleData(data) {
        $.each(data, function(key, value){
            if (value.Type == "Chip"){
                partsNeeded.push(value.PModelID);
            }
        });
    }

   getData().done(handleData);


    // add USB installation step to machine line
    $(function(e) {
        $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/showProcess',
            context: this,
            success: function (json){

                $.each(json, function(key, value){
                    if (value.PartType == "USB"){
                        machineLine[machineLine.length] = value.Machine;
                    }
                });

            },
            error: function(error){
                console.log(error);
            }

        });
    });

    function getData() {
        return $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/showParts',
            context: this,
            success: handleData,
            error: function(error){
                console.log(error);
            }

        });
    };


    function handleData(data) {
        $.each(data, function(key, value){
            if (value.Type == "USB"){
                partsNeeded.push(value.PModelID);
            }
        });
    }

   getData().done(handleData);


    // add LED installation step to machine line
    if (LED != "00") {
        $(function(e) {
            $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showProcess',
                context: this,
                success: function (json){

                    $.each(json, function(key, value){
                        if (value.PartType == "LED"){
                            machineLine[machineLine.length] = value.Machine;
                        }
                    });

                },
                error: function(error){
                    console.log(error);
                }

            });
        });
        if (LED == "01") {
            function getData() {
                return $.ajax({
                    dataType: 'json',
                    type: "GET",
                    url: '/showParts',
                    context: this,
                    success: handleData,
                    error: function(error){
                        console.log(error);
                    }

                });
            };


            function handleData(data) {
                $.each(data, function(key, value){
                    if (value.Type == "LED" && value.Attribute == "01"){
                        partsNeeded.push(value.PModelID);
                    }
                });
            }

           getData().done(handleData);
        }
    }

    // add sensor installation step to machine line
    if (sensor != "00") {
        $(function(e) {
                    $.ajax({
                        dataType: 'json',
                        type: "GET",
                        url: '/showProcess',
                        context: this,
                        success: function (json){

                            $.each(json, function(key, value){
                                if (value.PartType == "Sensor"){
                                    machineLine[machineLine.length] = value.Machine;
                                }
                            });

                        },
                        error: function(error){
                            console.log(error);
                        }

                    });
        });
        if (sensor == "01") {
            function getData() {
                return $.ajax({
                    dataType: 'json',
                    type: "GET",
                    url: '/showParts',
                    context: this,
                    success: handleData,
                    error: function(error){
                        console.log(error);
                    }

                });
            };


            function handleData(data) {
                $.each(data, function(key, value){
                    if (value.Type == "Sensor" && value.Attribute == "01"){
                        partsNeeded.push(value.PModelID);
                    }
                });
            }

           getData().done(handleData);
        }
    }

    // add comfort tech installation step to machine line
    if (comfort != "00") {
        $(function(e) {
                    $.ajax({
                        dataType: 'json',
                        type: "GET",
                        url: '/showProcess',
                        context: this,
                        success: function (json){

                            $.each(json, function(key, value){
                                if (value.PartType == "Comfort"){
                                    machineLine[machineLine.length] = value.Machine;
                                }
                            });

                        },
                        error: function(error){
                            console.log(error);
                        }

                    });
        });
        if (comfort == "01") {
            function getData() {
                return $.ajax({
                    dataType: 'json',
                    type: "GET",
                    url: '/showParts',
                    context: this,
                    success: handleData,
                    error: function(error){
                        console.log(error);
                    }

                });
            };


            function handleData(data) {
                $.each(data, function(key, value){
                    if (value.Type == "Comfort" && value.Attribute == "01"){
                        partsNeeded.push(value.PModelID);
                    }
                });
            }

           getData().done(handleData);
        } else if (comfort == "02") {
            function getData() {
                return $.ajax({
                    dataType: 'json',
                    type: "GET",
                    url: '/showParts',
                    context: this,
                    success: handleData,
                    error: function(error){
                        console.log(error);
                    }

                });
            };


            function handleData(data) {
                $.each(data, function(key, value){
                    if (value.Type == "Comfort" && value.Attribute == "02"){
                        partsNeeded.push(value.PModelID);
                    }
                });
            }

           getData().done(handleData);
        }
    }

    // add screen installation step to machine line
    if (screen != "0") {
        $(function(e) {
            $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showProcess',
                context: this,
                success: function (json){

                    $.each(json, function(key, value){
                        if (value.PartType == "Screen"){
                            machineLine[machineLine.length] = value.Machine;
                        }
                    });

                },
                error: function(error){
                    console.log(error);
                }

            });
        });
        if (screen == "B") {
            function getData() {
                return $.ajax({
                    dataType: 'json',
                    type: "GET",
                    url: '/showParts',
                    context: this,
                    success: handleData,
                    error: function(error){
                        console.log(error);
                    }

                });
            };


            function handleData(data) {
                $.each(data, function(key, value){
                    if (value.Type == "Screen" && value.Attribute == "B"){
                        partsNeeded.push(value.PModelID);
                    }
                });
            }

           getData().done(handleData);
        } else if (screen == "T") {
            function getData() {
                return $.ajax({
                    dataType: 'json',
                    type: "GET",
                    url: '/showParts',
                    context: this,
                    success: handleData,
                    error: function(error){
                        console.log(error);
                    }

                });
            };


            function handleData(data) {
                $.each(data, function(key, value){
                    if (value.Type == "Screen" && value.Attribute == "T"){
                        partsNeeded.push(value.PModelID);
                    }
                });
            }

           getData().done(handleData);
        }
    }

    // add band installation step to machine line
        $(function(e) {
                    $.ajax({
                        dataType: 'json',
                        type: "GET",
                        url: '/showProcess',
                        context: this,
                        success: function (json){

                            $.each(json, function(key, value){
                                if (value.PartType == "Band"){
                                    machineLine[machineLine.length] = value.Machine;
                                }
                            });

                        },
                        error: function(error){
                            console.log(error);
                        }

                    });
        });

    if (band == "B") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Band" && value.Attribute == "B"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    } else if (band == "G") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Band" && value.Attribute == "G"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    } else if (band == "S") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Band" && value.Attribute == "S"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    } else if (band == "L") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Band" && value.Attribute == "L"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    }

    // add software installation step to machine line
        $(function(e) {
                    $.ajax({
                        dataType: 'json',
                        type: "GET",
                        url: '/showProcess',
                        context: this,
                        success: function (json){

                            $.each(json, function(key, value){
                                if (value.PartType == "Software"){
                                    machineLine[machineLine.length] = value.Machine;
                                }
                            });

                        },
                        error: function(error){
                            console.log(error);
                        }

                    });
        });

    if (category == "F") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Software" && value.Attribute == "F"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    } else if (category == "C") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Software" && value.Attribute == "C"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    } else if (category == "H") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Software" && value.Attribute == "H"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);

    } else if (category == "A") {
        function getData() {
            return $.ajax({
                dataType: 'json',
                type: "GET",
                url: '/showParts',
                context: this,
                success: handleData,
                error: function(error){
                    console.log(error);
                }

            });
        };


        function handleData(data) {
            $.each(data, function(key, value){
                if (value.Type == "Software" && value.Attribute == "A"){
                    partsNeeded.push(value.PModelID);
                }
            });
        }

       getData().done(handleData);
    }
    console.log(partsNeeded);
    console.log(partsNeeded.size);


   // runLine(machineLine, partsNeeded, quantity);

    //************ delete order
}

function runLine(machineLine, partsNeeded, quantity) {


//    if (quantityLeft > 0) {
//        var i = 0;
//        var code;
//        for(;machineLine[i];) {
//            console.log("test");
//            code = runStep(partsNeeded[i], machineLine[i]);
//            if (code == 0) { // if continue
//                i++;
//            } else if (code == 1) { // if error
//                runLine(machineLine, partsNeeded, quantityLeft);
//            }
//            // if report (code = 2) run step again with same i
//        }
//        //send wearable *******************
//        runLine(machineLine, partsNeeded, quantityLeft - 1);
//    }
}
function runStep(partID, machine) {
    // update upkeep costs in database
    console.log("4");
    var totalUpkeep = 0;
    $(function(e) {
        $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/showCost',
            context: this,
            success: function (json){

                $.each(json, function(key, value){
                    if (value.MonthNum == "1"){
                        totalUpkeep = value.Upkeep;
                    }
                });

            },
            error: function(error){
                console.log(error);
            }

        });
    });
    var addedUpkeep = 0;
    $(function(e) {
        $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/showMachines',
            context: this,
            success: function (json){

                $.each(json, function(key, value){
                    if (value.MachineID == machine){
                        addedUpkeep = value.HourlyCost / 60 / results.ProductionRate;
                    }
                });

            },
            error: function(error){
                console.log(error);
            }

        });
    });

    totalUpkeep = totalUpkeep + addedUpkeep;



     $.ajax({
         dataType: 'json',
         type: "POST",
         url: '/updateCost',
         data: {Upkeep : totalUpkeep},
         context: this,
         success: function (response){},
         error: function(error){
             console.log(error);
         }

     });

    // remove one part from the database
    $(function(e) {
        $.ajax({
            dataType: 'json',
            type: "GET",
            url: '/showParts',
            context: this,
            success: function (json){

                $.each(json, function(key, value){
                    if (value.PModelID == partID){
                        partQuantity = results.Quantity;
                    }
                });

            },
            error: function(error){
                console.log(error);
            }

        });
    });


    partQuantity = partQuantity - 1;

    connection.query('UPDATE manufacturing_database.parts SET Quantity=' + partQuantity + 'WHERE PModelID = "' + partID + '"', function(err,res){
        if(err) throw err;
    });
     $.ajax({
         dataType: 'json',
         type: "POST",
         url: '/updateQuantity',
         data: {PModelID : partID, Quantity : partQuantity},
         context: this,
         success: function (response){},
         error: function(error){
             console.log(error);
         }

     });

    var buttonPress;
    // see what button was pressed Continue (0), Error (1), Report (2)
    if (buttonPress == 0){
        return 0;
    }else if (buttonPress == 1){
        return 1;
    }else if (buttonPress == 2){
        // Send message that a part (partID) was defective ***************
        runStep(partID,machine);
    }

    //**************************
    return 0;
    //****************************
}










// Run order
//     runLine(quantityleft)
//       runstep()
//         remove a part from database
//         calculate cost and update database
//         report()
//            restart runstep
//            send msg to inventory
//         error()
//            restart runline
//         continue()
//            next step
//       send wearable to inventory























