/**
 * logger entry file
 *
 * This is the file that is used to log system 
 * information to the logger_database
 *
 */


/**
*	function: logger
*	parameters:
*		silo - originating silo for log
*		severity - levels 1-7 (see Design Document)
*		message - log message
*/

function logger(silo, severity, message) {
    // send log message to the database
	console.log("manufacturing logger");
    $.ajax({
        url: 'hr/log',
        type: "post",
		 data: {silo : silo, severity : severity, message: message},
        context: this,
        success: function (response){
                console.log("Logged")
             },
             error: function(error){
                 console.log(error);
             }
    });
}