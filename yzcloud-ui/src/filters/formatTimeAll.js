/**
*传入一个时间戳
*/
export const formatTimeAll = (num) => {
	let date = new Date(num);
	let Y = date.getFullYear();//年
	let M = date.getMonth() + 1;//月
	let D = date.getDate();//日
	let h = date.getHours();//时
	let m = date.getMinutes();//分
	let s = date.getSeconds();//秒
	return [Y, M, D].map(fullZero).join('-') + ' ' + [h, m, s].map(fullZero).join(':');
}

function fullZero(num) {
	let n = num.toString();
	return n[1] ? n : '0' + n;
}