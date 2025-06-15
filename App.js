import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  MobileAds,
  TestIds,
} from "react-native-google-mobile-ads";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const doaList = [
  {
    id: "1",
    nama: "Doa Sebelum Tidur",
    lafadz: "بِاسْمِكَ اللّهُمَّ أَحْيَا وَأَمُوتُ",
    arti: "Dengan nama-Mu ya Allah aku hidup dan aku mati.",
  },
  {
    id: "2",
    nama: "Doa Bangun Tidur",
    lafadz:
      "الْـحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    arti: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami, dan kepada-Nyalah tempat kembali.",
  },
  // Tambahkan doa lainnya di sini
];

export default function App() {
  const [index, setIndex] = useState(0);
  const currentDoa = doaList[index];

  useEffect(() => {
    MobileAds().initialize();
  }, []);

  const nextDoa = () => {
    setIndex((prev) => (prev + 1) % doaList.length);
  };

  return (
    <StyledView className="flex-1 items-center justify-center bg-white px-4">
      <StyledText className="text-2xl font-bold text-center mb-2">
        {currentDoa.nama}
      </StyledText>
      <StyledText className="text-xl text-center text-gray-800 mb-4">
        {currentDoa.lafadz}
      </StyledText>
      <StyledText className="text-base italic text-center text-gray-600 mb-8">
        {currentDoa.arti}
      </StyledText>

      <StyledPressable
        className="bg-[#0ABAB5] px-6 py-3 rounded-2xl"
        onPress={nextDoa}
      >
        <StyledText className="text-white font-semibold text-lg">
          Doa Berikutnya
        </StyledText>
      </StyledPressable>

      <View className="absolute bottom-0 mb-4">
        <BannerAd
          unitId={TestIds.BANNER} // Gunakan TestIds.BANNER untuk demo
          size={BannerAdSize.ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </View>
    </StyledView>
  );
}
