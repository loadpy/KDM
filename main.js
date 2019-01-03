const electron =require("electron");
const url = require('url');
const path =require('path');

const {app, BrowserWindow,Menu}=electron;

let mainWindow;
let addWindow;


//Listen for app to be ready
app.on('ready', function (){
    //Create new window
    mainWindow = new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname : path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes: true

    }));
    //Quit app when closed
    mainWindow.on('closed',function(){
        app.quit();
    });

    //Building Menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width:400,
        height:300,
        title:'DownloadLink'

    });
    //Load html into window
    addWindow.loadURL(url.format({
        pathname : path.join(__dirname,'addWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    // Garbage Collection handle
    addWindow.on('close',function(){
        addWindow = null;
    });


    

}


//CREATE MENU TEMPLATE
const mainMenuTemplate = [
{
    label:'File',
    submenu:[
        {
            label:'Download file',
            click(){
                createAddWindow();
            }
        },
        {
            label:'Delete file'
        },
        {
            label:'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
            click(){
                app.quit();
            }
        } 
    ]
},
{
    label:'Tools'
},
{
    label:'Connection'
}

];

//If mac,add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tool if not published
if(process.env.NODE_ENV !== 'production')
{
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
              role: 'reload' 
            }
        ]
    });
}