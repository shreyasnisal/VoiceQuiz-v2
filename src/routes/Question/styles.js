import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        // backgroundColor: '#0D92FF',
    },
    card: {
        width: '90%',
        // height: '70%',
        borderRadius: 5,
        // alignItems: 'center',
        justifyContent: 'space-around',
    },
    questionNumberText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    question: {
        fontSize: 26,
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        color: '#555',
    },
    option: {
        // width: '100%',
        marginLeft: 20,
        marginBottom: 10,
        // justifyContent: 'center',
    },
    optionText: {
        marginLeft: 5,
        fontSize: 24,
        color: '#555',
        // backgroundColor: '#0D92FF',
        // paddingVertical: 5,
        // paddingHorizontal: 20,
        // borderRadius: 20,
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
    btnNoBorder: {
        alignItems: 'center',
    },
    btnTitleNoBorder: {
        color: '#fff',
        fontWeight: 'bold',
    },
})