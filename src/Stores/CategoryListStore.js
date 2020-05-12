import {extendObservable, action, observable} from 'mobx'
import api from '../Services/Api'
import apiConfig from '../Config/ApiConfig'

class CategoryListStore {
  constructor () {
    extendObservable(this, {
      fetching: false,
      categoryList: observable.deep([]),
      squareAndLocationId: '',
      activeCategory: null,
      setData: action((data) => {
        this.squareAndLocationId = data.squareAndLocationId !== undefined ? data.squareAndLocationId : this.squareAndLocationId
        this.categoryList = data.categoryList !== undefined ? data.categoryList : this.categoryList

        if (!!this.categoryList) {
          if (this.categoryList[0]) {
            this.activeCategory = this.categoryList[0]._id;
          }

          let tempAllCategories = []
          this.categoryList.forEach((c) => {
            let temp = this.getAllCategories(c)
            if (temp.length) {
              tempAllCategories = tempAllCategories.concat(temp)
            }
          })
          let allProductsCategory = {
            name: 'All Products',
            categories: this.categoryList,
            items: [],
            createdAt: new Date(),
            index: 0
          }
          this.allCategories = [allProductsCategory, ...tempAllCategories].filter(c => c.name !== "Menu").map((c, index) => ({
            ...c,
            index
          }))
          this.selectedCategory = this.allCategories[0];
          ;
        }
      }),
      selectedCategory: null,
      allCategories: [],
      getAllCategories: (category, currentDepth = 0) => {
        let result = [{
          ...category,
          depth: currentDepth
        }]
        if (category && category.categories) {
          category.categories.forEach((c) => {
            result = result.concat(this.getAllCategories(c, currentDepth + 1))
          })
        }
        return result
      },
      deleteCategory: action((category) => {
        this.fetching = true
        return api.deleteCategory(category).then((res) => {
          let tempList = this.deleteCategoryFromTree(this.categoryList)
          this.setData({categoryList: tempList})
        }).catch((ex) => {
          this.fetching = false
        }).then((res) => {
          this.fetching = false
        })
      }),
      removeItemFromCategories: action((item, exceptForCategoryId) => {
        this.fetching = true
        let categoriesWithItem = this.allCategories.filter((category) =>
          (category._id !== exceptForCategoryId || !exceptForCategoryId) &&
          category.items &&
          category.items.filter((i) => i._id === item._id).length > 0
        )
        let promiseList = []
        categoriesWithItem.forEach((category) => {
          let itemsWithoutDeletedOne = category.items.filter((i) => i._id !== item._id)
          if (itemsWithoutDeletedOne.length !== category.items.length) {
            promiseList.push(api.saveCategory(`${apiConfig.merchantId}/${apiConfig.locationId}`, {
              ...category,
              items: itemsWithoutDeletedOne
            }))
          }
          category.items = itemsWithoutDeletedOne
        })

        return Promise.all(promiseList)
          .then((res) => res)
          .catch((ex) => {
            console.error(ex, 'ERROR from removeItemFromCategories')
          })
          .then(() => {
            this.fetching = false
          })
      })
    })
  }

  deleteCategoryFromTree (category, node) {
    return node//.categories ? node.categories.filter((c) => c!== category) : []
  }

  setActiveCategory = action((id) => {
    this.activeCategory = id
  });

  loadData () {
    this.fetching = true;
    return api.getAllCategories(this.squareAndLocationId).then((response) => {
      if (response.ok && response.data) {
        this.setData({
          categoryList: this.dataNormalize([{
            isRoot: true,
            _id: 0,
            name: 'Menu',
            categories: response.data.menu
          }], 0)
        })
      }
    }).catch((ex) => {
      this.fetching = false
    }).then(() => {
      this.fetching = false
    })
  }

  dataNormalize (data, depth, parentId = null) {
    return data.map((row, index) => this.singleDataNormalize(row, index, depth, parentId))
  }

  singleDataNormalize (data, index, depth, parentId = null) {
    const categories = data.categories ? this.dataNormalize(data.categories, depth + 1, data._id) : []
    let normalizedData = null
    if (!!data) {
      normalizedData = {
        ...data,
        createdAt: data.created_at,
        merchantId: data.merchant_id,
        items: this.itemsNormalize(data.items),
        categories: categories,
        isSelected: index === 0 && depth === 0,
        parentId
      }
    }
    return normalizedData
  }

  itemsNormalize (data) {
    return data ? data.map((row) => this.singleItemNormalize(row)) : []
  }

  singleItemNormalize (row) {
    return {
      ...row,
      createdAt: row.created_at
    }
  }

  update = action((obj) => {
    this.categoryList.map((item) => item._id === obj._id ? obj : item);
  });
}

export default new CategoryListStore();

