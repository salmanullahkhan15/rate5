import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
// import { Dropdown } from 'react-native-material-dropdown';
import { Text, TextInput, Button, Searchbar, Avatar, Card, Title, Paragraph, FAB, Portal, Chip } from 'react-native-paper';
import SearchBarComp from '../components/SearchBarComp';
// import ModalDropdown from 'react-native-modal-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { Rating, AirbnbRating } from 'react-native-ratings';

import { API_URL, BASE_URL, USER_INFO, USER_ID } from '../utils/contants';
import apiFunctions from '../utils/GlobalFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PostScreen({ navigation }) {

    const [dropdown, setDropdown] = React.useState(null);
    const [comment, setComment] = React.useState(null);
    const [restaurantList, setRestaurantList] = React.useState([]);


    const [taste, setTaste] = React.useState(null);
    const [quantity, setQuantity] = React.useState(null);
    const [quality, setQuality] = React.useState(null);
    const [service, setService] = React.useState(null);
    const [vom, setVOM] = React.useState(null);


    const _renderItem = item => {
        return (
            <View style={styles.dItem}>
                <Text style={styles.textItem}>{item.Name}</Text>
            </View>
        );
    };

    const postReview = async () => {
        var userID = await AsyncStorage.getItem(USER_ID);

        // console.log(JSON.parse(userID))
        console.log(dropdown)
        console.log(comment)
        console.log(taste)
        console.log(quantity)
        console.log(quality)
        console.log(service)
        console.log(vom)

        if (dropdown != null
            && comment != null
            && taste != null
            && quantity != null
            && quality != null
            && service != null
            && vom != null) {


            let data = new FormData();

            data.append("UserId", JSON.parse(userID))
            data.append("restuarantid", dropdown)
            data.append("Comments", comment)
            data.append("TasteRating", taste)
            data.append("QualityRating", quality)
            data.append("QuantityRating", quantity)
            data.append("ServiceRating", service)
            data.append("VOMRating", vom)

            apiFunctions.POST_REQUEST(BASE_URL + API_URL.POST_REVIEW, data).then(res => {

                if (res.message !== undefined) {
                    alert(JSON.stringify(res.message))
                } else {
                    alert("Success!")
                    navigation.replace('Home')
                }
            })
        }
        else {
            alert("Please fill all fields")
        }

    }


    React.useEffect(() => {
        let mounted = true;

        apiFunctions.GET_REQUEST(BASE_URL + API_URL.GET_ALL_RESTAURANT).then(res => {
            setRestaurantList(JSON.parse(res.data.data))
        })

        return () => mounted = false;

    }, [])


    const onRateTaste = (rate) => { setTaste(rate) }
    const onRateQuantity = (rate) => { setQuantity(rate) }
    const onRateQuality = (rate) => { setQuality(rate) }
    const onRateService = (rate) => { setService(rate) }
    const onRateVOM = (rate) => { setVOM(rate) }


    return (
        <ScrollView style={styles.container} >


            <View style={styles.resDrop}>
                <Dropdown
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    data={restaurantList}
                    search
                    searchPlaceholder="Search Restaurant"
                    labelField="Name"
                    valueField="Name"
                    label="Dropdown"
                    placeholder="Select Restaurant"
                    value={dropdown}
                    onChange={item => {
                        setDropdown(item.Id);
                    }}
                    renderItem={item => _renderItem(item)}
                    textError="Error"
                />
            </View>

            <View style={styles.ratingItems}>
                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Taste</Text>
                    <Rating
                        style={styles.ratings}
                        reviewSize={15}
                        startingValue={0}
                        imageSize={15}
                        onFinishRating={(rating) => onRateTaste(rating)}
                    />
                </View>

                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Quantity</Text>
                    <Rating
                        style={styles.ratings}
                        reviewSize={15}
                        imageSize={15}
                        startingValue={0}
                        onFinishRating={(rating) => onRateQuantity(rating)}
                    />
                </View>

                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Quality</Text>
                    <Rating
                        style={styles.ratings}
                        reviewSize={15}
                        imageSize={15}
                        startingValue={0}
                        onFinishRating={(rating) => onRateQuality(rating)}
                    />
                </View>

                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Service</Text>
                    <Rating
                        style={styles.ratings}
                        reviewSize={15}
                        imageSize={15}
                        startingValue={0}
                        onFinishRating={(rating) => onRateService(rating)}
                    />
                </View>

                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Value Of Money</Text>
                    <Rating
                        style={styles.ratings}
                        reviewSize={15}
                        imageSize={15}
                        startingValue={0}
                        onFinishRating={(rating) => onRateVOM(rating)}
                    />
                </View>
            </View>

            <View style={styles.commmentSection}>

                <TextInput
                    label="Comment"
                    value={comment}
                    multiline={true}
                    style={styles.commentItem}
                    onChangeText={text => setComment(text)}
                />

            </View>

            <Button style={styles.logButton} labelStyle={{ color: "white" }} mode="contained" onPress={postReview}>
                Post
            </Button>

        </ScrollView>
    );
}

export default PostScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    resDrop: {
        width: wp("100%")
    },
    dropdown: {
        width: wp("90%"),
        backgroundColor: "#FFFFFF",
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        shadowColor: "#FF5A65",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    dItem: {
        padding: 10
    },
    postHText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        marginTop: hp("5%"),
        marginBottom: hp("2%"),
        color: "#FF5A65",

        // shadowColor: "#FF5A65",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,
        // elevation: 6,
    },
    ratingItems: {
        width: wp("90%"),
        alignSelf: 'center',
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        shadowColor: "#FF5A65",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 10,
        padding: 10

    },
    ratingItem: {
    },
    ratingItemText: {
        textAlign: 'center',
        fontWeight: '600',
        margin: 10
    },
    commmentSection: {
        width: wp("90%"),
        alignSelf: 'center',
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        shadowColor: "#FF5A65",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 10,
        padding: 10,
        margin: 10

    },
    commentItem: {
        backgroundColor: "#FFFFFF",
    },
    logButton: {
        marginTop: 10,
        marginBottom: 10,
        width: wp("90%"),
        alignSelf: 'center',
        shadowColor: "#FF5A65",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
});
