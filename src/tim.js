import TIM from 'tim-js-sdk'
import COSSDK from 'cos-js-sdk-v5'

// 初始化 SDK 实例
const tim = TIM.create({
  SDKAppID: 1400327058
})

window.setLogLevel = tim.setLogLevel

// 无日志级别
tim.setLogLevel(1)

// 注册 cos
tim.registerPlugin({'cos-js-sdk':COSSDK})

export default tim
