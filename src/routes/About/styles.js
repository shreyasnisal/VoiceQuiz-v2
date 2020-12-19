import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D92FF',
        alignItems: 'center',
    },
    appBar: {
        // flex: 1,
        paddingTop: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        marginBottom: 20,
    },
    appBarText: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        width: '90%',
        height: '80%',
        borderRadius: 5,
        // alignItems: 'center',
        justifyContent: 'space-around',
        // marginTop: 'auto',
        marginBottom: 10,
        paddingLeft: 15,
    },
    headingContainer: {
        marginTop: 10,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0D92FF',
    },
    subHeading: {
        fontSize: 16,
        color: '#000',
    },
    textContainer: {
        marginVertical: 8,
        marginRight: 15,
    },
    infoText: {
        fontSize: 16,
        color: '#777',
    },
    bold: {
        fontWeight: 'bold',
    },
    creditsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    credits: {
        fontSize: 18,
        color: '#fff',
    },
})