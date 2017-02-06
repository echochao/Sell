// 解析url参数
// @example ?id=12345&a=b
// @return Object {id:12345,a:b}


export function urlParse(){
		let url = window.location.search;
		let obj = {};
		url = url.substr('1').split("&");
		if(url!=""){
			url.forEach((item)=>{
				var tempArr = item.split("=");
				var key = decodeURIComponent(tempArr[0]);
				var value = decodeURIComponent(tempArr[1]);
				obj[key] = value;
			})
		}
		return obj;
	}