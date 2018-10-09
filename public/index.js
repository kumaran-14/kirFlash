var flag = false;
var address;
function autocomplete(inp) {

    var currentFocus;
    var myXML = new XMLHttpRequest();
    myXML.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlFunction(this);
        }
    };
    myXML.open("GET", "list_xml5.xml", true);
    myXML.send();

    var arr;
    function xmlFunction(xml) {
        var xmlDoc = xml.responseXML;
        arr = xmlDoc.getElementsByTagName("city");
    }
    inp.addEventListener("input", function (e) {
        var a, b, i, lval = this.value;
        if(lval[lval.length-1] == ","){
            flag = true;
        }
        address = lval.split(",");
        val = address[1].trim();
        if (flag) {
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            for (i = 0; i < arr.length; i++) {
                if (arr[i].attributes.getNamedItem("label").nodeValue.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("DIV");
                    b.innerHTML = "<strong>" + arr[i].attributes.getNamedItem("label").nodeValue.substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].attributes.getNamedItem("label").nodeValue.substr(val.length);
                    b.innerHTML += "<input type='hidden' value='" +address[0]+", "+ arr[i].attributes.getNamedItem("label").nodeValue + "'>";
                    address[1] = arr[i].attributes.getNamedItem("label").nodeValue;
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        console.log(inp.value);
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
                else
                    console.log("Fail");
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
autocomplete(document.getElementById("citystatezip"));