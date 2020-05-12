import {extendObservable, action} from 'mobx';
import api from '../Services/Api';
import Config from '../Config/ApiConfig';
import CategoryListStore from './CategoryListStore';

class CategoryUpdateStore {
  constructor () {
    extendObservable(this, {
      loading: false,
      currentCategory: null,
      showEditItems: false,
      image: '',
      items: [],
      deleteCategory: action((category) => {
        this.fetching = true;
        return api.deleteCategory(category).then((res) => {
          let tempList = this.deleteCategoryFromTree(this.categoryList);
          this.setData({categoryList: tempList})
        }).catch((ex) => {
          this.fetching = false
        }).then((res) => {
          this.fetching = false
        })
      })
    })
  }

  removeItemFromCategory = action((item) => {
    item.newbie = false
    this.items = this.currentCategory.items.filter((i) => i._id !== item._id);
  });
  addItemToCategory = action((item) => {
    item.newbie = true
    this.items.push(item);
  });

  uploadImage = action((file, merchantId) => {
    this.loading = true;
    api.uploadImage(file, merchantId).then((res) => {
      this.handleImageRes(res);
      this.loading = false;
    });
  });

  handleImageRes = action((res) => {
    if (res.url) {
      this.image = res.url;
      return res.url
    }
  });
  getUniqueFilename = (config) => {
    let timestamp = (new Date()).getTime();
    let randomInteger = Math.floor((Math.random() * 1000000) + 1);

    return config.aws.path + timestamp + '_' + randomInteger + '.png';
  };
  setCurrentCategory = action((object) => {
    this.currentCategory = object;
    if (object) {
      this.image = (!!object.image_url ? object.image_url : '');
      this.items = object.items.slice(0)
    } else {
      this.image = null
      this.items = []
    }
  });
  changeCategoryFieldValue = action((field, value) => {
    this.currentCategory[field] = value;
  });
  changeShowEditItems = action(() => this.showEditItems = !this.showEditItems);
  updateCategory = action(() => {
    let promiseList = []
    if (this.currentCategory) {
      let newbieItemList = this.items.filter((item) => item.newbie)
      newbieItemList.forEach((newbie) => {
        promiseList.push(CategoryListStore.removeItemFromCategories(newbie, this.currentCategory._id))
      })
      this.currentCategory.items = this.items
      promiseList.push(api.saveCategory(`${Config.merchantId}/${Config.locationId}`, this.currentCategory))
    }
    return Promise.all(promiseList)
  });

  validatingData () {

  }

}

export default new CategoryUpdateStore();
