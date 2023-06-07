import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const Help = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>AWEN Platform</Text>
        <Text style={styles.text}>
          A safe platform for collective financing under the supervision of the General Authority for Endowments. It aims to stimulate community participation in the endowment field and provides opportunities for partial or full contribution to support projects and finance them digitally through secure payment options.
        </Text>
        <Text style={styles.title}>Concept:</Text>
        <Text style={styles.text}>
          It presents a package of endowment and developmental products and projects for non-profit entities, enabling various segments of society and donor organizations to contribute to their support, thus contributing to development and meeting developmental needs and priorities.
        </Text>
        <Text style={styles.title}>Expected Impact of the Platform:</Text>
        <Text style={styles.text}>
          - Activating the role of endowments in development and directing support towards sustainable development projects.
          {'\n\n'}
          - Empowering beneficiaries and developing their capacities.
          {'\n\n'}
          - Creating a reliable and unified platform to showcase endowment projects and initiatives of non-profit organizations.
          {'\n\n'}
          - Encouraging competition among organizations to present innovative and quality projects that meet the needs and priorities of society.
          {'\n\n'}
          - Enhancing the concept of partnership and integration among various sectors and relevant entities.
          {'\n\n'}
          - Reaching the largest possible number of entities, regions, and beneficiaries through the platform.
          {'\n\n'}
          - Measuring the impact of projects and displaying the impact of support on targeted groups.
        </Text>
        <Text style={styles.title}>Objectives:</Text>
        <Text style={styles.text}>
          - Engaging all segments of society in supporting endowment and developmental projects.
          {'\n\n'}
          - Enhancing community participation by contributing to innovative endowment and developmental products.
          {'\n\n'}
          - Providing a secure platform that enhances transparency of support and measures its impact.
          {'\n\n'}
          - Enhancing the role of endowments in development and social solidarity.
          {'\n\n'}
          - Achieving financial sustainability for the non-profit sector and meeting developmental needs.
          {'\n\n'}
          - Facilitating grant operations for those wishing to contribute within a stimulating regulatory environment.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#33A09A'
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Help;