import { Fragment, useRef } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useLoading } from '@/contexts/loadingContext'
import { cn } from '@/utils/helper'

const Modal = props => {
  const { isOpen, close, children, afterLeave = () => {}, classNameDialogPane } = props
  const cancelButtonRef = useRef(null)
  const { loading } = useLoading()

  return (
    <Transition appear show={isOpen} as={Fragment} afterLeave={afterLeave}>
      <Dialog
        as="div"
        initialFocus={cancelButtonRef}
        className="relative !z-[1000]"
        onClose={() => !loading && close()}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto" ref={cancelButtonRef}>
          <div className="flex min-h-full items-center justify-center px-4 py-4 text-center sm:px-10 md:px-20">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={cn(
                  'h-full w-full max-w-xl transform rounded text-left align-middle transition-all',
                  classNameDialogPane,
                )}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
