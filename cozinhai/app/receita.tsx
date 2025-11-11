import { Image, ScrollView, StyleSheet, View } from "react-native";
import ReceitaInfo from "../components/ReceitaInfo";
import ReceitaSteps from "../components/ReceitaSteps";
import { IComment } from "../interfaces/comment.interface";
import { Card, Icon, Text, Avatar } from "react-native-paper";

let commentTestArray: IComment[] = [
  {
    userId: "1",
    date: new Date("December 10, 2024 10:15:00"),
    comment: "Bem fácil e gostoso!",
    grade: 5,
  },
  {
    userId: "2",
    date: new Date("June 6, 2025 8:10:00"),
    comment: "É bom mas fez uma sujeira...",
    grade: 3
  },
  {
    userId: "3",
    date: new Date("August 10, 2025 15:27:00"),
    comment: "Não é o melhor que eu já fiz, mas dá pro gasto.",
    grade: 4
  }
]

export default function Receita() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.main} testID="main">
        <Image source={require("../assets/logo.png")} style={styles.mainLogo} />

        <View testID="receitaDiv" style={styles.receitaDiv}>
          <View testID="receitaHeader" style={styles.receitaHeader}>
            <Image
              source={require("../assets/churros.png")}
              style={{ width: 130, height: 130 }}
            ></Image>
            <ReceitaInfo />
          </View>
          <ReceitaSteps />
        </View>
        <View style={{ gap: 12 }}>
          {
            commentTestArray.map(comment => (
              <Card style={{ maxWidth: 325 }} key={comment.userId}>
                <Card.Content>
                  <Card.Title title="Paulo" subtitle="10/02/2024"
                    left={() => <Avatar.Icon icon="account" size={48} style={{ backgroundColor: 'teal', marginLeft: -10 }} />} />
                  <Text>{comment.comment}</Text>
                  <View style={{ flexDirection: "column", marginTop: 4, alignItems: "center", gap: 10 }}>
                    <View style={{ flexDirection: "row", marginTop: 6 }}>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Icon
                          key={i}
                          source={i < comment.grade ? "star" : "star-outline"}
                          size={20}
                          color={i < comment.grade ? "#22577A" : "#CCC"}
                        />
                      ))}
                    </View>
                    {comment.imageBase64 ? (
                      <Image style={{ width: 100, height: 100, borderRadius: 6 }} source={{ uri: comment.imageBase64 }} />
                    ) : null}
                  </View>

                </Card.Content>
              </Card>
            ))
          }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 120,
  },

  mainLogo: {
    width: 210,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 130,
    paddingTop: 100,
  },

  receitaHeader: {
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap"
  },

  receitaDiv: {
    gap: 40,
    padding: 20,
    paddingBottom: 180,
  },
});
