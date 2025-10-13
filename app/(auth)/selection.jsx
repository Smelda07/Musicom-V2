import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import BackArrow from '../../assets/icons/auth-icons/BackArrow.svg';
import { Alert } from 'react-native';
import { Redirect } from 'expo-router';
import { useGlobalContext } from "../../context/GlobalProvider";

