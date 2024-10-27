export const normalizeRoute = (path) => {
  // Replace MongoDB IDs (24-char hex strings), UUIDs, or numbers
  return path
    .replace(/[a-fA-F0-9]{24}/g, ":id") // MongoDB ObjectIds
    .replace(/[a-zA-Z0-9_-]{36}/g, ":uuid") // UUIDs (optional, if you use UUIDs)
    .replace(/\d+/g, ":id") // Numbers
    .replace(/[^\/]+/g, (segment) => {
      // General catch-all for other dynamic strings
      if (isPotentialSlugOrString(segment)) {
        return ":slug"; // Replace potential dynamic strings with ":slug" or another placeholder
      }
      return segment; // Keep the segment unchanged if it's not dynamic
    });
};

// Helper function to identify if a segment is likely a slug or dynamic string
const isPotentialSlugOrString = (segment) => {
  // Simple checks for what qualifies as a slug (can be expanded)
  return /^[a-zA-Z0-9_-]+$/.test(segment);
};
