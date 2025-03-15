// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;


// import React from 'react';
// import { Button, View, Image, Text } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';

// const GalleryAccess = () => {
//   const [selectedImage, setSelectedImage] = React.useState(null);

//   const openGallery = () => {
//     const options = {
//       mediaType: 'photo',
//     };
//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorMessage) {
//         console.log('Error: ', response.errorMessage);
//       } else {
//         const asset = response.assets[0];
//         setSelectedImage(asset.uri);
//         console.log('Selected image: ', asset);
//       }
//     });
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Open Gallery" onPress={openGallery} />
//       {selectedImage && (
//         <Image
//           source={{ uri: selectedImage }}
//           style={{ width: 200, height: 200, marginTop: 20 }}
//         />
//       )}
//     </View>
//   );
// };

// export default GalleryAccess;




import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';

const ContactsAccess = () => {
  const [contacts, setContacts] = useState([]);

  // Function to request permission on Android
  const requestContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      if (Platform.OS === 'android') {
        const permission = await requestContactPermission();
        if (!permission) return;
      }
      Contacts.getAll((err, contacts) => {
        if (err) {
          console.log('Error fetching contacts: ', err);
          return;
        }
        setContacts(contacts);
      });
    };

    fetchContacts();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Contacts List:</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <Text>{item.givenName} {item.familyName}</Text>
        )}
      />
    </View>
  );
};

export default ContactsAccess;


