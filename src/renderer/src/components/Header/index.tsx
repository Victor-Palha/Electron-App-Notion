import clsx from 'clsx'
import * as Clb from "@radix-ui/react-collapsible";

import { Code, CaretDoubleRight, TrashSimple } from 'phosphor-react'
import * as Breadcrumbs from './Breadcrumbs'
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DocumentType } from '~/src/shared/types/ipc';


type HeaderProps = {
  isSideBarOpen: boolean
}
export function Header({ isSideBarOpen }: HeaderProps) {
  const {id} = useParams<{id: string}>()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const isMacOS = process.platform === 'darwin'
  const isSidebarOpen = isSideBarOpen

  const {mutateAsync: deleteDocument, isPending: isDeleting} = useMutation({
    mutationFn: async () => {
      if(!id) return Promise.reject("No id provided")
      await window.api.deleteDocument({
        id
      });
    },
    onSuccess: ()=> {
      queryClient.setQueryData(["documents"], (documents: DocumentType[])=>{
        return documents.filter(doc=>doc.id !== id)
      })
      navigate("/")
    }
  })

  return (
    <div
      id="header"
      className={clsx(
        'border-b h-14 border-rotion-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >

      <Clb.Trigger
        className={clsx('h-5 w-5 text-rotion-200 hover:text-rotion-50', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </Clb.Trigger>

      {id && (
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-pink-500" />
              Estrutura técnica
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.HiddenItems />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="inline-flex region-no-drag">
            <button
              disabled={isDeleting}
              onClick={()=>deleteDocument()}
              className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50 disabled:opacity-60">
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </>
      )}
    </div>
  )
}
