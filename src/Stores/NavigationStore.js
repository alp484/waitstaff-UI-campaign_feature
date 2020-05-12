import React from 'react'
import { extendObservable, action } from 'mobx'
import CategoryListScreen from '../Containers/CategoryListScreen'
import ItemListScreen from '../Containers/ItemListScreen'
import CategoryUpdateScreen from '../Containers/CategoryUpdateScreen'
import ItemUpdateScreen from '../Containers/ItemUpdateScreen'
import ScheduleScreen from '../Containers/ScheduleScreen'
import CampaignScreen from '../Containers/CampaignScreen'

const Views = {
  category: <CategoryListScreen />,
  updateCategory: <CategoryUpdateScreen />,
  item: <ItemListScreen />,
  itemUpdate: <ItemUpdateScreen />,
  scheduleScreen: <ScheduleScreen />,
  campaignScreen: <CampaignScreen />
}

class NavigationStore {
  constructor() {
    extendObservable(this, {
      activeScreen: Views.campaignScreen,
      prevScreenName: '',
      isOpenMenu: false,
      changeScreen: action((screenName, prevScreenName = null) => {
        this.prevScreenName = prevScreenName
        const newScreen = Views[screenName]
        if (newScreen) {
          this.isOpenMenu = false
          this.activeScreen = newScreen
        }
      }),
      openMenu: action(() => {
        this.isOpenMenu = true
      }),
      closeMenu: action(() => {
        this.isOpenMenu = false
      })
    })
  }
}

export default new NavigationStore()
