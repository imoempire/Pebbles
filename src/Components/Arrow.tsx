import React from "react";
import { View } from "react-native";
import Svg, { G, Line } from "react-native-svg";

const SvgExample = ({
  height,
  width = 18.828,
}: {
  height: number;
  width?: number;
}) => {
  return (
    <View>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 18.828 204.524"
      >
        <G
          id="Group_410"
          data-name="Group 410"
          transform="translate(-186.086 -544.5)"
        >
          <Line
            id="Line_7"
            data-name="Line 7"
            y2="202.11"
            transform="translate(195.5 544.5)"
            fill="none"
            stroke="#000"
            strokeWidth="2"
          />
          <G
            id="Group_342"
            data-name="Group 342"
            transform="translate(187.5 739.61)"
          >
            <Line
              id="Line_8"
              data-name="Line 8"
              x2="8"
              y2="8"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <Line
              id="Line_9"
              data-name="Line 9"
              x1="8"
              y2="8"
              transform="translate(8)"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default SvgExample;
