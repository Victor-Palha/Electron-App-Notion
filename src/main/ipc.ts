import { IpcMain, ipcMain } from "electron";
import { IPC } from "../shared/constants/ipc";
import { store } from "./store";
import { randomUUID } from "node:crypto";
import { 
    FetchAllDocumentsResponse, 
    FetchDocumentResponse,
    FetchDocumentRequest,
    CreateDocumentResponse,
    SaveDocumentRequest,
    DeleteDocumentRequest,
    DocumentType
} from "../shared/types/ipc";

ipcMain.handle(
    IPC.DOCUMENTS.FETCH_ALL, 
    async (): Promise<FetchAllDocumentsResponse> => {
        return {
            data: Object.values(store.get("documents"))
        }
    }
)

ipcMain.handle(
    IPC.DOCUMENTS.FETCH, 
    async (_, {id}: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
        const documentQueried = store.get(`documents.${id}`) as DocumentType
        return {
            data: documentQueried
        }
    }
)

ipcMain.handle(
    IPC.DOCUMENTS.CREATE, 
    async (): Promise<CreateDocumentResponse> => {
        const id = randomUUID()

        const document = {
            id,
            title: "Untitled",
            content: ""
        }

        store.set(`documents.${id}`, document)

        return {
            data: document
        }
    }
)

ipcMain.handle(
    IPC.DOCUMENTS.SAVE, 
    async (_, {id, title, content}: SaveDocumentRequest): Promise<void> => {

        store.set(`documents.${id}`, {
            id,
            title,
            content
        })
    }
)

ipcMain.handle(
    IPC.DOCUMENTS.DELETE, 
    async (_, {id}: DeleteDocumentRequest): Promise<void> => {
        // @ts-ignore
        store.delete(`documents.${id}`)
    }
)