import { StyleSheet } from 'react-native';

export const Inputstyles = StyleSheet.create({
  h1: {
    fontSize: 40,
    marginBottom:-20,
    fontWeight: 'bold',
  },
  box: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: "space-around"
  },
  boxs: {
    width: '85%',
    // height:350,
    marginLeft: '7%',
    marginBottom: 20
  },
  boxs1: {
    width: '100%'
  },
  container: {
    flex: 1
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  box2: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  text: {
    fontSize: 20,
    color: 'red',
  },
  text1: {
    fontSize: 20,
    // color:'red',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  img1: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  shi: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10
  }
})
export const listitem = StyleSheet.create({
  list: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  item: {
    width: '48%',
    height: 320,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%'
  },
  img: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10
  }
})