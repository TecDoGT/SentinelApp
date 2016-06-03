$(document).ready(function(){
    
    $("#button1").click(function(){
        var codigo = $("#edit1").val();
        var username = $("#edit2").val();
        var password = $("#edit3").val();
        $.post("http://tecdogt.com/SentinelHubWS/mediadorApp.php", 
        {
            code: codigo, 
            user: username, 
            pwd: password
        }, function(data){
            if (data.ok == 0){
                alert("Revise sus datos");
            } else if (data.ok == 1){
                window.location = "#inicio";
                alert("Bienvenido, " + username);
            }
        }, "json"); 
    });
    
});


document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
  e.preventDefault();
}