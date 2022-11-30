import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { VictoryPie } from "victory-native";
import CustomLabel from "./CustomLabel";
export default function App() {
  return (
    <View style={styles.container}>
      <VictoryPie
        colorScale={["tomato", "orange", "gold", "green", "navy"]}
        style={{ labels: { fill: "white" } }}
        innerRadius={100}
        labelRadius={120}
        labels={({ datum }) => `${datum.y}%`}
        labelComponent={<CustomLabel />}
        data={[
          { x: 2, y: 50 },
          { x: 2, y: 7 },
          { x: 3, y: 13 },
          { x: 4, y: 20 },
          { x: 5, y: 10 },
        ]}
      />
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
});
