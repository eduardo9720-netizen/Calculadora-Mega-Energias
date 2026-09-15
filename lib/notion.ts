import type { SystemMode } from "./types";
import { MODE_LABELS } from "./i18n";

const NOTION_VERSION = "2025-09-03";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  lang: "es" | "en";
  mode: SystemMode;
  dailyWhTotal: number;
  panelCount: number;
  batteryCount: number | null;
  inverterKW: number | null;
  notes?: string;
}

export async function createNotionLead(payload: LeadPayload): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const dataSourceId = process.env.NOTION_LEADS_DATA_SOURCE_ID;
  if (!token || !dataSourceId) {
    throw new Error("Notion no está configurado (faltan variables de entorno).");
  }

  const today = new Date().toISOString().slice(0, 10);
  const modeLabel = MODE_LABELS[payload.mode].es;

  const properties: Record<string, unknown> = {
    Nombre: { title: [{ text: { content: payload.name } }] },
    Teléfono: { phone_number: payload.phone },
    Fecha: { date: { start: today } },
    Status: { select: { name: "Nuevo" } },
    "Wh/día": { number: Math.round(payload.dailyWhTotal) },
    Paneles: { number: payload.panelCount },
    "Voltaje sistema": { select: { name: "48V" } },
    Idioma: { select: { name: payload.lang === "es" ? "ES" : "EN" } },
    "Tipo de sistema": { select: { name: modeLabel } },
  };

  if (payload.email) {
    properties["Correo"] = { email: payload.email };
  }
  if (payload.batteryCount !== null) {
    properties["Baterías"] = { number: payload.batteryCount };
    properties["Tipo de batería"] = { select: { name: "Litio" } };
  }
  if (payload.inverterKW !== null) {
    properties["Inversor (kW)"] = { number: Math.round(payload.inverterKW * 100) / 100 };
  }
  if (payload.notes) {
    properties["Notas"] = { rich_text: [{ text: { content: payload.notes.slice(0, 2000) } }] };
  }

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: dataSourceId },
      properties,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Notion API error ${res.status}: ${errBody}`);
  }
}
