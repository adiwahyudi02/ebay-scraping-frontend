export const copyJsonToClipboard = async (data: unknown) => {
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonStr);
    return true; // success
  } catch (error) {
    console.error("Failed to copy JSON to clipboard", error);
    return false; // failed
  }
};
