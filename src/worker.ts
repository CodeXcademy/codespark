type LeadPayload = {
  email: string;
  childAge: string;
  source: string;
  submittedAt: string;
  userAgent: string;
};

type Env = {
  ASSETS: Fetcher;
  LEADS_KV?: KVNamespace;
  LEADS_WEBHOOK_URL?: string;
};

const jsonHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

const allowedAges = new Set(["7-9", "10-12", "13-14"]);

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...init?.headers
    }
  });
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readLead(request: Request): Promise<LeadPayload | Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      { ok: false, message: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return jsonResponse(
      { ok: false, message: "Request body must be an object." },
      { status: 400 }
    );
  }

  const data = body as Record<string, unknown>;
  const email = String(data.email ?? "").trim().toLowerCase();
  const childAge = String(data.childAge ?? "").trim();

  if (!isEmail(email)) {
    return jsonResponse(
      { ok: false, message: "Please enter a valid parent email." },
      { status: 400 }
    );
  }

  if (!allowedAges.has(childAge)) {
    return jsonResponse(
      { ok: false, message: "Please choose a valid child age range." },
      { status: 400 }
    );
  }

  return {
    email,
    childAge,
    source: "codespark-academy-landing-page",
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? ""
  };
}

async function saveLead(env: Env, lead: LeadPayload) {
  if (env.LEADS_KV) {
    const key = `lead:${lead.submittedAt}:${crypto.randomUUID()}`;
    await env.LEADS_KV.put(key, JSON.stringify(lead), {
      metadata: {
        email: lead.email,
        childAge: lead.childAge
      }
    });

    return "kv";
  }

  if (env.LEADS_WEBHOOK_URL) {
    const response = await fetch(env.LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(lead)
    });

    if (!response.ok) {
      throw new Error(`Lead webhook failed with ${response.status}`);
    }

    return "webhook";
  }

  throw new Error("No lead storage configured.");
}

async function handleLead(request: Request, env: Env) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  if (request.method !== "POST") {
    return jsonResponse(
      { ok: false, message: "Method not allowed." },
      { status: 405, headers: { Allow: "POST" } }
    );
  }

  const lead = await readLead(request);
  if (lead instanceof Response) {
    return lead;
  }

  try {
    const storage = await saveLead(env, lead);
    return jsonResponse({
      ok: true,
      storage,
      message: "Lead captured."
    });
  } catch (error) {
    console.error(error);
    return jsonResponse(
      {
        ok: false,
        message:
          "Lead capture is not configured yet. Add LEADS_KV or LEADS_WEBHOOK_URL in Cloudflare."
      },
      { status: 503 }
    );
  }
}

const worker: ExportedHandler<Env> = {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/leads") {
      return handleLead(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};

export default worker;
