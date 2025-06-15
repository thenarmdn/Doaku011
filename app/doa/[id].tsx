import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import axios from "axios";

interface DoaData {
  id: string;
  name: string;
  arabic: string;
  translation: string;
}

export default function DoaDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [currentDoa, setCurrentDoa] = useState<DoaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allDoas, setAllDoas] = useState<DoaData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchDoaDetail = async (doaId: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.baserow.io/api/database/rows/table/550282/${doaId}/?user_field_names=true`,
        {
          headers: {
            Authorization: "Token nhg3j7C6oD37cs9NObD3PI4fQd5HNf3L",
          },
        },
      );

      const doaData: DoaData = {
        id: response.data.id.toString(),
        name: response.data["Nama Do'a"] || "Doa",
        arabic: response.data["Kalimat Do'a"] || "لا إله إلا الله",
        translation:
          response.data["Arti Do'a"] || "Tidak ada Tuhan selain Allah",
      };

      setCurrentDoa(doaData);
    } catch (error) {
      console.error("Error fetching doa detail:", error);
      // Fallback data
      setCurrentDoa({
        id: id || "1",
        name: "Doa Sebelum Makan",
        arabic:
          "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        translation:
          "Ya Allah, berkahilah rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllDoas = async () => {
    try {
      const response = await axios.get(
        "https://api.baserow.io/api/database/rows/table/550282/?user_field_names=true&size=100",
        {
          headers: {
            Authorization: "Token nhg3j7C6oD37cs9NObD3PI4fQd5HNf3L",
          },
        },
      );

      const doas = response.data.results.map((row: any) => ({
        id: row.id.toString(),
        name: row["Nama Do'a"] || "Doa",
        arabic: row["Kalimat Do'a"] || "لا إله إلا الله",
        translation: row["Arti Do'a"] || "Tidak ada Tuhan selain Allah",
      }));

      setAllDoas(doas);
      const index = doas.findIndex((doa: DoaData) => doa.id === id);
      setCurrentIndex(index >= 0 ? index : 0);
    } catch (error) {
      console.error("Error fetching all doas:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDoaDetail(id);
      fetchAllDoas();
    }
  }, [id]);

  // Handle navigation to previous doa
  const goToPreviousDoa = () => {
    if (currentIndex > 0 && allDoas.length > 0) {
      router.replace(`/doa/${allDoas[currentIndex - 1].id}`);
    }
  };

  // Handle navigation to next doa
  const goToNextDoa = () => {
    if (currentIndex < allDoas.length - 1 && allDoas.length > 0) {
      router.replace(`/doa/${allDoas[currentIndex + 1].id}`);
    }
  };

  // Handle navigation back to dashboard
  const goToDashboard = () => {
    router.replace("/");
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFEDF3]">
        <ActivityIndicator size="large" color="#0ABAB5" />
        <Text className="mt-4 text-gray-600">Memuat doa...</Text>
      </View>
    );
  }

  if (!currentDoa) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFEDF3]">
        <Text className="text-lg text-gray-600">Doa tidak ditemukan</Text>
        <TouchableOpacity
          onPress={goToDashboard}
          className="mt-4 bg-[#0ABAB5] px-4 py-2 rounded"
        >
          <Text className="text-white">Kembali ke Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FFEDF3]">
      {/* Header */}
      <View className="bg-[#0ABAB5] p-4 rounded-b-lg shadow-md">
        <TouchableOpacity onPress={goToDashboard} className="mb-2">
          <ArrowLeft size={24} color="#FFEDF3" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white text-center">
          {currentDoa.name}
        </Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4">
        {/* Arabic Text */}
        <View className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <Text className="text-2xl text-right leading-10 text-[#0ABAB5]">
            {currentDoa.arabic}
          </Text>
        </View>

        {/* Translation */}
        <View className="bg-[#ADEED9] rounded-lg p-6 shadow-sm">
          <Text className="text-lg text-[#0ABAB5] font-medium">
            {currentDoa.translation}
          </Text>
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View className="bg-[#56DFCF] p-4 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={goToPreviousDoa}
          className={`p-3 rounded-full ${currentIndex === 0 ? "opacity-50" : ""}`}
          disabled={currentIndex === 0}
        >
          <ArrowLeft size={24} color="#FFEDF3" />
        </TouchableOpacity>

        <Text className="text-white font-medium">
          {currentIndex + 1} / {allDoas.length || 1}
        </Text>

        <TouchableOpacity
          onPress={goToNextDoa}
          className={`p-3 rounded-full ${currentIndex === allDoas.length - 1 ? "opacity-50" : ""}`}
          disabled={currentIndex === allDoas.length - 1}
        >
          <ArrowRight size={24} color="#FFEDF3" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
