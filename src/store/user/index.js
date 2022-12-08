//用户登录、注册小仓库
import {reqRegister,reqGetCode,reqUserLogin,reqUserInfo,reqUserLogout} from "@/api"
import {setToken,getToken,removeToken} from '@/utils/TOKEN'

let actions = {
	//获取验证码
	async getCode({ commit, state, dispatch }, phone) {
	     let result = await reqGetCode(phone);
	     if (result.code == 200) {
	          commit('GETCODE', result.data);
	          return 'ok';
	     } else {
	          return Promise.reject();
	     }
	},
	//注册用户的地方
	async registerUser({ commit, state, dispatch }, obj) {
	     //注册接口没有返回data,不需要提交mutation
	     let result = await reqRegister(obj);
		 console.log('register',result)
	     if (result.code == 200) {
	          //注册成功
	          return 'ok';
	     } else {
	          //注册失败
	          return Promise.reject(new Error(result.message));
	     }
	},
	//用户登录的地方:非常非常重要
	async userLogin({ commit, state, dispatch }, data) {
	     //接口说明:后台老师目前登录接口返回数据不正确的，以后工作的时候登录接口成功，返回格式100%和相面例子一样的!!!
	     /*
	       举例子
	        {
	              code:200,
	              data:{
	                   token:'1e4vdadhajkhdakj6sahdajk'
	              },
	              message:'登录成功'
	        }
	     */
	     let result = await reqUserLogin(data);
	     //登录成功
	     if (result.code == 200) {
	          commit('SET_TOKEN', result.data.token);
	          //以后开发的时候:经常的登录的成功获取token【持久化存储】
	          setToken(result.data.token);
	          return 'ok';
	     } else {
	          //登录失败
	          return Promise.reject(new Error(result.message));
	     }
	
	},
	//获取用户信息
	async getUserInfo({ commit, state, dispatch }) {
	     let result = await reqUserInfo();
		 //console.log('用户acitons:',result)
	     if (result.code == 200) {
	          commit('SET_USERINFO', result.data);
	          return 'ok';
	     } else {
	          return Promise.reject();
	     }
	},
	//用户退出登录
	async logout(context){
		let result = await reqUserLogout()
		if (result.code == 200){
			context.commit('CLEAR')
			return 'ok'
		}
		else{
			return Promise.reject(new Error('fail'))
		}		
	}
}
let mutations = {
	GETCODE(state,code){
		state.code = code
	},
	SET_TOKEN(state,token){
		state.token = token
	},
	SET_USERINFO(state,userInfo){
		state.userInfo = userInfo
	},
	CLEAR(state){
        //移除用户身份标识符
		removeToken()
		//清空用户名
		state.userInfo = {}
		state.token = ''
	}
}
let state = {
	//验证码
	code: '',
	//身份标识符很重要【存储在vuex】
	token: getToken(),
	//登录的用户信息
	userInfo: {}
}
let getters = {}

export default {
	actions,
	mutations,
	state,
	getters
}