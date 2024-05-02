import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import {firebase} from "../firebaseConfig";


export default function GameHistory() {
    const navigation = useNavigation();

    const [gameInfos, setGameInfos] = useState([]);

    try {
        const userId = firebase.auth().currentUser.uid;
        const games = firebase.firestore().collection("Game");

        games.where("userId", "==", userId).get()
        .then((data) => {
            return data.docs.map(doc => doc.data());
        })
        .then((info) => {
            setGameInfos(info.JSON);
        })
        .catch((error) => {
            console.log("Error :" + error);
        });
        
    } catch (error) {
        console.error('Erreur lors de la récupération des données des utilisateurs : ', error);
        return [];
    }

    return (
        <View style = {styles.container}>
            <Text style ={styles.titleText}>Historique de mes parties</Text>
            <View style={styles.row}>
                <Text style={[styles.cell, styles.headerCell]}>Date</Text>
                <Text style={[styles.cell, styles.headerCell]}>A gagné</Text>
            </View>
            <FlatList
                data={gameInfos}
                renderItem={({item}) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.today}</Text>
                        <Text style={styles.cell}>{item.won ? "Oui" : "Non"}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity
              style = {styles.button}
              onPress={()=> {
              navigation.navigate("HomePage");
            }}
            >
            <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 100,
    },
    titleText: {
        fontSize: 26,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 10
    },
    button: {
        marginTop: 20,
        height: 70,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4A460",
        borderRadius: 50
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 22
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F4A460',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
    },
});