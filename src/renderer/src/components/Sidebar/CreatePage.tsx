import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { DocumentType } from '~/src/shared/types/ipc'

export function CreatePage() {
  const queryClient = useQueryClient()
  async function handleCreateDocument() {
    const response = await window.api.createDocument()

    return response.data
  }
  const {isPending, mutateAsync: createDocument} = useMutation({
    mutationFn: handleCreateDocument,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({queryKey: ['documents']})
    // }
    onSuccess: (data) => {
      queryClient.setQueryData(["documents"], (documents: DocumentType[])=>{
        return [...documents, data]
      })
    }
  })


  return (
    <button
      onClick={() => createDocument()}
      disabled={isPending}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60">
      <Plus className="h-4 w-4" />
      Criar novo documento
    </button>
  )
}
