export async function loadRemoteWidget(message: string): Promise<HTMLElement> {
  const { createRemoteWidget } = await import('remoteApp/Widget');
  return createRemoteWidget(message);
}