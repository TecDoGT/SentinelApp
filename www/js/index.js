$(document).ready(function(){
   
    $("#button1").click(function(){
<<<<<<< HEAD
        if (($("#edit1").val() == "123456") && ($("#edit2").val() == "prueba") && ($("#edit3").val() == "password")){
            document.location="#inicio";
        }
    });
    
=======
        //if (($("#edit1").val() == "123456") && ($("#edit2").val() == "prueba") && ($("#edit3").val() == "password")){
            document.location="#inicio";
    //    }
    });
    
    $( "#popuppanel1" ).on({
        popupbeforeposition: function() {
            var h = $( window ).height();

            $( "#popupPanel" ).css( "height", h );
        }
    });
>>>>>>> 3094cd86b010ace9dd5218485157290a503226a8
});