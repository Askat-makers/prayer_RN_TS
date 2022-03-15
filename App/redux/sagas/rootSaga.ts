import {spawn, call, all} from '@redux-saga/core/effects';
import {IsSignedInSaga, SignInSaga, SignUpSaga} from './AuthSagas';
import {
  addDeskSaga,
  addPrayerSaga,
  deleteDeskSaga,
  getColumnsSaga,
  getPrayersSaga,
  updatePrayerSaga,
  addCommentSaga,
  getPrayerCommentsSaga,
  deletePrayerSaga,
} from './ColumnSagas';

export function* rootSaga() {
  const sagas = [
    SignInSaga,
    SignUpSaga,
    IsSignedInSaga,
    getColumnsSaga,
    addDeskSaga,
    deleteDeskSaga,
    addPrayerSaga,
    getPrayersSaga,
    updatePrayerSaga,
    addCommentSaga,
    getPrayerCommentsSaga,
    deletePrayerSaga,
  ];
  yield all(
    sagas.map(saga => {
      return spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {
            console.log(error);
          }
        }
      });
    }),
  );
}
