import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#070B0E",
          border: "1px solid #26313A",
          color: "#B7FF2A",
          display: "flex",
          fontSize: 13,
          fontWeight: 900,
          height: "100%",
          justifyContent: "center",
          letterSpacing: "-0.04em",
          width: "100%",
        }}
      >
        WR
      </div>
    ),
    size,
  );
}
