export function detectDeviceType(req) {
  const agent = req.headers["user-agent"]?.toLowerCase() || "";
  if (/mobile/.test(agent)) return "mobile";
  if (/tablet/.test(agent)) return "tablet";
  if (/smart-tv|smarttv|tv|netcast|hbbtv/.test(agent)) return "tv";
  return "laptop";
}
