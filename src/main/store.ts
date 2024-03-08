import Store from 'electron-store';
import { DocumentType } from '../shared/types/ipc';
interface StoreType {
    documents: Record<string, DocumentType>
}
export const store = new Store<StoreType>({
    defaults: {
        documents: {}
    }
})
