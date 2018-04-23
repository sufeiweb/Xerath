/**
 * es6数组去重
 * @param {*} arr 
 */
function unique(arr) {
    return Array.from(new Set(arr));
}
/**
 * 简单的数据绑定显示
 * @param {*} elementId  容器id
 * @param {*} num 显示数据
 */
function DataModel(elementId, num) {
    let oEle = document.getElementById(elementId);
    oEle.innerHTML = num;
}