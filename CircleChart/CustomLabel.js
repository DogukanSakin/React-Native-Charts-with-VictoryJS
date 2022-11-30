import { VictoryTooltip, VictoryLabel } from "victory-native";
export default function CustomLabel(props) {
  return (
    <>
      <VictoryLabel {...props} />
      <VictoryTooltip
        {...props}
        x={200}
        y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: "black" }}
      />
    </>
  );
}
