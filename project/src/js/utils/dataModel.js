import Constant from './constant'

const USER_INFO = Constant.USER_INFO
const API = Constant.API

const Tools = {
  checkStates: function (response) {
    if (response.ok) {
      return response
    } else {
      let error = new Error(response.statusText);
      error.state = response.status;
      error.response = response;
      throw error;
    }
  },

  parseJSON: function (response) {
    return response.json();
  },

  getSearchFromObject: function (param, key) {
    if (param == null) return '';
    let _search = '?';
    for (let key in param) {
      _search += `${key}=${encodeURIComponent(param[key])}&`
    }
    return _search.slice(0, -1);
  },
}

/**
 * fetch请求数据Model
 * @param _method
 * @param _api
 * @param _params
 * @param _onSuccess
 * @param _onError
 * @private
 */
function _request(_method, _api, _params, _onSuccess, _onError) {
  let _options = {
    method: _method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: (_method == 'GET') ? null : JSON.stringify(_params)
  };
  if (_method.toLowerCase() == 'get') {
    _api += Tools.getSearchFromObject(_params)
  }
  fetch(_api, _options)
    .then(Tools.checkStates)
    .then(Tools.parseJSON)
    .then((data) => {
      _onSuccess(data);
    })
    .catch((err) => {
      _onError(err);
    })
}


const UserModel = {
  storeUser: (userInfo) => {
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  },
  getUserInfo: () => {
    return localStorage.getItem(USER_INFO) === '' ? '' : JSON.parse(localStorage.getItem(USER_INFO));
  },
  register: (_params, _success, _error) => {
    _request('POST', `${API}/register`, _params, _success, _error)
  },
  login: (_params, _success, _error) => {
    _request('POST', `${API}/agent/login`, _params, _success, _error)
  },
}


const HouseModel = {
  saveHouse: (param, success, error) => {
    _request('POST', `${API}/house/save`, param, success, error)
  },
  getHouseByCondition: (param, success, error) => {
    _request('GET', `${API}/house/list`, param, success, error)
  },
  getHouseByMe: (param, success, error) => {
    _request('GET', `${API}/house/house-by-me`, param, success, error)
  },
  getHouseDetail: (param, success, error) => {
    _request('GET', `${API}/house/detail`, param, success, error)
  },
  addBrowseCount: (param, success, error) => {
    _request('GET', `${API}/house/addcount`, param, success, error)
  },
  getSimilarHouses: (param, success, error) => {
    _request('GET', `${API}/house/similar`, param, success, error)
  },
  getRcmdHouses: (param, success, error) => {
    _request('GET', `${API}/house/recommend`, param, success, error)
  },
  getBrowsedHouses: (param, success, error) => {
    _request('GET', `${API}/house/browsed`, param, success, error)
  },
}

const MapModel = {
  getLatLonByAddress: (param, success, error) => {
    _request('GET', `http://restapi.amap.com/v3/geocode/geo`, param, success, error)
  },
}

export {UserModel, HouseModel, MapModel}
