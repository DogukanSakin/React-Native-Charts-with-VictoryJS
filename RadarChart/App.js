import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
} from "victory-native";
const characterData = [
  {
    strength: 1,
    intelligence: 250,
    luck: 1,
    stealth: 40,
    charisma: 50,
  },
  {
    strength: 2,
    intelligence: 300,
    luck: 2,
    stealth: 80,
    charisma: 90,
  },
  {
    strength: 5,
    intelligence: 225,
    luck: 3,
    stealth: 60,
    charisma: 120,
  },
];

export default function App() {
  //states
  const [data, setData] = useState(() => processData(characterData));
  const [maxima, setMaxima] = useState(() => getMaxima(characterData));
  const [characterAColor, setCharacterAColor] = useState("red");
  const [characterBColor, setCharacterBColor] = useState("green");
  const [characterCColor, setCharacterCColor] = useState("blue");
  //functions
  function getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  function processData(data) {
    const maxByGroup = getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }
  function filterCharacter(characterName) {
    setCharacterAColor("transparent");
    setCharacterBColor("transparent");
    setCharacterCColor("transparent");
    switch (characterName) {
      case "characterA":
        return setCharacterAColor("red");
      case "characterB":
        return setCharacterBColor("green");
      case "characterC":
        return setCharacterCColor("blue");
    }
  }
  function resetFilter() {
    setCharacterAColor("red");
    setCharacterBColor("green");
    setCharacterCColor("blue");
  }

  return (
    <View style={styles.container}>
      <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
        <VictoryGroup
          colorScale={[
            `${characterAColor}`,
            `${characterBColor}`,
            `${characterCColor}`,
          ]}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
        >
          {data.map((data, i) => {
            return <VictoryArea key={i} data={data} />;
          })}
        </VictoryGroup>
        {Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis
              key={i}
              dependentAxis
              style={{
                axisLabel: { padding: 10 },
                axis: { stroke: "none" },
                grid: { stroke: "none", strokeWidth: 1, opacity: 1 },
              }}
              tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
              labelPlacement="perpendicular"
              axisValue={i + 1}
              label={key}
              tickFormat={(t) => Math.ceil(t * maxima[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })}
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ""}
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "grey", opacity: 0.5 },
          }}
        />
      </VictoryChart>
      <View style={styles.characterTextContainer}>
        <Text
          style={styles.characterAText}
          onPress={() => filterCharacter("characterA")}
        >
          Character A
        </Text>
        <Text
          style={styles.characterBText}
          onPress={() => filterCharacter("characterB")}
        >
          Character B
        </Text>
        <Text
          style={styles.characterCText}
          onPress={() => filterCharacter("characterC")}
        >
          Character C
        </Text>
      </View>
      <Button title="Reset Filter" onPress={resetFilter}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  characterAText: {
    fontSize: 16,
    color: "red",
    marginLeft: 10,
    marginRight: 20,
  },
  characterBText: {
    fontSize: 16,
    color: "green",
    marginRight: 20,
  },
  characterCText: {
    fontSize: 16,
    color: "blue",
  },
  characterTextContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
});
