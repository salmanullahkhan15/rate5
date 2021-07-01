import React, { Component, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { List, Searchbar } from 'react-native-paper';

function SearchBarComp() {

    const [loading, setLoading] = React.useState('');
    const [data, setData] = React.useState("");
    const [arrayholder, setArrayholder] = React.useState("");
    const [value, setValue] = React.useState('');
    setData([{ name: "res1" }, { name: "res1" }, { name: "res1" }, { name: "res1" }, { name: "res1" }, { name: "res1" },])

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        setLoading(true)
        const url = `https://randomuser.me/api/?&results=20`;

        fetch(url)
            .then(res => res.json())
            .then(res => {
                // alert(res.results)
                setData(res.results)
                setLoading(false)
                setArrayholder(res.results)
            })
            .catch(error => {
                setLoading(false)
                // alert(error)
            });

    });


    // function makeRemoteRequest() {

    // };

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    const searchFilterFunction = text => {
        setValue(text)

        alert(arrayholder)

        const newData = arrayholder.filter(item => {
            const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        // this.setState({
        //     data: newData,
        // });

        setData(newData)


    };

    const renderHeader = () => {
        return (
            <Searchbar
                placeholder="Search restaurant"
                onChangeText={text => searchFilterFunction(text)}
                value={value}
            />
        );
    };

    return (

        <View style={{ flex: 1 }}>
            {loading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
                :
                null
            }

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <List
                        left={props => <List.Icon {...props} icon="folder" />}
                        title={`${item.name.first} ${item.name.last}`}
                        description={item.email}
                    />
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={renderHeader}
            />
        </View>
    )
}

export default SearchBarComp;
