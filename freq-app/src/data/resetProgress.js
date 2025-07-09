
// Reset all stored listening progress by removing specific keys from localStorage that track episode completion //
export function resetListeningProgress() {
  const keysToRemove = [];

  // Loops through keys in localStorage //
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.includes("-season") && key.includes("-episode")) {
      keysToRemove.push(key);
    }
  }

  // Remove each identified key from localStorage //
  keysToRemove.forEach((key) => localStorage.removeItem(key));
  // Provides feedback to the user about how many episodes were unmarked //
  return keysToRemove.length;
}
