import { nanoid } from 'nanoid';

export type ConsoleContext = {
  pageName: string;
  sessionId: string;
  generatedAt: string;
  chunkStrategy: string;
};

export function createConsoleContext(pageName: string): ConsoleContext {
  return {
    pageName,
    sessionId: nanoid(8),
    generatedAt: new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date()),
    chunkStrategy: 'runtime + vendors + shared + entry + async chunk',
  };
}