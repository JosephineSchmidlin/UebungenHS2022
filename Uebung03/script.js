function changestyle() {
    var text = document.querySelector("#text");
    var random = Math.floor(Math.random()*16777215).toString(16);
    var farbe = "#" + random;
    var t = document.querySelector("#eingabe").value;

    text.style["color"] = farbe;
    text.style["font-size"] = "70px";
    text.style["text-align"] = "center";

    document.getElementById("text").innerHTML = t
}