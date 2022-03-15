import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootStackParams} from '../navigation/Navigation';
import {AppDispatch, AppState} from '../redux/store';

export const useNav = () =>
  useNavigation<StackNavigationProp<RootStackParams>>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
