// Device & client detection from the User-Agent header.
export function detectDevice(req) {
  const userAgent = (req.headers && req.headers["user-agent"]) || req.get?.("user-agent") || "";

  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  const ua = userAgent.toLowerCase();

  if (ua.includes("edg") || ua.includes("edge")) {
    browser = "Edge";
  } else if (ua.includes("opr") || ua.includes("opera")) {
    browser = "Opera";
  } else if (ua.includes("chrome")) {
    browser = "Chrome";
  } else if (ua.includes("firefox") || ua.includes("fxios")) {
    browser = "Firefox";
  } else if (ua.includes("samsungbrowser")) {
    browser = "Samsung Internet";
  } else if (ua.includes("safari")) {
    browser = "Safari";
  }

  if (ua.includes("android")) {
    os = "Android";
    device = "Mobile";
  } else if (ua.includes("iphone")) {
    os = "iOS";
    device = "Mobile";
  } else if (ua.includes("ipad")) {
    os = "iOS";
    device = "Tablet";
  } else if (ua.includes("windows")) {
    os = "Windows";
  } else if (ua.includes("mac os") || ua.includes("macintosh")) {
    os = "macOS";
  } else if (ua.includes("linux")) {
    os = "Linux";
  }

  if (ua.includes("mobile")) {
    device = "Mobile";
  } else if (ua.includes("tablet")) {
    device = "Tablet";
  }

  return { browser, os, device, userAgent };
}

// Best-effort client IP resolution (works behind proxies and direct connections)
export function getClientIp(req) {
  const forwarded = (req.headers && req.headers["x-forwarded-for"]) || "";
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return (req.headers && req.headers["x-real-ip"]) || req.ip || req.socket?.remoteAddress || "unknown";
}