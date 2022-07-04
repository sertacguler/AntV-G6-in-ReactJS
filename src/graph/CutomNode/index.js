import {
  Rect,
  Group,
  Circle,
  Text,
  Image,
} from "@antv/g6-react-node";

const Tag = ({ text, color }) => (
  <Rect
    style={{
      fill: color,
      padding: [5, 10],
      width: "auto",
      radius: [4],
      margin: [0, 8]
    }}
  >
    <Text style={{ fill: "#fff", fontSize: 10 }}>{text}sertac</Text>
  </Rect>
);

export const Card = ({ cfg }) => {
  const { collapsed = false } = cfg;

  return (
    <Group draggable>
      <Rect
        style={{
          width: 100,
          height: 100,
          fill: "#fff",
          stroke: "#ddd",
          shadowColor: "#eee",
          shadowBlur: 30,
          radius: [5],
          justifyContent: "flex-end",
        }}
        onMouseEnter={() => {
          console.log(1);
        }}
        draggable
      >
        <Image
          style={{
            img:
              "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
            width: 40,
            height: 40,
            margin: [0, "auto"] // top,rigth,bottom,left  // top,left // all
          }}
        />
        <Text style={{ fill: "#000", fontSize: 12, margin: [10, "auto", 20, "auto"] }}>
          30/12/2022
        </Text>
        {collapsed && (
          <Group>
            <Image
              style={{
                img:
                  "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
                width: 200,
                height: 200,
                margin: [24, "auto"]
              }}
            />
            <Rect
              style={{ width: "auto", flexDirection: "row", padding: [4, 12] }}
            >
              <Tag color="#66ccff" text="我是" />
              <Tag color="#66ccff" text="很多个" />
              <Tag color="#66ccff" text="很多个的" />
              <Tag color="#66ccff" text="标签" />
            </Rect>
          </Group>
        )}
        <Rect style={{
          position: "absolute",
          x: 0,
          y: 90,
          width: 100,
          height: 10,
          fill: "rgba(55, 87, 255, 0.25)",
          radius: [0, 0, 5, 5],
        }} />
        {cfg.count && <Rect style={{
          position: "absolute",
          x: 80,
          y: 0,
          width: 20,
          height: 20,
          fill: "red",
          radius: [0, 5, 0, 0],

        }}>
          <Text
            style={{
              fill: "#fff",
              fontSize: 15,
              fontWeight: "bold",
              margin: [4, 5],
            }}
          >
            {cfg.count}
          </Text>
        </Rect>}
      </Rect>
    </Group>
  );
};