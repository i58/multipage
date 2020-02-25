/**
 * token key
 */
export const TOKEN_KEY = 'token'
/**
 * @param params 判断是否是字符串类型
 */
export function isString(params: any): boolean {
    return Object.prototype.toString.call(params) === '[object String]'
}
/**
 * @param params 判断是否是函数
 */
export function isFunction(params: any): boolean {
    return Object.prototype.toString.call(params) === '[object Function]'
}
/**
 * @param params 判断是否是数值类型
 */
export function isNumber(params: any): boolean {
    return Object.prototype.toString.call(params) === '[object Number]'
}
/**
 * @param params 判断是否是对象
 */
export function isObject(params: any): boolean {
    return Object.prototype.toString.call(params) === '[object Object]'
}
/**
 * @param params 判断是否是空对象
 */
export function isEmptyObject(params: any): boolean {
    return !Object.keys(params).length
}
/**
 * set token
 */
export const setToken = (token: string) => {
    sessionStorage[TOKEN_KEY] = token
}
/**
 * 获取token
 */
export function getToken(): string {
    const token = sessionStorage[TOKEN_KEY]
    if (token) {
        return token
    } else {
        return ''
    }
}
/**
 * @description 浏览器是否支持当前项目
 */
export const supportBrowser = (): boolean => {
    let userAgent = navigator.userAgent
    //判断是否IE的Edge浏览器
    // let isEdge = userAgent.indexOf("Edge") > -1
    //判断是否Safari浏览器
    let isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1
    //判断Chrome浏览器
    let isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1
    return isSafari || isChrome
}
/**
 * 随机不重复id
 */
export const guid = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    }).toUpperCase()
}
/**
 * 转换存储单位
 */
export const bytesToSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    var k = 1000, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
interface downloadOptions {
    url: string;
    fileName: string;
}
/**
 * 下载
 * @param options 
 * @example
 * ```
 * download({
        url: url,
        fileName: '导出文件.xlsx'
    })
 * ```
 */
export const download = function(options: downloadOptions){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', options.url, true);
    xhr.responseType = 'arraybuffer';
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);
    xhr.setRequestHeader('zc-token', `${getToken()}`);
    xhr.setRequestHeader('zc-type', `C`);
    xhr.setRequestHeader('zc-plantform', `WEB`);
    var promise = new Promise((resolve) => {
        xhr.onload = function () {
            if (this.status == 200) {
                var blob = new Blob([this.response], { type: 'arraybuffer' });
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = options.fileName;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                a.remove()
                resolve(this.response)
            }
        }
    })
    xhr.send();
    return promise;
}

interface loadJsType {
    url: string;
    async?: boolean;
    callback(): any;
}
/**
 * @function 动态加载js文件
 * 
 * @example
 * ```
 *  loadJs({
        url: 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
        callback() {
            _this.getLocation()
        }
    })
 * ```
 */
export const loadJs = function (options: loadJsType) {
    var nodeHead = document.getElementsByTagName('head')[0]
    var nodeScript: any = null
    nodeScript = document.createElement('script')
    nodeScript.setAttribute('type', 'text/javascript')
    nodeScript.setAttribute('src', options.url)
    if(options.async!=false){
        nodeScript.setAttribute('async', true)
    }
    if (options.callback) {
        nodeScript.onload = nodeScript.onreadystatechange = function () {
            if (nodeScript.ready) {
                return false
            }
            if (!nodeScript.readyState || nodeScript.readyState === 'loaded' || nodeScript.readyState === 'complete') {
                nodeScript.ready = true
                options.callback()
            }
        }
    }
    nodeHead.appendChild(nodeScript)
}
/**
* 装饰器用于操作方法防抖
* @param [wait: number] 延时ms
* @param [immediate: boolean] 立即执行
* @returns descriptor
*/
export const Debounce = (wait: number = 500, immediate: boolean = false) => (target: any, key: any, descriptor: any) => {
    let timeout: any;
    const original = descriptor.value
    descriptor.value = function () {
        let _this = this
        let later = function(){
            timeout = null
            if (!immediate) {
                original.apply(_this, arguments)
            }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) {
            original.apply(this, arguments)
        }
    }
    return descriptor
}
/**
 * 装饰器用于操作函数节流
 * @param delay 延迟时间(毫秒),默认300
 * 
 * @example
 * 
 * @Throttle()
 * getList(){
 *    // TODO
 * }
 */
export const Throttle = (delay: number = 300) => (target: any, key: any, descriptor: any) => {
    let last: any;
    let deferTimer: any;
    const original = descriptor.value;
    descriptor.value = function() {
        let _this = this
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function() {
                last = now
                original.apply(_this, arguments)
            }, deferTimer)
        }else {
            last = now
            original.apply(this, arguments)
        }
    }
    return descriptor
}

export const checkPerm = (store:any,rules:any):boolean => {
    if(rules == undefined){
        return true
    }
    let rule = rules.split(',')
    // 操作按钮没有设置has参数的不过滤
    if (rule.length == 0) {
        return true
    }
    let userType = store.state.user.userType
    // 用户类型属于超管在不处理
    if (userType == 2) {
        return true
    }
   
    let result = store.state.app.ruleList && store.state.app.ruleList.some((r: string) => rule.some((s: string) => s === r))
    return result
}
/**
 * 数据去重
 * @param arr1 
 * @param arr2 
 */
export const union = (arr1:any[], arr2:any[]):any[] => {
    return Array.from(new Set([...arr1, ...arr2]))
}