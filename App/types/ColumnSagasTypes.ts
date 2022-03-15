import {IPrayer, IDesk, IComment} from '.';

export interface configToken {
  headers: {
    Authorization: string;
  };
}

export interface IAddDeskAction {
  type: string;
  payload: {
    newDesk: IDesk;
    goBack: () => void;
  };
}

export interface IDeleteDeskAction {
  type: string;
  payload: number;
}

export interface IAddPrayerAction {
  type: string;
  payload: IPrayer;
}

export interface IGetPrayersByDeskIdAction {
  type: string;
  payload: number;
}

export interface IUpdatePrayerByIdAction {
  type: string;
  payload: IPrayer;
}

export interface IGetPrayerCommentsAction {
  type: string;
  payload: {
    prayerId: number;
  };
}

export interface IAddCommentAction {
  type: string;
  payload: {
    body: IComment;
    prayerId: number;
  };
}

export interface IDeletePrayerAction {
  type: string;
  payload: number;
}
