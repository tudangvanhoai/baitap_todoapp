import { useForm } from 'react-hook-form'
import { Button, Input, Select, Toast } from '@/components/UI'
import { TASK_STATUS_LIST } from '@/config/define'
import { useLoading } from '@/contexts/loadingContext'
import taskService from '@/services/api/taskService'

const defaultValues = {
  title: '',
  content: '',
}

const FormCreateAndUpdate = props => {
  const { task, userOptions, dataSearch, setIsOpenModal, handleFetchTasks, handleSearchReset } =
    props
  const { showLoading, hideLoading } = useLoading()

  const { control, handleSubmit } = useForm({
    defaultValues: task ? { ...task, assignee: task.assignee?._id } : defaultValues,
  })

  const handleCreate = fields => {
    showLoading()
    taskService
      .create(fields)
      .then(() => {
        Toast.success('Task created successfully')
        setIsOpenModal(false)
        handleSearchReset()
      })
      .catch(err => {
        let errorMessage = ''
        if (err?.response?.status === 422) {
          errorMessage = err?.response?.data?.message.join('\n')
        } else {
          errorMessage = err?.response?.data?.message || err.message
        }
        Toast.error(errorMessage)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handleUpdate = fields => {
    showLoading()
    taskService
      .update(task._id, fields)
      .then(() => {
        Toast.success('Task updated successfully')
        setIsOpenModal(false)
        handleFetchTasks(dataSearch)
      })
      .catch(err => {
        let errorMessage = ''
        if (err?.response?.status === 422) {
          errorMessage = err?.response?.data?.message.join('\n')
        } else {
          errorMessage = err?.response?.data?.message || err.message
        }
        Toast.error(errorMessage)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const onSubmit = fields => {
    const fieldsTemp = { ...fields, assignee: fields.assignee || null }
    if (task) {
      handleUpdate(fieldsTemp)
    } else {
      handleCreate(fieldsTemp)
    }
  }

  return (
    <div className="rounded !bg-white p-8 py-10 shadow md:px-10">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-8 text-center text-3xl font-bold">{task ? 'Update' : 'Create'}</h1>
        <div className="grid grid-cols-1 gap-4">
          {task && <Input label="ID" value={task._id} disabled />}
          <Input label="Title" name="title" control={control} autoComplete="off" isRequired />
          <Input label="Content" name="content" control={control} autoComplete="off" />
          <Select
            label="Assignee"
            name="assignee"
            zeroValueText
            options={userOptions}
            control={control}
          />
          {task && (
            <Select
              label="Status"
              name="status"
              options={TASK_STATUS_LIST}
              control={control}
              isRequired
            />
          )}
        </div>
        <Button type="submit" className="ml-auto">
          {task ? 'Save' : 'Create'}
        </Button>
      </form>
    </div>
  )
}

export default FormCreateAndUpdate
