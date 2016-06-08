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
                window.sessionStorage.setItem("uuidHub", codigo);
            }
        }, "json"); 
    });
    

    $(".refres").click(function(){
     window.location.reload();
 });

    $(".salir").click(function(){
        window.sessionStorage.removeItem("uuidHub");
        window.location = "#page-home";
    });
    
});

 

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
    e.preventDefault();    
}

$(document).on("pagecreate", "#inicio",function(){       
        $.post("http://tecdogt.com/SentinelHubWS/mediadorApp.php", 
            {
                CMD: "ListDevice",
                UUIDHub: window.sessionStorage.getItem("uuidHub")
            }, function(data)
               {
                if (data.length > 0){
                    for (var i = 0; i < data.length; i++){
                        if (data[i].Estado == 0){
                            $("<tr style='height:50; background-color: white; text-align: center'>").html("<td>" + data[i].UUIDDevice + "</td>" + "<td>" + data[i].Etiqueta + "</td>" + "<td><img src='img/off.png' id='"+ data[i].UUIDDevice + "' class='switch'></td>").appendTo("#tablaPrincipal");
                        } else if (data[i].Estado == 1){
                            $("<tr style='height:50; background-color: white; text-align: center'>").html("<td>" + data[i].UUIDDevice + "</td>" + "<td>" + data[i].Etiqueta + "</td>" + "<td><img src='img/on.png' id='"+ data[i].UUIDDevice + "' class='switch'></td>").appendTo("#tablaPrincipal");
                        }
                        
                        $("#" + data[i].UUIDDevice).click(function(){
                            for (var i = 0; i < data.length; i++){
                                if ($(this).id == data[i].UUIDevice){
                                    if (data[i].Estado == 0){
                                        data[i].Estado = 1;
                                        $(this).attr("src", "img/on.png");
                                    } else  {
                                        data[i].Estado = 0;
                                        $(this).attr("src", "img/off.png");
                                    }
                                }
                            }
                        });
                    }
                } else {
                    alert("No se encontraron dispositivos.")
                }
            }, "json");
    });

$(document).on("pagecreate", ".ventana",function(){       
    var validador = window.sessionStorage.getItem("uuidHub");
    if (validador == undefined || validador == null){
        window.location = "#page-home";
    }
    
    
});
