//用户登录身份标识唯一模块
export const setToken = (token)=>{
	localStorage.setItem("TOKEN",token)
}

export const getToken = () => {
	return localStorage.getItem("TOKEN")
}

export const removeToken = () => {
	localStorage.removeItem("TOKEN")
}