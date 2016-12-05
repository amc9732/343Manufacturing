$(document).ready(function() {
    $('#selectAttribute').bind('change', function() {
        var elements = $('div.attributeContainer').children().hide(); // hide all the elements
        var value = $(this).val();

        if (value.length) { // if somethings' selected
            elements.filter('.' + value).show(); // show the ones we want
        }
    }).trigger('change');
});



 $("#btnRequest").click(function(e){
	 var type = document.getElementById("selectAttribute").value;
	 console.log(type);
 	 var productIDValue = document.getElementById("select" + type).value;
	 console.log(productIDValue);
	 var quantityValue = document.getElementById("quantity").value;
	 console.log(quantityValue);
     $.ajax({
         dataType: 'json',
         type: "GET",
         url: '/items/' + productIDValue + quantityValue,
 		data: {pID : productIDValue},
         context: this,
         success: function (json){
             console.log(json);
             $.each(json, function(key, value){
				 console.log(value);
             });
         },
         error: function(error){
             console.log(error);
         }

      });
      alert("Your Request for " + quantityValue + " " + type + "s has been submitted!");
  })