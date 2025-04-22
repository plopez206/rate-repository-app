import { Text, View, Image, StyleSheet } from 'react-native';
import theme from '../theme'


const formatCount = value =>
    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);

const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: 'white',
    },
    topRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 5,
      marginRight: 15,
    },
    info: {
      flexShrink: 1,
    },
    fullName: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    description: {
      color: theme.colors.textSecondary,
      marginBottom: 6,
    },
    language: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.primary,
      color: 'white',
      padding: 4,
      borderRadius: 4,
      overflow: 'hidden',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    statItem: {
      alignItems: 'center',
    },
  });
  

const RepositoryItem = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl
  } = repository;

  return (
    <View style={styles.container}>
        <View style={styles.topRow}>
            <Image 
                style={styles.avatar}
                source = {{
                    uri: ownerAvatarUrl,
                }}
            />
            <View style={styles.info}>
                <Text style={styles.fullName}>{fullName}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.language}>{language}</Text>
            </View>
        </View>
        <View style = {styles.statsRow}>
            <View style = {styles.statItem}>
                <Text fontWeight="bold">{formatCount(stargazersCount)}</Text>
                <Text>Stars</Text>
            </View>
            <View style = {styles.statItem}>
                <Text fontWeight="bold">{formatCount(forksCount)}</Text>
                <Text>Forks</Text>
            </View>
            <View style = {styles.statItem}>
                <Text fontWeight="bold">{reviewCount}</Text>
                <Text>Reviews</Text>
            </View>
            <View style = {styles.statItem}>
                <Text fontWeight="bold">{ratingAverage}</Text>
                <Text>Rating</Text>
            </View>
        </View>
    </View>
  );
};

export default RepositoryItem;
