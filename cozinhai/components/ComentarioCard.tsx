import { useContext } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { themeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ComentarioCardProps {
  nomeReceita: string;
  //   imgReceita: string;
  dataComentario: string;
}

export default function ComentarioCard({
  nomeReceita,
  dataComentario,
}: ComentarioCardProps) {
  const { colors } = useContext(themeContext);

  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: colors.secondaryText,
        width: "100%",
        alignItems: "center",
        borderRadius: 15,
        padding: 15,
        gap: 15,
      }}
    >
      <View
        testID="CardTitle"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          testID="ImageAndTitle"
          style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
        >
          <Image
            source={require("../assets/churros.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
          />
          <View testID="TitleAndDate">
            <Text
              style={{
                fontWeight: "bold",
                color: colors.darkBlue,
                fontSize: 18,
              }}
            >
              {nomeReceita}
            </Text>

            <Text style={{ color: colors.secondaryText }}>
              {dataComentario}
            </Text>
          </View>
        </View>

        <MaterialCommunityIcons
          name="dots-vertical"
          color={colors.secondaryText}
          size={30}
        />
      </View>

      <View testID="comentario">
        <Text style={{ color: colors.secondaryText }}>
          “Delicioso! Muito simples e rápido de fazer!”
        </Text>
      </View>
    </View>
  );
}
