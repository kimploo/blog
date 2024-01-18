import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

export default (post: CollectionEntry<"blog">) => {
  return (
    <div
      style={{
        background: "rgb(20, 21, 26)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-1px",
          right: "-1px",
          border: "3px solid rgb(234, 237, 243)",
          background: "rgb(20, 21, 26)",
          opacity: "0.9",
          borderRadius: "4px",
          display: "none",
          justifyContent: "center",
          margin: "2.5rem",
          width: "88%",
          height: "80%",
        }}
      />
      <div
        style={{
          border: "3px solid rgb(20, 21, 26)",
          background: "rgb(20, 21, 26)",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "88%",
          height: "80%",
        }}
      >
        <div
          style={{
            color: "rgb(234, 237, 243)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            width: "90%",
            height: "90%",
          }}
        >
          <p
            style={{
              fontSize: 72,
              fontWeight: "bold",
              maxHeight: "84%",
              overflow: "hidden",
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "8px",
              paddingBottom: "8px",
              fontSize: 30,
            }}
          >
            <span>
              <span
                style={{
                  color: "transparent",
                }}
              ></span>
            </span>
            <span
              style={{
                overflow: "hidden",
                fontWeight: "bold",
                color: "rgb(255, 249, 64)",
              }}
            >
              {SITE.title}
              <span
                style={{
                  position: "relative",
                  fontSize: 40,
                  right: 6,
                  bottom: 9,
                }}
              >
                &nbsp;.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
