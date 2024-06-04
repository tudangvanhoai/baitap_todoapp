import { Button, Input, Select } from '@/components/UI'
import { TASK_STATUS_LIST } from '@/config/define'

const FormSearch = props => {
  const { dataSearch, setDataSearch, onReset, onSearch, userOptions } = props

  const handleChangeDataSearch = e => {
    setDataSearch({
      ...dataSearch,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Input
          label="Search"
          className="w-full !py-2"
          placeholder="Search..."
          name="q"
          value={dataSearch.q}
          onChange={handleChangeDataSearch}
        />
        <Select
          label="Assignee"
          options={[{ id: 'no-assign', name: 'No assign' }, ...userOptions]}
          name="searchAssignee"
          value={dataSearch.searchAssignee}
          zeroValueText="All"
          onChange={handleChangeDataSearch}
        />
        <Select
          label="Status"
          options={TASK_STATUS_LIST}
          name="searchStatus"
          value={dataSearch.searchStatus}
          zeroValueText="All status"
          onChange={handleChangeDataSearch}
        />
      </div>
      <div className="flex justify-center gap-4">
        <Button type="button" onClick={onReset}>
          <i className="fa-regular fa-rotate-right"></i>
          <span>Refresh</span>
        </Button>
        <Button type="button" onClick={onSearch}>
          <i className="fa-regular fa-magnifying-glass"></i>
          <span>Search</span>
        </Button>
      </div>
    </form>
  )
}

export default FormSearch
