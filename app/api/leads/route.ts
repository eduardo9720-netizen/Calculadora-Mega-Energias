import { NextRequest, NextResponse } from "next/server";
import { createNotionLead, uploadFileToNotion } from "@/lib/notion";

const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const str = (key: string) => {
    const v = form.get(key);
    return typeof v === "string" ? v.trim() : "";
  };

  const name = str("name");
  const phone = str("phone");
  const email = str("email");
  const lang = form.get("lang") === "en" ? "en" : "es";
  const mode = str("mode");
  const intakeMode = str("intakeMode") === "cfe" ? "cfe" : "equipment";
  const notes = str("notes") || undefined;

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Nombre, teléfono y correo son requeridos." },
      { status: 400 }
    );
  }

  const validModes = [
    "off-grid",
    "respaldo-total",
    "respaldo-parcial",
    "sin-respaldo",
  ];
  if (!validModes.includes(mode)) {
    return NextResponse.json({ error: "Modo de sistema inválido." }, { status: 400 });
  }

  let dailyWhTotal: number | undefined;
  let panelCount: number | undefined;
  let batteryCount: number | null | undefined;
  let inverterKW: number | null | undefined;

  if (intakeMode === "equipment") {
    dailyWhTotal = Number(str("dailyWhTotal")) || 0;
    panelCount = Number(str("panelCount")) || 0;
    const batteryRaw = str("batteryCount");
    batteryCount = batteryRaw ? Number(batteryRaw) : null;
    const inverterRaw = str("inverterKW");
    inverterKW = inverterRaw ? Number(inverterRaw) : null;
  }

  let fileUploadId: string | undefined;
  const file = form.get("receipt");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande (máx. 15 MB)." },
        { status: 400 }
      );
    }
    try {
      fileUploadId = await uploadFileToNotion(file);
    } catch (err) {
      console.error("Failed to upload file to Notion:", err);
      return NextResponse.json(
        { error: "No se pudo subir el archivo." },
        { status: 502 }
      );
    }
  }

  try {
    await createNotionLead({
      name,
      phone,
      email,
      lang,
      mode: mode as
        | "off-grid"
        | "respaldo-total"
        | "respaldo-parcial"
        | "sin-respaldo",
      dailyWhTotal,
      panelCount,
      batteryCount,
      inverterKW,
      notes,
      fileUploadId,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to create Notion lead:", err);
    return NextResponse.json(
      { error: "No se pudo guardar la cotización." },
      { status: 502 }
    );
  }
}
