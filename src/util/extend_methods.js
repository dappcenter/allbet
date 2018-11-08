/**
 * 格式化数字
 */
const fmtNumber = (n) => {
	n = n * 1
	if(n >= 10000) {
		return((n / 10000).toFixed(2) + "万").replace(/\.00/,'')
	} else {
		return n
	}
}

/**
 * 格式化时间
 * @param {Object} obj
 * @param {String} type
 */
const fmtDate = (obj, type) => {
	
  obj = obj.replace(/T/g,' ');
  obj = obj.replace(/-/g,'/');

	let date = new Date(obj);
	let y = 1900 + date.getYear();
	let m = "0" + (date.getMonth() + 1);
	let d = "0" + date.getDate();
	let h = date.getHours();
	let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	if(type == 'full') {
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + " " + h + ":" + minutes + ":" + s
	}else if(type == 'time'){
		return h + ":" + minutes + ":" + s
	}else {
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length)
	}
}

/**
 * 账号格式化
 * @param {String} str
 */
const fmtAccount = (str) => {
	if(/^[0-9]*$/.test(str)) {
		return str.replace(/(.{3}).*(.{4})/, "$1****$2")
	}else if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(str)) {
		return str.replace(/(.{2}).*(@.{6})/, "$1****$2")
	}else {
		return str.replace(/(.{4}).*(.{6})/, "$1....$2")
	}
}

/**
 * 元素高度设置
 */
const setHeight = elem => {
	var fh = elem.parentNode;
	elem.style.height = fh.clientHeight + "px";
}

/**
 * 客户端下载
 */
const downLoadApp = data => {
	const ua = navigator.userAgent.toLowerCase()
	let u = navigator.userAgent;
	let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		if(ua.match('micromessenger')) {
			data.showGuidePop = true
		}else {
			window.location.href = window.ANDURL
		}
	} else if(isiOS) {
		if(ua.match(' qq')) {
			data.showGuidePop = true
		}else {
			window.location.href = window.IOSURL
		}
	} else {
		data.$dialog.alert({
			mes: '非Android、iOS'
		})
	}
}


const extendMethods = {
	fmtNumber,
	fmtDate,
	fmtAccount,
	setHeight,
	downLoadApp
}

export default {
	install(Vue) {
		for(let [k, v] of Object.entries(extendMethods)) {
			Object.defineProperty(Vue.prototype, '$' + k, {
				value: v
			})
		}
	}
}
