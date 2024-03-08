export interface DocumentType {
    id: string,
    title: string,
    content?: string
}

/**
 * Requests
 */

export interface FetchDocumentRequest {
    id: string
}

export interface SaveDocumentRequest extends DocumentType {}

export interface DeleteDocumentRequest {
    id: string
}

/**
 * Responses
 */

export interface FetchAllDocumentsResponse {
    data: DocumentType[]
}

export interface FetchDocumentResponse {
    data: DocumentType
}

export interface CreateDocumentResponse {
    data: DocumentType
}