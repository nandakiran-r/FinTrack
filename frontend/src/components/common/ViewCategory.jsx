import React, { useEffect, useState } from 'react'
import { SAGetCategory } from '../../helpers/api-communicator'

const ViewCategory = () => {
  const [categoryList, setCategoryList] = useState('')
  useEffect(() => {
    const getCategories = async () => {
      const response = await SAGetCategory()
      setCategoryList(response)
    }
    getCategories()
  }, [setCategoryList])
  return (
    <div className="category-table">
      <table className="table">
        <thead>
          <tr>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {categoryList &&
            categoryList?.map((category) => (
              <tr key={category._id}>
                <td>{category?.categoryName}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewCategory
