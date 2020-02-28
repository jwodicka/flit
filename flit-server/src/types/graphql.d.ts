export type Maybe<T> = T | null;
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
