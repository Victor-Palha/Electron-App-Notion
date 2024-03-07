import { IpcMain, ipcMain } from "electron";

ipcMain.handle("fetch-documents", async ()=>{
    return [
        {id: 1, name: "Document 1"},
        {id: 2, name: "Document 2"},
        {id: 3, name: "Document 3"},
        {id: 4, name: "Document 4"},
        {id: 5, name: "Document 5"},
    ]
})