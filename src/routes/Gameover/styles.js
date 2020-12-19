import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
        height: '50%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
        
    },
    title: {
        fontSize: 26,
        marginBottom: 30,
        marginLeft: 20,
        marginTop: 20,
        color: '#555',
    },
    progressCircle: {
        color: '#000',
        marginLeft: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 20,
        color: '#555',
    },
    score: {
        fontSize: 24,
        color: '#555',
    },
    buttons: {
        width: '100%',
        marginTop: 30,
    },
    btn: {
        height: 50,
        width: '70%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    btnTitle: {
        fontSize: 24,
    },
})