
var appUtils = {
    isLogin(){
        var user = uni.getStorageSync("xyys-user")
        if(!user){
            return false
        }else{
            return true
        }
    },
    getUserInfo(){
        var user = JSON.parse(uni.getStorageSync("xyys-user"))
        return user
    },
    setUserInfo(user){
        uni.setStorageSync('xyys-user',JSON.stringify(user))
    }
}


export default appUtils