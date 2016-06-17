var permisosAdministrador;
$(document).ready(function(){
    //login del sistema.
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
                new Messi("Revise sus datos", {
                    title: "Sentinel App",
                    titleClass: "anim error",
                    buttons: [{
                        id: 0,
                        label: "Aceptar",
                        val: "X"
                    }],
                    modal: true,
                    width: (window.innerWidth - 25)
                });
            } else if (data.ok == 1){
                new Messi("Bienvenido, " + username, {
                    title: "Sentinel App",
                    titleClass: "anim success",
                    buttons: [{
                        id: 0,
                        label: "Aceptar",
                        val: "X"
                    }],
                    modal: true,
                    width: (window.innerWidth - 25),
                    callback: function(val){
                        permisosAdministrador = data.Admin;
                        window.location = "#inicio";
                        window.sessionStorage.setItem("uuidHub", codigo);
                        window.sessionStorage.setItem("username", username);
                        window.sessionStorage.setItem("pwd", password);
                        window.sessionStorage.setItem("admin", permisosAdministrador);                       
                    }
                });
            }
        }, "json"); 
    });
    
    //actualiza la pagina actual
    $(".refres").click(function(){
        window.location.reload();
    });

    //realiza el logout del sistema.
    $(".salir").click(function(){
        window.sessionStorage.removeItem("uuidHub");
        window.location = "#page-home";
    });
    
    $("#button5").click(function(){
        if (permisosAdministrador == 0){
            new Messi("Usted no tiene derechos de administrador.", {
                title: "Sentinel App",
                titleClass: "anim error",
                buttons: [{
                    id: 0,
                    label: "Aceptar",
                    val: "X"
                }],
                modal: true,
                width: (window.innerWidth - 25),
            });            
        } else {
            window.location = "#crearusuario";
        }
    });
    
    $("#button6").click(function(){
        if (permisosAdministrador == 0){
            new Messi("Usted no tiene derechos de administrador.", {
                title: "Sentinel App",
                titleClass: "anim error",
                buttons: [{
                    id: 0,
                    label: "Aceptar",
                    val: "X"
                }],
                modal: true,
                width: (window.innerWidth - 25),
            });            
        } else {
            window.location = "#mpermisos";
        }        
    })
}); 

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown(e) {
    e.preventDefault();    
}

//muestra los dispositivos en la tabla de la pagina de inicio.
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
                            $("<tr style='height:50; background-color: white; text-align: center'>").html("<td >" + data[i].UUIDDevice + "</td>" + "<td>" + data[i].Etiqueta + "</td>" + "<td><img src='img/off.png' id='"+ data[i].UUIDDevice + "' class='switch'></td>").appendTo("#tablaPrincipal");
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

//proceso para cambiarle de nombre a un dispositivo.
    $(document).on("pagecreate", "#nombredispositivo",function(){       
        $.post("http://tecdogt.com/SentinelHubWS/mediadorApp.php", 
            {
                CMD: "ListDevice",
                UUIDHub: window.sessionStorage.getItem("uuidHub")
            }, function(data)
               {
                if (data.length > 0){
                    for (var i = 0; i < data.length; i++){
                        $("<tr style='height:50; background-color: white; text-align: center'>").html("<td style='width: 33%'>" + data[i].UUIDDevice + "</td>" + "<td style='width: 33%'><input id='input_"+ data[i].UUIDDevice +"' value='" + data[i].Etiqueta + "' style='text-align: center; width: 98%''/></td>" + "<td style='width: 33%'><input type='button' id='btn_"+ data[i].UUIDDevice +"' value='Cambiar'></td>").appendTo("#tablaCambioNombre");
                        
                        var dispositivo=data[i].UUIDDevice;
                        
                        $("#btn_"+ data[i].UUIDDevice).click(function(){
                            
                            var  disp = $(this).attr("id") + "";
                            
                            disp = disp.replace("btn", "#input");
                            
                            var etiqueta=$(disp).val();
                            
                            disp = disp.replace("#input_", "");
                            
                            $.post("http://tecdogt.com/SentinelHubWS/mediadorApp.php",
                            {
                                CMD:"ChangeLabelDevice",
                                UUIDHub:window.sessionStorage.getItem("uuidHub"),
                                UUIDDevice:disp,
                                DeviceLabel:etiqueta               
                            },
                            function(info)
                            {
                                if (info.ok== 1)
                                {
                                    alert("Se logro actualizar")              
                                }
                                else
                                {
                                    alert("No se logro actualizara");
                                }   
                            },"json");
                            
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
    alert($("#edit1").css("height"));
    
});

$(document).on("pagecreate", "#inicio", function(){
   alert($(window).height()); 
});