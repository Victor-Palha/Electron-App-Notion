import {ToC} from "../components/ToC"
import { Editor, onContentUpdatedParams } from "../components/Editor";
import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { DocumentType } from "~/src/shared/types/ipc";

export function Document(){
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    async function handleFetchDocument(id: string) {
        const response = await window.api.fetchDocument({
            id
        });
        return response.data;
    }

    const {data, isFetching} = useQuery({
        queryKey: ["document", id],
        queryFn: () => handleFetchDocument(id as string)
    })

    const {mutateAsync: saveDocument} = useMutation({
        mutationFn: async ({title, content}: onContentUpdatedParams)=>{
            await window.api.saveDocument({
                id: id!,
                title,
                content
            })
        },
        onSuccess: (_, {title}) => {
            queryClient.setQueryData(["documents"], (documents: DocumentType[])=>{
                return documents?.map((docs)=> {
                    if(docs.id === id){
                        return {
                            ...docs,
                            title,
                        }
                    }
                    return docs                
                })
              })
        }
    })

    const initialContent = useMemo(()=> {
        if(data){
            return `<h1>${data.title}</h1>${data.content ?? "<p></p>"}`
        }else{
            return "<h1>Untitled</h1><p></p>"
        }
    }, [data])

    async function handleEditorContentUpdate({content, title}: onContentUpdatedParams){
        await saveDocument({title, content})
    }
    return (
        <main className="flex-1 flex py-12 px-10 gap-8">
            <aside className="hidden lg:block sticky top-0">
                <span className="text-rotion-300 font-semibold text-xs">
                    TABLE OF CONTENTS
                </span>
                <ToC.Root>
                    <ToC.Link>Back-end</ToC.Link>
                    <ToC.Section>
                        <ToC.Link>Back-end</ToC.Link>
                        <ToC.Link>Back-end</ToC.Link>
                    </ToC.Section>
                </ToC.Root>
            </aside>

            <section className="flex-1 flex flex-col items-center">
                {!isFetching && data && (
                    <Editor 
                        content={initialContent} 
                        onContentUpdate={handleEditorContentUpdate}
                    />
                )}
            </section>
        </main>
    )
}