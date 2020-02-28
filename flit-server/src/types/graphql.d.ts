import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Channel = {
   __typename?: 'Channel',
  name?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
};

export type ChannelResult = {
   __typename?: 'ChannelResult',
  cursor: Scalars['String'],
  hasMore: Scalars['Boolean'],
  channels: Array<Maybe<Channel>>,
};

export type Member = {
   __typename?: 'Member',
  name?: Maybe<Scalars['String']>,
};

export type MemberResult = {
   __typename?: 'MemberResult',
  cursor: Scalars['String'],
  hasMore: Scalars['Boolean'],
  channels: Array<Maybe<Member>>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addChannel?: Maybe<Channel>,
};


export type MutationAddChannelArgs = {
  name?: Maybe<Scalars['String']>
};

export type Query = {
   __typename?: 'Query',
  members: MemberResult,
  channels: ChannelResult,
  channel?: Maybe<Channel>,
};


export type QueryMembersArgs = {
  pageSize?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>
};


export type QueryChannelsArgs = {
  pageSize?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['String']>
};


export type QueryChannelArgs = {
  id: Scalars['ID']
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  MemberResult: ResolverTypeWrapper<MemberResult>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Member: ResolverTypeWrapper<Member>,
  ChannelResult: ResolverTypeWrapper<ChannelResult>,
  Channel: ResolverTypeWrapper<Channel>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Mutation: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Int: Scalars['Int'],
  String: Scalars['String'],
  MemberResult: MemberResult,
  Boolean: Scalars['Boolean'],
  Member: Member,
  ChannelResult: ChannelResult,
  Channel: Channel,
  ID: Scalars['ID'],
  Mutation: {},
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ChannelResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChannelResult'] = ResolversParentTypes['ChannelResult']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  channels?: Resolver<Array<Maybe<ResolversTypes['Channel']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MemberResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberResult'] = ResolversParentTypes['MemberResult']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  channels?: Resolver<Array<Maybe<ResolversTypes['Member']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addChannel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, MutationAddChannelArgs>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  members?: Resolver<ResolversTypes['MemberResult'], ParentType, ContextType, QueryMembersArgs>,
  channels?: Resolver<ResolversTypes['ChannelResult'], ParentType, ContextType, QueryChannelsArgs>,
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QueryChannelArgs, 'id'>>,
};

export type Resolvers<ContextType = any> = {
  Channel?: ChannelResolvers<ContextType>,
  ChannelResult?: ChannelResultResolvers<ContextType>,
  Member?: MemberResolvers<ContextType>,
  MemberResult?: MemberResultResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
