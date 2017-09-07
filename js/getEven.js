//通过类名获取对象
function getClass(tagName,ClassName){
	if(document.getElementsByClassName) //支持这个函数
    {        
    	return document.getElementsByClassName(ClassName)[0];
    }else{
    	var obj = document.getElementsByTagName(tagName);
		for(var i=0; i < obj.length;i++){
			var reg = new RegExp(ClassName);
			if(reg.test(obj[i].className)){
				return obj[i];
			}
		}
		return undefined;
		
    }
};

//获取视口宽高
function getClientW(){
	return document.documentElement.clientWidth 
	       || document.body.clientWidth;
}

function getClientH(){
	return document.documentElement.clientHeight   
	       || document.body.clientHeight;
}

/*创建兼容ie和其它浏览器兼容的获取事件方法*/
//
//绑定事件(参数依次为对象、类型、函数)
function addEvent(obj,type,handle){	
	if(obj.addEventListener){//非ie兼容(dom2级)
		obj.addEventListener(type,handle,false);
	}else if(obj.attachEvent){//ie兼容(dom2级)
		obj.attachEvent("on"+type,handle);
	}else{//低版本ie(dom0级)
		obj['on'+type] = handle;
	}
}

//删除事件(参数依次为对象、类型、函数)
function stopEvent(obj,type,handle){	
	if(obj.removeEventListener){//非ie兼容(dom2级)
		obj.removeEventListener(type,handle,false);
	}else if(obj.detachEvent){//ie兼容(dom2级)
		obj.detachEvent("on"+type,handle);
	}else{//低版本ie(dom0级)
		obj["on"+type] = null;
	}
}

//获取事件(参数为事件)
function getEven(event){
	return event?event:window.event;
}

//获取事件类型(参数为事件)
function getEventType(event){
	return event.type;
}

//获取事件具体是哪个元素(参数为事件)
function getElement(event){
	return event.target || event.srcElement;
}

//阻止事件冒泡(参数为事件)
function preventBubble(event){
	if(event.stopPropagation){//非ie
		event.stopPropagation();
	}else{//ie
		event.cancelBubble = true;
	}
}

//阻止事件默认行为(参数为事件)
function preventEventDefault(event){
	if(event.preventDefault){//非ie
		event.preventDefault();
	}else if(event.returnValue){//ie
		event.returnValue = false;
	}
}

