
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Deck
 * 
 */
export type Deck = $Result.DefaultSelection<Prisma.$DeckPayload>
/**
 * Model Note
 * 
 */
export type Note = $Result.DefaultSelection<Prisma.$NotePayload>
/**
 * Model Card
 * 
 */
export type Card = $Result.DefaultSelection<Prisma.$CardPayload>
/**
 * Model ReviewLog
 * 
 */
export type ReviewLog = $Result.DefaultSelection<Prisma.$ReviewLogPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.deck`: Exposes CRUD operations for the **Deck** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Decks
    * const decks = await prisma.deck.findMany()
    * ```
    */
  get deck(): Prisma.DeckDelegate<ExtArgs>;

  /**
   * `prisma.note`: Exposes CRUD operations for the **Note** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.note.findMany()
    * ```
    */
  get note(): Prisma.NoteDelegate<ExtArgs>;

  /**
   * `prisma.card`: Exposes CRUD operations for the **Card** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cards
    * const cards = await prisma.card.findMany()
    * ```
    */
  get card(): Prisma.CardDelegate<ExtArgs>;

  /**
   * `prisma.reviewLog`: Exposes CRUD operations for the **ReviewLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReviewLogs
    * const reviewLogs = await prisma.reviewLog.findMany()
    * ```
    */
  get reviewLog(): Prisma.ReviewLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.21.0
   * Query Engine version: 08713a93b99d58f31485621c634b04983ae01d95
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Deck: 'Deck',
    Note: 'Note',
    Card: 'Card',
    ReviewLog: 'ReviewLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "deck" | "note" | "card" | "reviewLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Deck: {
        payload: Prisma.$DeckPayload<ExtArgs>
        fields: Prisma.DeckFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeckFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeckFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          findFirst: {
            args: Prisma.DeckFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeckFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          findMany: {
            args: Prisma.DeckFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>[]
          }
          create: {
            args: Prisma.DeckCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          createMany: {
            args: Prisma.DeckCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeckCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>[]
          }
          delete: {
            args: Prisma.DeckDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          update: {
            args: Prisma.DeckUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          deleteMany: {
            args: Prisma.DeckDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeckUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DeckUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeckPayload>
          }
          aggregate: {
            args: Prisma.DeckAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeck>
          }
          groupBy: {
            args: Prisma.DeckGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeckGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeckCountArgs<ExtArgs>
            result: $Utils.Optional<DeckCountAggregateOutputType> | number
          }
        }
      }
      Note: {
        payload: Prisma.$NotePayload<ExtArgs>
        fields: Prisma.NoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findFirst: {
            args: Prisma.NoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          findMany: {
            args: Prisma.NoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          create: {
            args: Prisma.NoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          createMany: {
            args: Prisma.NoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>[]
          }
          delete: {
            args: Prisma.NoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          update: {
            args: Prisma.NoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          deleteMany: {
            args: Prisma.NoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotePayload>
          }
          aggregate: {
            args: Prisma.NoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote>
          }
          groupBy: {
            args: Prisma.NoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteCountArgs<ExtArgs>
            result: $Utils.Optional<NoteCountAggregateOutputType> | number
          }
        }
      }
      Card: {
        payload: Prisma.$CardPayload<ExtArgs>
        fields: Prisma.CardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findFirst: {
            args: Prisma.CardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          findMany: {
            args: Prisma.CardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          create: {
            args: Prisma.CardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          createMany: {
            args: Prisma.CardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>[]
          }
          delete: {
            args: Prisma.CardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          update: {
            args: Prisma.CardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          deleteMany: {
            args: Prisma.CardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardPayload>
          }
          aggregate: {
            args: Prisma.CardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCard>
          }
          groupBy: {
            args: Prisma.CardGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardGroupByOutputType>[]
          }
          count: {
            args: Prisma.CardCountArgs<ExtArgs>
            result: $Utils.Optional<CardCountAggregateOutputType> | number
          }
        }
      }
      ReviewLog: {
        payload: Prisma.$ReviewLogPayload<ExtArgs>
        fields: Prisma.ReviewLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          findFirst: {
            args: Prisma.ReviewLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          findMany: {
            args: Prisma.ReviewLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>[]
          }
          create: {
            args: Prisma.ReviewLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          createMany: {
            args: Prisma.ReviewLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>[]
          }
          delete: {
            args: Prisma.ReviewLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          update: {
            args: Prisma.ReviewLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          deleteMany: {
            args: Prisma.ReviewLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewLogPayload>
          }
          aggregate: {
            args: Prisma.ReviewLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReviewLog>
          }
          groupBy: {
            args: Prisma.ReviewLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewLogCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    decks: number
    notes: number
    cards: number
    reviewLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    decks?: boolean | UserCountOutputTypeCountDecksArgs
    notes?: boolean | UserCountOutputTypeCountNotesArgs
    cards?: boolean | UserCountOutputTypeCountCardsArgs
    reviewLogs?: boolean | UserCountOutputTypeCountReviewLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDecksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeckWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewLogWhereInput
  }


  /**
   * Count Type DeckCountOutputType
   */

  export type DeckCountOutputType = {
    children: number
    notes: number
    cards: number
  }

  export type DeckCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | DeckCountOutputTypeCountChildrenArgs
    notes?: boolean | DeckCountOutputTypeCountNotesArgs
    cards?: boolean | DeckCountOutputTypeCountCardsArgs
  }

  // Custom InputTypes
  /**
   * DeckCountOutputType without action
   */
  export type DeckCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeckCountOutputType
     */
    select?: DeckCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeckCountOutputType without action
   */
  export type DeckCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeckWhereInput
  }

  /**
   * DeckCountOutputType without action
   */
  export type DeckCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
  }

  /**
   * DeckCountOutputType without action
   */
  export type DeckCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
  }


  /**
   * Count Type NoteCountOutputType
   */

  export type NoteCountOutputType = {
    cards: number
  }

  export type NoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cards?: boolean | NoteCountOutputTypeCountCardsArgs
  }

  // Custom InputTypes
  /**
   * NoteCountOutputType without action
   */
  export type NoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteCountOutputType
     */
    select?: NoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NoteCountOutputType without action
   */
  export type NoteCountOutputTypeCountCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
  }


  /**
   * Count Type CardCountOutputType
   */

  export type CardCountOutputType = {
    logs: number
  }

  export type CardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | CardCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardCountOutputType
     */
    select?: CardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CardCountOutputType without action
   */
  export type CardCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    username: string | null
    preferredLanguage: string | null
    colorScheme: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    username: string | null
    preferredLanguage: string | null
    colorScheme: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    username: number
    preferredLanguage: number
    colorScheme: number
    createdAt: number
    updatedAt: number
    isActive: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    username?: true
    preferredLanguage?: true
    colorScheme?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    username?: true
    preferredLanguage?: true
    colorScheme?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    username?: true
    preferredLanguage?: true
    colorScheme?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    username: string | null
    preferredLanguage: string
    colorScheme: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    username?: boolean
    preferredLanguage?: boolean
    colorScheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    decks?: boolean | User$decksArgs<ExtArgs>
    notes?: boolean | User$notesArgs<ExtArgs>
    cards?: boolean | User$cardsArgs<ExtArgs>
    reviewLogs?: boolean | User$reviewLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    username?: boolean
    preferredLanguage?: boolean
    colorScheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    username?: boolean
    preferredLanguage?: boolean
    colorScheme?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    decks?: boolean | User$decksArgs<ExtArgs>
    notes?: boolean | User$notesArgs<ExtArgs>
    cards?: boolean | User$cardsArgs<ExtArgs>
    reviewLogs?: boolean | User$reviewLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      decks: Prisma.$DeckPayload<ExtArgs>[]
      notes: Prisma.$NotePayload<ExtArgs>[]
      cards: Prisma.$CardPayload<ExtArgs>[]
      reviewLogs: Prisma.$ReviewLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      username: string | null
      preferredLanguage: string
      colorScheme: string
      createdAt: Date
      updatedAt: Date
      isActive: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    decks<T extends User$decksArgs<ExtArgs> = {}>(args?: Subset<T, User$decksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findMany"> | Null>
    notes<T extends User$notesArgs<ExtArgs> = {}>(args?: Subset<T, User$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany"> | Null>
    cards<T extends User$cardsArgs<ExtArgs> = {}>(args?: Subset<T, User$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany"> | Null>
    reviewLogs<T extends User$reviewLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly preferredLanguage: FieldRef<"User", 'String'>
    readonly colorScheme: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.decks
   */
  export type User$decksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    where?: DeckWhereInput
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    cursor?: DeckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * User.notes
   */
  export type User$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * User.cards
   */
  export type User$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    where?: CardWhereInput
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    cursor?: CardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * User.reviewLogs
   */
  export type User$reviewLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    where?: ReviewLogWhereInput
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    cursor?: ReviewLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Deck
   */

  export type AggregateDeck = {
    _count: DeckCountAggregateOutputType | null
    _avg: DeckAvgAggregateOutputType | null
    _sum: DeckSumAggregateOutputType | null
    _min: DeckMinAggregateOutputType | null
    _max: DeckMaxAggregateOutputType | null
  }

  export type DeckAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type DeckSumAggregateOutputType = {
    orderIndex: number | null
  }

  export type DeckMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    parentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isFavorite: boolean | null
    orderIndex: number | null
  }

  export type DeckMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    parentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isFavorite: boolean | null
    orderIndex: number | null
  }

  export type DeckCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    parentId: number
    createdAt: number
    updatedAt: number
    isFavorite: number
    orderIndex: number
    _all: number
  }


  export type DeckAvgAggregateInputType = {
    orderIndex?: true
  }

  export type DeckSumAggregateInputType = {
    orderIndex?: true
  }

  export type DeckMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    isFavorite?: true
    orderIndex?: true
  }

  export type DeckMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    isFavorite?: true
    orderIndex?: true
  }

  export type DeckCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    isFavorite?: true
    orderIndex?: true
    _all?: true
  }

  export type DeckAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deck to aggregate.
     */
    where?: DeckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decks to fetch.
     */
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Decks
    **/
    _count?: true | DeckCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeckAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeckSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeckMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeckMaxAggregateInputType
  }

  export type GetDeckAggregateType<T extends DeckAggregateArgs> = {
        [P in keyof T & keyof AggregateDeck]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeck[P]>
      : GetScalarType<T[P], AggregateDeck[P]>
  }




  export type DeckGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeckWhereInput
    orderBy?: DeckOrderByWithAggregationInput | DeckOrderByWithAggregationInput[]
    by: DeckScalarFieldEnum[] | DeckScalarFieldEnum
    having?: DeckScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeckCountAggregateInputType | true
    _avg?: DeckAvgAggregateInputType
    _sum?: DeckSumAggregateInputType
    _min?: DeckMinAggregateInputType
    _max?: DeckMaxAggregateInputType
  }

  export type DeckGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    parentId: string | null
    createdAt: Date
    updatedAt: Date
    isFavorite: boolean
    orderIndex: number
    _count: DeckCountAggregateOutputType | null
    _avg: DeckAvgAggregateOutputType | null
    _sum: DeckSumAggregateOutputType | null
    _min: DeckMinAggregateOutputType | null
    _max: DeckMaxAggregateOutputType | null
  }

  type GetDeckGroupByPayload<T extends DeckGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeckGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeckGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeckGroupByOutputType[P]>
            : GetScalarType<T[P], DeckGroupByOutputType[P]>
        }
      >
    >


  export type DeckSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isFavorite?: boolean
    orderIndex?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Deck$parentArgs<ExtArgs>
    children?: boolean | Deck$childrenArgs<ExtArgs>
    notes?: boolean | Deck$notesArgs<ExtArgs>
    cards?: boolean | Deck$cardsArgs<ExtArgs>
    _count?: boolean | DeckCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deck"]>

  export type DeckSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isFavorite?: boolean
    orderIndex?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Deck$parentArgs<ExtArgs>
  }, ExtArgs["result"]["deck"]>

  export type DeckSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isFavorite?: boolean
    orderIndex?: boolean
  }

  export type DeckInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Deck$parentArgs<ExtArgs>
    children?: boolean | Deck$childrenArgs<ExtArgs>
    notes?: boolean | Deck$notesArgs<ExtArgs>
    cards?: boolean | Deck$cardsArgs<ExtArgs>
    _count?: boolean | DeckCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeckIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Deck$parentArgs<ExtArgs>
  }

  export type $DeckPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deck"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      parent: Prisma.$DeckPayload<ExtArgs> | null
      children: Prisma.$DeckPayload<ExtArgs>[]
      notes: Prisma.$NotePayload<ExtArgs>[]
      cards: Prisma.$CardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      parentId: string | null
      createdAt: Date
      updatedAt: Date
      isFavorite: boolean
      orderIndex: number
    }, ExtArgs["result"]["deck"]>
    composites: {}
  }

  type DeckGetPayload<S extends boolean | null | undefined | DeckDefaultArgs> = $Result.GetResult<Prisma.$DeckPayload, S>

  type DeckCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DeckFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DeckCountAggregateInputType | true
    }

  export interface DeckDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deck'], meta: { name: 'Deck' } }
    /**
     * Find zero or one Deck that matches the filter.
     * @param {DeckFindUniqueArgs} args - Arguments to find a Deck
     * @example
     * // Get one Deck
     * const deck = await prisma.deck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeckFindUniqueArgs>(args: SelectSubset<T, DeckFindUniqueArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Deck that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DeckFindUniqueOrThrowArgs} args - Arguments to find a Deck
     * @example
     * // Get one Deck
     * const deck = await prisma.deck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeckFindUniqueOrThrowArgs>(args: SelectSubset<T, DeckFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Deck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckFindFirstArgs} args - Arguments to find a Deck
     * @example
     * // Get one Deck
     * const deck = await prisma.deck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeckFindFirstArgs>(args?: SelectSubset<T, DeckFindFirstArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Deck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckFindFirstOrThrowArgs} args - Arguments to find a Deck
     * @example
     * // Get one Deck
     * const deck = await prisma.deck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeckFindFirstOrThrowArgs>(args?: SelectSubset<T, DeckFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Decks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Decks
     * const decks = await prisma.deck.findMany()
     * 
     * // Get first 10 Decks
     * const decks = await prisma.deck.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deckWithIdOnly = await prisma.deck.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeckFindManyArgs>(args?: SelectSubset<T, DeckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Deck.
     * @param {DeckCreateArgs} args - Arguments to create a Deck.
     * @example
     * // Create one Deck
     * const Deck = await prisma.deck.create({
     *   data: {
     *     // ... data to create a Deck
     *   }
     * })
     * 
     */
    create<T extends DeckCreateArgs>(args: SelectSubset<T, DeckCreateArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Decks.
     * @param {DeckCreateManyArgs} args - Arguments to create many Decks.
     * @example
     * // Create many Decks
     * const deck = await prisma.deck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeckCreateManyArgs>(args?: SelectSubset<T, DeckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Decks and returns the data saved in the database.
     * @param {DeckCreateManyAndReturnArgs} args - Arguments to create many Decks.
     * @example
     * // Create many Decks
     * const deck = await prisma.deck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Decks and only return the `id`
     * const deckWithIdOnly = await prisma.deck.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeckCreateManyAndReturnArgs>(args?: SelectSubset<T, DeckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Deck.
     * @param {DeckDeleteArgs} args - Arguments to delete one Deck.
     * @example
     * // Delete one Deck
     * const Deck = await prisma.deck.delete({
     *   where: {
     *     // ... filter to delete one Deck
     *   }
     * })
     * 
     */
    delete<T extends DeckDeleteArgs>(args: SelectSubset<T, DeckDeleteArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Deck.
     * @param {DeckUpdateArgs} args - Arguments to update one Deck.
     * @example
     * // Update one Deck
     * const deck = await prisma.deck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeckUpdateArgs>(args: SelectSubset<T, DeckUpdateArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Decks.
     * @param {DeckDeleteManyArgs} args - Arguments to filter Decks to delete.
     * @example
     * // Delete a few Decks
     * const { count } = await prisma.deck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeckDeleteManyArgs>(args?: SelectSubset<T, DeckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Decks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Decks
     * const deck = await prisma.deck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeckUpdateManyArgs>(args: SelectSubset<T, DeckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Deck.
     * @param {DeckUpsertArgs} args - Arguments to update or create a Deck.
     * @example
     * // Update or create a Deck
     * const deck = await prisma.deck.upsert({
     *   create: {
     *     // ... data to create a Deck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deck we want to update
     *   }
     * })
     */
    upsert<T extends DeckUpsertArgs>(args: SelectSubset<T, DeckUpsertArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Decks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckCountArgs} args - Arguments to filter Decks to count.
     * @example
     * // Count the number of Decks
     * const count = await prisma.deck.count({
     *   where: {
     *     // ... the filter for the Decks we want to count
     *   }
     * })
    **/
    count<T extends DeckCountArgs>(
      args?: Subset<T, DeckCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeckCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DeckAggregateArgs>(args: Subset<T, DeckAggregateArgs>): Prisma.PrismaPromise<GetDeckAggregateType<T>>

    /**
     * Group by Deck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DeckGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeckGroupByArgs['orderBy'] }
        : { orderBy?: DeckGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DeckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deck model
   */
  readonly fields: DeckFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deck.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeckClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    parent<T extends Deck$parentArgs<ExtArgs> = {}>(args?: Subset<T, Deck$parentArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    children<T extends Deck$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Deck$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findMany"> | Null>
    notes<T extends Deck$notesArgs<ExtArgs> = {}>(args?: Subset<T, Deck$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany"> | Null>
    cards<T extends Deck$cardsArgs<ExtArgs> = {}>(args?: Subset<T, Deck$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Deck model
   */ 
  interface DeckFieldRefs {
    readonly id: FieldRef<"Deck", 'String'>
    readonly userId: FieldRef<"Deck", 'String'>
    readonly name: FieldRef<"Deck", 'String'>
    readonly description: FieldRef<"Deck", 'String'>
    readonly parentId: FieldRef<"Deck", 'String'>
    readonly createdAt: FieldRef<"Deck", 'DateTime'>
    readonly updatedAt: FieldRef<"Deck", 'DateTime'>
    readonly isFavorite: FieldRef<"Deck", 'Boolean'>
    readonly orderIndex: FieldRef<"Deck", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Deck findUnique
   */
  export type DeckFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Deck to fetch.
     */
    where: DeckWhereUniqueInput
  }

  /**
   * Deck findUniqueOrThrow
   */
  export type DeckFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Deck to fetch.
     */
    where: DeckWhereUniqueInput
  }

  /**
   * Deck findFirst
   */
  export type DeckFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Deck to fetch.
     */
    where?: DeckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decks to fetch.
     */
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Decks.
     */
    cursor?: DeckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Decks.
     */
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * Deck findFirstOrThrow
   */
  export type DeckFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Deck to fetch.
     */
    where?: DeckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decks to fetch.
     */
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Decks.
     */
    cursor?: DeckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Decks.
     */
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * Deck findMany
   */
  export type DeckFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter, which Decks to fetch.
     */
    where?: DeckWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Decks to fetch.
     */
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Decks.
     */
    cursor?: DeckWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Decks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Decks.
     */
    skip?: number
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * Deck create
   */
  export type DeckCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * The data needed to create a Deck.
     */
    data: XOR<DeckCreateInput, DeckUncheckedCreateInput>
  }

  /**
   * Deck createMany
   */
  export type DeckCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Decks.
     */
    data: DeckCreateManyInput | DeckCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Deck createManyAndReturn
   */
  export type DeckCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Decks.
     */
    data: DeckCreateManyInput | DeckCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deck update
   */
  export type DeckUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * The data needed to update a Deck.
     */
    data: XOR<DeckUpdateInput, DeckUncheckedUpdateInput>
    /**
     * Choose, which Deck to update.
     */
    where: DeckWhereUniqueInput
  }

  /**
   * Deck updateMany
   */
  export type DeckUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Decks.
     */
    data: XOR<DeckUpdateManyMutationInput, DeckUncheckedUpdateManyInput>
    /**
     * Filter which Decks to update
     */
    where?: DeckWhereInput
  }

  /**
   * Deck upsert
   */
  export type DeckUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * The filter to search for the Deck to update in case it exists.
     */
    where: DeckWhereUniqueInput
    /**
     * In case the Deck found by the `where` argument doesn't exist, create a new Deck with this data.
     */
    create: XOR<DeckCreateInput, DeckUncheckedCreateInput>
    /**
     * In case the Deck was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeckUpdateInput, DeckUncheckedUpdateInput>
  }

  /**
   * Deck delete
   */
  export type DeckDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    /**
     * Filter which Deck to delete.
     */
    where: DeckWhereUniqueInput
  }

  /**
   * Deck deleteMany
   */
  export type DeckDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Decks to delete
     */
    where?: DeckWhereInput
  }

  /**
   * Deck.parent
   */
  export type Deck$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    where?: DeckWhereInput
  }

  /**
   * Deck.children
   */
  export type Deck$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
    where?: DeckWhereInput
    orderBy?: DeckOrderByWithRelationInput | DeckOrderByWithRelationInput[]
    cursor?: DeckWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeckScalarFieldEnum | DeckScalarFieldEnum[]
  }

  /**
   * Deck.notes
   */
  export type Deck$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    cursor?: NoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Deck.cards
   */
  export type Deck$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    where?: CardWhereInput
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    cursor?: CardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Deck without action
   */
  export type DeckDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deck
     */
    select?: DeckSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeckInclude<ExtArgs> | null
  }


  /**
   * Model Note
   */

  export type AggregateNote = {
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  export type NoteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    deckId: string | null
    noteType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    deckId: string | null
    noteType: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoteCountAggregateOutputType = {
    id: number
    userId: number
    deckId: number
    content: number
    tags: number
    noteType: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NoteMinAggregateInputType = {
    id?: true
    userId?: true
    deckId?: true
    noteType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoteMaxAggregateInputType = {
    id?: true
    userId?: true
    deckId?: true
    noteType?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoteCountAggregateInputType = {
    id?: true
    userId?: true
    deckId?: true
    content?: true
    tags?: true
    noteType?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Note to aggregate.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notes
    **/
    _count?: true | NoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteMaxAggregateInputType
  }

  export type GetNoteAggregateType<T extends NoteAggregateArgs> = {
        [P in keyof T & keyof AggregateNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote[P]>
      : GetScalarType<T[P], AggregateNote[P]>
  }




  export type NoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteWhereInput
    orderBy?: NoteOrderByWithAggregationInput | NoteOrderByWithAggregationInput[]
    by: NoteScalarFieldEnum[] | NoteScalarFieldEnum
    having?: NoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteCountAggregateInputType | true
    _min?: NoteMinAggregateInputType
    _max?: NoteMaxAggregateInputType
  }

  export type NoteGroupByOutputType = {
    id: string
    userId: string
    deckId: string
    content: JsonValue
    tags: string[]
    noteType: string
    createdAt: Date
    updatedAt: Date
    _count: NoteCountAggregateOutputType | null
    _min: NoteMinAggregateOutputType | null
    _max: NoteMaxAggregateOutputType | null
  }

  type GetNoteGroupByPayload<T extends NoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteGroupByOutputType[P]>
            : GetScalarType<T[P], NoteGroupByOutputType[P]>
        }
      >
    >


  export type NoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    deckId?: boolean
    content?: boolean
    tags?: boolean
    noteType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    deck?: boolean | DeckDefaultArgs<ExtArgs>
    cards?: boolean | Note$cardsArgs<ExtArgs>
    _count?: boolean | NoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    deckId?: boolean
    content?: boolean
    tags?: boolean
    noteType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note"]>

  export type NoteSelectScalar = {
    id?: boolean
    userId?: boolean
    deckId?: boolean
    content?: boolean
    tags?: boolean
    noteType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    deck?: boolean | DeckDefaultArgs<ExtArgs>
    cards?: boolean | Note$cardsArgs<ExtArgs>
    _count?: boolean | NoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }

  export type $NotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Note"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      deck: Prisma.$DeckPayload<ExtArgs>
      cards: Prisma.$CardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      deckId: string
      content: Prisma.JsonValue
      tags: string[]
      noteType: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["note"]>
    composites: {}
  }

  type NoteGetPayload<S extends boolean | null | undefined | NoteDefaultArgs> = $Result.GetResult<Prisma.$NotePayload, S>

  type NoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NoteCountAggregateInputType | true
    }

  export interface NoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Note'], meta: { name: 'Note' } }
    /**
     * Find zero or one Note that matches the filter.
     * @param {NoteFindUniqueArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteFindUniqueArgs>(args: SelectSubset<T, NoteFindUniqueArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Note that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NoteFindUniqueOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Note that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteFindFirstArgs>(args?: SelectSubset<T, NoteFindFirstArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Note that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindFirstOrThrowArgs} args - Arguments to find a Note
     * @example
     * // Get one Note
     * const note = await prisma.note.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.note.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.note.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteWithIdOnly = await prisma.note.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteFindManyArgs>(args?: SelectSubset<T, NoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Note.
     * @param {NoteCreateArgs} args - Arguments to create a Note.
     * @example
     * // Create one Note
     * const Note = await prisma.note.create({
     *   data: {
     *     // ... data to create a Note
     *   }
     * })
     * 
     */
    create<T extends NoteCreateArgs>(args: SelectSubset<T, NoteCreateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notes.
     * @param {NoteCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteCreateManyArgs>(args?: SelectSubset<T, NoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notes and returns the data saved in the database.
     * @param {NoteCreateManyAndReturnArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const note = await prisma.note.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notes and only return the `id`
     * const noteWithIdOnly = await prisma.note.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Note.
     * @param {NoteDeleteArgs} args - Arguments to delete one Note.
     * @example
     * // Delete one Note
     * const Note = await prisma.note.delete({
     *   where: {
     *     // ... filter to delete one Note
     *   }
     * })
     * 
     */
    delete<T extends NoteDeleteArgs>(args: SelectSubset<T, NoteDeleteArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Note.
     * @param {NoteUpdateArgs} args - Arguments to update one Note.
     * @example
     * // Update one Note
     * const note = await prisma.note.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteUpdateArgs>(args: SelectSubset<T, NoteUpdateArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notes.
     * @param {NoteDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.note.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteDeleteManyArgs>(args?: SelectSubset<T, NoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const note = await prisma.note.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteUpdateManyArgs>(args: SelectSubset<T, NoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Note.
     * @param {NoteUpsertArgs} args - Arguments to update or create a Note.
     * @example
     * // Update or create a Note
     * const note = await prisma.note.upsert({
     *   create: {
     *     // ... data to create a Note
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note we want to update
     *   }
     * })
     */
    upsert<T extends NoteUpsertArgs>(args: SelectSubset<T, NoteUpsertArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.note.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends NoteCountArgs>(
      args?: Subset<T, NoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoteAggregateArgs>(args: Subset<T, NoteAggregateArgs>): Prisma.PrismaPromise<GetNoteAggregateType<T>>

    /**
     * Group by Note.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteGroupByArgs['orderBy'] }
        : { orderBy?: NoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Note model
   */
  readonly fields: NoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Note.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    deck<T extends DeckDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeckDefaultArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    cards<T extends Note$cardsArgs<ExtArgs> = {}>(args?: Subset<T, Note$cardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Note model
   */ 
  interface NoteFieldRefs {
    readonly id: FieldRef<"Note", 'String'>
    readonly userId: FieldRef<"Note", 'String'>
    readonly deckId: FieldRef<"Note", 'String'>
    readonly content: FieldRef<"Note", 'Json'>
    readonly tags: FieldRef<"Note", 'String[]'>
    readonly noteType: FieldRef<"Note", 'String'>
    readonly createdAt: FieldRef<"Note", 'DateTime'>
    readonly updatedAt: FieldRef<"Note", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Note findUnique
   */
  export type NoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findUniqueOrThrow
   */
  export type NoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note findFirst
   */
  export type NoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findFirstOrThrow
   */
  export type NoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Note to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notes.
     */
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note findMany
   */
  export type NoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter, which Notes to fetch.
     */
    where?: NoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notes to fetch.
     */
    orderBy?: NoteOrderByWithRelationInput | NoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notes.
     */
    cursor?: NoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notes.
     */
    skip?: number
    distinct?: NoteScalarFieldEnum | NoteScalarFieldEnum[]
  }

  /**
   * Note create
   */
  export type NoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Note.
     */
    data: XOR<NoteCreateInput, NoteUncheckedCreateInput>
  }

  /**
   * Note createMany
   */
  export type NoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Note createManyAndReturn
   */
  export type NoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notes.
     */
    data: NoteCreateManyInput | NoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Note update
   */
  export type NoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Note.
     */
    data: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
    /**
     * Choose, which Note to update.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note updateMany
   */
  export type NoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notes.
     */
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyInput>
    /**
     * Filter which Notes to update
     */
    where?: NoteWhereInput
  }

  /**
   * Note upsert
   */
  export type NoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Note to update in case it exists.
     */
    where: NoteWhereUniqueInput
    /**
     * In case the Note found by the `where` argument doesn't exist, create a new Note with this data.
     */
    create: XOR<NoteCreateInput, NoteUncheckedCreateInput>
    /**
     * In case the Note was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteUpdateInput, NoteUncheckedUpdateInput>
  }

  /**
   * Note delete
   */
  export type NoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
    /**
     * Filter which Note to delete.
     */
    where: NoteWhereUniqueInput
  }

  /**
   * Note deleteMany
   */
  export type NoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notes to delete
     */
    where?: NoteWhereInput
  }

  /**
   * Note.cards
   */
  export type Note$cardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    where?: CardWhereInput
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    cursor?: CardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Note without action
   */
  export type NoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Note
     */
    select?: NoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteInclude<ExtArgs> | null
  }


  /**
   * Model Card
   */

  export type AggregateCard = {
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  export type CardAvgAggregateOutputType = {
    ord: number | null
    stability: number | null
    difficulty: number | null
    elapsedDays: number | null
    scheduledDays: number | null
    reps: number | null
    lapses: number | null
    state: number | null
  }

  export type CardSumAggregateOutputType = {
    ord: number | null
    stability: number | null
    difficulty: number | null
    elapsedDays: number | null
    scheduledDays: number | null
    reps: number | null
    lapses: number | null
    state: number | null
  }

  export type CardMinAggregateOutputType = {
    id: string | null
    noteId: string | null
    userId: string | null
    deckId: string | null
    ord: number | null
    front: string | null
    back: string | null
    due: Date | null
    stability: number | null
    difficulty: number | null
    elapsedDays: number | null
    scheduledDays: number | null
    reps: number | null
    lapses: number | null
    state: number | null
    lastReview: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CardMaxAggregateOutputType = {
    id: string | null
    noteId: string | null
    userId: string | null
    deckId: string | null
    ord: number | null
    front: string | null
    back: string | null
    due: Date | null
    stability: number | null
    difficulty: number | null
    elapsedDays: number | null
    scheduledDays: number | null
    reps: number | null
    lapses: number | null
    state: number | null
    lastReview: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CardCountAggregateOutputType = {
    id: number
    noteId: number
    userId: number
    deckId: number
    ord: number
    front: number
    back: number
    due: number
    stability: number
    difficulty: number
    elapsedDays: number
    scheduledDays: number
    reps: number
    lapses: number
    state: number
    lastReview: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CardAvgAggregateInputType = {
    ord?: true
    stability?: true
    difficulty?: true
    elapsedDays?: true
    scheduledDays?: true
    reps?: true
    lapses?: true
    state?: true
  }

  export type CardSumAggregateInputType = {
    ord?: true
    stability?: true
    difficulty?: true
    elapsedDays?: true
    scheduledDays?: true
    reps?: true
    lapses?: true
    state?: true
  }

  export type CardMinAggregateInputType = {
    id?: true
    noteId?: true
    userId?: true
    deckId?: true
    ord?: true
    front?: true
    back?: true
    due?: true
    stability?: true
    difficulty?: true
    elapsedDays?: true
    scheduledDays?: true
    reps?: true
    lapses?: true
    state?: true
    lastReview?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CardMaxAggregateInputType = {
    id?: true
    noteId?: true
    userId?: true
    deckId?: true
    ord?: true
    front?: true
    back?: true
    due?: true
    stability?: true
    difficulty?: true
    elapsedDays?: true
    scheduledDays?: true
    reps?: true
    lapses?: true
    state?: true
    lastReview?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CardCountAggregateInputType = {
    id?: true
    noteId?: true
    userId?: true
    deckId?: true
    ord?: true
    front?: true
    back?: true
    due?: true
    stability?: true
    difficulty?: true
    elapsedDays?: true
    scheduledDays?: true
    reps?: true
    lapses?: true
    state?: true
    lastReview?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Card to aggregate.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cards
    **/
    _count?: true | CardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardMaxAggregateInputType
  }

  export type GetCardAggregateType<T extends CardAggregateArgs> = {
        [P in keyof T & keyof AggregateCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCard[P]>
      : GetScalarType<T[P], AggregateCard[P]>
  }




  export type CardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardWhereInput
    orderBy?: CardOrderByWithAggregationInput | CardOrderByWithAggregationInput[]
    by: CardScalarFieldEnum[] | CardScalarFieldEnum
    having?: CardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardCountAggregateInputType | true
    _avg?: CardAvgAggregateInputType
    _sum?: CardSumAggregateInputType
    _min?: CardMinAggregateInputType
    _max?: CardMaxAggregateInputType
  }

  export type CardGroupByOutputType = {
    id: string
    noteId: string
    userId: string
    deckId: string
    ord: number
    front: string
    back: string
    due: Date
    stability: number
    difficulty: number
    elapsedDays: number
    scheduledDays: number
    reps: number
    lapses: number
    state: number
    lastReview: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CardCountAggregateOutputType | null
    _avg: CardAvgAggregateOutputType | null
    _sum: CardSumAggregateOutputType | null
    _min: CardMinAggregateOutputType | null
    _max: CardMaxAggregateOutputType | null
  }

  type GetCardGroupByPayload<T extends CardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardGroupByOutputType[P]>
            : GetScalarType<T[P], CardGroupByOutputType[P]>
        }
      >
    >


  export type CardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    noteId?: boolean
    userId?: boolean
    deckId?: boolean
    ord?: boolean
    front?: boolean
    back?: boolean
    due?: boolean
    stability?: boolean
    difficulty?: boolean
    elapsedDays?: boolean
    scheduledDays?: boolean
    reps?: boolean
    lapses?: boolean
    state?: boolean
    lastReview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    deck?: boolean | DeckDefaultArgs<ExtArgs>
    logs?: boolean | Card$logsArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type CardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    noteId?: boolean
    userId?: boolean
    deckId?: boolean
    ord?: boolean
    front?: boolean
    back?: boolean
    due?: boolean
    stability?: boolean
    difficulty?: boolean
    elapsedDays?: boolean
    scheduledDays?: boolean
    reps?: boolean
    lapses?: boolean
    state?: boolean
    lastReview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["card"]>

  export type CardSelectScalar = {
    id?: boolean
    noteId?: boolean
    userId?: boolean
    deckId?: boolean
    ord?: boolean
    front?: boolean
    back?: boolean
    due?: boolean
    stability?: boolean
    difficulty?: boolean
    elapsedDays?: boolean
    scheduledDays?: boolean
    reps?: boolean
    lapses?: boolean
    state?: boolean
    lastReview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    deck?: boolean | DeckDefaultArgs<ExtArgs>
    logs?: boolean | Card$logsArgs<ExtArgs>
    _count?: boolean | CardCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note?: boolean | NoteDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    deck?: boolean | DeckDefaultArgs<ExtArgs>
  }

  export type $CardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Card"
    objects: {
      note: Prisma.$NotePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      deck: Prisma.$DeckPayload<ExtArgs>
      logs: Prisma.$ReviewLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      noteId: string
      userId: string
      deckId: string
      ord: number
      front: string
      back: string
      due: Date
      stability: number
      difficulty: number
      elapsedDays: number
      scheduledDays: number
      reps: number
      lapses: number
      state: number
      lastReview: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["card"]>
    composites: {}
  }

  type CardGetPayload<S extends boolean | null | undefined | CardDefaultArgs> = $Result.GetResult<Prisma.$CardPayload, S>

  type CardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CardFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CardCountAggregateInputType | true
    }

  export interface CardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Card'], meta: { name: 'Card' } }
    /**
     * Find zero or one Card that matches the filter.
     * @param {CardFindUniqueArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CardFindUniqueArgs>(args: SelectSubset<T, CardFindUniqueArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Card that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CardFindUniqueOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CardFindUniqueOrThrowArgs>(args: SelectSubset<T, CardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Card that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CardFindFirstArgs>(args?: SelectSubset<T, CardFindFirstArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Card that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindFirstOrThrowArgs} args - Arguments to find a Card
     * @example
     * // Get one Card
     * const card = await prisma.card.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CardFindFirstOrThrowArgs>(args?: SelectSubset<T, CardFindFirstOrThrowArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Cards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cards
     * const cards = await prisma.card.findMany()
     * 
     * // Get first 10 Cards
     * const cards = await prisma.card.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cardWithIdOnly = await prisma.card.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CardFindManyArgs>(args?: SelectSubset<T, CardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Card.
     * @param {CardCreateArgs} args - Arguments to create a Card.
     * @example
     * // Create one Card
     * const Card = await prisma.card.create({
     *   data: {
     *     // ... data to create a Card
     *   }
     * })
     * 
     */
    create<T extends CardCreateArgs>(args: SelectSubset<T, CardCreateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Cards.
     * @param {CardCreateManyArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CardCreateManyArgs>(args?: SelectSubset<T, CardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cards and returns the data saved in the database.
     * @param {CardCreateManyAndReturnArgs} args - Arguments to create many Cards.
     * @example
     * // Create many Cards
     * const card = await prisma.card.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cards and only return the `id`
     * const cardWithIdOnly = await prisma.card.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CardCreateManyAndReturnArgs>(args?: SelectSubset<T, CardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Card.
     * @param {CardDeleteArgs} args - Arguments to delete one Card.
     * @example
     * // Delete one Card
     * const Card = await prisma.card.delete({
     *   where: {
     *     // ... filter to delete one Card
     *   }
     * })
     * 
     */
    delete<T extends CardDeleteArgs>(args: SelectSubset<T, CardDeleteArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Card.
     * @param {CardUpdateArgs} args - Arguments to update one Card.
     * @example
     * // Update one Card
     * const card = await prisma.card.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CardUpdateArgs>(args: SelectSubset<T, CardUpdateArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Cards.
     * @param {CardDeleteManyArgs} args - Arguments to filter Cards to delete.
     * @example
     * // Delete a few Cards
     * const { count } = await prisma.card.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CardDeleteManyArgs>(args?: SelectSubset<T, CardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cards
     * const card = await prisma.card.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CardUpdateManyArgs>(args: SelectSubset<T, CardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Card.
     * @param {CardUpsertArgs} args - Arguments to update or create a Card.
     * @example
     * // Update or create a Card
     * const card = await prisma.card.upsert({
     *   create: {
     *     // ... data to create a Card
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Card we want to update
     *   }
     * })
     */
    upsert<T extends CardUpsertArgs>(args: SelectSubset<T, CardUpsertArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Cards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardCountArgs} args - Arguments to filter Cards to count.
     * @example
     * // Count the number of Cards
     * const count = await prisma.card.count({
     *   where: {
     *     // ... the filter for the Cards we want to count
     *   }
     * })
    **/
    count<T extends CardCountArgs>(
      args?: Subset<T, CardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CardAggregateArgs>(args: Subset<T, CardAggregateArgs>): Prisma.PrismaPromise<GetCardAggregateType<T>>

    /**
     * Group by Card.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CardGroupByArgs['orderBy'] }
        : { orderBy?: CardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Card model
   */
  readonly fields: CardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Card.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    note<T extends NoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NoteDefaultArgs<ExtArgs>>): Prisma__NoteClient<$Result.GetResult<Prisma.$NotePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    deck<T extends DeckDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeckDefaultArgs<ExtArgs>>): Prisma__DeckClient<$Result.GetResult<Prisma.$DeckPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    logs<T extends Card$logsArgs<ExtArgs> = {}>(args?: Subset<T, Card$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Card model
   */ 
  interface CardFieldRefs {
    readonly id: FieldRef<"Card", 'String'>
    readonly noteId: FieldRef<"Card", 'String'>
    readonly userId: FieldRef<"Card", 'String'>
    readonly deckId: FieldRef<"Card", 'String'>
    readonly ord: FieldRef<"Card", 'Int'>
    readonly front: FieldRef<"Card", 'String'>
    readonly back: FieldRef<"Card", 'String'>
    readonly due: FieldRef<"Card", 'DateTime'>
    readonly stability: FieldRef<"Card", 'Float'>
    readonly difficulty: FieldRef<"Card", 'Float'>
    readonly elapsedDays: FieldRef<"Card", 'Int'>
    readonly scheduledDays: FieldRef<"Card", 'Int'>
    readonly reps: FieldRef<"Card", 'Int'>
    readonly lapses: FieldRef<"Card", 'Int'>
    readonly state: FieldRef<"Card", 'Int'>
    readonly lastReview: FieldRef<"Card", 'DateTime'>
    readonly createdAt: FieldRef<"Card", 'DateTime'>
    readonly updatedAt: FieldRef<"Card", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Card findUnique
   */
  export type CardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findUniqueOrThrow
   */
  export type CardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card findFirst
   */
  export type CardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findFirstOrThrow
   */
  export type CardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Card to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cards.
     */
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card findMany
   */
  export type CardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter, which Cards to fetch.
     */
    where?: CardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cards to fetch.
     */
    orderBy?: CardOrderByWithRelationInput | CardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cards.
     */
    cursor?: CardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cards.
     */
    skip?: number
    distinct?: CardScalarFieldEnum | CardScalarFieldEnum[]
  }

  /**
   * Card create
   */
  export type CardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to create a Card.
     */
    data: XOR<CardCreateInput, CardUncheckedCreateInput>
  }

  /**
   * Card createMany
   */
  export type CardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cards.
     */
    data: CardCreateManyInput | CardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Card createManyAndReturn
   */
  export type CardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Cards.
     */
    data: CardCreateManyInput | CardCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Card update
   */
  export type CardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The data needed to update a Card.
     */
    data: XOR<CardUpdateInput, CardUncheckedUpdateInput>
    /**
     * Choose, which Card to update.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card updateMany
   */
  export type CardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cards.
     */
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyInput>
    /**
     * Filter which Cards to update
     */
    where?: CardWhereInput
  }

  /**
   * Card upsert
   */
  export type CardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * The filter to search for the Card to update in case it exists.
     */
    where: CardWhereUniqueInput
    /**
     * In case the Card found by the `where` argument doesn't exist, create a new Card with this data.
     */
    create: XOR<CardCreateInput, CardUncheckedCreateInput>
    /**
     * In case the Card was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CardUpdateInput, CardUncheckedUpdateInput>
  }

  /**
   * Card delete
   */
  export type CardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
    /**
     * Filter which Card to delete.
     */
    where: CardWhereUniqueInput
  }

  /**
   * Card deleteMany
   */
  export type CardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cards to delete
     */
    where?: CardWhereInput
  }

  /**
   * Card.logs
   */
  export type Card$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    where?: ReviewLogWhereInput
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    cursor?: ReviewLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * Card without action
   */
  export type CardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Card
     */
    select?: CardSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardInclude<ExtArgs> | null
  }


  /**
   * Model ReviewLog
   */

  export type AggregateReviewLog = {
    _count: ReviewLogCountAggregateOutputType | null
    _avg: ReviewLogAvgAggregateOutputType | null
    _sum: ReviewLogSumAggregateOutputType | null
    _min: ReviewLogMinAggregateOutputType | null
    _max: ReviewLogMaxAggregateOutputType | null
  }

  export type ReviewLogAvgAggregateOutputType = {
    grade: number | null
    reviewTime: number | null
    state: number | null
    scheduledDays: number | null
    elapsedDays: number | null
  }

  export type ReviewLogSumAggregateOutputType = {
    grade: number | null
    reviewTime: number | null
    state: number | null
    scheduledDays: number | null
    elapsedDays: number | null
  }

  export type ReviewLogMinAggregateOutputType = {
    id: string | null
    cardId: string | null
    userId: string | null
    grade: number | null
    reviewTime: number | null
    state: number | null
    scheduledDays: number | null
    elapsedDays: number | null
    reviewDate: Date | null
  }

  export type ReviewLogMaxAggregateOutputType = {
    id: string | null
    cardId: string | null
    userId: string | null
    grade: number | null
    reviewTime: number | null
    state: number | null
    scheduledDays: number | null
    elapsedDays: number | null
    reviewDate: Date | null
  }

  export type ReviewLogCountAggregateOutputType = {
    id: number
    cardId: number
    userId: number
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate: number
    _all: number
  }


  export type ReviewLogAvgAggregateInputType = {
    grade?: true
    reviewTime?: true
    state?: true
    scheduledDays?: true
    elapsedDays?: true
  }

  export type ReviewLogSumAggregateInputType = {
    grade?: true
    reviewTime?: true
    state?: true
    scheduledDays?: true
    elapsedDays?: true
  }

  export type ReviewLogMinAggregateInputType = {
    id?: true
    cardId?: true
    userId?: true
    grade?: true
    reviewTime?: true
    state?: true
    scheduledDays?: true
    elapsedDays?: true
    reviewDate?: true
  }

  export type ReviewLogMaxAggregateInputType = {
    id?: true
    cardId?: true
    userId?: true
    grade?: true
    reviewTime?: true
    state?: true
    scheduledDays?: true
    elapsedDays?: true
    reviewDate?: true
  }

  export type ReviewLogCountAggregateInputType = {
    id?: true
    cardId?: true
    userId?: true
    grade?: true
    reviewTime?: true
    state?: true
    scheduledDays?: true
    elapsedDays?: true
    reviewDate?: true
    _all?: true
  }

  export type ReviewLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReviewLog to aggregate.
     */
    where?: ReviewLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewLogs to fetch.
     */
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReviewLogs
    **/
    _count?: true | ReviewLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewLogMaxAggregateInputType
  }

  export type GetReviewLogAggregateType<T extends ReviewLogAggregateArgs> = {
        [P in keyof T & keyof AggregateReviewLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviewLog[P]>
      : GetScalarType<T[P], AggregateReviewLog[P]>
  }




  export type ReviewLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewLogWhereInput
    orderBy?: ReviewLogOrderByWithAggregationInput | ReviewLogOrderByWithAggregationInput[]
    by: ReviewLogScalarFieldEnum[] | ReviewLogScalarFieldEnum
    having?: ReviewLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewLogCountAggregateInputType | true
    _avg?: ReviewLogAvgAggregateInputType
    _sum?: ReviewLogSumAggregateInputType
    _min?: ReviewLogMinAggregateInputType
    _max?: ReviewLogMaxAggregateInputType
  }

  export type ReviewLogGroupByOutputType = {
    id: string
    cardId: string
    userId: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate: Date
    _count: ReviewLogCountAggregateOutputType | null
    _avg: ReviewLogAvgAggregateOutputType | null
    _sum: ReviewLogSumAggregateOutputType | null
    _min: ReviewLogMinAggregateOutputType | null
    _max: ReviewLogMaxAggregateOutputType | null
  }

  type GetReviewLogGroupByPayload<T extends ReviewLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewLogGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewLogGroupByOutputType[P]>
        }
      >
    >


  export type ReviewLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cardId?: boolean
    userId?: boolean
    grade?: boolean
    reviewTime?: boolean
    state?: boolean
    scheduledDays?: boolean
    elapsedDays?: boolean
    reviewDate?: boolean
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewLog"]>

  export type ReviewLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cardId?: boolean
    userId?: boolean
    grade?: boolean
    reviewTime?: boolean
    state?: boolean
    scheduledDays?: boolean
    elapsedDays?: boolean
    reviewDate?: boolean
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewLog"]>

  export type ReviewLogSelectScalar = {
    id?: boolean
    cardId?: boolean
    userId?: boolean
    grade?: boolean
    reviewTime?: boolean
    state?: boolean
    scheduledDays?: boolean
    elapsedDays?: boolean
    reviewDate?: boolean
  }

  export type ReviewLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    card?: boolean | CardDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReviewLog"
    objects: {
      card: Prisma.$CardPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cardId: string
      userId: string
      grade: number
      reviewTime: number
      state: number
      scheduledDays: number
      elapsedDays: number
      reviewDate: Date
    }, ExtArgs["result"]["reviewLog"]>
    composites: {}
  }

  type ReviewLogGetPayload<S extends boolean | null | undefined | ReviewLogDefaultArgs> = $Result.GetResult<Prisma.$ReviewLogPayload, S>

  type ReviewLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewLogCountAggregateInputType | true
    }

  export interface ReviewLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReviewLog'], meta: { name: 'ReviewLog' } }
    /**
     * Find zero or one ReviewLog that matches the filter.
     * @param {ReviewLogFindUniqueArgs} args - Arguments to find a ReviewLog
     * @example
     * // Get one ReviewLog
     * const reviewLog = await prisma.reviewLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewLogFindUniqueArgs>(args: SelectSubset<T, ReviewLogFindUniqueArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ReviewLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewLogFindUniqueOrThrowArgs} args - Arguments to find a ReviewLog
     * @example
     * // Get one ReviewLog
     * const reviewLog = await prisma.reviewLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ReviewLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogFindFirstArgs} args - Arguments to find a ReviewLog
     * @example
     * // Get one ReviewLog
     * const reviewLog = await prisma.reviewLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewLogFindFirstArgs>(args?: SelectSubset<T, ReviewLogFindFirstArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ReviewLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogFindFirstOrThrowArgs} args - Arguments to find a ReviewLog
     * @example
     * // Get one ReviewLog
     * const reviewLog = await prisma.reviewLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ReviewLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReviewLogs
     * const reviewLogs = await prisma.reviewLog.findMany()
     * 
     * // Get first 10 ReviewLogs
     * const reviewLogs = await prisma.reviewLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewLogWithIdOnly = await prisma.reviewLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewLogFindManyArgs>(args?: SelectSubset<T, ReviewLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ReviewLog.
     * @param {ReviewLogCreateArgs} args - Arguments to create a ReviewLog.
     * @example
     * // Create one ReviewLog
     * const ReviewLog = await prisma.reviewLog.create({
     *   data: {
     *     // ... data to create a ReviewLog
     *   }
     * })
     * 
     */
    create<T extends ReviewLogCreateArgs>(args: SelectSubset<T, ReviewLogCreateArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ReviewLogs.
     * @param {ReviewLogCreateManyArgs} args - Arguments to create many ReviewLogs.
     * @example
     * // Create many ReviewLogs
     * const reviewLog = await prisma.reviewLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewLogCreateManyArgs>(args?: SelectSubset<T, ReviewLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReviewLogs and returns the data saved in the database.
     * @param {ReviewLogCreateManyAndReturnArgs} args - Arguments to create many ReviewLogs.
     * @example
     * // Create many ReviewLogs
     * const reviewLog = await prisma.reviewLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReviewLogs and only return the `id`
     * const reviewLogWithIdOnly = await prisma.reviewLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ReviewLog.
     * @param {ReviewLogDeleteArgs} args - Arguments to delete one ReviewLog.
     * @example
     * // Delete one ReviewLog
     * const ReviewLog = await prisma.reviewLog.delete({
     *   where: {
     *     // ... filter to delete one ReviewLog
     *   }
     * })
     * 
     */
    delete<T extends ReviewLogDeleteArgs>(args: SelectSubset<T, ReviewLogDeleteArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ReviewLog.
     * @param {ReviewLogUpdateArgs} args - Arguments to update one ReviewLog.
     * @example
     * // Update one ReviewLog
     * const reviewLog = await prisma.reviewLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewLogUpdateArgs>(args: SelectSubset<T, ReviewLogUpdateArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ReviewLogs.
     * @param {ReviewLogDeleteManyArgs} args - Arguments to filter ReviewLogs to delete.
     * @example
     * // Delete a few ReviewLogs
     * const { count } = await prisma.reviewLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewLogDeleteManyArgs>(args?: SelectSubset<T, ReviewLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReviewLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReviewLogs
     * const reviewLog = await prisma.reviewLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewLogUpdateManyArgs>(args: SelectSubset<T, ReviewLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReviewLog.
     * @param {ReviewLogUpsertArgs} args - Arguments to update or create a ReviewLog.
     * @example
     * // Update or create a ReviewLog
     * const reviewLog = await prisma.reviewLog.upsert({
     *   create: {
     *     // ... data to create a ReviewLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReviewLog we want to update
     *   }
     * })
     */
    upsert<T extends ReviewLogUpsertArgs>(args: SelectSubset<T, ReviewLogUpsertArgs<ExtArgs>>): Prisma__ReviewLogClient<$Result.GetResult<Prisma.$ReviewLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ReviewLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogCountArgs} args - Arguments to filter ReviewLogs to count.
     * @example
     * // Count the number of ReviewLogs
     * const count = await prisma.reviewLog.count({
     *   where: {
     *     // ... the filter for the ReviewLogs we want to count
     *   }
     * })
    **/
    count<T extends ReviewLogCountArgs>(
      args?: Subset<T, ReviewLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReviewLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewLogAggregateArgs>(args: Subset<T, ReviewLogAggregateArgs>): Prisma.PrismaPromise<GetReviewLogAggregateType<T>>

    /**
     * Group by ReviewLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewLogGroupByArgs['orderBy'] }
        : { orderBy?: ReviewLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReviewLog model
   */
  readonly fields: ReviewLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReviewLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    card<T extends CardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CardDefaultArgs<ExtArgs>>): Prisma__CardClient<$Result.GetResult<Prisma.$CardPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReviewLog model
   */ 
  interface ReviewLogFieldRefs {
    readonly id: FieldRef<"ReviewLog", 'String'>
    readonly cardId: FieldRef<"ReviewLog", 'String'>
    readonly userId: FieldRef<"ReviewLog", 'String'>
    readonly grade: FieldRef<"ReviewLog", 'Int'>
    readonly reviewTime: FieldRef<"ReviewLog", 'Int'>
    readonly state: FieldRef<"ReviewLog", 'Int'>
    readonly scheduledDays: FieldRef<"ReviewLog", 'Int'>
    readonly elapsedDays: FieldRef<"ReviewLog", 'Int'>
    readonly reviewDate: FieldRef<"ReviewLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReviewLog findUnique
   */
  export type ReviewLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLog to fetch.
     */
    where: ReviewLogWhereUniqueInput
  }

  /**
   * ReviewLog findUniqueOrThrow
   */
  export type ReviewLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLog to fetch.
     */
    where: ReviewLogWhereUniqueInput
  }

  /**
   * ReviewLog findFirst
   */
  export type ReviewLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLog to fetch.
     */
    where?: ReviewLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewLogs to fetch.
     */
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewLogs.
     */
    cursor?: ReviewLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewLogs.
     */
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * ReviewLog findFirstOrThrow
   */
  export type ReviewLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLog to fetch.
     */
    where?: ReviewLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewLogs to fetch.
     */
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewLogs.
     */
    cursor?: ReviewLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewLogs.
     */
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * ReviewLog findMany
   */
  export type ReviewLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter, which ReviewLogs to fetch.
     */
    where?: ReviewLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewLogs to fetch.
     */
    orderBy?: ReviewLogOrderByWithRelationInput | ReviewLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReviewLogs.
     */
    cursor?: ReviewLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewLogs.
     */
    skip?: number
    distinct?: ReviewLogScalarFieldEnum | ReviewLogScalarFieldEnum[]
  }

  /**
   * ReviewLog create
   */
  export type ReviewLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ReviewLog.
     */
    data: XOR<ReviewLogCreateInput, ReviewLogUncheckedCreateInput>
  }

  /**
   * ReviewLog createMany
   */
  export type ReviewLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReviewLogs.
     */
    data: ReviewLogCreateManyInput | ReviewLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReviewLog createManyAndReturn
   */
  export type ReviewLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ReviewLogs.
     */
    data: ReviewLogCreateManyInput | ReviewLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReviewLog update
   */
  export type ReviewLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ReviewLog.
     */
    data: XOR<ReviewLogUpdateInput, ReviewLogUncheckedUpdateInput>
    /**
     * Choose, which ReviewLog to update.
     */
    where: ReviewLogWhereUniqueInput
  }

  /**
   * ReviewLog updateMany
   */
  export type ReviewLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReviewLogs.
     */
    data: XOR<ReviewLogUpdateManyMutationInput, ReviewLogUncheckedUpdateManyInput>
    /**
     * Filter which ReviewLogs to update
     */
    where?: ReviewLogWhereInput
  }

  /**
   * ReviewLog upsert
   */
  export type ReviewLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ReviewLog to update in case it exists.
     */
    where: ReviewLogWhereUniqueInput
    /**
     * In case the ReviewLog found by the `where` argument doesn't exist, create a new ReviewLog with this data.
     */
    create: XOR<ReviewLogCreateInput, ReviewLogUncheckedCreateInput>
    /**
     * In case the ReviewLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewLogUpdateInput, ReviewLogUncheckedUpdateInput>
  }

  /**
   * ReviewLog delete
   */
  export type ReviewLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
    /**
     * Filter which ReviewLog to delete.
     */
    where: ReviewLogWhereUniqueInput
  }

  /**
   * ReviewLog deleteMany
   */
  export type ReviewLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReviewLogs to delete
     */
    where?: ReviewLogWhereInput
  }

  /**
   * ReviewLog without action
   */
  export type ReviewLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewLog
     */
    select?: ReviewLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    username: 'username',
    preferredLanguage: 'preferredLanguage',
    colorScheme: 'colorScheme',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DeckScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    parentId: 'parentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isFavorite: 'isFavorite',
    orderIndex: 'orderIndex'
  };

  export type DeckScalarFieldEnum = (typeof DeckScalarFieldEnum)[keyof typeof DeckScalarFieldEnum]


  export const NoteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    deckId: 'deckId',
    content: 'content',
    tags: 'tags',
    noteType: 'noteType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum]


  export const CardScalarFieldEnum: {
    id: 'id',
    noteId: 'noteId',
    userId: 'userId',
    deckId: 'deckId',
    ord: 'ord',
    front: 'front',
    back: 'back',
    due: 'due',
    stability: 'stability',
    difficulty: 'difficulty',
    elapsedDays: 'elapsedDays',
    scheduledDays: 'scheduledDays',
    reps: 'reps',
    lapses: 'lapses',
    state: 'state',
    lastReview: 'lastReview',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CardScalarFieldEnum = (typeof CardScalarFieldEnum)[keyof typeof CardScalarFieldEnum]


  export const ReviewLogScalarFieldEnum: {
    id: 'id',
    cardId: 'cardId',
    userId: 'userId',
    grade: 'grade',
    reviewTime: 'reviewTime',
    state: 'state',
    scheduledDays: 'scheduledDays',
    elapsedDays: 'elapsedDays',
    reviewDate: 'reviewDate'
  };

  export type ReviewLogScalarFieldEnum = (typeof ReviewLogScalarFieldEnum)[keyof typeof ReviewLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    preferredLanguage?: StringFilter<"User"> | string
    colorScheme?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isActive?: BoolFilter<"User"> | boolean
    decks?: DeckListRelationFilter
    notes?: NoteListRelationFilter
    cards?: CardListRelationFilter
    reviewLogs?: ReviewLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrderInput | SortOrder
    preferredLanguage?: SortOrder
    colorScheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    decks?: DeckOrderByRelationAggregateInput
    notes?: NoteOrderByRelationAggregateInput
    cards?: CardOrderByRelationAggregateInput
    reviewLogs?: ReviewLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    preferredLanguage?: StringFilter<"User"> | string
    colorScheme?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    isActive?: BoolFilter<"User"> | boolean
    decks?: DeckListRelationFilter
    notes?: NoteListRelationFilter
    cards?: CardListRelationFilter
    reviewLogs?: ReviewLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrderInput | SortOrder
    preferredLanguage?: SortOrder
    colorScheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    preferredLanguage?: StringWithAggregatesFilter<"User"> | string
    colorScheme?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type DeckWhereInput = {
    AND?: DeckWhereInput | DeckWhereInput[]
    OR?: DeckWhereInput[]
    NOT?: DeckWhereInput | DeckWhereInput[]
    id?: StringFilter<"Deck"> | string
    userId?: StringFilter<"Deck"> | string
    name?: StringFilter<"Deck"> | string
    description?: StringNullableFilter<"Deck"> | string | null
    parentId?: StringNullableFilter<"Deck"> | string | null
    createdAt?: DateTimeFilter<"Deck"> | Date | string
    updatedAt?: DateTimeFilter<"Deck"> | Date | string
    isFavorite?: BoolFilter<"Deck"> | boolean
    orderIndex?: IntFilter<"Deck"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
    parent?: XOR<DeckNullableRelationFilter, DeckWhereInput> | null
    children?: DeckListRelationFilter
    notes?: NoteListRelationFilter
    cards?: CardListRelationFilter
  }

  export type DeckOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isFavorite?: SortOrder
    orderIndex?: SortOrder
    user?: UserOrderByWithRelationInput
    parent?: DeckOrderByWithRelationInput
    children?: DeckOrderByRelationAggregateInput
    notes?: NoteOrderByRelationAggregateInput
    cards?: CardOrderByRelationAggregateInput
  }

  export type DeckWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeckWhereInput | DeckWhereInput[]
    OR?: DeckWhereInput[]
    NOT?: DeckWhereInput | DeckWhereInput[]
    userId?: StringFilter<"Deck"> | string
    name?: StringFilter<"Deck"> | string
    description?: StringNullableFilter<"Deck"> | string | null
    parentId?: StringNullableFilter<"Deck"> | string | null
    createdAt?: DateTimeFilter<"Deck"> | Date | string
    updatedAt?: DateTimeFilter<"Deck"> | Date | string
    isFavorite?: BoolFilter<"Deck"> | boolean
    orderIndex?: IntFilter<"Deck"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
    parent?: XOR<DeckNullableRelationFilter, DeckWhereInput> | null
    children?: DeckListRelationFilter
    notes?: NoteListRelationFilter
    cards?: CardListRelationFilter
  }, "id">

  export type DeckOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isFavorite?: SortOrder
    orderIndex?: SortOrder
    _count?: DeckCountOrderByAggregateInput
    _avg?: DeckAvgOrderByAggregateInput
    _max?: DeckMaxOrderByAggregateInput
    _min?: DeckMinOrderByAggregateInput
    _sum?: DeckSumOrderByAggregateInput
  }

  export type DeckScalarWhereWithAggregatesInput = {
    AND?: DeckScalarWhereWithAggregatesInput | DeckScalarWhereWithAggregatesInput[]
    OR?: DeckScalarWhereWithAggregatesInput[]
    NOT?: DeckScalarWhereWithAggregatesInput | DeckScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Deck"> | string
    userId?: StringWithAggregatesFilter<"Deck"> | string
    name?: StringWithAggregatesFilter<"Deck"> | string
    description?: StringNullableWithAggregatesFilter<"Deck"> | string | null
    parentId?: StringNullableWithAggregatesFilter<"Deck"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Deck"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Deck"> | Date | string
    isFavorite?: BoolWithAggregatesFilter<"Deck"> | boolean
    orderIndex?: IntWithAggregatesFilter<"Deck"> | number
  }

  export type NoteWhereInput = {
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    id?: StringFilter<"Note"> | string
    userId?: StringFilter<"Note"> | string
    deckId?: StringFilter<"Note"> | string
    content?: JsonFilter<"Note">
    tags?: StringNullableListFilter<"Note">
    noteType?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    deck?: XOR<DeckRelationFilter, DeckWhereInput>
    cards?: CardListRelationFilter
  }

  export type NoteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    content?: SortOrder
    tags?: SortOrder
    noteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    deck?: DeckOrderByWithRelationInput
    cards?: CardOrderByRelationAggregateInput
  }

  export type NoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoteWhereInput | NoteWhereInput[]
    OR?: NoteWhereInput[]
    NOT?: NoteWhereInput | NoteWhereInput[]
    userId?: StringFilter<"Note"> | string
    deckId?: StringFilter<"Note"> | string
    content?: JsonFilter<"Note">
    tags?: StringNullableListFilter<"Note">
    noteType?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    deck?: XOR<DeckRelationFilter, DeckWhereInput>
    cards?: CardListRelationFilter
  }, "id">

  export type NoteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    content?: SortOrder
    tags?: SortOrder
    noteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NoteCountOrderByAggregateInput
    _max?: NoteMaxOrderByAggregateInput
    _min?: NoteMinOrderByAggregateInput
  }

  export type NoteScalarWhereWithAggregatesInput = {
    AND?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    OR?: NoteScalarWhereWithAggregatesInput[]
    NOT?: NoteScalarWhereWithAggregatesInput | NoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Note"> | string
    userId?: StringWithAggregatesFilter<"Note"> | string
    deckId?: StringWithAggregatesFilter<"Note"> | string
    content?: JsonWithAggregatesFilter<"Note">
    tags?: StringNullableListFilter<"Note">
    noteType?: StringWithAggregatesFilter<"Note"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Note"> | Date | string
  }

  export type CardWhereInput = {
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    id?: StringFilter<"Card"> | string
    noteId?: StringFilter<"Card"> | string
    userId?: StringFilter<"Card"> | string
    deckId?: StringFilter<"Card"> | string
    ord?: IntFilter<"Card"> | number
    front?: StringFilter<"Card"> | string
    back?: StringFilter<"Card"> | string
    due?: DateTimeFilter<"Card"> | Date | string
    stability?: FloatFilter<"Card"> | number
    difficulty?: FloatFilter<"Card"> | number
    elapsedDays?: IntFilter<"Card"> | number
    scheduledDays?: IntFilter<"Card"> | number
    reps?: IntFilter<"Card"> | number
    lapses?: IntFilter<"Card"> | number
    state?: IntFilter<"Card"> | number
    lastReview?: DateTimeNullableFilter<"Card"> | Date | string | null
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
    note?: XOR<NoteRelationFilter, NoteWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    deck?: XOR<DeckRelationFilter, DeckWhereInput>
    logs?: ReviewLogListRelationFilter
  }

  export type CardOrderByWithRelationInput = {
    id?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    ord?: SortOrder
    front?: SortOrder
    back?: SortOrder
    due?: SortOrder
    stability?: SortOrder
    difficulty?: SortOrder
    elapsedDays?: SortOrder
    scheduledDays?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    state?: SortOrder
    lastReview?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    note?: NoteOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    deck?: DeckOrderByWithRelationInput
    logs?: ReviewLogOrderByRelationAggregateInput
  }

  export type CardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CardWhereInput | CardWhereInput[]
    OR?: CardWhereInput[]
    NOT?: CardWhereInput | CardWhereInput[]
    noteId?: StringFilter<"Card"> | string
    userId?: StringFilter<"Card"> | string
    deckId?: StringFilter<"Card"> | string
    ord?: IntFilter<"Card"> | number
    front?: StringFilter<"Card"> | string
    back?: StringFilter<"Card"> | string
    due?: DateTimeFilter<"Card"> | Date | string
    stability?: FloatFilter<"Card"> | number
    difficulty?: FloatFilter<"Card"> | number
    elapsedDays?: IntFilter<"Card"> | number
    scheduledDays?: IntFilter<"Card"> | number
    reps?: IntFilter<"Card"> | number
    lapses?: IntFilter<"Card"> | number
    state?: IntFilter<"Card"> | number
    lastReview?: DateTimeNullableFilter<"Card"> | Date | string | null
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
    note?: XOR<NoteRelationFilter, NoteWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    deck?: XOR<DeckRelationFilter, DeckWhereInput>
    logs?: ReviewLogListRelationFilter
  }, "id">

  export type CardOrderByWithAggregationInput = {
    id?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    ord?: SortOrder
    front?: SortOrder
    back?: SortOrder
    due?: SortOrder
    stability?: SortOrder
    difficulty?: SortOrder
    elapsedDays?: SortOrder
    scheduledDays?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    state?: SortOrder
    lastReview?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CardCountOrderByAggregateInput
    _avg?: CardAvgOrderByAggregateInput
    _max?: CardMaxOrderByAggregateInput
    _min?: CardMinOrderByAggregateInput
    _sum?: CardSumOrderByAggregateInput
  }

  export type CardScalarWhereWithAggregatesInput = {
    AND?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    OR?: CardScalarWhereWithAggregatesInput[]
    NOT?: CardScalarWhereWithAggregatesInput | CardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Card"> | string
    noteId?: StringWithAggregatesFilter<"Card"> | string
    userId?: StringWithAggregatesFilter<"Card"> | string
    deckId?: StringWithAggregatesFilter<"Card"> | string
    ord?: IntWithAggregatesFilter<"Card"> | number
    front?: StringWithAggregatesFilter<"Card"> | string
    back?: StringWithAggregatesFilter<"Card"> | string
    due?: DateTimeWithAggregatesFilter<"Card"> | Date | string
    stability?: FloatWithAggregatesFilter<"Card"> | number
    difficulty?: FloatWithAggregatesFilter<"Card"> | number
    elapsedDays?: IntWithAggregatesFilter<"Card"> | number
    scheduledDays?: IntWithAggregatesFilter<"Card"> | number
    reps?: IntWithAggregatesFilter<"Card"> | number
    lapses?: IntWithAggregatesFilter<"Card"> | number
    state?: IntWithAggregatesFilter<"Card"> | number
    lastReview?: DateTimeNullableWithAggregatesFilter<"Card"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Card"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Card"> | Date | string
  }

  export type ReviewLogWhereInput = {
    AND?: ReviewLogWhereInput | ReviewLogWhereInput[]
    OR?: ReviewLogWhereInput[]
    NOT?: ReviewLogWhereInput | ReviewLogWhereInput[]
    id?: StringFilter<"ReviewLog"> | string
    cardId?: StringFilter<"ReviewLog"> | string
    userId?: StringFilter<"ReviewLog"> | string
    grade?: IntFilter<"ReviewLog"> | number
    reviewTime?: IntFilter<"ReviewLog"> | number
    state?: IntFilter<"ReviewLog"> | number
    scheduledDays?: IntFilter<"ReviewLog"> | number
    elapsedDays?: IntFilter<"ReviewLog"> | number
    reviewDate?: DateTimeFilter<"ReviewLog"> | Date | string
    card?: XOR<CardRelationFilter, CardWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReviewLogOrderByWithRelationInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    reviewTime?: SortOrder
    state?: SortOrder
    scheduledDays?: SortOrder
    elapsedDays?: SortOrder
    reviewDate?: SortOrder
    card?: CardOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReviewLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewLogWhereInput | ReviewLogWhereInput[]
    OR?: ReviewLogWhereInput[]
    NOT?: ReviewLogWhereInput | ReviewLogWhereInput[]
    cardId?: StringFilter<"ReviewLog"> | string
    userId?: StringFilter<"ReviewLog"> | string
    grade?: IntFilter<"ReviewLog"> | number
    reviewTime?: IntFilter<"ReviewLog"> | number
    state?: IntFilter<"ReviewLog"> | number
    scheduledDays?: IntFilter<"ReviewLog"> | number
    elapsedDays?: IntFilter<"ReviewLog"> | number
    reviewDate?: DateTimeFilter<"ReviewLog"> | Date | string
    card?: XOR<CardRelationFilter, CardWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ReviewLogOrderByWithAggregationInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    reviewTime?: SortOrder
    state?: SortOrder
    scheduledDays?: SortOrder
    elapsedDays?: SortOrder
    reviewDate?: SortOrder
    _count?: ReviewLogCountOrderByAggregateInput
    _avg?: ReviewLogAvgOrderByAggregateInput
    _max?: ReviewLogMaxOrderByAggregateInput
    _min?: ReviewLogMinOrderByAggregateInput
    _sum?: ReviewLogSumOrderByAggregateInput
  }

  export type ReviewLogScalarWhereWithAggregatesInput = {
    AND?: ReviewLogScalarWhereWithAggregatesInput | ReviewLogScalarWhereWithAggregatesInput[]
    OR?: ReviewLogScalarWhereWithAggregatesInput[]
    NOT?: ReviewLogScalarWhereWithAggregatesInput | ReviewLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReviewLog"> | string
    cardId?: StringWithAggregatesFilter<"ReviewLog"> | string
    userId?: StringWithAggregatesFilter<"ReviewLog"> | string
    grade?: IntWithAggregatesFilter<"ReviewLog"> | number
    reviewTime?: IntWithAggregatesFilter<"ReviewLog"> | number
    state?: IntWithAggregatesFilter<"ReviewLog"> | number
    scheduledDays?: IntWithAggregatesFilter<"ReviewLog"> | number
    elapsedDays?: IntWithAggregatesFilter<"ReviewLog"> | number
    reviewDate?: DateTimeWithAggregatesFilter<"ReviewLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    decks?: DeckCreateNestedManyWithoutUserInput
    notes?: NoteCreateNestedManyWithoutUserInput
    cards?: CardCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    decks?: DeckUncheckedCreateNestedManyWithoutUserInput
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
    cards?: CardUncheckedCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    decks?: DeckUpdateManyWithoutUserNestedInput
    notes?: NoteUpdateManyWithoutUserNestedInput
    cards?: CardUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    decks?: DeckUncheckedUpdateManyWithoutUserNestedInput
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
    cards?: CardUncheckedUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DeckCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    user: UserCreateNestedOneWithoutDecksInput
    parent?: DeckCreateNestedOneWithoutChildrenInput
    children?: DeckCreateNestedManyWithoutParentInput
    notes?: NoteCreateNestedManyWithoutDeckInput
    cards?: CardCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    children?: DeckUncheckedCreateNestedManyWithoutParentInput
    notes?: NoteUncheckedCreateNestedManyWithoutDeckInput
    cards?: CardUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutDecksNestedInput
    parent?: DeckUpdateOneWithoutChildrenNestedInput
    children?: DeckUpdateManyWithoutParentNestedInput
    notes?: NoteUpdateManyWithoutDeckNestedInput
    cards?: CardUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    children?: DeckUncheckedUpdateManyWithoutParentNestedInput
    notes?: NoteUncheckedUpdateManyWithoutDeckNestedInput
    cards?: CardUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type DeckCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
  }

  export type DeckUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type DeckUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type NoteCreateInput = {
    id?: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotesInput
    deck: DeckCreateNestedOneWithoutNotesInput
    cards?: CardCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateInput = {
    id?: string
    userId: string
    deckId: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotesNestedInput
    deck?: DeckUpdateOneRequiredWithoutNotesNestedInput
    cards?: CardUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteCreateManyInput = {
    id?: string
    userId: string
    deckId: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardCreateInput = {
    id?: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    note: NoteCreateNestedOneWithoutCardsInput
    user: UserCreateNestedOneWithoutCardsInput
    deck: DeckCreateNestedOneWithoutCardsInput
    logs?: ReviewLogCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateInput = {
    id?: string
    noteId: string
    userId: string
    deckId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ReviewLogUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NoteUpdateOneRequiredWithoutCardsNestedInput
    user?: UserUpdateOneRequiredWithoutCardsNestedInput
    deck?: DeckUpdateOneRequiredWithoutCardsNestedInput
    logs?: ReviewLogUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ReviewLogUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardCreateManyInput = {
    id?: string
    noteId: string
    userId: string
    deckId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogCreateInput = {
    id?: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
    card: CardCreateNestedOneWithoutLogsInput
    user: UserCreateNestedOneWithoutReviewLogsInput
  }

  export type ReviewLogUncheckedCreateInput = {
    id?: string
    cardId: string
    userId: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
  }

  export type ReviewLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: CardUpdateOneRequiredWithoutLogsNestedInput
    user?: UserUpdateOneRequiredWithoutReviewLogsNestedInput
  }

  export type ReviewLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogCreateManyInput = {
    id?: string
    cardId: string
    userId: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
  }

  export type ReviewLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DeckListRelationFilter = {
    every?: DeckWhereInput
    some?: DeckWhereInput
    none?: DeckWhereInput
  }

  export type NoteListRelationFilter = {
    every?: NoteWhereInput
    some?: NoteWhereInput
    none?: NoteWhereInput
  }

  export type CardListRelationFilter = {
    every?: CardWhereInput
    some?: CardWhereInput
    none?: CardWhereInput
  }

  export type ReviewLogListRelationFilter = {
    every?: ReviewLogWhereInput
    some?: ReviewLogWhereInput
    none?: ReviewLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DeckOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrder
    preferredLanguage?: SortOrder
    colorScheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrder
    preferredLanguage?: SortOrder
    colorScheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    username?: SortOrder
    preferredLanguage?: SortOrder
    colorScheme?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DeckNullableRelationFilter = {
    is?: DeckWhereInput | null
    isNot?: DeckWhereInput | null
  }

  export type DeckCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isFavorite?: SortOrder
    orderIndex?: SortOrder
  }

  export type DeckAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type DeckMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isFavorite?: SortOrder
    orderIndex?: SortOrder
  }

  export type DeckMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isFavorite?: SortOrder
    orderIndex?: SortOrder
  }

  export type DeckSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DeckRelationFilter = {
    is?: DeckWhereInput
    isNot?: DeckWhereInput
  }

  export type NoteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    content?: SortOrder
    tags?: SortOrder
    noteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    noteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    noteType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NoteRelationFilter = {
    is?: NoteWhereInput
    isNot?: NoteWhereInput
  }

  export type CardCountOrderByAggregateInput = {
    id?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    ord?: SortOrder
    front?: SortOrder
    back?: SortOrder
    due?: SortOrder
    stability?: SortOrder
    difficulty?: SortOrder
    elapsedDays?: SortOrder
    scheduledDays?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    state?: SortOrder
    lastReview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardAvgOrderByAggregateInput = {
    ord?: SortOrder
    stability?: SortOrder
    difficulty?: SortOrder
    elapsedDays?: SortOrder
    scheduledDays?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    state?: SortOrder
  }

  export type CardMaxOrderByAggregateInput = {
    id?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    ord?: SortOrder
    front?: SortOrder
    back?: SortOrder
    due?: SortOrder
    stability?: SortOrder
    difficulty?: SortOrder
    elapsedDays?: SortOrder
    scheduledDays?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    state?: SortOrder
    lastReview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardMinOrderByAggregateInput = {
    id?: SortOrder
    noteId?: SortOrder
    userId?: SortOrder
    deckId?: SortOrder
    ord?: SortOrder
    front?: SortOrder
    back?: SortOrder
    due?: SortOrder
    stability?: SortOrder
    difficulty?: SortOrder
    elapsedDays?: SortOrder
    scheduledDays?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    state?: SortOrder
    lastReview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CardSumOrderByAggregateInput = {
    ord?: SortOrder
    stability?: SortOrder
    difficulty?: SortOrder
    elapsedDays?: SortOrder
    scheduledDays?: SortOrder
    reps?: SortOrder
    lapses?: SortOrder
    state?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CardRelationFilter = {
    is?: CardWhereInput
    isNot?: CardWhereInput
  }

  export type ReviewLogCountOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    reviewTime?: SortOrder
    state?: SortOrder
    scheduledDays?: SortOrder
    elapsedDays?: SortOrder
    reviewDate?: SortOrder
  }

  export type ReviewLogAvgOrderByAggregateInput = {
    grade?: SortOrder
    reviewTime?: SortOrder
    state?: SortOrder
    scheduledDays?: SortOrder
    elapsedDays?: SortOrder
  }

  export type ReviewLogMaxOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    reviewTime?: SortOrder
    state?: SortOrder
    scheduledDays?: SortOrder
    elapsedDays?: SortOrder
    reviewDate?: SortOrder
  }

  export type ReviewLogMinOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    userId?: SortOrder
    grade?: SortOrder
    reviewTime?: SortOrder
    state?: SortOrder
    scheduledDays?: SortOrder
    elapsedDays?: SortOrder
    reviewDate?: SortOrder
  }

  export type ReviewLogSumOrderByAggregateInput = {
    grade?: SortOrder
    reviewTime?: SortOrder
    state?: SortOrder
    scheduledDays?: SortOrder
    elapsedDays?: SortOrder
  }

  export type DeckCreateNestedManyWithoutUserInput = {
    create?: XOR<DeckCreateWithoutUserInput, DeckUncheckedCreateWithoutUserInput> | DeckCreateWithoutUserInput[] | DeckUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutUserInput | DeckCreateOrConnectWithoutUserInput[]
    createMany?: DeckCreateManyUserInputEnvelope
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
  }

  export type NoteCreateNestedManyWithoutUserInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type CardCreateNestedManyWithoutUserInput = {
    create?: XOR<CardCreateWithoutUserInput, CardUncheckedCreateWithoutUserInput> | CardCreateWithoutUserInput[] | CardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CardCreateOrConnectWithoutUserInput | CardCreateOrConnectWithoutUserInput[]
    createMany?: CardCreateManyUserInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type ReviewLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput> | ReviewLogCreateWithoutUserInput[] | ReviewLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserInput | ReviewLogCreateOrConnectWithoutUserInput[]
    createMany?: ReviewLogCreateManyUserInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type DeckUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DeckCreateWithoutUserInput, DeckUncheckedCreateWithoutUserInput> | DeckCreateWithoutUserInput[] | DeckUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutUserInput | DeckCreateOrConnectWithoutUserInput[]
    createMany?: DeckCreateManyUserInputEnvelope
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type CardUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CardCreateWithoutUserInput, CardUncheckedCreateWithoutUserInput> | CardCreateWithoutUserInput[] | CardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CardCreateOrConnectWithoutUserInput | CardCreateOrConnectWithoutUserInput[]
    createMany?: CardCreateManyUserInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type ReviewLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput> | ReviewLogCreateWithoutUserInput[] | ReviewLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserInput | ReviewLogCreateOrConnectWithoutUserInput[]
    createMany?: ReviewLogCreateManyUserInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DeckUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeckCreateWithoutUserInput, DeckUncheckedCreateWithoutUserInput> | DeckCreateWithoutUserInput[] | DeckUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutUserInput | DeckCreateOrConnectWithoutUserInput[]
    upsert?: DeckUpsertWithWhereUniqueWithoutUserInput | DeckUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeckCreateManyUserInputEnvelope
    set?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    disconnect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    delete?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    update?: DeckUpdateWithWhereUniqueWithoutUserInput | DeckUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeckUpdateManyWithWhereWithoutUserInput | DeckUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeckScalarWhereInput | DeckScalarWhereInput[]
  }

  export type NoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutUserInput | NoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutUserInput | NoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutUserInput | NoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type CardUpdateManyWithoutUserNestedInput = {
    create?: XOR<CardCreateWithoutUserInput, CardUncheckedCreateWithoutUserInput> | CardCreateWithoutUserInput[] | CardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CardCreateOrConnectWithoutUserInput | CardCreateOrConnectWithoutUserInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutUserInput | CardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CardCreateManyUserInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutUserInput | CardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CardUpdateManyWithWhereWithoutUserInput | CardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type ReviewLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput> | ReviewLogCreateWithoutUserInput[] | ReviewLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserInput | ReviewLogCreateOrConnectWithoutUserInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutUserInput | ReviewLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewLogCreateManyUserInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutUserInput | ReviewLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutUserInput | ReviewLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type DeckUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DeckCreateWithoutUserInput, DeckUncheckedCreateWithoutUserInput> | DeckCreateWithoutUserInput[] | DeckUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutUserInput | DeckCreateOrConnectWithoutUserInput[]
    upsert?: DeckUpsertWithWhereUniqueWithoutUserInput | DeckUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DeckCreateManyUserInputEnvelope
    set?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    disconnect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    delete?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    update?: DeckUpdateWithWhereUniqueWithoutUserInput | DeckUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DeckUpdateManyWithWhereWithoutUserInput | DeckUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DeckScalarWhereInput | DeckScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput> | NoteCreateWithoutUserInput[] | NoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutUserInput | NoteCreateOrConnectWithoutUserInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutUserInput | NoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NoteCreateManyUserInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutUserInput | NoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutUserInput | NoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type CardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CardCreateWithoutUserInput, CardUncheckedCreateWithoutUserInput> | CardCreateWithoutUserInput[] | CardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CardCreateOrConnectWithoutUserInput | CardCreateOrConnectWithoutUserInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutUserInput | CardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CardCreateManyUserInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutUserInput | CardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CardUpdateManyWithWhereWithoutUserInput | CardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type ReviewLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput> | ReviewLogCreateWithoutUserInput[] | ReviewLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutUserInput | ReviewLogCreateOrConnectWithoutUserInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutUserInput | ReviewLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewLogCreateManyUserInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutUserInput | ReviewLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutUserInput | ReviewLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDecksInput = {
    create?: XOR<UserCreateWithoutDecksInput, UserUncheckedCreateWithoutDecksInput>
    connectOrCreate?: UserCreateOrConnectWithoutDecksInput
    connect?: UserWhereUniqueInput
  }

  export type DeckCreateNestedOneWithoutChildrenInput = {
    create?: XOR<DeckCreateWithoutChildrenInput, DeckUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: DeckCreateOrConnectWithoutChildrenInput
    connect?: DeckWhereUniqueInput
  }

  export type DeckCreateNestedManyWithoutParentInput = {
    create?: XOR<DeckCreateWithoutParentInput, DeckUncheckedCreateWithoutParentInput> | DeckCreateWithoutParentInput[] | DeckUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutParentInput | DeckCreateOrConnectWithoutParentInput[]
    createMany?: DeckCreateManyParentInputEnvelope
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
  }

  export type NoteCreateNestedManyWithoutDeckInput = {
    create?: XOR<NoteCreateWithoutDeckInput, NoteUncheckedCreateWithoutDeckInput> | NoteCreateWithoutDeckInput[] | NoteUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutDeckInput | NoteCreateOrConnectWithoutDeckInput[]
    createMany?: NoteCreateManyDeckInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type CardCreateNestedManyWithoutDeckInput = {
    create?: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput> | CardCreateWithoutDeckInput[] | CardUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: CardCreateOrConnectWithoutDeckInput | CardCreateOrConnectWithoutDeckInput[]
    createMany?: CardCreateManyDeckInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type DeckUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<DeckCreateWithoutParentInput, DeckUncheckedCreateWithoutParentInput> | DeckCreateWithoutParentInput[] | DeckUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutParentInput | DeckCreateOrConnectWithoutParentInput[]
    createMany?: DeckCreateManyParentInputEnvelope
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
  }

  export type NoteUncheckedCreateNestedManyWithoutDeckInput = {
    create?: XOR<NoteCreateWithoutDeckInput, NoteUncheckedCreateWithoutDeckInput> | NoteCreateWithoutDeckInput[] | NoteUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutDeckInput | NoteCreateOrConnectWithoutDeckInput[]
    createMany?: NoteCreateManyDeckInputEnvelope
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
  }

  export type CardUncheckedCreateNestedManyWithoutDeckInput = {
    create?: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput> | CardCreateWithoutDeckInput[] | CardUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: CardCreateOrConnectWithoutDeckInput | CardCreateOrConnectWithoutDeckInput[]
    createMany?: CardCreateManyDeckInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutDecksNestedInput = {
    create?: XOR<UserCreateWithoutDecksInput, UserUncheckedCreateWithoutDecksInput>
    connectOrCreate?: UserCreateOrConnectWithoutDecksInput
    upsert?: UserUpsertWithoutDecksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDecksInput, UserUpdateWithoutDecksInput>, UserUncheckedUpdateWithoutDecksInput>
  }

  export type DeckUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<DeckCreateWithoutChildrenInput, DeckUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: DeckCreateOrConnectWithoutChildrenInput
    upsert?: DeckUpsertWithoutChildrenInput
    disconnect?: DeckWhereInput | boolean
    delete?: DeckWhereInput | boolean
    connect?: DeckWhereUniqueInput
    update?: XOR<XOR<DeckUpdateToOneWithWhereWithoutChildrenInput, DeckUpdateWithoutChildrenInput>, DeckUncheckedUpdateWithoutChildrenInput>
  }

  export type DeckUpdateManyWithoutParentNestedInput = {
    create?: XOR<DeckCreateWithoutParentInput, DeckUncheckedCreateWithoutParentInput> | DeckCreateWithoutParentInput[] | DeckUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutParentInput | DeckCreateOrConnectWithoutParentInput[]
    upsert?: DeckUpsertWithWhereUniqueWithoutParentInput | DeckUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: DeckCreateManyParentInputEnvelope
    set?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    disconnect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    delete?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    update?: DeckUpdateWithWhereUniqueWithoutParentInput | DeckUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: DeckUpdateManyWithWhereWithoutParentInput | DeckUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: DeckScalarWhereInput | DeckScalarWhereInput[]
  }

  export type NoteUpdateManyWithoutDeckNestedInput = {
    create?: XOR<NoteCreateWithoutDeckInput, NoteUncheckedCreateWithoutDeckInput> | NoteCreateWithoutDeckInput[] | NoteUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutDeckInput | NoteCreateOrConnectWithoutDeckInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutDeckInput | NoteUpsertWithWhereUniqueWithoutDeckInput[]
    createMany?: NoteCreateManyDeckInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutDeckInput | NoteUpdateWithWhereUniqueWithoutDeckInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutDeckInput | NoteUpdateManyWithWhereWithoutDeckInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type CardUpdateManyWithoutDeckNestedInput = {
    create?: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput> | CardCreateWithoutDeckInput[] | CardUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: CardCreateOrConnectWithoutDeckInput | CardCreateOrConnectWithoutDeckInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutDeckInput | CardUpsertWithWhereUniqueWithoutDeckInput[]
    createMany?: CardCreateManyDeckInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutDeckInput | CardUpdateWithWhereUniqueWithoutDeckInput[]
    updateMany?: CardUpdateManyWithWhereWithoutDeckInput | CardUpdateManyWithWhereWithoutDeckInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type DeckUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<DeckCreateWithoutParentInput, DeckUncheckedCreateWithoutParentInput> | DeckCreateWithoutParentInput[] | DeckUncheckedCreateWithoutParentInput[]
    connectOrCreate?: DeckCreateOrConnectWithoutParentInput | DeckCreateOrConnectWithoutParentInput[]
    upsert?: DeckUpsertWithWhereUniqueWithoutParentInput | DeckUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: DeckCreateManyParentInputEnvelope
    set?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    disconnect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    delete?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    connect?: DeckWhereUniqueInput | DeckWhereUniqueInput[]
    update?: DeckUpdateWithWhereUniqueWithoutParentInput | DeckUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: DeckUpdateManyWithWhereWithoutParentInput | DeckUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: DeckScalarWhereInput | DeckScalarWhereInput[]
  }

  export type NoteUncheckedUpdateManyWithoutDeckNestedInput = {
    create?: XOR<NoteCreateWithoutDeckInput, NoteUncheckedCreateWithoutDeckInput> | NoteCreateWithoutDeckInput[] | NoteUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: NoteCreateOrConnectWithoutDeckInput | NoteCreateOrConnectWithoutDeckInput[]
    upsert?: NoteUpsertWithWhereUniqueWithoutDeckInput | NoteUpsertWithWhereUniqueWithoutDeckInput[]
    createMany?: NoteCreateManyDeckInputEnvelope
    set?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    disconnect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    delete?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    connect?: NoteWhereUniqueInput | NoteWhereUniqueInput[]
    update?: NoteUpdateWithWhereUniqueWithoutDeckInput | NoteUpdateWithWhereUniqueWithoutDeckInput[]
    updateMany?: NoteUpdateManyWithWhereWithoutDeckInput | NoteUpdateManyWithWhereWithoutDeckInput[]
    deleteMany?: NoteScalarWhereInput | NoteScalarWhereInput[]
  }

  export type CardUncheckedUpdateManyWithoutDeckNestedInput = {
    create?: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput> | CardCreateWithoutDeckInput[] | CardUncheckedCreateWithoutDeckInput[]
    connectOrCreate?: CardCreateOrConnectWithoutDeckInput | CardCreateOrConnectWithoutDeckInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutDeckInput | CardUpsertWithWhereUniqueWithoutDeckInput[]
    createMany?: CardCreateManyDeckInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutDeckInput | CardUpdateWithWhereUniqueWithoutDeckInput[]
    updateMany?: CardUpdateManyWithWhereWithoutDeckInput | CardUpdateManyWithWhereWithoutDeckInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type NoteCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutNotesInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    connect?: UserWhereUniqueInput
  }

  export type DeckCreateNestedOneWithoutNotesInput = {
    create?: XOR<DeckCreateWithoutNotesInput, DeckUncheckedCreateWithoutNotesInput>
    connectOrCreate?: DeckCreateOrConnectWithoutNotesInput
    connect?: DeckWhereUniqueInput
  }

  export type CardCreateNestedManyWithoutNoteInput = {
    create?: XOR<CardCreateWithoutNoteInput, CardUncheckedCreateWithoutNoteInput> | CardCreateWithoutNoteInput[] | CardUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: CardCreateOrConnectWithoutNoteInput | CardCreateOrConnectWithoutNoteInput[]
    createMany?: CardCreateManyNoteInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type CardUncheckedCreateNestedManyWithoutNoteInput = {
    create?: XOR<CardCreateWithoutNoteInput, CardUncheckedCreateWithoutNoteInput> | CardCreateWithoutNoteInput[] | CardUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: CardCreateOrConnectWithoutNoteInput | CardCreateOrConnectWithoutNoteInput[]
    createMany?: CardCreateManyNoteInputEnvelope
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
  }

  export type NoteUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotesInput
    upsert?: UserUpsertWithoutNotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotesInput, UserUpdateWithoutNotesInput>, UserUncheckedUpdateWithoutNotesInput>
  }

  export type DeckUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<DeckCreateWithoutNotesInput, DeckUncheckedCreateWithoutNotesInput>
    connectOrCreate?: DeckCreateOrConnectWithoutNotesInput
    upsert?: DeckUpsertWithoutNotesInput
    connect?: DeckWhereUniqueInput
    update?: XOR<XOR<DeckUpdateToOneWithWhereWithoutNotesInput, DeckUpdateWithoutNotesInput>, DeckUncheckedUpdateWithoutNotesInput>
  }

  export type CardUpdateManyWithoutNoteNestedInput = {
    create?: XOR<CardCreateWithoutNoteInput, CardUncheckedCreateWithoutNoteInput> | CardCreateWithoutNoteInput[] | CardUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: CardCreateOrConnectWithoutNoteInput | CardCreateOrConnectWithoutNoteInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutNoteInput | CardUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: CardCreateManyNoteInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutNoteInput | CardUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: CardUpdateManyWithWhereWithoutNoteInput | CardUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type CardUncheckedUpdateManyWithoutNoteNestedInput = {
    create?: XOR<CardCreateWithoutNoteInput, CardUncheckedCreateWithoutNoteInput> | CardCreateWithoutNoteInput[] | CardUncheckedCreateWithoutNoteInput[]
    connectOrCreate?: CardCreateOrConnectWithoutNoteInput | CardCreateOrConnectWithoutNoteInput[]
    upsert?: CardUpsertWithWhereUniqueWithoutNoteInput | CardUpsertWithWhereUniqueWithoutNoteInput[]
    createMany?: CardCreateManyNoteInputEnvelope
    set?: CardWhereUniqueInput | CardWhereUniqueInput[]
    disconnect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    delete?: CardWhereUniqueInput | CardWhereUniqueInput[]
    connect?: CardWhereUniqueInput | CardWhereUniqueInput[]
    update?: CardUpdateWithWhereUniqueWithoutNoteInput | CardUpdateWithWhereUniqueWithoutNoteInput[]
    updateMany?: CardUpdateManyWithWhereWithoutNoteInput | CardUpdateManyWithWhereWithoutNoteInput[]
    deleteMany?: CardScalarWhereInput | CardScalarWhereInput[]
  }

  export type NoteCreateNestedOneWithoutCardsInput = {
    create?: XOR<NoteCreateWithoutCardsInput, NoteUncheckedCreateWithoutCardsInput>
    connectOrCreate?: NoteCreateOrConnectWithoutCardsInput
    connect?: NoteWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCardsInput = {
    create?: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCardsInput
    connect?: UserWhereUniqueInput
  }

  export type DeckCreateNestedOneWithoutCardsInput = {
    create?: XOR<DeckCreateWithoutCardsInput, DeckUncheckedCreateWithoutCardsInput>
    connectOrCreate?: DeckCreateOrConnectWithoutCardsInput
    connect?: DeckWhereUniqueInput
  }

  export type ReviewLogCreateNestedManyWithoutCardInput = {
    create?: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput> | ReviewLogCreateWithoutCardInput[] | ReviewLogUncheckedCreateWithoutCardInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutCardInput | ReviewLogCreateOrConnectWithoutCardInput[]
    createMany?: ReviewLogCreateManyCardInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type ReviewLogUncheckedCreateNestedManyWithoutCardInput = {
    create?: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput> | ReviewLogCreateWithoutCardInput[] | ReviewLogUncheckedCreateWithoutCardInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutCardInput | ReviewLogCreateOrConnectWithoutCardInput[]
    createMany?: ReviewLogCreateManyCardInputEnvelope
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NoteUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<NoteCreateWithoutCardsInput, NoteUncheckedCreateWithoutCardsInput>
    connectOrCreate?: NoteCreateOrConnectWithoutCardsInput
    upsert?: NoteUpsertWithoutCardsInput
    connect?: NoteWhereUniqueInput
    update?: XOR<XOR<NoteUpdateToOneWithWhereWithoutCardsInput, NoteUpdateWithoutCardsInput>, NoteUncheckedUpdateWithoutCardsInput>
  }

  export type UserUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCardsInput
    upsert?: UserUpsertWithoutCardsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCardsInput, UserUpdateWithoutCardsInput>, UserUncheckedUpdateWithoutCardsInput>
  }

  export type DeckUpdateOneRequiredWithoutCardsNestedInput = {
    create?: XOR<DeckCreateWithoutCardsInput, DeckUncheckedCreateWithoutCardsInput>
    connectOrCreate?: DeckCreateOrConnectWithoutCardsInput
    upsert?: DeckUpsertWithoutCardsInput
    connect?: DeckWhereUniqueInput
    update?: XOR<XOR<DeckUpdateToOneWithWhereWithoutCardsInput, DeckUpdateWithoutCardsInput>, DeckUncheckedUpdateWithoutCardsInput>
  }

  export type ReviewLogUpdateManyWithoutCardNestedInput = {
    create?: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput> | ReviewLogCreateWithoutCardInput[] | ReviewLogUncheckedCreateWithoutCardInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutCardInput | ReviewLogCreateOrConnectWithoutCardInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutCardInput | ReviewLogUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: ReviewLogCreateManyCardInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutCardInput | ReviewLogUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutCardInput | ReviewLogUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type ReviewLogUncheckedUpdateManyWithoutCardNestedInput = {
    create?: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput> | ReviewLogCreateWithoutCardInput[] | ReviewLogUncheckedCreateWithoutCardInput[]
    connectOrCreate?: ReviewLogCreateOrConnectWithoutCardInput | ReviewLogCreateOrConnectWithoutCardInput[]
    upsert?: ReviewLogUpsertWithWhereUniqueWithoutCardInput | ReviewLogUpsertWithWhereUniqueWithoutCardInput[]
    createMany?: ReviewLogCreateManyCardInputEnvelope
    set?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    disconnect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    delete?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    connect?: ReviewLogWhereUniqueInput | ReviewLogWhereUniqueInput[]
    update?: ReviewLogUpdateWithWhereUniqueWithoutCardInput | ReviewLogUpdateWithWhereUniqueWithoutCardInput[]
    updateMany?: ReviewLogUpdateManyWithWhereWithoutCardInput | ReviewLogUpdateManyWithWhereWithoutCardInput[]
    deleteMany?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
  }

  export type CardCreateNestedOneWithoutLogsInput = {
    create?: XOR<CardCreateWithoutLogsInput, CardUncheckedCreateWithoutLogsInput>
    connectOrCreate?: CardCreateOrConnectWithoutLogsInput
    connect?: CardWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewLogsInput = {
    create?: XOR<UserCreateWithoutReviewLogsInput, UserUncheckedCreateWithoutReviewLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewLogsInput
    connect?: UserWhereUniqueInput
  }

  export type CardUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<CardCreateWithoutLogsInput, CardUncheckedCreateWithoutLogsInput>
    connectOrCreate?: CardCreateOrConnectWithoutLogsInput
    upsert?: CardUpsertWithoutLogsInput
    connect?: CardWhereUniqueInput
    update?: XOR<XOR<CardUpdateToOneWithWhereWithoutLogsInput, CardUpdateWithoutLogsInput>, CardUncheckedUpdateWithoutLogsInput>
  }

  export type UserUpdateOneRequiredWithoutReviewLogsNestedInput = {
    create?: XOR<UserCreateWithoutReviewLogsInput, UserUncheckedCreateWithoutReviewLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewLogsInput
    upsert?: UserUpsertWithoutReviewLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewLogsInput, UserUpdateWithoutReviewLogsInput>, UserUncheckedUpdateWithoutReviewLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DeckCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    parent?: DeckCreateNestedOneWithoutChildrenInput
    children?: DeckCreateNestedManyWithoutParentInput
    notes?: NoteCreateNestedManyWithoutDeckInput
    cards?: CardCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    children?: DeckUncheckedCreateNestedManyWithoutParentInput
    notes?: NoteUncheckedCreateNestedManyWithoutDeckInput
    cards?: CardUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckCreateOrConnectWithoutUserInput = {
    where: DeckWhereUniqueInput
    create: XOR<DeckCreateWithoutUserInput, DeckUncheckedCreateWithoutUserInput>
  }

  export type DeckCreateManyUserInputEnvelope = {
    data: DeckCreateManyUserInput | DeckCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NoteCreateWithoutUserInput = {
    id?: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    deck: DeckCreateNestedOneWithoutNotesInput
    cards?: CardCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutUserInput = {
    id?: string
    deckId: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutUserInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput>
  }

  export type NoteCreateManyUserInputEnvelope = {
    data: NoteCreateManyUserInput | NoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CardCreateWithoutUserInput = {
    id?: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    note: NoteCreateNestedOneWithoutCardsInput
    deck: DeckCreateNestedOneWithoutCardsInput
    logs?: ReviewLogCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutUserInput = {
    id?: string
    noteId: string
    deckId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ReviewLogUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutUserInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutUserInput, CardUncheckedCreateWithoutUserInput>
  }

  export type CardCreateManyUserInputEnvelope = {
    data: CardCreateManyUserInput | CardCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReviewLogCreateWithoutUserInput = {
    id?: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
    card: CardCreateNestedOneWithoutLogsInput
  }

  export type ReviewLogUncheckedCreateWithoutUserInput = {
    id?: string
    cardId: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
  }

  export type ReviewLogCreateOrConnectWithoutUserInput = {
    where: ReviewLogWhereUniqueInput
    create: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput>
  }

  export type ReviewLogCreateManyUserInputEnvelope = {
    data: ReviewLogCreateManyUserInput | ReviewLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DeckUpsertWithWhereUniqueWithoutUserInput = {
    where: DeckWhereUniqueInput
    update: XOR<DeckUpdateWithoutUserInput, DeckUncheckedUpdateWithoutUserInput>
    create: XOR<DeckCreateWithoutUserInput, DeckUncheckedCreateWithoutUserInput>
  }

  export type DeckUpdateWithWhereUniqueWithoutUserInput = {
    where: DeckWhereUniqueInput
    data: XOR<DeckUpdateWithoutUserInput, DeckUncheckedUpdateWithoutUserInput>
  }

  export type DeckUpdateManyWithWhereWithoutUserInput = {
    where: DeckScalarWhereInput
    data: XOR<DeckUpdateManyMutationInput, DeckUncheckedUpdateManyWithoutUserInput>
  }

  export type DeckScalarWhereInput = {
    AND?: DeckScalarWhereInput | DeckScalarWhereInput[]
    OR?: DeckScalarWhereInput[]
    NOT?: DeckScalarWhereInput | DeckScalarWhereInput[]
    id?: StringFilter<"Deck"> | string
    userId?: StringFilter<"Deck"> | string
    name?: StringFilter<"Deck"> | string
    description?: StringNullableFilter<"Deck"> | string | null
    parentId?: StringNullableFilter<"Deck"> | string | null
    createdAt?: DateTimeFilter<"Deck"> | Date | string
    updatedAt?: DateTimeFilter<"Deck"> | Date | string
    isFavorite?: BoolFilter<"Deck"> | boolean
    orderIndex?: IntFilter<"Deck"> | number
  }

  export type NoteUpsertWithWhereUniqueWithoutUserInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutUserInput, NoteUncheckedUpdateWithoutUserInput>
    create: XOR<NoteCreateWithoutUserInput, NoteUncheckedCreateWithoutUserInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutUserInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutUserInput, NoteUncheckedUpdateWithoutUserInput>
  }

  export type NoteUpdateManyWithWhereWithoutUserInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutUserInput>
  }

  export type NoteScalarWhereInput = {
    AND?: NoteScalarWhereInput | NoteScalarWhereInput[]
    OR?: NoteScalarWhereInput[]
    NOT?: NoteScalarWhereInput | NoteScalarWhereInput[]
    id?: StringFilter<"Note"> | string
    userId?: StringFilter<"Note"> | string
    deckId?: StringFilter<"Note"> | string
    content?: JsonFilter<"Note">
    tags?: StringNullableListFilter<"Note">
    noteType?: StringFilter<"Note"> | string
    createdAt?: DateTimeFilter<"Note"> | Date | string
    updatedAt?: DateTimeFilter<"Note"> | Date | string
  }

  export type CardUpsertWithWhereUniqueWithoutUserInput = {
    where: CardWhereUniqueInput
    update: XOR<CardUpdateWithoutUserInput, CardUncheckedUpdateWithoutUserInput>
    create: XOR<CardCreateWithoutUserInput, CardUncheckedCreateWithoutUserInput>
  }

  export type CardUpdateWithWhereUniqueWithoutUserInput = {
    where: CardWhereUniqueInput
    data: XOR<CardUpdateWithoutUserInput, CardUncheckedUpdateWithoutUserInput>
  }

  export type CardUpdateManyWithWhereWithoutUserInput = {
    where: CardScalarWhereInput
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyWithoutUserInput>
  }

  export type CardScalarWhereInput = {
    AND?: CardScalarWhereInput | CardScalarWhereInput[]
    OR?: CardScalarWhereInput[]
    NOT?: CardScalarWhereInput | CardScalarWhereInput[]
    id?: StringFilter<"Card"> | string
    noteId?: StringFilter<"Card"> | string
    userId?: StringFilter<"Card"> | string
    deckId?: StringFilter<"Card"> | string
    ord?: IntFilter<"Card"> | number
    front?: StringFilter<"Card"> | string
    back?: StringFilter<"Card"> | string
    due?: DateTimeFilter<"Card"> | Date | string
    stability?: FloatFilter<"Card"> | number
    difficulty?: FloatFilter<"Card"> | number
    elapsedDays?: IntFilter<"Card"> | number
    scheduledDays?: IntFilter<"Card"> | number
    reps?: IntFilter<"Card"> | number
    lapses?: IntFilter<"Card"> | number
    state?: IntFilter<"Card"> | number
    lastReview?: DateTimeNullableFilter<"Card"> | Date | string | null
    createdAt?: DateTimeFilter<"Card"> | Date | string
    updatedAt?: DateTimeFilter<"Card"> | Date | string
  }

  export type ReviewLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewLogWhereUniqueInput
    update: XOR<ReviewLogUpdateWithoutUserInput, ReviewLogUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewLogCreateWithoutUserInput, ReviewLogUncheckedCreateWithoutUserInput>
  }

  export type ReviewLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewLogWhereUniqueInput
    data: XOR<ReviewLogUpdateWithoutUserInput, ReviewLogUncheckedUpdateWithoutUserInput>
  }

  export type ReviewLogUpdateManyWithWhereWithoutUserInput = {
    where: ReviewLogScalarWhereInput
    data: XOR<ReviewLogUpdateManyMutationInput, ReviewLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ReviewLogScalarWhereInput = {
    AND?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
    OR?: ReviewLogScalarWhereInput[]
    NOT?: ReviewLogScalarWhereInput | ReviewLogScalarWhereInput[]
    id?: StringFilter<"ReviewLog"> | string
    cardId?: StringFilter<"ReviewLog"> | string
    userId?: StringFilter<"ReviewLog"> | string
    grade?: IntFilter<"ReviewLog"> | number
    reviewTime?: IntFilter<"ReviewLog"> | number
    state?: IntFilter<"ReviewLog"> | number
    scheduledDays?: IntFilter<"ReviewLog"> | number
    elapsedDays?: IntFilter<"ReviewLog"> | number
    reviewDate?: DateTimeFilter<"ReviewLog"> | Date | string
  }

  export type UserCreateWithoutDecksInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    notes?: NoteCreateNestedManyWithoutUserInput
    cards?: CardCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDecksInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
    cards?: CardUncheckedCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDecksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDecksInput, UserUncheckedCreateWithoutDecksInput>
  }

  export type DeckCreateWithoutChildrenInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    user: UserCreateNestedOneWithoutDecksInput
    parent?: DeckCreateNestedOneWithoutChildrenInput
    notes?: NoteCreateNestedManyWithoutDeckInput
    cards?: CardCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateWithoutChildrenInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    notes?: NoteUncheckedCreateNestedManyWithoutDeckInput
    cards?: CardUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckCreateOrConnectWithoutChildrenInput = {
    where: DeckWhereUniqueInput
    create: XOR<DeckCreateWithoutChildrenInput, DeckUncheckedCreateWithoutChildrenInput>
  }

  export type DeckCreateWithoutParentInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    user: UserCreateNestedOneWithoutDecksInput
    children?: DeckCreateNestedManyWithoutParentInput
    notes?: NoteCreateNestedManyWithoutDeckInput
    cards?: CardCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateWithoutParentInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    children?: DeckUncheckedCreateNestedManyWithoutParentInput
    notes?: NoteUncheckedCreateNestedManyWithoutDeckInput
    cards?: CardUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckCreateOrConnectWithoutParentInput = {
    where: DeckWhereUniqueInput
    create: XOR<DeckCreateWithoutParentInput, DeckUncheckedCreateWithoutParentInput>
  }

  export type DeckCreateManyParentInputEnvelope = {
    data: DeckCreateManyParentInput | DeckCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type NoteCreateWithoutDeckInput = {
    id?: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotesInput
    cards?: CardCreateNestedManyWithoutNoteInput
  }

  export type NoteUncheckedCreateWithoutDeckInput = {
    id?: string
    userId: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cards?: CardUncheckedCreateNestedManyWithoutNoteInput
  }

  export type NoteCreateOrConnectWithoutDeckInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutDeckInput, NoteUncheckedCreateWithoutDeckInput>
  }

  export type NoteCreateManyDeckInputEnvelope = {
    data: NoteCreateManyDeckInput | NoteCreateManyDeckInput[]
    skipDuplicates?: boolean
  }

  export type CardCreateWithoutDeckInput = {
    id?: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    note: NoteCreateNestedOneWithoutCardsInput
    user: UserCreateNestedOneWithoutCardsInput
    logs?: ReviewLogCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutDeckInput = {
    id?: string
    noteId: string
    userId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ReviewLogUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutDeckInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput>
  }

  export type CardCreateManyDeckInputEnvelope = {
    data: CardCreateManyDeckInput | CardCreateManyDeckInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDecksInput = {
    update: XOR<UserUpdateWithoutDecksInput, UserUncheckedUpdateWithoutDecksInput>
    create: XOR<UserCreateWithoutDecksInput, UserUncheckedCreateWithoutDecksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDecksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDecksInput, UserUncheckedUpdateWithoutDecksInput>
  }

  export type UserUpdateWithoutDecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NoteUpdateManyWithoutUserNestedInput
    cards?: CardUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDecksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
    cards?: CardUncheckedUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DeckUpsertWithoutChildrenInput = {
    update: XOR<DeckUpdateWithoutChildrenInput, DeckUncheckedUpdateWithoutChildrenInput>
    create: XOR<DeckCreateWithoutChildrenInput, DeckUncheckedCreateWithoutChildrenInput>
    where?: DeckWhereInput
  }

  export type DeckUpdateToOneWithWhereWithoutChildrenInput = {
    where?: DeckWhereInput
    data: XOR<DeckUpdateWithoutChildrenInput, DeckUncheckedUpdateWithoutChildrenInput>
  }

  export type DeckUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutDecksNestedInput
    parent?: DeckUpdateOneWithoutChildrenNestedInput
    notes?: NoteUpdateManyWithoutDeckNestedInput
    cards?: CardUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    notes?: NoteUncheckedUpdateManyWithoutDeckNestedInput
    cards?: CardUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type DeckUpsertWithWhereUniqueWithoutParentInput = {
    where: DeckWhereUniqueInput
    update: XOR<DeckUpdateWithoutParentInput, DeckUncheckedUpdateWithoutParentInput>
    create: XOR<DeckCreateWithoutParentInput, DeckUncheckedCreateWithoutParentInput>
  }

  export type DeckUpdateWithWhereUniqueWithoutParentInput = {
    where: DeckWhereUniqueInput
    data: XOR<DeckUpdateWithoutParentInput, DeckUncheckedUpdateWithoutParentInput>
  }

  export type DeckUpdateManyWithWhereWithoutParentInput = {
    where: DeckScalarWhereInput
    data: XOR<DeckUpdateManyMutationInput, DeckUncheckedUpdateManyWithoutParentInput>
  }

  export type NoteUpsertWithWhereUniqueWithoutDeckInput = {
    where: NoteWhereUniqueInput
    update: XOR<NoteUpdateWithoutDeckInput, NoteUncheckedUpdateWithoutDeckInput>
    create: XOR<NoteCreateWithoutDeckInput, NoteUncheckedCreateWithoutDeckInput>
  }

  export type NoteUpdateWithWhereUniqueWithoutDeckInput = {
    where: NoteWhereUniqueInput
    data: XOR<NoteUpdateWithoutDeckInput, NoteUncheckedUpdateWithoutDeckInput>
  }

  export type NoteUpdateManyWithWhereWithoutDeckInput = {
    where: NoteScalarWhereInput
    data: XOR<NoteUpdateManyMutationInput, NoteUncheckedUpdateManyWithoutDeckInput>
  }

  export type CardUpsertWithWhereUniqueWithoutDeckInput = {
    where: CardWhereUniqueInput
    update: XOR<CardUpdateWithoutDeckInput, CardUncheckedUpdateWithoutDeckInput>
    create: XOR<CardCreateWithoutDeckInput, CardUncheckedCreateWithoutDeckInput>
  }

  export type CardUpdateWithWhereUniqueWithoutDeckInput = {
    where: CardWhereUniqueInput
    data: XOR<CardUpdateWithoutDeckInput, CardUncheckedUpdateWithoutDeckInput>
  }

  export type CardUpdateManyWithWhereWithoutDeckInput = {
    where: CardScalarWhereInput
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyWithoutDeckInput>
  }

  export type UserCreateWithoutNotesInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    decks?: DeckCreateNestedManyWithoutUserInput
    cards?: CardCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotesInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    decks?: DeckUncheckedCreateNestedManyWithoutUserInput
    cards?: CardUncheckedCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
  }

  export type DeckCreateWithoutNotesInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    user: UserCreateNestedOneWithoutDecksInput
    parent?: DeckCreateNestedOneWithoutChildrenInput
    children?: DeckCreateNestedManyWithoutParentInput
    cards?: CardCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateWithoutNotesInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    children?: DeckUncheckedCreateNestedManyWithoutParentInput
    cards?: CardUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckCreateOrConnectWithoutNotesInput = {
    where: DeckWhereUniqueInput
    create: XOR<DeckCreateWithoutNotesInput, DeckUncheckedCreateWithoutNotesInput>
  }

  export type CardCreateWithoutNoteInput = {
    id?: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCardsInput
    deck: DeckCreateNestedOneWithoutCardsInput
    logs?: ReviewLogCreateNestedManyWithoutCardInput
  }

  export type CardUncheckedCreateWithoutNoteInput = {
    id?: string
    userId: string
    deckId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: ReviewLogUncheckedCreateNestedManyWithoutCardInput
  }

  export type CardCreateOrConnectWithoutNoteInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutNoteInput, CardUncheckedCreateWithoutNoteInput>
  }

  export type CardCreateManyNoteInputEnvelope = {
    data: CardCreateManyNoteInput | CardCreateManyNoteInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutNotesInput = {
    update: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
    create: XOR<UserCreateWithoutNotesInput, UserUncheckedCreateWithoutNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotesInput, UserUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    decks?: DeckUpdateManyWithoutUserNestedInput
    cards?: CardUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    decks?: DeckUncheckedUpdateManyWithoutUserNestedInput
    cards?: CardUncheckedUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DeckUpsertWithoutNotesInput = {
    update: XOR<DeckUpdateWithoutNotesInput, DeckUncheckedUpdateWithoutNotesInput>
    create: XOR<DeckCreateWithoutNotesInput, DeckUncheckedCreateWithoutNotesInput>
    where?: DeckWhereInput
  }

  export type DeckUpdateToOneWithWhereWithoutNotesInput = {
    where?: DeckWhereInput
    data: XOR<DeckUpdateWithoutNotesInput, DeckUncheckedUpdateWithoutNotesInput>
  }

  export type DeckUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutDecksNestedInput
    parent?: DeckUpdateOneWithoutChildrenNestedInput
    children?: DeckUpdateManyWithoutParentNestedInput
    cards?: CardUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    children?: DeckUncheckedUpdateManyWithoutParentNestedInput
    cards?: CardUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type CardUpsertWithWhereUniqueWithoutNoteInput = {
    where: CardWhereUniqueInput
    update: XOR<CardUpdateWithoutNoteInput, CardUncheckedUpdateWithoutNoteInput>
    create: XOR<CardCreateWithoutNoteInput, CardUncheckedCreateWithoutNoteInput>
  }

  export type CardUpdateWithWhereUniqueWithoutNoteInput = {
    where: CardWhereUniqueInput
    data: XOR<CardUpdateWithoutNoteInput, CardUncheckedUpdateWithoutNoteInput>
  }

  export type CardUpdateManyWithWhereWithoutNoteInput = {
    where: CardScalarWhereInput
    data: XOR<CardUpdateManyMutationInput, CardUncheckedUpdateManyWithoutNoteInput>
  }

  export type NoteCreateWithoutCardsInput = {
    id?: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotesInput
    deck: DeckCreateNestedOneWithoutNotesInput
  }

  export type NoteUncheckedCreateWithoutCardsInput = {
    id?: string
    userId: string
    deckId: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoteCreateOrConnectWithoutCardsInput = {
    where: NoteWhereUniqueInput
    create: XOR<NoteCreateWithoutCardsInput, NoteUncheckedCreateWithoutCardsInput>
  }

  export type UserCreateWithoutCardsInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    decks?: DeckCreateNestedManyWithoutUserInput
    notes?: NoteCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCardsInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    decks?: DeckUncheckedCreateNestedManyWithoutUserInput
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
    reviewLogs?: ReviewLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCardsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
  }

  export type DeckCreateWithoutCardsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    user: UserCreateNestedOneWithoutDecksInput
    parent?: DeckCreateNestedOneWithoutChildrenInput
    children?: DeckCreateNestedManyWithoutParentInput
    notes?: NoteCreateNestedManyWithoutDeckInput
  }

  export type DeckUncheckedCreateWithoutCardsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
    children?: DeckUncheckedCreateNestedManyWithoutParentInput
    notes?: NoteUncheckedCreateNestedManyWithoutDeckInput
  }

  export type DeckCreateOrConnectWithoutCardsInput = {
    where: DeckWhereUniqueInput
    create: XOR<DeckCreateWithoutCardsInput, DeckUncheckedCreateWithoutCardsInput>
  }

  export type ReviewLogCreateWithoutCardInput = {
    id?: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
    user: UserCreateNestedOneWithoutReviewLogsInput
  }

  export type ReviewLogUncheckedCreateWithoutCardInput = {
    id?: string
    userId: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
  }

  export type ReviewLogCreateOrConnectWithoutCardInput = {
    where: ReviewLogWhereUniqueInput
    create: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput>
  }

  export type ReviewLogCreateManyCardInputEnvelope = {
    data: ReviewLogCreateManyCardInput | ReviewLogCreateManyCardInput[]
    skipDuplicates?: boolean
  }

  export type NoteUpsertWithoutCardsInput = {
    update: XOR<NoteUpdateWithoutCardsInput, NoteUncheckedUpdateWithoutCardsInput>
    create: XOR<NoteCreateWithoutCardsInput, NoteUncheckedCreateWithoutCardsInput>
    where?: NoteWhereInput
  }

  export type NoteUpdateToOneWithWhereWithoutCardsInput = {
    where?: NoteWhereInput
    data: XOR<NoteUpdateWithoutCardsInput, NoteUncheckedUpdateWithoutCardsInput>
  }

  export type NoteUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotesNestedInput
    deck?: DeckUpdateOneRequiredWithoutNotesNestedInput
  }

  export type NoteUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutCardsInput = {
    update: XOR<UserUpdateWithoutCardsInput, UserUncheckedUpdateWithoutCardsInput>
    create: XOR<UserCreateWithoutCardsInput, UserUncheckedCreateWithoutCardsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCardsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCardsInput, UserUncheckedUpdateWithoutCardsInput>
  }

  export type UserUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    decks?: DeckUpdateManyWithoutUserNestedInput
    notes?: NoteUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    decks?: DeckUncheckedUpdateManyWithoutUserNestedInput
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
    reviewLogs?: ReviewLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DeckUpsertWithoutCardsInput = {
    update: XOR<DeckUpdateWithoutCardsInput, DeckUncheckedUpdateWithoutCardsInput>
    create: XOR<DeckCreateWithoutCardsInput, DeckUncheckedCreateWithoutCardsInput>
    where?: DeckWhereInput
  }

  export type DeckUpdateToOneWithWhereWithoutCardsInput = {
    where?: DeckWhereInput
    data: XOR<DeckUpdateWithoutCardsInput, DeckUncheckedUpdateWithoutCardsInput>
  }

  export type DeckUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutDecksNestedInput
    parent?: DeckUpdateOneWithoutChildrenNestedInput
    children?: DeckUpdateManyWithoutParentNestedInput
    notes?: NoteUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateWithoutCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    children?: DeckUncheckedUpdateManyWithoutParentNestedInput
    notes?: NoteUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type ReviewLogUpsertWithWhereUniqueWithoutCardInput = {
    where: ReviewLogWhereUniqueInput
    update: XOR<ReviewLogUpdateWithoutCardInput, ReviewLogUncheckedUpdateWithoutCardInput>
    create: XOR<ReviewLogCreateWithoutCardInput, ReviewLogUncheckedCreateWithoutCardInput>
  }

  export type ReviewLogUpdateWithWhereUniqueWithoutCardInput = {
    where: ReviewLogWhereUniqueInput
    data: XOR<ReviewLogUpdateWithoutCardInput, ReviewLogUncheckedUpdateWithoutCardInput>
  }

  export type ReviewLogUpdateManyWithWhereWithoutCardInput = {
    where: ReviewLogScalarWhereInput
    data: XOR<ReviewLogUpdateManyMutationInput, ReviewLogUncheckedUpdateManyWithoutCardInput>
  }

  export type CardCreateWithoutLogsInput = {
    id?: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    note: NoteCreateNestedOneWithoutCardsInput
    user: UserCreateNestedOneWithoutCardsInput
    deck: DeckCreateNestedOneWithoutCardsInput
  }

  export type CardUncheckedCreateWithoutLogsInput = {
    id?: string
    noteId: string
    userId: string
    deckId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardCreateOrConnectWithoutLogsInput = {
    where: CardWhereUniqueInput
    create: XOR<CardCreateWithoutLogsInput, CardUncheckedCreateWithoutLogsInput>
  }

  export type UserCreateWithoutReviewLogsInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    decks?: DeckCreateNestedManyWithoutUserInput
    notes?: NoteCreateNestedManyWithoutUserInput
    cards?: CardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewLogsInput = {
    id?: string
    email: string
    passwordHash: string
    username?: string | null
    preferredLanguage?: string
    colorScheme?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    decks?: DeckUncheckedCreateNestedManyWithoutUserInput
    notes?: NoteUncheckedCreateNestedManyWithoutUserInput
    cards?: CardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewLogsInput, UserUncheckedCreateWithoutReviewLogsInput>
  }

  export type CardUpsertWithoutLogsInput = {
    update: XOR<CardUpdateWithoutLogsInput, CardUncheckedUpdateWithoutLogsInput>
    create: XOR<CardCreateWithoutLogsInput, CardUncheckedCreateWithoutLogsInput>
    where?: CardWhereInput
  }

  export type CardUpdateToOneWithWhereWithoutLogsInput = {
    where?: CardWhereInput
    data: XOR<CardUpdateWithoutLogsInput, CardUncheckedUpdateWithoutLogsInput>
  }

  export type CardUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NoteUpdateOneRequiredWithoutCardsNestedInput
    user?: UserUpdateOneRequiredWithoutCardsNestedInput
    deck?: DeckUpdateOneRequiredWithoutCardsNestedInput
  }

  export type CardUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutReviewLogsInput = {
    update: XOR<UserUpdateWithoutReviewLogsInput, UserUncheckedUpdateWithoutReviewLogsInput>
    create: XOR<UserCreateWithoutReviewLogsInput, UserUncheckedCreateWithoutReviewLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewLogsInput, UserUncheckedUpdateWithoutReviewLogsInput>
  }

  export type UserUpdateWithoutReviewLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    decks?: DeckUpdateManyWithoutUserNestedInput
    notes?: NoteUpdateManyWithoutUserNestedInput
    cards?: CardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    colorScheme?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    decks?: DeckUncheckedUpdateManyWithoutUserNestedInput
    notes?: NoteUncheckedUpdateManyWithoutUserNestedInput
    cards?: CardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DeckCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
  }

  export type NoteCreateManyUserInput = {
    id?: string
    deckId: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardCreateManyUserInput = {
    id?: string
    noteId: string
    deckId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewLogCreateManyUserInput = {
    id?: string
    cardId: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
  }

  export type DeckUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    parent?: DeckUpdateOneWithoutChildrenNestedInput
    children?: DeckUpdateManyWithoutParentNestedInput
    notes?: NoteUpdateManyWithoutDeckNestedInput
    cards?: CardUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    children?: DeckUncheckedUpdateManyWithoutParentNestedInput
    notes?: NoteUncheckedUpdateManyWithoutDeckNestedInput
    cards?: CardUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type NoteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deck?: DeckUpdateOneRequiredWithoutNotesNestedInput
    cards?: CardUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NoteUpdateOneRequiredWithoutCardsNestedInput
    deck?: DeckUpdateOneRequiredWithoutCardsNestedInput
    logs?: ReviewLogUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ReviewLogUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    card?: CardUpdateOneRequiredWithoutLogsNestedInput
  }

  export type ReviewLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeckCreateManyParentInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isFavorite?: boolean
    orderIndex?: number
  }

  export type NoteCreateManyDeckInput = {
    id?: string
    userId: string
    content: JsonNullValueInput | InputJsonValue
    tags?: NoteCreatetagsInput | string[]
    noteType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardCreateManyDeckInput = {
    id?: string
    noteId: string
    userId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeckUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutDecksNestedInput
    children?: DeckUpdateManyWithoutParentNestedInput
    notes?: NoteUpdateManyWithoutDeckNestedInput
    cards?: CardUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
    children?: DeckUncheckedUpdateManyWithoutParentNestedInput
    notes?: NoteUncheckedUpdateManyWithoutDeckNestedInput
    cards?: CardUncheckedUpdateManyWithoutDeckNestedInput
  }

  export type DeckUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    orderIndex?: IntFieldUpdateOperationsInput | number
  }

  export type NoteUpdateWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotesNestedInput
    cards?: CardUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cards?: CardUncheckedUpdateManyWithoutNoteNestedInput
  }

  export type NoteUncheckedUpdateManyWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    tags?: NoteUpdatetagsInput | string[]
    noteType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardUpdateWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NoteUpdateOneRequiredWithoutCardsNestedInput
    user?: UserUpdateOneRequiredWithoutCardsNestedInput
    logs?: ReviewLogUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ReviewLogUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateManyWithoutDeckInput = {
    id?: StringFieldUpdateOperationsInput | string
    noteId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardCreateManyNoteInput = {
    id?: string
    userId: string
    deckId: string
    ord?: number
    front?: string
    back?: string
    due?: Date | string
    stability?: number
    difficulty?: number
    elapsedDays?: number
    scheduledDays?: number
    reps?: number
    lapses?: number
    state?: number
    lastReview?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CardUpdateWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCardsNestedInput
    deck?: DeckUpdateOneRequiredWithoutCardsNestedInput
    logs?: ReviewLogUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: ReviewLogUncheckedUpdateManyWithoutCardNestedInput
  }

  export type CardUncheckedUpdateManyWithoutNoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    deckId?: StringFieldUpdateOperationsInput | string
    ord?: IntFieldUpdateOperationsInput | number
    front?: StringFieldUpdateOperationsInput | string
    back?: StringFieldUpdateOperationsInput | string
    due?: DateTimeFieldUpdateOperationsInput | Date | string
    stability?: FloatFieldUpdateOperationsInput | number
    difficulty?: FloatFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    reps?: IntFieldUpdateOperationsInput | number
    lapses?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    lastReview?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogCreateManyCardInput = {
    id?: string
    userId: string
    grade: number
    reviewTime: number
    state: number
    scheduledDays: number
    elapsedDays: number
    reviewDate?: Date | string
  }

  export type ReviewLogUpdateWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewLogsNestedInput
  }

  export type ReviewLogUncheckedUpdateWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewLogUncheckedUpdateManyWithoutCardInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    reviewTime?: IntFieldUpdateOperationsInput | number
    state?: IntFieldUpdateOperationsInput | number
    scheduledDays?: IntFieldUpdateOperationsInput | number
    elapsedDays?: IntFieldUpdateOperationsInput | number
    reviewDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeckCountOutputTypeDefaultArgs instead
     */
    export type DeckCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeckCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NoteCountOutputTypeDefaultArgs instead
     */
    export type NoteCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NoteCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CardCountOutputTypeDefaultArgs instead
     */
    export type CardCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CardCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DeckDefaultArgs instead
     */
    export type DeckArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DeckDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NoteDefaultArgs instead
     */
    export type NoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CardDefaultArgs instead
     */
    export type CardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CardDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewLogDefaultArgs instead
     */
    export type ReviewLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}