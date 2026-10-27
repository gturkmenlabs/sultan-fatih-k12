import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sultan Fatih K.12 — Özel Sultan Fatih Eğitim Kurumları",
    short_name: "Sultan Fatih",
    description:
      "Fatih ve Beylikdüzü kampüslerinde anaokulu, ilkokul, ortaokul, anadolu ve fen lisesi eğitimi.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "tr",
    background_color: "#ffffff",
    theme_color: "#ffdb5b",
    icons: [
      {
        src: "/sites/sultanfatih/brand/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
  };
}
