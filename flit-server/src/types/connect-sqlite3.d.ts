// Type definitions for connect-sqlite3

declare module 'connect-sqlite3' {

  import * as express from 'express';
  import * as session from 'express-session';

  function connectSqlite3(connect: (options?: session.SessionOptions) => express.RequestHandler): connectSqlite3.Sqlite3StoreFactory;

  namespace connectSqlite3 {

      export interface DefaultOptions {
          /**
           * Database table name.
           * (Default: 'sessions')
           */
          table?: string;

          /**
           * Database file name.
           * (Defaults to table name)
           */
          db?: string;

          /**
           * Directory to save .db file to
           * (Defaults to current working directory)
           */
          dir?: string;

          /**
           * Enable Write-Ahead Logging mode in SQLite.
           * (Default: false)
           */
          concurrentDB?: boolean;
      }

      export interface Sqlite3StoreFactory {
          new(options: DefaultOptions): Sqlite3Store;
      }

      export class Sqlite3Store extends session.Store {
          get: (sid: string, callback: (err: any, session: Express.SessionData | null) => void) => void;
          set: (sid: string, session: Express.SessionData, callback?: (err: any) => void) => void;
          destroy: (sid: string, callback?: (err: any) => void) => void;
          length: (callback: (err: any, length: number) => void) => void;
          clear: (callback?: (err?: any) => void) => void;
          touch: (sid: string, session: Express.SessionData, callback?: (err: any) => void) => void;
          close: () => void;
      }
  }

  export = connectSqlite3;
}