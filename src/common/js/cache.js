import storage from 'good-storage'

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 15 // 搜索历史数组中最多能存储的数据总数
const PLAY_KEY = '_play_'
const PLAY_MAX_LENGTH = 200 // 播放历史数组中最多能存储的数据总数
const LIKE_KEY = '_like_'
const USER_KEY = '_user_'

/**
 * 向搜索历史数组中插入某一项
 * 规则：
 * 新插入的数据必须插入到数组中的第一项
 * 当数组中有与插入项相同的数据，则删除重复数据，再插入
 * 当数组第一项与插入项相同，直接退出，不执行任何操作
 * 如果执行插入操作后，数组的长度操作最大长度值，则删除删除数组中的最后一项
 * @param arr
 * @param val
 * @param compare
 * @param maxLen
 */
function insertArray(arr, val, compare, maxLen) {
  let index = arr.findIndex(compare)
  if (index === 0) return
  if (index > 0) arr.splice(index, 1)
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) arr.pop()
}

/**
 * 将最新的搜索保存到本地存储中
 * @param query
 * @returns {*}
 */
export function saveSearch(query) {
  let searchArr = storage.get(SEARCH_KEY, [])
  insertArray(searchArr, query, item => item === query, SEARCH_MAX_LENGTH)
  // 将最新的数组保存到本地存储中
  storage.set(SEARCH_KEY, searchArr)
  // 将最新的数组返回
  return searchArr
}

/**
 * 获取本地存储中的搜索历史数组
 * @returns {*}
 */
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

/**
 * 删除本地存储的搜索历史数据
 * @returns {*}
 */
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

/**
 * 将最新的播放歌曲保存到本地存储中
 * @param song
 * @returns {*}
 */
export function savePlay(song) {
  let playArr = storage.get(PLAY_KEY, [])
  insertArray(playArr, song, item => item.id === song.id, PLAY_MAX_LENGTH)
  // 将最新的数组保存到本地存储中
  storage.set(PLAY_KEY, playArr)
  // 将最新的数组返回
  return playArr
}

/**
 * 获取本地存储中的播放历史数组
 * @returns {*}
 */
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

/**
 * 删除本地存储的播放历史数据
 * @returns {*}
 */
export function clearPlay() {
  storage.remove(PLAY_KEY)
  return []
}

/**
 * 将喜欢的列表保存到本地存储中
 * @param type
 * @param list
 * @param userId
 * @returns {*}
 */
export function saveLike(type, list, userId) {
  let likeObj = storage.get(LIKE_KEY, {})
  if (typeof likeObj[userId] === 'undefined') {
    likeObj[userId] = {
      [type]: [list]
    }
  } else if (typeof likeObj[userId][type] === 'undefined') {
    likeObj[userId][type] = [list]
  } else {
    likeObj[userId][type].push(list)
  }
  storage.set(LIKE_KEY, likeObj)
  return likeObj
}

export function deleteLike(type, list, userId) {
  let likeObj = storage.get(LIKE_KEY, {})
  let index = findIndex(likeObj[userId][type], list)
  likeObj[userId][type].splice(index, 1)
  storage.set(LIKE_KEY, likeObj)
  return likeObj
}

/**
 * 获取本地存储中的喜欢数据
 * @returns {*}
 */
export function loadLike() {
  return storage.get(LIKE_KEY, {})
}

export function saveUser(user) {
  storage.set(USER_KEY, user)
}
export function loadUser() {
  return storage.get(USER_KEY, {})
}

export function deleteUser() {
  storage.set(USER_KEY, {})
}

/**
 * 查找数组某一个个数组项的索引
 * @param list
 * @param like
 * @returns {*}
 */
function findIndex(list, like) {
  return list.findIndex((item) => {
    return item.id === like.id
  })
}
