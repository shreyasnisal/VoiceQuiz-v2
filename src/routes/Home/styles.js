import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
        height: '70%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    btn: {
        width: 300,
        paddingVertical: 15,
        // paddingHorizontal: 50,
        marginBottom: 20,
    },
    btnTitle: {
        fontSize: 28,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 32,
        color: '#0A75CC',
        marginLeft: 10,
    },
    halfBtn: {
        width: 140,
        marginHorizontal: 10,
    },
})