import { userActions, userReducer } from './model/slice/userSlice';
import type { UserSchema, User } from './model/types/user';
import { getUserAuthData } from './model/selectors/getUserAuthData/getuserAuthData';

export {
    userReducer,
    userActions,
    UserSchema,
    User,
    getUserAuthData,
};
