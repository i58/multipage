/**
 * 配置文件
 */

export enum Dict {
    userType = 'USERTYPE',
    /**
     * 我是注释，测试
     */
    deviceType = '我是字典code，使用ts 枚举类'
}
/**
 * 分页每页显示默认数量
 */
export const PAGESIZE = 10;

export const PAGENAME = '一汽出行'
/**
 * 七牛相关配置
 */
export const Qiniu = {
    url: '//up-z2.qiniup.com'
}
/**枚举 */
export const Enum  = {
    /**性别 */
    sex:[
        { value: '0',label: '男'},
        { value: '1',label: '女'},
    ]
}

export interface ConfigDescription {
    /**
     * 字典
     */
    Dict: typeof Dict;
    /**
     * 枚举类
     */
    Enum: typeof Enum;
    /**
     * 七牛云相关配置
     */
    Qiniu: typeof Qiniu;
}