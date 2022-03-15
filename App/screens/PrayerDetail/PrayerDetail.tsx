import {
  Image,
  ImageStyle,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Lina, Lisa, PlusIcon, SocialIcon} from '../../../assets/images';
import {TextInput} from 'react-native-gesture-handler';
import {
  useAppDispatch,
  useAppSelector,
  useNav,
} from '../../helpers/customHooks';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/Navigation';
import {IComment} from '../../types';

const events = [
  {
    title: 'July 25 2017',
    subTitle: 'Date Added',
    lastEvent: 'Opened for 4 days',
  },
  {
    title: '123',
    subTitle: 'Times Prayed Total',
  },
  {
    title: '63',
    subTitle: 'Times Prayed by Me',
  },
  {
    title: '60',
    subTitle: 'Times Prayed by Others',
  },
];

const members = [
  {
    url: Lina,
  },
  {
    url: Lisa,
  },
];
type Props = NativeStackScreenProps<RootStackParams, 'PrayerDetail'>;

export const PrayerDetail: React.FC<Props> = ({route}) => {
  const dispatch = useAppDispatch();
  const navigation = useNav();
  const prayerComments: IComment[] = useAppSelector(
    state => state.ColumnReducer.prayerComments,
  );
  const [comment, setComment] = useState<string>('');

  const onAddCommentPressed = () => {
    dispatch({
      type: 'ADD_COMMENT',
      payload: {body: comment, prayerId: route.params.id},
    });
    setComment('');
  };

  useEffect(() => {
    dispatch({
      type: 'GET_PRAYER_COMMENTS',
      payload: {prayerId: route.params.id},
    });
  }, [dispatch, route.params.id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nav}>
          <Icon
            name="arrow-back"
            size={20}
            color="white"
            onPress={navigation.goBack}
          />
          <Image source={SocialIcon} />
        </View>
        <View>
          <Text style={styles.headerTitle}>{route.params.title}</Text>
        </View>
      </View>
      <View style={styles.lastPrayed}>
        <View style={styles.verticalLine} />
        <Text style={styles.lastPrayedTitle}>Last prayed 8 min ago</Text>
      </View>
      <View style={styles.events}>
        {events.map(item => (
          <View style={styles.event} key={item.title}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventSubTitle}>{item.subTitle}</Text>
            {item.lastEvent && (
              <Text style={styles.lastEvent}>{item.lastEvent}</Text>
            )}
          </View>
        ))}
      </View>
      <View style={styles.members}>
        <Text style={styles.membersTitle}>MEMBERS</Text>
        <View style={styles.membersList}>
          {members.map(member => (
            <View style={styles.member} key={member.url}>
              <Image style={styles.memberImg} source={member.url} />
            </View>
          ))}
          <View style={styles.member}>
            <Image style={styles.memberImg} source={PlusIcon} />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.commentsTitle}>COMMENTS</Text>
        {prayerComments.map(comm => (
          <View style={styles.comment} key={comm.id}>
            <Image source={Lina} style={styles.commentImg} />
            <View>
              <Text style={styles.commentOwner}>
                Anna Barber <Text style={styles.addedTime}>2 days ago</Text>
              </Text>
              <Text style={styles.commentMessage}>{comm.body}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.addComment}>
        <TouchableOpacity
          style={styles.addCommentBtn}
          onPress={onAddCommentPressed}>
          <Icon name="comment" color="#BFB393" size={20} />
        </TouchableOpacity>
        <TextInput
          value={comment}
          onChangeText={setComment}
          style={styles.addCommentInput}
          placeholder="Add a comment..."
        />
      </View>
    </SafeAreaView>
  );
};

interface IStyles {
  container: ViewStyle;
  header: ViewStyle;
  nav: ViewStyle;
  headerTitle: TextStyle;
  lastPrayed: ViewStyle;
  verticalLine: ViewStyle;
  lastPrayedTitle: TextStyle;
  events: ViewStyle;
  event: ViewStyle;
  eventTitle: TextStyle;
  eventSubTitle: TextStyle;
  lastEvent: ViewStyle;
  members: ViewStyle;
  membersTitle: TextStyle;
  membersList: ViewStyle;
  member: ViewStyle;
  memberImg: ImageStyle;
  commentsTitle: TextStyle;
  comment: ViewStyle;
  commentImg: ImageStyle;
  commentOwner: TextStyle;
  addedTime: TextStyle;
  commentMessage: TextStyle;
  addComment: ViewStyle;
  addCommentBtn: ViewStyle;
  addCommentInput: ViewStyle;
}

const styles = StyleSheet.create<IStyles>({
  container: {
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#BFB393',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 18,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 27,
  },
  lastPrayed: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
  },
  verticalLine: {
    width: 2,
    backgroundColor: '#AC5253',
    marginRight: 12,
  },
  lastPrayedTitle: {
    fontSize: 17,
    color: '#514D47',
  },
  events: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  event: {
    paddingHorizontal: 15,
    paddingTop: 26,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    width: '50%',
    height: 113,
  },
  eventTitle: {
    color: '#BFB393',
    fontSize: 25,
  },
  eventSubTitle: {
    color: '#514D47',
    fontSize: 13,
    marginTop: 6,
  },
  lastEvent: {
    color: '#72A8BC',
    fontSize: 13,
  },
  members: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
  membersTitle: {
    color: '#72A8BC',
    fontSize: 13,
    paddingBottom: 15,
    fontWeight: '600',
  },
  membersList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  member: {
    marginRight: 8,
  },
  memberImg: {
    // width: '100%',
    borderRadius: 50,
  },
  commentsTitle: {
    color: '#72A8BC',
    fontSize: 13,
    paddingBottom: 15,
    fontWeight: '600',
    paddingHorizontal: 15,
  },
  comment: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  commentImg: {
    marginRight: 12,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  commentOwner: {
    color: '#514D47',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  addedTime: {
    color: '#9C9C9C',
    fontWeight: '400',
    fontSize: 13,
  },
  commentMessage: {
    color: '#514D47',
    fontSize: 17,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 19,
    paddingTop: 15,
  },
  addCommentBtn: {
    marginRight: 12,
  },
  addCommentInput: {
    fontSize: 17,
    color: '#9C9C9C',
  },
});
