$(document).ready(function()
{
    let percentage = 0;
    let deltaTime = 30;

    // Función que simula la carga de la web
    function simulatedLoad()
    {
        if (percentage < 100) 
        {
            percentage++;
            $(".loader-text .percentage").text(percentage + "%");
            setTimeout(simulatedLoad, 30);
        }
        else
        {
            $("#loader").fadeOut(500, function() 
            {
                $("#content").fadeIn(350);
            });
        }
    }

    // Llamamos a la función en el momento de la carga de la web
    simulatedLoad();
});