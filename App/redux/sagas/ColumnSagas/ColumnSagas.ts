import {call, takeEvery, put} from '@redux-saga/core/effects';
import axios, {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API} from '../../../helpers/const';
import {
  configToken,
  IAddCommentAction,
  IAddDeskAction,
  IAddPrayerAction,
  IComment,
  IDeleteDeskAction,
  IDeletePrayerAction,
  IGetPrayerCommentsAction,
  IGetPrayersByDeskIdAction,
  IPrayer,
  IUpdatePrayerByIdAction,
} from '../../../types';

function* getAuthConfig() {
  const {token} = JSON.parse(yield AsyncStorage.getItem('userInfo'));
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const getColumnsService = async (url: string, config: configToken) => {
  return axios.get(url, config);
};

function* getColumns() {
  const config: configToken = yield getAuthConfig();
  try {
    const response: AxiosResponse = yield call(
      getColumnsService,
      `${API}/columns`,
      config,
    );
    yield put({type: 'GET_COLUMNS_SUCCESS', payload: response.data});
  } catch (e) {
    console.log(e);
  }
}

function* addDesk(action: IAddDeskAction) {
  const config: configToken = yield getAuthConfig();
  try {
    const response: AxiosResponse = yield call(
      axios.post,
      `${API}/columns`,
      action.payload.newDesk,
      config,
    );
    yield put({type: 'ADD_DESK_SUCCESS', payload: response.data});
    yield call(action.payload.goBack);
  } catch (e) {
    console.log(e);
  }
}

function* deleteDesk(action: IDeleteDeskAction) {
  const config: configToken = yield getAuthConfig();
  yield call(axios.delete, `${API}/columns/${action.payload}`, config);
  yield put({type: 'DELETE_DESK_SUCCESS', payload: action.payload});
}

function* addPrayer(action: IAddPrayerAction) {
  const config: configToken = yield getAuthConfig();
  try {
    const response: AxiosResponse = yield call(
      axios.post,
      `${API}/prayers`,
      action.payload,
      config,
    );
    yield put({type: 'ADD_PRAYER_SUCCESS', payload: response.data});
  } catch (e) {
    console.log(e);
  }
}

function* getPrayersByDeskId(action: IGetPrayersByDeskIdAction) {
  const config: configToken = yield getAuthConfig();
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `${API}/prayers`,
      config,
    );
    const data: IPrayer[] = response.data;
    const filteredData = data.filter(
      prayer => prayer.columnId === action.payload,
    );
    const answeredPrayers = filteredData.filter(prayer => prayer.checked);
    const notAnsweredPrayers = filteredData.filter(prayer => !prayer.checked);
    yield put({
      type: 'GET_PRAYERS_SUCCESS',
      payload: {answeredPrayers, notAnsweredPrayers},
    });
  } catch (e) {
    console.log(e);
  }
}

function* updatePrayerById({payload: prayer}: IUpdatePrayerByIdAction) {
  const config: configToken = yield getAuthConfig();
  try {
    yield call(
      axios.put,
      `${API}/prayers/${prayer.id}`,
      {...prayer, checked: !prayer.checked},
      config,
    );
    yield put({
      type: prayer.checked ? 'PRAYER_IS_NOT_ANSWERED' : 'PRAYER_IS_ANSWERED',
      payload: {...prayer, checked: !prayer.checked},
    });
  } catch (e) {
    console.log(e);
  }
}

function* getPrayerComments({payload: {prayerId}}: IGetPrayerCommentsAction) {
  const config: configToken = yield getAuthConfig();
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `${API}/comments`,
      config,
    );
    const data: IComment[] = response.data.filter(
      (comment: IComment) => comment.prayerId === prayerId,
    );
    yield put({
      type: 'GET_PRAYER_COMMENTS_SUCCESS',
      payload: data,
    });
  } catch (e) {
    console.log(e);
  }
}

function* addComment({payload: {body, prayerId}}: IAddCommentAction) {
  const config: configToken = yield getAuthConfig();
  try {
    const {data}: AxiosResponse = yield call(
      axios.post,
      `${API}/prayers/${prayerId}/comments`,
      {body},
      config,
    );
    yield put({
      type: 'ADD_COMMENT_SUCCESS',
      payload: data,
    });
  } catch (e) {
    console.log(e);
  }
}

function* deletePrayer({payload: prayerId}: IDeletePrayerAction) {
  const config: configToken = yield getAuthConfig();
  try {
    yield call(axios.delete, `${API}/prayers/${prayerId}`, config);
    yield put({
      type: 'DELETE_PRAYER_SUCCESS',
      payload: prayerId,
    });
  } catch (e) {
    console.log(e);
  }
}

export function* getColumnsSaga() {
  yield takeEvery('GET_COLUMNS', getColumns);
}

export function* addDeskSaga() {
  yield takeEvery('ADD_DESK', addDesk);
}

export function* deleteDeskSaga() {
  yield takeEvery('DELETE_DESK', deleteDesk);
}

export function* addPrayerSaga() {
  yield takeEvery('ADD_PRAYER', addPrayer);
}

export function* getPrayersSaga() {
  yield takeEvery('GET_PRAYERS', getPrayersByDeskId);
}

export function* updatePrayerSaga() {
  yield takeEvery('UPDATE_PRAYER', updatePrayerById);
}

export function* addCommentSaga() {
  yield takeEvery('ADD_COMMENT', addComment);
}

export function* getPrayerCommentsSaga() {
  yield takeEvery('GET_PRAYER_COMMENTS', getPrayerComments);
}

export function* deletePrayerSaga() {
  yield takeEvery('DELETE_PRAYER', deletePrayer);
}
