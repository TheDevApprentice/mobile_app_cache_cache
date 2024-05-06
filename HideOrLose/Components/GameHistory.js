import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import {firebase} from "../firebaseConfig";


export default function GameHistory() {
    const navigation = useNavigation();

    const [gameInfos, setGameInfos] = useState([]);

    try {
        const userId = firebase.auth().currentUser.uid;
        const games = firebase.firestore().collection("Games");

        games.doc(firebase.auth().currentUser.uid).collection("Game").get()
        .then((data) => {
            const gamesPlayed = [];
            data.forEach((doc) => {
                const game = {
                    ...doc.data(),
                    today: doc.data().today,
                    won: doc.data().won
                };
                gamesPlayed.push(game);
            });
            setGameInfos(gamesPlayed);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données des utilisateurs : ', error);
        return [];
    }

    return (
        <View style = {styles.container}>
            <Text style ={styles.titleText}>Historique de mes parties</Text>
            <View style={styles.row}>
                <Text style={styles.headerCell}>Date</Text>
                <Text style={styles.headerCell}>A gagné</Text>
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
        margin: 10,
    },
    button: {
        marginTop: 20,
        height: 50,
        width: 150,
        margin: 20,
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
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F4A460',
    },
    cell: {
        flexDirection: 'row',
        width: '50%',
        textAlign: 'center'
    },
    headerCell: {
        fontWeight: 'bold',
    },
});