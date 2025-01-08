import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  label: {
    color: "#fff"
  },
  tabText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#fff"
  },
  back: {
    backgroundColor: "black"
  },
  butlabel: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: "30%",
    flex: 1,
    resizeMode: "cover",
  },
  Image: {
    marginLeft: 10,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  information: {
    width: 200,
    flexDirection: "row",
    marginTop: 5,
  },
  fonts: {
    color: "#fff",
  },
  tab: {
    padding: 10,
    flexDirection: "row",
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
})


export default styles