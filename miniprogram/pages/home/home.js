// pages/home/home.js

const db = wx.cloud.database({
  env: 'store-91fad3'
})

const util = require('../../utils/util')


Page({
  data: {
    productList: [], // Products List
  },

  onLoad(options) {
    this.getProductList()
  },

  getProductList() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.collection('product').get().then(result => {
      wx.hideLoading()

      const data = result.data
      // 2 digits for price
      data.forEach(product => product.price = util.priceFormat(product.price))

      if (data.length) {
        this.setData({
          productList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
})