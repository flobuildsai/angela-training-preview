export type ProductKey = "templates" | "programm" | "programm_raten";

export interface ProductConfig {
  key: ProductKey;
  priceId: string;
  name: string;
  tagline: string;
  priceLabel: string;
  priceNote: string;
  includes: string[];
}

export const PRODUCTS: Record<ProductKey, ProductConfig> = {
  templates: {
    key: "templates",
    priceId: "templates_onetime",
    name: "Creating Society Templates",
    tagline: "Die komplette Vorlagen-Bibliothek",
    priceLabel: "47 €",
    priceNote: "Einmalzahlung, sofortiger Zugang",
    includes: [
      "8 Template-Kollektionen in Canva",
      "Bildbibliothek für deine Nische",
      "Neue Vorlagen jeden Monat",
    ],
  },
  programm: {
    key: "programm",
    priceId: "programm_onetime",
    name: "Creating Society Programm",
    tagline: "12 Wochen Done-with-you",
    priceLabel: "1.500 €",
    priceNote: "Einmalzahlung, voller Zugang",
    includes: [
      "12-Wochen-Programm mit allen Modulen",
      "Community-Zugang und Calls",
      "Alle Templates inklusive",
    ],
  },
  programm_raten: {
    key: "programm_raten",
    priceId: "programm_installment_3x",
    name: "Creating Society Programm (Raten)",
    tagline: "12 Wochen Done-with-you",
    priceLabel: "3 × 550 €",
    priceNote: "Monatlich, endet automatisch nach 3 Raten",
    includes: [
      "12-Wochen-Programm mit allen Modulen",
      "Community-Zugang und Calls",
      "Alle Templates inklusive",
    ],
  },
};

export const DEFAULT_PRODUCT: ProductKey = "templates";

export function isProductKey(value: unknown): value is ProductKey {
  return typeof value === "string" && value in PRODUCTS;
}
