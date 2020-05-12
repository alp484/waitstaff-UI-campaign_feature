import apisauce from 'apisauce'
import apiConfig from '../Config/ApiConfig'

class Api {
  // response codes
  baseURL = apiConfig.baseUrl
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL: this.baseURL,
    // here are some default headers
    headers: {
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 45000
  })

  getAllCategories(squareAndLocationId) {
    return this.api.get(`menu/square/${squareAndLocationId}`)
  }

  getImages(imgUrl) {
    return this.api.get(`menu/image/${imgUrl}`)
  }

  saveSchedulerEvent(event) {
    this.baseURL = apiConfig.hostUrl;
    return fetch('/scheduler/add', { data: event })
  }

  readSchedulerEvents() {

    return fetch('/scheduler/read')
  }

  saveCategory(squareAndLocationId, category) {
    return this.api.post(`menu/square/${squareAndLocationId}`, {
      type: 'CATEGORY',
      _id: category._id,
      id: category.id,
      name: category.name,
      image_url: category.image_url,
      active: category.active,
      items: category.items,
      created_at: category.createdAt,
      parentId: category.parentCategory
    })
  }

  deleteCategory(category) {
    return this.api.delete(`menu/category/${category._id}`, { type: "CATEGORY" })
  }

  getAllItems(squareAndLocationId, categoryId = null) {
    let request = `menu/category/${squareAndLocationId}/get/` + (categoryId ? categoryId : '');
    return this.api.get(request)
  }

  saveItem(squareAndLocationId, item) {
    return this.api.post(`menu/square/${squareAndLocationId}`, {
      type: 'ITEM',
      _id: item._id,
      id: item.id,
      name: item.name,
      location: item.location,
      description: item.description,
      title: item.title,
      image: item.image,
      price: item.price,
      taxes: item.taxes,
      active: item.active,
      options: item.options,
      modifiers: item.modifiers,
      created_at: item.createdAt
    })
  }

  uploadImage(file, merchantId) {
    const data = new FormData();
    data.append('payload', file);
    data.append('fileName', file.name);
    data.append('merchantId', merchantId);

    return fetch(`${apiConfig.baseUrl}/menu/image`, {
      method: 'POST',
      body: data
    }).then(
      response => response.json()
    ).then(
      success => success
    ).catch(
      error => console.log(error)
    )
  }

  deleteItem(item) {
    return this.api.delete(`menu/item/${item._id}`, { type: "ITEM" })
  }
}

export default new Api()
