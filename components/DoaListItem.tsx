import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";

interface DoaListItemProps {
  id: string;
  name: string;
  onPress?: () => void;
}

const DoaListItem = ({
  id = "1",
  name = "Doa Sebelum Makan",
  onPress,
}: DoaListItemProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/doa/${id}`);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-[#FFEDF3] p-4 rounded-lg mb-2 flex-row justify-between items-center border border-[#ADEED9]"
      activeOpacity={0.7}
    >
      <Text className="text-base font-medium text-gray-800">{name}</Text>
      <ChevronRight size={20} color="#0ABAB5" />
    </TouchableOpacity>
  );
};

export default DoaListItem;
