import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, Toast } from '@/components/UI'
import { TASK_STATUS_LIST } from '@/config/define'
import { useLoading } from '@/contexts/loadingContext'
import taskService from '@/services/api/taskService'
import userService from '@/services/api/userService'

const defaultValues = {
  title: '',
  content: '',
  status: 'todo',
}

const FormCreateAndUpdate = props => {
  const { setIsOpenModal, task, userOptions, dataSearch, handleFetchTasks } = props
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
        handleFetchTasks()
      })
      .catch(err => {
        Toast.error(err?.response?.data?.message || err.message)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handleUpdate = fields => {
    showLoading()
    taskService
      .update(task._id, { ...fields, assignee: fields.assignee || null })
      .then(() => {
        Toast.success('Task updated successfully')
        setIsOpenModal(false)
        handleFetchTasks(dataSearch)
      })
      .catch(err => {
        Toast.error(err?.response?.data?.message || err.message)
      })
      .finally(() => {
        hideLoading()
      })
  }

  const onSubmit = fields => {
    if (task) {
      handleUpdate(fields)
    } else {
      handleCreate(fields)
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
