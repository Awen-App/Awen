import React from 'react';
import { View, Text, ScrollView,StyleSheet,styles } from 'react-native';

const TermsAndConditions = () => {
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainer Style={{ padding: 16 }}>
        <Text style={styles.title}>Terms and Conditions for Awen Charity Mobile App</Text>

<Text style={styles.text}>
Please read these Terms and Conditions ("Terms") carefully before using the Awen Charity Mobile App ("Awen") operated by [Charity Organization Name] ("we," "us," or "our"). These Terms govern your use of the Awen mobile application.

By downloading, accessing, or using the Awen mobile app, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use the Awen mobile app.
</Text>
<Text style={styles.title}>1. Use of the Awen Mobile App</Text>
<Text style={styles.text}>1.1 Eligibility: By using the Awen mobile app, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
1.2 License: We grant you a limited, non-exclusive, non-transferable, revocable license to use the Awen mobile app solely for your personal, non-commercial use, subject to these Terms.
1.3 Prohibited Activities: You agree not to:
   a. Use the Awen mobile app for any unlawful purpose or in violation of any applicable laws or regulations.
   b. Engage in any activity that could harm or disrupt the Awen mobile app or its users.
   c. Attempt to gain unauthorized access to any portion of the Awen mobile app or any related systems or networks.
   d. Use the Awen mobile app to distribute unsolicited promotional or marketing materials or spam.
   e. Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with any person or entity.
   f. Collect or store personal information about other users of the Awen mobile app.
   g. Modify, adapt, translate, reverse engineer, decompile, or disassemble the Awen mobile app.
   </Text>
   <Text style={styles.title}>2. User Content</Text>
   <Text style={styles.text}>
2.1 User-generated Content: The Awen mobile app may allow you to submit or upload content, including but not limited to comments, photos, and videos ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, distribute, display, and perform the User Content in connection with the Awen mobile app and our charitable activities.
2.2 Content Guidelines: You agree not to submit User Content that is:
   a. Unlawful, harmful, threatening, abusive, defamatory, vulgar, obscene, or otherwise objectionable.
   b. Infringing upon the intellectual property rights or privacy rights of any third party.
   c. False, misleading, or fraudulent.
   d. Violating any applicable laws or regulations.
2.3 Monitoring and Removal: We reserve the right to monitor and remove any User Content that violates these Terms or is deemed inappropriate at our sole discretion.
</Text>
<Text style={styles.title}>3. Privacy</Text>
<Text style={styles.text}>
Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use the Awen mobile app. By using the Awen mobile app, you agree to our Privacy Policy.
</Text>
<Text style={styles.title}>4. Intellectual Property</Text>
<Text style={styles.text}>
4.1 Ownership: The Awen mobile app and all intellectual property rights associated with it, including but not limited to copyrights, trademarks, and trade secrets, are owned by us or our licensors.
4.2 Limited License: We grant you a limited, non-exclusive, non-transferable license to use the Awen mobile app for its intended purpose and in accordance with these Terms. You may not reproduce, modify, distribute, display, or create derivative works of the Awen mobile app or any content without our prior written consent.
</Text>
<Text style={styles.title}>5. Disclaimer of Warranties</Text>
<Text style={styles.text}>
The Awen mobile app is provided</Text>
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
export default TermsAndConditions;