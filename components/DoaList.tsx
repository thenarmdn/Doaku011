import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import DoaListItem from "./DoaListItem";
import axios from "axios";

interface Doa {
  id: string;
  name: string;
}

interface DoaListProps {
  searchQuery?: string;
}

const DoaList = ({ searchQuery = "" }: DoaListProps) => {
  const [doaList, setDoaList] = useState<Doa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  const fetchDoas = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.baserow.io/api/database/rows/table/550282/?user_field_names=true&page=${page}&size=${itemsPerPage}`,
        {
          headers: {
            Authorization: "Token nhg3j7C6oD37cs9NObD3PI4fQd5HNf3L",
          },
        },
      );

      const doas = response.data.results.map((row: any, index: number) => ({
        id: row.id.toString(),
        name:
          row["Nama Do'a"] || `Doa ${(page - 1) * itemsPerPage + index + 1}`,
      }));

      setDoaList(doas);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (error) {
      console.error("Error fetching doas:", error);
      // Fallback to mock data if API fails
      setDoaList([
        { id: "1", name: "Doa Sebelum Makan" },
        { id: "2", name: "Doa Sesudah Makan" },
        { id: "3", name: "Doa Sebelum Tidur" },
        { id: "4", name: "Doa Bangun Tidur" },
        { id: "5", name: "Doa Masuk Kamar Mandi" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoas(currentPage);
  }, [currentPage]);

  const handleDoaPress = (id: string) => {
    router.push(`/doa/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FFEDF3]">
        <ActivityIndicator size="large" color="#0ABAB5" />
        <Text className="mt-4 text-gray-600">Memuat daftar doa...</Text>
      </View>
    );
  }

  // Filter doa list based on search query
  const filteredDoaList = doaList.filter((doa) =>
    doa.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (filteredDoaList.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-[#FFEDF3]">
        <Text className="text-lg text-gray-600 text-center">
          Tidak ada doa yang ditemukan dengan kata kunci "{searchQuery}"
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FFEDF3]">
      <FlatList
        data={filteredDoaList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoaListItem
            id={item.id}
            name={item.name}
            onPress={() => handleDoaPress(item.id)}
          />
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Pagination */}
      <View className="flex-row justify-center items-center p-4 bg-[#FFEDF3]">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <TouchableOpacity
              key={pageNumber}
              onPress={() => handlePageChange(pageNumber)}
              className={`mx-2 px-4 py-2 rounded-full ${
                currentPage === pageNumber ? "bg-[#0ABAB5]" : "bg-[#ADEED9]"
              }`}
            >
              <Text
                className={`font-medium ${
                  currentPage === pageNumber ? "text-white" : "text-[#0ABAB5]"
                }`}
              >
                {pageNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default DoaList;
