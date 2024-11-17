import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Touchable, TouchableOpacity, Button} from 'react-native';
import Pen from '../../assets/pen.svg';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { RootState } from '../../redux/store/store';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import { addCategory, changeNameCategory, deleteCategory } from '../../redux/features/categoriesSlice';
import CategoryModal from '../../components/CategoryModal'
import CategoryItem from '../../components/CategoryItem';
import CustomBttnSvg from '../../components/CustomBttnSvg';

const CategoriesScreen = () => {

  const dispatch = useAppDispatch()
  const categories = useAppSelector((state: RootState) => state.categories.categories)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalChangeVisible, setModalChangeVisible] = useState(false)
  const [newCategory, setNewCategory] = useState('');
  const [newNameOfCtgr, setNewNameOfCtgr] = useState('');
  const [currentNameOfCtgr, setCurrentNameOfCtgr] = useState('');

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);
  const openChangeModal = useCallback(() => {
    setModalChangeVisible(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);
  const closeChangeModal = useCallback(() => {
    setModalChangeVisible(false);
  }, []);

  const addCat = () => {
    dispatch(addCategory({name: newCategory, sum: 0}))
  }

  const changeName = () => {
    dispatch(changeNameCategory({currentName: currentNameOfCtgr, sum: 0, newName: newNameOfCtgr}))
  }

  const deleteCat = () => {
    dispatch(deleteCategory({currentName: currentNameOfCtgr}))
  }

  const renderItem = useCallback(
    ({ item }: { item: { name: string; sum: number } }) => (
      <CategoryItem item={item} onEdit={() => { openChangeModal(); setCurrentNameOfCtgr(item.name) }} />
    ),[categories.length]
  );
    
  return (
    <>
    <PaperProvider>
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Категории расходов</Text>
      </View>
      <FlatList data={categories} renderItem={renderItem} />
      
      <CustomBttnSvg onPress={openModal} style={styles.customBttn}>
        <Text style={styles.opacityText}>Добавить категорию</Text>
      </CustomBttnSvg>

      <CategoryModal
          isVisible={modalVisible}
          onClose={()=>{closeModal(); setNewCategory('')}}
          label="Название категории"
          inputValue={newCategory}
          onChangeInput={setNewCategory}
          buttonText="Добавить"
          onButtonPress={addCat}
        />

        <CategoryModal
          isVisible={modalChangeVisible}
          onClose={()=>{closeChangeModal(); setNewNameOfCtgr('')}}
          label="Новое название"
          inputValue={newNameOfCtgr}
          onChangeInput={setNewNameOfCtgr}
          buttonText="Сменить название"
          onButtonPress={changeName}
          onDeleteButtonPress={deleteCat}
          deleteButtonText='Удалить категорию'
        />

    </View>
    </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        paddingHorizontal: 16,    
        backgroundColor: '#F7FAFA'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold', 
        lineHeight: 23,
    },
    titleView: {
        margin: 10,
        alignItems: 'center'
    },
    scrollView: {
        backgroundColor: '#F7FAFA'
    },
    opacity: {
      backgroundColor: '#39E079', 
      padding: 16, 
      borderRadius: 12, 
      // width: '100%', 
      alignItems: 'center',
      marginBottom: 16
    },
    opacityText: {
      color: '#141414', 
      fontWeight: 'bold', 
      fontSize: 16, 
      lineHeight: 24,
    },
    modalView: {
      backgroundColor: '#F7FAFA', 
      padding: 15, 
      alignItems: 'center', 
      justifyContent: 'center',
      borderRadius: 12, 
      width: '100%',
      
    },
    customBttn: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#39E079',
      height: 60,
      borderRadius: 12
    }
});

export default CategoriesScreen;
