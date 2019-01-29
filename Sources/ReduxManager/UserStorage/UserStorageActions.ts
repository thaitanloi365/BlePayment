import * as types from "./UserStorageActionTypes";

const saveUserToken = <T extends {}>(userToken: T) => ({
  type: types.SAVE_USER_TOKEN,
  payload: userToken
});

const deleteUserToken = () => ({
  type: types.DELETE_USER_TOKEN
});

const saveUserProfile = <T extends {}>(userProfile: T) => ({
  type: types.SAVE_USER_PROFILE,
  payload: userProfile
});

const deleteUserProfile = () => ({
  type: types.DELETE_USER_PROFILE
});

const saveUserDatabase = <T extends {}>(userDatabase: T) => ({
  type: types.SAVE_USER_DATABASE,
  payload: userDatabase
});

const deleteUserDatabase = () => ({
  type: types.DELETE_USER_DATABASE
});

const deleteAll = () => ({
  type: types.DELETE_ALL
});

const saveAll = <T extends {}>(data: T) => ({
  type: types.SAVE_ALL,
  payload: data
});

export default {
  saveUserToken,
  saveUserProfile,
  saveUserDatabase,
  deleteUserToken,
  deleteUserProfile,
  deleteUserDatabase,
  deleteAll,
  saveAll
};
