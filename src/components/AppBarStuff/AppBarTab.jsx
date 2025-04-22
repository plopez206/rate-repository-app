import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBarTab = ({ to, children }) => {
  return (
    <Link to={to} underlayColor="transparent">
      <View style={styles.tab}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Link>
  );
};


export default AppBarTab;
