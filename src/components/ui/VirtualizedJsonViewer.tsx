import React, { useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface VirtualizedJsonViewerProps {
  data: unknown;
  height?: number;
  lineHeight?: number;
  width?: number | string;
}

export function VirtualizedJsonViewer({
  data,
  height = 400,
  lineHeight = 28,
  width = "100%",
}: VirtualizedJsonViewerProps) {
  // Convert JSON to pretty string and split into lines
  const lines = useMemo(() => {
    const jsonString = JSON.stringify(data, null, 2);
    return jsonString.split("\n");
  }, [data]);

  return (
    <List
      height={height}
      itemCount={lines.length}
      itemSize={lineHeight}
      width={width}
    >
      {({ index, style }) => (
        <div style={style}>
          <SyntaxHighlighter
            language="json"
            style={oneDark}
            customStyle={{
              backgroundColor: "#1e1e1e",
              borderRadius: "10px",
              height: "50vh",
              overflowY: "auto",
              fontSize: 12,
            }}
            PreTag="span"
            wrapLongLines
          >
            {lines[index]}
          </SyntaxHighlighter>
        </div>
      )}
    </List>
  );
}
