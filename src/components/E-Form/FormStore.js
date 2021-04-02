/*
 * @Description: 
 * @Author: dengxiaodong
 * @Date: 2021-03-25 10:31:27
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-03-25 10:50:39
 */
class FormStore {

  constructor() {
    this.store = {}
  }

  setFieldsValue(newStore) {
    this.store = {...this.store, ...newStore};
  }

  getFieldValue(name) {
    return this.store[name]
  }


  
};

