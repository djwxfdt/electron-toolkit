const path = require('path')
const {app,BrowserWindow} = require('electron')

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null

// if (!handleStartupEvent()) {
// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', () => {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        transparent: true,
        shadow: true,
        webPreferences: {
            webSecurity: false
        },
        resizable: false,
        frame: false
    })

    mainWindow.loadURL('file://' + __dirname + '/index.html')
    // 打开开发工具
    mainWindow.openDevTools()

    // mainWindow.on('maximize', function() {
    //   console.log("I am maximized.")
    // })

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function() {
        mainWindow = null
    })
})
// }
