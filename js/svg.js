    
window.onload = function(){
	//svgNS
	svg_ns = "http://www.w3.org/2000/svg",
	selectsvg = document.getElementById("selectsvg"),
	createsvg = document.getElementById("createsvg"),
	transform = document.getElementById("transform"),
	selected = null,
	
	//ie9以下支持classList
	supportIe9();
	
	//初始化transform
	Transform = {
		translateX: 0,
		translateY: 0,
		rotate: 0,
		scale: 1
	};
	
	//默认图形属性
	shapeInfo = {
		rect: "x:20,y:20,width:200,height:200,rx:0,ry:0",
		circle: "cx:100,cy:100,r:50",
		ellipse: "cx:50,cy:50,rx:20,ry:30",
		line: "x1:30,y1:30,x2:40,y2:40"
	};
	
	//创建svg对象
	var canvas = document.getElementById("canvas");
    svg = document.createElementNS(svg_ns,"svg");
	svg.setAttribute("width","100%");
	svg.setAttribute("height","100%");
	canvas.appendChild(svg);
	
	//创建svg图形
	addEvent(selectsvg,"click",function(e){
		e = getEven(e);
		if(e.target.tagName.toLowerCase() === "label"){
			createSVG(e.target.getAttribute("data"));
		}
	});
	
	//编辑svg图形
	addEvent(createsvg,"input",function(e){
		e = getEven(e);
		if(e.target.tagName.toLowerCase() === "input"){
			updateSVG(e.target.getAttribute("name"),e.target.value);
		}
	});
	
	addEvent(transform,"input",function(e){
		e = getEven(e);
		if(e.target.tagName.toLowerCase() === "input"){
			updateSVG(e.target.getAttribute("id"),e.target.value);
		}
	});
}

//创建svg图形
function createSVG(type){
	
	if(shapeInfo[type]){
		drawsvg(type);
	}
}

//画出对应的svg图形
function drawsvg(type){
	var str = shapeInfo[type].split(",");
	var attribute,value,obj;
	var svgobj = document.createElementNS(svg_ns,type);
	createsvg.innerHTML = "";
	
	for(var i in str){
		obj = str[i].split(":");
		attribute = obj[0];
		value = obj[1];
		svgobj.setAttribute(attribute,value);
		display(attribute,value);
	}
	createsvg.classList.add("text-right");
	
	var fill = document.getElementById("fill"),
	    stroke = document.getElementById("stroke"),
	    strokewidth = document.getElementById("stroke-width");
	
	svgobj.setAttribute("fill",fill.getAttribute("value"));
	svgobj.setAttribute("stroke",stroke.getAttribute("value"));
	svgobj.setAttribute("stroke-width",strokewidth.getAttribute("value"));
	selected = svgobj;
	svg.appendChild(svgobj);
}

//显示编辑的图形
function display(attribute,value){
	var label = document.createElement("label");
	label.innerText = attribute;
	createsvg.appendChild(label);
	var Input = document.createElement("input");
	Input.setAttribute("type","range");
	Input.setAttribute("name",attribute);
	Input.setAttribute("value",value);
	Input.setAttribute("min","0");
	Input.setAttribute("max","800");
	createsvg.appendChild(Input);
	var br = document.createElement("br");
	createsvg.appendChild(br);
}

//更新svg
function updateSVG(name,value){

	if(Transform[name] !== undefined){
		Transform[name] = value;
		value = "translate(" + Transform["translateX"] +","+ Transform["translateY"]
		        + ") " + "rotate(" + Transform["rotate"] + ") "
		        + "scale(" + Transform["scale"] + ")";
		selected.setAttribute("transform",value)
	}else{
		selected.setAttribute(name,value);
	}
}

//ie9以下支持classList
function supportIe9(){
	if (!("classList" in document.documentElement)) {  
        Object.defineProperty(HTMLElement.prototype, 'classList', {  
            get: function() {  
                var self = this;  
                function update(fn) {  
                    return function(value) {  
                        var classes = self.className.split(/\s+/g),  
                            index = classes.indexOf(value);  
                          
                        fn(classes, index, value);  
                        self.className = classes.join(" ");  
                    }  
                }  
                  
                return {                      
                    add: update(function(classes, index, value) {  
                        if (!~index) classes.push(value);  
                    }),  
                      
                    remove: update(function(classes, index) {  
                        if (~index) classes.splice(index, 1);  
                    }),  
                      
                    toggle: update(function(classes, index, value) {  
                        if (~index)  
                            classes.splice(index, 1);  
                        else  
                            classes.push(value);  
                    }),  
                      
                    contains: function(value) {  
                        return !!~self.className.split(/\s+/g).indexOf(value);  
                    },  
                      
                    item: function(i) {  
                        return self.className.split(/\s+/g)[i] || null;  
                    }  
                };  
            }  
        });  
    }  
}
