import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const AchievementsScreen = () => {
  
  const achievements = [
    { name: 'Make 100 clicks', description: 'Click the planet 100 times.', progress: 0, total: 100 },
    { name: 'Make 1,000 clicks', description: 'Click the planet 1000 times.', progress: 0, total: 1000 },
    { name: 'Make 10K clicks', description: 'Click the planet 10,000 times.', progress: 0, total: 10000 },
    { name: 'Make 1M clicks', description: 'Click the planet 10,000 times.', progress: 0, total: 1000000 },
    { name: 'Buy 1 upgrades', description: 'Purchase 1 upgrades.', progress: 0, total: 1 },
    { name: 'Buy 20 upgrades', description: 'Purchase 20 upgrades.', progress: 0, total: 20 },
    { name: 'Travel to Mars', description: 'Travel to Mars.', progress: 0, total: 1 },
  ];
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/neptune')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Achievements</Text>
        </View>
        <Image
          source={require('../assets/img/trophy')}
          style={styles.trophyImage}
          resizeMode="contain"
        />
        <ScrollView contentContainerStyle={styles.achievementList}>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievement}>
              <Text style={styles.achievementNumber}>{index + 1}</Text>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementName}>{achievement.name}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
              <View style={styles.progressCounter}>
                <Text style={styles.progressText}>{achievement.progress} / {achievement.total}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2930',
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 70,
    left: 0,
    width: '110%',
    height: '95%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    top: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  trophyImage: {
    width: 100,
    height: 100,
    top: 15,
    marginBottom: 10,
  },
  achievementList: {
    width: '120%',
    alignItems: 'center',
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#0F1417',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '80%',
  },
  achievementNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#711073',
    marginRight: 10,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 16,
    color: '#FFF',
  },
  progressCounter: {
    backgroundColor: '#711073',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  progressText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AchievementsScreen;
