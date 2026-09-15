import { NextRequest, NextResponse } from "next/server";
import { createNotionLead } from "@/lib/notion";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : undefined;
  const lang = b.lang === "en" ? "en" : "es";
  const mode = b.mode;
  const dailyWhTotal = typeof b.dailyWhTotal === "number" ? b.dailyWhTotal : 0;
  const panelCount = typeof b.panelCount === "number" ? b.panelCount : 0;
  const batteryCount =
    typeof b.batteryCount === "number" ? b.batteryCount : null;
  const inverterKW = typeof b.inverterKW === "number" ? b.inverterKW : null;
  const notes = typeof b.notes === "string" ? b.notes : undefined;

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Nombre y teléfono son requeridos." },
      { status: 400 }
    );
  }

  const validModes = [
    "off-grid",
    "respaldo-total",
    "respaldo-parcial",
    "sin-respaldo",
  ];
  if (typeof mode !== "string" || !validModes.includes(mode)) {
    return NextResponse.json({ error: "Modo de sistema inválido." }, { status: 400 });
  }

  try {
    await createNotionLead({
      name,
      phone,
      email: email || undefined,
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
