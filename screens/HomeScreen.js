import * as React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text, TextInput, Button, Searchbar, Avatar, Card, Title, Paragraph, FAB, Portal, Chip, ActivityIndicator } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { API_URL, BASE_URL, USER_INFO, USER_ID } from '../utils/contants';
import apiFunctions from '../utils/GlobalFunctions';

function HomeScreen({ navigation }) {

    const [loading, setLoading] = React.useState(true);

    const [restaurantList, setRestaurantList] = React.useState([]);
    const [restaurantListTemp, setRestaurantListTemp] = React.useState([]);

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => {

        setSearchQuery(query)

        var arr = restaurantListTemp.filter(function (hero) {
            return hero.Name.toLowerCase() == query.toLowerCase();
        });

        // console.log(arr)

        setRestaurantList(arr)

        if (query.length == 0) {
            setRestaurantList(restaurantListTemp)
        }

    };

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;


    const gotoDetails = (item) => {
        navigation.navigate('Restaurant Detail', { restaurantID: item.Id })
    }

    React.useEffect(() => {
        let mounted = true;
        setLoading(true)

        apiFunctions.GET_REQUEST(BASE_URL + API_URL.GET_ALL_RESTAURANT).then(res => {
            setLoading(false)
            setRestaurantList(JSON.parse(res.data.data))
            setRestaurantListTemp(JSON.parse(res.data.data))
        })

        return () => mounted = false;
    }, [])



    return (

        <ScrollView keyboardShouldPersistTaps="handled">

            {loading ?
                <ActivityIndicator animating={true} size="large" style={styles.indicator} />
                : null
            }



            <View style={styles.mainContainer}>

                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />

                <View style={styles.cardView}>

                    {restaurantList.map(
                        item => (
                            <TouchableOpacity style={styles.cardItem} onPress={() => gotoDetails(item)}>
                                <Card >
                                    <Card.Content>
                                        <Text style={styles.resTitle}>{item.Name}</Text>
                                        <Text style={styles.resDes}>{item.Location}</Text>
                                        <Chip style={styles.chip} icon="food" >{item.Famous} </Chip>
                                    </Card.Content>
                                    <Card.Cover source={{ uri: item.Image }} />
                                    <Card.Content>
                                        <Rating
                                            showRating
                                            ratingCount={5}
                                            startingValue={parseInt(item.Rating)}
                                            style={styles.ratings}
                                            readonly={true}
                                            reviewSize={15}
                                            imageSize={15}
                                        />
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>
                        )

                    )}

                </View>

                <Portal>
                    <FAB.Group
                        open={open}
                        icon={open ? 'close' : 'plus'}
                        color="#FF5A65"
                        style={styles.fabBtn}
                        actions={[
                            {
                                icon: 'map-marker',
                                color: "#FF5A65",
                                onPress: () => console.log('Pressed email'),
                                small: false,
                            },
                            {
                                icon: 'filter',
                                color: "#FF5A65",
                                onPress: () => console.log('Pressed notifications'),
                                small: false,
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>

            </View>

        </ScrollView>

    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        width: wp("90%"),
        alignSelf: "center",
        marginTop: 10
    },
    starImg: {
        width: 20,
        height: 20
    },

    cardView: {
        padding: 10
    },
    cardItem: {
        marginTop: 10
    },
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
        // backgroundColor: '#FF5A65',
    },
    indicator: {
        position: 'absolute',
        marginTop: hp('40%'),
        marginLeft: wp('45%'),
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        zIndex: 100000
    },
    fabBtn: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 15,
    }
});

