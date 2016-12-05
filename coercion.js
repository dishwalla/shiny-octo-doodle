function Generate() { 
	var values = [true, false, 1, 0, -1, "1", "0", "-1", "", null, undefined, [], {}, [[]], [0], [1], NaN];	
 // var item = document.createDocumentFragment();
 var table = document.getElementById("table");
 var th = document.createElement("TR");
 var td = document.createElement("TD");
 th.appendChild(td);
 td.innerText = "";
 for (var k in values){
 	var td = document.createElement("TH");
 	td.innerText = values[k];
 	if (values[k] === undefined){
 		td.innerText = "und.";
 	} 
 	th.appendChild(td);
 }
 table.appendChild(th);
 for (var i in values){
 	var row = document.createElement("TR");
 	table.appendChild(row);
 	var td = document.createElement("TH");
 	td.innerText = values[i];
 	row.appendChild(td);
 	for (var j in values){
 		var td = document.createElement("TD");
 		var result = (values[i] == values[j]);
 		row.appendChild(td);
 		if (result){
 			td.setAttribute("class", "true");
 		} else td.setAttribute("class", "false");

 	}
 }
 var fs = document.getElementById("fs");
 fs.removeChild(document.getElementById("generate"));
 document.getElementById("expl").innerHTML = "<sup>" + "<br/>" + "*" + "Green - True" + "<br/>" + "Red - False" + "</sup>";
}