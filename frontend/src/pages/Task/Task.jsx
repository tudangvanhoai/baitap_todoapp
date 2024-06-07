import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button, Modal, Toast } from '@/components/UI'
import { useLoading } from '@/contexts/loadingContext'
import { DEFAULT_PAGINATION, PAGINATION } from '@/config/define'
import taskService from '@/services/api/taskService'
import { cn } from '@/utils/helper'
import FormCreateAndUpdate from './FormCreateAndUpdate'
import dayjs from 'dayjs'
import FormSearch from './FormSearch'
import userService from '@/services/api/userService'

const defaultValueDataSearch = {
  q: '',
  searchAssignee: '',
  searchStatus: '',
}

const Task = () => {
  const { showLoading, hideLoading } = useLoading()
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [userOptions, setUserOptions] = useState([])
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
  const [taskEdit, setTaskEdit] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [dataSearch, setDataSearch] = useState(defaultValueDataSearch)
  const MySwal = withReactContent(Swal)

  const handleFetchTasks = params => {
    showLoading()
    taskService
      .getList(params)
      .then(({ data, meta }) => {
        setTasks(data)
        setPagination(meta)
      })
      .catch(err => {
        Toast.error(err?.response?.data?.message || err.message)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handleFetchUsers = () => {
    userService
      .getAll()
      .then(data => {
        setUsers(data)
      })
      .catch(err => {
        Toast.error(err?.response?.data?.message || err.message)
      })
  }

  const handleConfirmDeleteTask = async id => {
    const result = await MySwal.fire({
      text: 'Are you sure you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      handleDeleteTask(id)
    }
  }

  const handleDeleteTask = id => {
    showLoading()
    taskService
      .delete(id)
      .then(() => {
        Toast.success('Task deleted successfully')
        handleFetchTasks({ ...dataSearch, page: 1 })
      })
      .catch(err => {
        Toast.error(err?.response?.data?.message || err.message)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handleSearchReset = () => {
    handleFetchTasks()
    setDataSearch(defaultValueDataSearch)
  }

  const handleSearch = () => {
    handleFetchTasks({ ...dataSearch, page: 1 })
  }

  const handleChangePage = selected => {
    setPagination({ ...pagination, current_page: selected })
    const dataTemp = { ...dataSearch, page: selected }
    handleFetchTasks(dataTemp)
    setDataSearch(dataTemp)
  }

  useEffect(() => {
    handleFetchTasks()
    handleFetchUsers()
  }, [])

  useEffect(() => {
    setUserOptions(() => {
      return users.map(user => {
        return {
          id: user._id,
          name: user.name,
        }
      })
    })
  }, [users])

  return (
    <div className="container min-h-screen pb-20">
      <h1 className="py-5 text-center text-4xl font-bold">List Tasks</h1>

      <div className="space-y-6">
        <Button
          type="button"
          className="ms-auto"
          onClick={() => {
            setIsOpenModal(true)
          }}
        >
          <i className="fa-regular fa-plus"></i>
          <span>Create new</span>
        </Button>

        <FormSearch
          dataSearch={dataSearch}
          setDataSearch={setDataSearch}
          userOptions={userOptions}
          onSearch={handleSearch}
          onReset={handleSearchReset}
        />

        <div className="overflow-y-auto rounded-lg bg-white shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-300 text-xs uppercase">
              <tr className="[&>*]:px-6 [&>*]:py-4">
                <th>Title</th>
                <th>Content</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length ? (
                tasks.map(task => (
                  <tr key={task._id} className="border-b [&>*]:px-6 [&>*]:py-4">
                    <td className="min-w-36">{task.title}</td>
                    <td>
                      <div className="min-w-52">{task.content}</div>
                    </td>
                    <td>{task.assignee?.name}</td>
                    <td>
                      <div
                        className={cn(
                          'w-fit rounded-full px-3 text-white',
                          task.status == 'todo' && 'bg-red-400',
                          task.status == 'inprogress' && 'bg-blue-500',
                          task.status == 'done' && 'bg-green-500',
                        )}
                      >
                        {task.status}
                      </div>
                    </td>
                    <td>{dayjs(task.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>
                      <div className="flex gap-2">
                        <Button
                          className="mr-2"
                          onClick={() => {
                            setIsOpenModal(true)
                            setTaskEdit({ ...task, assignee: task.assignee ?? '' })
                          }}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                          <span>Edit</span>
                        </Button>
                        <Button
                          onClick={() => {
                            handleConfirmDeleteTask(task._id)
                          }}
                        >
                          <i className="fa-regular fa-trash"></i>
                          <span>Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b [&>*]:px-6 [&>*]:py-4">
                  <td colSpan={7} className="text-center">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center overflow-x-auto">
          <ReactPaginate
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            forcePage={pagination.current_page - 1}
            pageRangeDisplayed={PAGINATION.PAGE_RANGE_DISPLAY}
            pageCount={pagination.last_page ?? 0}
            disableInitialCallback={true}
            renderOnZeroPageCount={null}
            className="flex select-none items-center justify-center"
            breakLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            pageLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            previousLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            nextLinkClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            activeLinkClassName="!text-blue-800 !bg-blue-300"
            disabledLinkClassName="!bg-gray-200 !text-gray-400 cursor-default"
            onPageChange={({ selected }) => {
              handleChangePage(selected + 1)
            }}
          />
        </div>
      </div>

      <Modal
        isOpen={isOpenModal}
        close={() => {
          setIsOpenModal(false)
        }}
        afterLeave={() => {
          setTaskEdit(null)
        }}
      >
        <FormCreateAndUpdate
          task={taskEdit}
          userOptions={userOptions}
          dataSearch={dataSearch}
          setIsOpenModal={setIsOpenModal}
          handleFetchTasks={handleFetchTasks}
          handleSearchReset={handleSearchReset}
        />
      </Modal>
    </div>
  )
}

export default Task
