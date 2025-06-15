import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, StatusBar } from "react-native";
import { Stack } from "expo-router";
import { Search } from "lucide-react-native";
import DoaList from "../components/DoaList";

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for prayers
  const prayers = [
    { id: "1", name: "Doa Sebelum Makan" },
    { id: "2", name: "Doa Sesudah Makan" },
    { id: "3", name: "Doa Sebelum Tidur" },
    { id: "4", name: "Doa Bangun Tidur" },
    { id: "5", name: "Doa Masuk Kamar Mandi" },
    { id: "6", name: "Doa Keluar Kamar Mandi" },
    { id: "7", name: "Doa Masuk Masjid" },
    { id: "8", name: "Doa Keluar Masjid" },
    { id: "9", name: "Doa Bepergian" },
    { id: "10", name: "Doa Untuk Kedua Orang Tua" },
  ];

  // Filter prayers based on search query
  const filteredPrayers = prayers.filter((prayer) =>
    prayer.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FFEDF3]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFEDF3" />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 px-4 pt-12 bg-[#FFEDF3]">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-[#0ABAB5]">Doaku</Text>
          <Text className="text-base text-gray-600">Aplikasi Doa Islami</Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center px-4 py-2 mb-6 bg-white rounded-full shadow-sm">
          <Search size={20} color="#0ABAB5" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Cari Doa..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Prayer List */}
        <DoaList searchQuery={searchQuery} />
      </View>
    </SafeAreaView>
  );
}
