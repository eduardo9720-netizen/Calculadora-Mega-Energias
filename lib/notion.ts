import type { SystemMode } from "./types";
import { MODE_LABELS } from "./i18n";

const NOTION_VERSION = "2025-09-03";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  lang: "es" | "en";
  mode: SystemMode;
  dailyWhTotal?: number;
  panelCount?: number;
  batteryCount?: number | null;
  inverterKW?: number | null;
  notes?: string;
  fileUploadId?: string;
}

function authHeaders(token: string, contentType?: string): HeadersInit {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
  };
  if (contentType) headers["Content-Type"] = contentType;
  return headers;
}

// Notion's file upload flow: create the upload object, send the bytes, then
// reference the returned id when creating the page. Files expire after 1h
// if not attached, so this always runs right before createNotionLead.
export async function uploadFileToNotion(file: File): Promise<string> {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    throw new Error("Notion no está configurado (falta NOTION_TOKEN).");
  }

  const createRes = await fetch("https://api.notion.com/v1/file_uploads", {
    method: "POST",
    headers: authHeaders(token, "application/json"),
    body: JSON.stringify({
      filename: file.name || "recibo-cfe",
      content_type: file.type || "application/octet-stream",
    }),
  });
  if (!createRes.ok) {
    throw new Error(
      `Notion file_uploads create error ${createRes.status}: ${await createRes.text()}`
    );
  }
  const { id, upload_url: uploadUrl } = (await createRes.json()) as {
    id: string;
    upload_url: string;
  };

  const body = new FormData();
  body.append("file", file, file.name);
  const sendRes = await fetch(uploadUrl, {
    method: "POST",
    headers: authHeaders(token),
    body,
  });
  if (!sendRes.ok) {
    throw new Error(
      `Notion file_uploads send error ${sendRes.status}: ${await sendRes.text()}`
    );
  }

  return id;
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
    "Voltaje sistema": { select: { name: "48V" } },
    Idioma: { select: { name: payload.lang === "es" ? "ES" : "EN" } },
    "Tipo de sistema": { select: { name: modeLabel } },
  };

  if (payload.email) {
    properties["Correo"] = { email: payload.email };
  }
  if (payload.dailyWhTotal !== undefined) {
    properties["Wh/día"] = { number: Math.round(payload.dailyWhTotal) };
  }
  if (payload.panelCount !== undefined) {
    properties["Paneles"] = { number: payload.panelCount };
  }
  if (payload.batteryCount !== undefined && payload.batteryCount !== null) {
    properties["Baterías"] = { number: payload.batteryCount };
    if (payload.batteryCount > 0) {
      properties["Tipo de batería"] = { select: { name: "Litio" } };
    }
  }
  if (payload.inverterKW !== undefined && payload.inverterKW !== null) {
    properties["Inversor (kW)"] = { number: Math.round(payload.inverterKW * 100) / 100 };
  }
  if (payload.notes) {
    properties["Notas"] = { rich_text: [{ text: { content: payload.notes.slice(0, 2000) } }] };
  }
  if (payload.fileUploadId) {
    properties["Recibo CFE"] = {
      files: [
        {
          type: "file_upload",
          file_upload: { id: payload.fileUploadId },
          name: "recibo-cfe",
        },
      ],
    };
  }

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: authHeaders(token, "application/json"),
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
