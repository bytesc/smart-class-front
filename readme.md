# smart-class-front

✨ **一种基于代码生成的大语言模型 (LLM) 智能体，实现班级自主管理小程序**

🔔 如有项目相关问题，欢迎在本项目提出`issue`，我一般会在 24 小时内回复。

配套后端项目链接和界面展示
- github: [https://github.com/bytesc/smart-class-back](https://github.com/bytesc/smart-class-back)
- gitee: [https://gitee.com/bytesc/smart-class-back](https://gitee.com/bytesc/smart-class-back)

## 如何使用

使用[微信小程序开发工具打开](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

界面右上角，`详情->基本信息->AppId` 与后端保值一致

`./utils/util.js` 19行附件，改为后端服务器 url
```javascript
const serverUrl = "http://127.0.0.1:8001/api"
```


