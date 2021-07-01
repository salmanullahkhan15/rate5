import * as React from 'react';
import { View, StyleSheet, Image, ScrollView, Icon } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Text, TextInput, Button, Searchbar, Avatar, Card, Title, Paragraph, FAB, Portal, } from 'react-native-paper';

import { API_URL, BASE_URL, USER_INFO, USER_ID } from '../utils/contants';
import apiFunctions from '../utils/GlobalFunctions';

// const LeftContent = props => <Avatar.Image size={24} source={require('../assets/avatar.png')} />


function RestaurantDetail({ route, navigation }) {

    const { restaurantID } = route.params;
    const [restaurant, serRestaurant] = React.useState({});

    const goBack = () => {
        navigation.pop()
    }


    React.useEffect(() => {
        let mounted = true;

        apiFunctions.GET_REQUEST(BASE_URL + API_URL.GET_SINGLE_RESTAURANT_BY_ID + restaurantID).then(res => {

            JSON.parse(res.data.data).Rating = parseInt(JSON.parse(res.data.data).Rating)
            JSON.parse(res.data.data).TasteRating = parseInt(JSON.parse(res.data.data).TasteRating)
            JSON.parse(res.data.data).QuantityRating = parseInt(JSON.parse(res.data.data).QuantityRating)
            JSON.parse(res.data.data).QualityRating = parseInt(JSON.parse(res.data.data).QualityRating)
            JSON.parse(res.data.data).ServiceRating = parseInt(JSON.parse(res.data.data).ServiceRating)
            JSON.parse(res.data.data).VOMRating = parseInt(JSON.parse(res.data.data).VOMRating)


            var Posts = JSON.parse(res.data.data).Posts;


            for (let i = 0; i < Posts.length; i++) {
                Posts[i].avgRating = ((parseInt(Posts[i].TasteRating) + parseInt(Posts[i].QuantityRating) + parseInt(Posts[i].QualityRating) + parseInt(Posts[i].ServiceRating) + parseInt(Posts[i].VOMRating)) / 5)
            }

            JSON.parse(res.data.data).Posts = Posts

            serRestaurant(JSON.parse(res.data.data))
        })

        return () => mounted = false;
    }, [])


    const gotoProfile = (item) => {
        // alert(item.Id)

        navigation.push('Profile', { userID: item.UserId })

    }

    return (
        <ScrollView style={styles.scrollView} >

            <Button style={styles.backBtn} icon="arrow-left" labelStyle={{ fontSize: 11 }} onPress={goBack} >Back</Button>

            <View style={styles.overallRating} >
                <Image
                    style={styles.resImage}
                    source={{ uri: restaurant.Image }}
                />
                <Text style={styles.resDescriptionTitle}>{restaurant.Name} </Text>
                <Text style={styles.resDescription}>{restaurant.Location}</Text>
                <Text style={styles.resDescription}>{restaurant.Description}</Text>
                <Rating
                    showRating
                    style={styles.ratings}

                    ratingCount={5}
                    startingValue={restaurant.Rating}

                    readonly={true}
                    reviewSize={15}
                    imageSize={15}
                />
            </View>

            <View style={styles.hr}></View>

            <View style={styles.ratingItems}>
                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Taste</Text>
                    <Rating
                        style={styles.ratings}
                        readonly={true}

                        ratingCount={5}
                        startingValue={restaurant.TasteRating}

                        reviewSize={15}
                        imageSize={15}
                    />
                </View>

                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Quantity</Text>
                    <Rating
                        style={styles.ratings}
                        readonly={true}

                        ratingCount={5}
                        startingValue={restaurant.QuantityRating}

                        reviewSize={15}
                        imageSize={15}
                    />
                </View>

                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Quality</Text>
                    <Rating
                        style={styles.ratings}
                        readonly={true}

                        ratingCount={5}
                        startingValue={restaurant.QualityRating}

                        reviewSize={15}
                        imageSize={15}
                    />
                </View>

                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Service</Text>
                    <Rating
                        style={styles.ratings}
                        readonly={true}


                        ratingCount={5}
                        startingValue={restaurant.ServiceRating}

                        reviewSize={15}
                        imageSize={15}
                    />
                </View>

                <View style={styles.ratingItem}>
                    <Text style={styles.ratingItemText}>Value Of Money</Text>
                    <Rating
                        style={styles.ratings}
                        readonly={true}

                        ratingCount={5}
                        startingValue={restaurant.VOMRating}

                        reviewSize={15}
                        imageSize={15}
                    />
                </View>
            </View>

            <View style={styles.hr}></View>

            <View style={styles.commentSection}>

                {restaurant.Posts == undefined ? null : restaurant.Posts.map(
                    item => (

                        <Card style={styles.commentSectionCard} onPress={() => gotoProfile(item)}>
                            <Card.Content>
                                <View style={styles.cardTitle}>
                                    <Avatar.Image size={24} source={require('../assets/avatar.png')} />
                                    <Text style={styles.cardText} > {item.Username}</Text>
                                    <Rating
                                        style={styles.commentRatings}
                                        readonly={true}

                                        ratingCount={5}
                                        startingValue={item.avgRating}

                                        reviewSize={15}
                                        imageSize={15}
                                    />
                                </View>
                                <Paragraph>{item.Comments}</Paragraph>
                            </Card.Content>
                        </Card>

                    ))}


                {/* <Card style={styles.commentSectionCard}>
                    <Card.Content>
                        <View style={styles.cardTitle}>
                            <Avatar.Image size={24} source={require('../assets/avatar.png')} />
                            <Text style={styles.cardText} >Ahmed Khan</Text>
                            <Rating
                                style={styles.commentRatings}
                                readonly={true}
                                reviewSize={15}
                                imageSize={15}
                            />
                        </View>
                        <Paragraph>loren imput text is this is what I am loogig for yes. loren imput text is this is what I am loogig for yes</Paragraph>
                    </Card.Content>
                </Card>

                <Card style={styles.commentSectionCard}>
                    <Card.Content>
                        <View style={styles.cardTitle}>
                            <Avatar.Image size={24} source={require('../assets/avatar.png')} />
                            <Text style={styles.cardText} >Ahmed Khan</Text>
                            <Rating
                                style={styles.commentRatings}
                                readonly={true}
                                reviewSize={15}
                                imageSize={15}
                            />
                        </View>
                        <Paragraph>loren imput text is this is what I am loogig for yes. loren imput text is this is what I am loogig for yes</Paragraph>
                    </Card.Content>
                </Card>

                <Card style={styles.commentSectionCard}>
                    <Card.Content>
                        <View style={styles.cardTitle}>
                            <Avatar.Image size={24} source={require('../assets/avatar.png')} />
                            <Text style={styles.cardText} >Ahmed Khan</Text>
                            <Rating
                                style={styles.commentRatings}
                                readonly={true}
                                reviewSize={15}
                                imageSize={15}
                            />
                        </View>
                        <Paragraph>loren imput text is this is what I am loogig for yes. loren imput text is this is what I am loogig for yes</Paragraph>
                    </Card.Content>
                </Card>

                <Card style={styles.commentSectionCard}>
                    <Card.Content>
                        <View style={styles.cardTitle}>
                            <Avatar.Image size={24} source={require('../assets/avatar.png')} />
                            <Text style={styles.cardText} >Ahmed Khan</Text>
                            <Rating
                                style={styles.commentRatings}
                                readonly={true}
                                reviewSize={15}
                                imageSize={15}
                            />
                        </View>
                        <Paragraph>loren imput text is this is what I am loogig for yes. loren imput text is this is what I am loogig for yes</Paragraph>
                    </Card.Content>
                </Card> */}

            </View>
        </ScrollView>
    );
}

export default RestaurantDetail;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    backBtn: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: "#FFFFFF",
        marginTop: 10,
        marginLeft: 10,
        // fontSize: 10
    },
    resImage: {
        width: wp("100%"),
        height: hp("30%"),
    },
    ratingItems: {
        width: wp("100%"),
        alignSelf: 'center',
    },
    ratingItem: {

    },
    ratingItemText: {
        textAlign: 'center',
        fontWeight: '600'
    },
    overallRating: {
        paddingBottom: 10,
    },
    hr: {
        borderBottomWidth: 1,
        borderColor: "#FF5A65",
        width: wp("90%"),
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
        shadowColor: "#FF5A65",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
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
    resDescription: {
        textAlign: 'center'
    },
    resDescriptionTitle: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 17,
        marginTop: 10
    }

});
