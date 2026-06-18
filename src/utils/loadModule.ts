export default async function loadBunTest() {
    try {
        return await import('bun:test')
    } catch {
        return null  
  }
}
