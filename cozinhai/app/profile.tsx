import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header'; // Ajuste o caminho se necessário

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.scrollViewContainer}>
      {/* <Header /> */}
      
      {/* Contêiner superior: foto, nome e texto */}
      <View style={styles.profileHeader}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Gabriel Souza</Text>
            <TouchableOpacity>
              <Text style={styles.updateText}>Atualizar Informações</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* Contêiner dos botões de Ações e o botão de Sair */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#57CC99', '#22577A']}
            style={styles.buttonGradient}
          >
            <AntDesign name="star" size={20} color="white" style={styles.buttonIconLeft} />
            <Text style={styles.actionButtonText}>Minhas avaliações</Text>
            <AntDesign name="right" size={20} color="white" style={styles.buttonIconRight} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#57CC99', '#22577A']}
            style={styles.buttonGradient}
          >
            <AntDesign name="book" size={20} color="white" style={styles.buttonIconLeft} />
            <Text style={styles.actionButtonText}>Livro de receitas</Text>
            <AntDesign name="right" size={20} color="white" style={styles.buttonIconRight} />
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#CE8484', '#FF0000']}
            style={styles.buttonGradient}
          >
            <AntDesign name="logout" size={20} color="white" style={styles.buttonIconLeft} />
            <Text style={styles.actionButtonText}>Sair</Text>
            <AntDesign name="right" size={20} color="white" style={styles.buttonIconRight} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#57CC99',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  updateText: {
    color: '#57CC99',
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  buttonWrapper: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonIconLeft: {
    marginRight: 10,
  },
  buttonIconRight: {
    marginLeft: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
});

export default ProfileScreen;