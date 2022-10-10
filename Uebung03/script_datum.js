function time() {
    var d = new Date();
    var ds = d.toDateString();
    var ts = d.toTimeString();

    var zeit = document.querySelector("#zeit");
    var datum = document.querySelector("#datum");


    zeit.style["font-size"] = "60px";
    zeit.style["text-align"] = "center";

    datum.style["font-size"] = "50px";
    datum.style["text-align"] = "center";

    document.getElementById("zeit").innerHTML = ts;
    document.getElementById("datum").innerHTML = ds;
}

function start()  {
    setInterval(time, 500);
}