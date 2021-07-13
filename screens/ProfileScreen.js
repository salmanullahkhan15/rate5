import * as React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Searchbar, Avatar, Card, Title, Paragraph, FAB, Portal, Chip } from 'react-native-paper';
import SearchBarComp from '../components/SearchBarComp';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { API_URL, BASE_URL, USER_INFO, USER_ID } from '../utils/contants';
import apiFunctions from '../utils/GlobalFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreen({ route, navigation }) {

    // Username

    // const { userID } = route.params;

    const [userInfo, setUserInfo] = React.useState([]);
    const [profile, setProfile] = React.useState([]);
    const [postData, setPostData] = React.useState([]);
    const [isOWnUser, setIsOwnUser] = React.useState(false);
    const [isAlreadyFollowed, seteIsAlreadyFollowed] = React.useState(false);


    React.useEffect(() => {
        let mounted = true;

        getUserProfile()

        return () => mounted = false;
    }, [])

    async function getUserProfile() {


        var userOwnID = await AsyncStorage.getItem(USER_ID)

        // alert(JSON.parse(userID))

        var selectedUser = route.params == undefined ? JSON.parse(userOwnID) : route.params.userID
        // var selectedUser = JSON.parse(userOwnID)
        // console.log(selectedUser)

        setIsOwnUser(route.params == undefined ? true : false)

        apiFunctions.GET_REQUEST(BASE_URL + API_URL.GET_USER_PROFILE + selectedUser).then(res => {
            // alert(JSON.parse(res.data.data))
            // console.log(JSON.parse(res.data.data).profile)
            checkFollowStatus()

            setProfile(JSON.parse(res.data.data).profile)
            setPostData(JSON.parse(res.data.data).postData)
        });
    }

    const logoutFn = () => {
        console.log("logoutFn")
        AsyncStorage.clear();
        navigation.replace("Login")
    }

    const followUnfollow = async () => {

        // isAlreadyFollowed


        let userOwnID = await AsyncStorage.getItem(USER_ID)
        let otherUserID = route.params.userID

        let data = new FormData();

        data.append("userid", JSON.parse(userOwnID))
        data.append("followerid", otherUserID)


        var postUrl;
        if (isAlreadyFollowed) {
            postUrl = BASE_URL + API_URL.UNFOLOW_USER
        } else {
            postUrl = BASE_URL + API_URL.FOLLOW_USER
        }

        console.log(postUrl)
        console.log(data);

        apiFunctions.POST_REQUEST(postUrl, data).then(res => {

            console.log(JSON.stringify(res))
            getUserProfile()
        })


    }

    async function checkFollowStatus() {

        if (route.params == undefined) {
            return false
        } else {
            let userOwnID = await AsyncStorage.getItem(USER_ID)
            let otherUserID = route.params.userID



            if (userOwnID == otherUserID) {
                return false
            }

            console.log('BASE_URL + API_URL.GET_FOLLOW_STATUS + JSON.parse(userOwnID) + "&followerid=" + otherUserID')
            console.log(BASE_URL + API_URL.GET_FOLLOW_STATUS + JSON.parse(userOwnID) + "&followerid=" + otherUserID)

            apiFunctions.GET_REQUEST(BASE_URL + API_URL.GET_FOLLOW_STATUS + JSON.parse(userOwnID) + "&followerid=" + otherUserID).then(res => {

                console.log(JSON.stringify(res.data.message))
                // alert("follow status")
                if (res.data.message == "Not a follower") {
                    seteIsAlreadyFollowed(false)
                } else {
                    seteIsAlreadyFollowed(true)
                }

            });

        }



    }

    const gotoRestaurantPage = (item) => {
        navigation.navigate('Restaurant Detail', { restaurantID: item.Id })
    }

    return (
        <ScrollView style={styles.container} >

            <TouchableOpacity style={styles.logoutView} onPress={logoutFn}>
                <Image
                    style={styles.logoutImg}
                    source={require('../assets/logut.png')}
                />
                <Text>Logout</Text>
            </TouchableOpacity>

            <View style={styles.profileImgView}>
                <Image
                    style={styles.profileImg}
                    source={require('../assets/user.png')}
                />
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.infoName}>{profile.Username}</Text>
                <Text style={styles.infoDes}>Since 2021</Text>
                <Text style={styles.infoDes}>{profile.Location}</Text>
                {
                    !isOWnUser ?

                        <Button style={styles.followBtn} labelStyle={{ color: "white" }} mode="contained" onPress={followUnfollow}>
                            {isAlreadyFollowed ? "Unfollow" : "Follow"}
                        </Button>
                        :
                        null

                }


                <View style={styles.inforCont}>
                    <View style={styles.infoFollow}>
                        <Text style={styles.infoFollowLeft}>{profile.Followers != undefined ? profile.Followers.length : 0}</Text>
                        <Text style={styles.infoFollowRight}>Follower(s)</Text>
                    </View>
                    <View style={styles.infoFollow}>
                        <Text style={styles.infoFollowLeft}>{postData != undefined ? postData.length : 0}</Text>
                        <Text style={styles.infoFollowRight}>Comment(s)</Text>
                    </View>
                </View>

            </View>

            <View style={styles.resCards}>

                {postData.map(
                    item => (
                        <Card style={styles.cardItem} onPress={() => { gotoRestaurantPage(item) }}>
                            <Card.Content>
                                <Text style={styles.resTitle}>{item.Name}</Text>
                                <Text style={styles.resDes}>{item.Location}</Text>
                                <Chip style={styles.chip} icon="food" >{item.Famous} </Chip>
                            </Card.Content>
                            <Card.Cover source={{ uri: item.Image }} />
                            <Card.Content>
                                <Card style={styles.commentSectionCard}>
                                    <Card.Content>
                                        <View style={styles.cardTitle}>
                                            <Avatar.Image size={24} source={require('../assets/avatar.png')} />
                                            <Text style={styles.cardText} >{profile.Username}</Text>
                                            <Rating
                                                style={styles.commentRatings}
                                                readonly={true}
                                                reviewSize={15}
                                                imageSize={15}
                                                ratingCount={5}
                                                startingValue={(parseInt(item.Post.TasteRating) + parseInt(item.Post.QualityRating) + parseInt(item.Post.QuantityRating) + parseInt(item.Post.ServiceRating) + parseInt(item.Post.VOMRating)) / 5}
                                            />
                                        </View>
                                        <Paragraph>{item.Post.Comments}</Paragraph>
                                    </Card.Content>
                                </Card>
                            </Card.Content>
                        </Card>

                    ))}

            </View>

        </ScrollView>
    );
}

export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    profileImg: {
        borderRadius: 100,
        width: 100,
        height: 100,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImgView: {
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp("5%"),
        zIndex: 100,
        elevation: 10,
        borderRadius: 100,
        width: 100,
        height: 100,
    },
    profileInfo: {
        backgroundColor: "#FFFFFF",
        width: wp("90%"),
        alignSelf: 'center',
        borderRadius: 10,
        padding: 12,
        marginTop: -20,
        shadowColor: "#FF5A65",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,

    },
    infoName: {
        fontWeight: '700',
        textAlign: 'center',
        padding: 5,
        marginTop: 20
    },
    infoDes: {
        textAlign: 'center',
        fontSize: 12
    },
    inforCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp("70%"),
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10

    },
    infoFollow: { flexDirection: 'row' },
    infoFollowLeft: { fontWeight: '700', marginRight: 5 },
    infoFollowRight: {},
    resTitle: {
        marginBottom: 15,
        fontSize: 15,
        fontWeight: "600"
    },
    resDes: {
        marginBottom: 10,
        marginTop: -10,
        fontSize: 12,
        fontWeight: "600"

    },
    chip: {
        width: wp("40%"),
        marginBottom: 10,
    },
    resCards: {
        width: wp("90%"),
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    cardItem: {
        shadowColor: "#FF5A65",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 10
    },
    cardTitle: {
        flexDirection: 'row',
    },
    cardText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "700"
    },
    commentSection: {
        backgroundColor: '#FFFFFF'
    },
    commentSectionCard: {
        backgroundColor: '#FFFFFF',
        width: wp("90%"),
        alignSelf: 'center',
        marginBottom: 10
    },

    commentRatings: {
        marginTop: 3,
        marginLeft: 10
    },

    logoutView: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        top: 15
    },
    logoutImg: {
        width: 25,
        height: 25
    }, followBtn: {
        width: wp("40%"),
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 10
    }
});


