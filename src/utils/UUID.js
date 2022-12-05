//利用uuid形成未登录临时用户标识
import {v4 as uuidv4} from 'uuid'

//封装函数:uuid本地存储无则生成，有则获取
export const UUID = () =>{
	let USER_ID = localStorage.getItem('USERTEMPID')
	if (!USER_ID){
		USER_ID = uuidv4()
		localStorage.setItem('USERTEMPID',USER_ID)
	}
	return USER_ID
}