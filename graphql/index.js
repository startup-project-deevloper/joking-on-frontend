import gql from "graphql-tag";

const typeDefs = gql`
  input FileInfoInput {
    name: String
    alternativeText: String
    caption: String
  }

  type UsersPermissionsMe {
    id: ID!
    username: String!
    email: String!
    confirmed: Boolean
    blocked: Boolean
    role: UsersPermissionsMeRole
  }

  type UsersPermissionsMeRole {
    id: ID!
    name: String!
    description: String
    type: String
  }

  input UsersPermissionsRegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input UsersPermissionsLoginInput {
    identifier: String!
    password: String!
    provider: String = "local"
  }

  type UsersPermissionsLoginPayload {
    jwt: String
    user: UsersPermissionsMe!
  }

  type UserPermissionsPasswordPayload {
    ok: Boolean!
  }

  enum ENUM_ADDRESS_TYPE {
    Ethereum
    Matic
  }

  type Address {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    name: String
    owner: UsersPermissionsUser
    type: ENUM_ADDRESS_TYPE
    isActive: Boolean
    publicKey: String
    uid: String
    published_at: DateTime
  }

  type AddressConnection {
    values: [Address]
    groupBy: AddressGroupBy
    aggregate: AddressAggregator
  }

  type AddressAggregator {
    count: Int
    totalCount: Int
  }

  type AddressGroupBy {
    id: [AddressConnectionId]
    created_at: [AddressConnectionCreated_at]
    updated_at: [AddressConnectionUpdated_at]
    name: [AddressConnectionName]
    owner: [AddressConnectionOwner]
    type: [AddressConnectionType]
    isActive: [AddressConnectionIsActive]
    publicKey: [AddressConnectionPublicKey]
    uid: [AddressConnectionUid]
    published_at: [AddressConnectionPublished_at]
  }

  type AddressConnectionId {
    key: ID
    connection: AddressConnection
  }

  type AddressConnectionCreated_at {
    key: DateTime
    connection: AddressConnection
  }

  type AddressConnectionUpdated_at {
    key: DateTime
    connection: AddressConnection
  }

  type AddressConnectionName {
    key: String
    connection: AddressConnection
  }

  type AddressConnectionOwner {
    key: ID
    connection: AddressConnection
  }

  type AddressConnectionType {
    key: String
    connection: AddressConnection
  }

  type AddressConnectionIsActive {
    key: Boolean
    connection: AddressConnection
  }

  type AddressConnectionPublicKey {
    key: String
    connection: AddressConnection
  }

  type AddressConnectionUid {
    key: String
    connection: AddressConnection
  }

  type AddressConnectionPublished_at {
    key: DateTime
    connection: AddressConnection
  }

  input AddressInput {
    name: String
    owner: ID
    type: ENUM_ADDRESS_TYPE
    isActive: Boolean
    publicKey: String
    privateKey: String
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editAddressInput {
    name: String
    owner: ID
    type: ENUM_ADDRESS_TYPE
    isActive: Boolean
    publicKey: String
    privateKey: String
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createAddressInput {
    data: AddressInput
  }

  type createAddressPayload {
    address: Address
  }

  input updateAddressInput {
    where: InputID
    data: editAddressInput
  }

  type updateAddressPayload {
    address: Address
  }

  input deleteAddressInput {
    where: InputID
  }

  type deleteAddressPayload {
    address: Address
  }

  type Avatar {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    owner: UsersPermissionsUser
    content: JSON
    uid: String
    published_at: DateTime
    items(sort: String, limit: Int, start: Int, where: JSON): [Item]
  }

  type AvatarConnection {
    values: [Avatar]
    groupBy: AvatarGroupBy
    aggregate: AvatarAggregator
  }

  type AvatarAggregator {
    count: Int
    totalCount: Int
  }

  type AvatarGroupBy {
    id: [AvatarConnectionId]
    created_at: [AvatarConnectionCreated_at]
    updated_at: [AvatarConnectionUpdated_at]
    owner: [AvatarConnectionOwner]
    content: [AvatarConnectionContent]
    uid: [AvatarConnectionUid]
    published_at: [AvatarConnectionPublished_at]
  }

  type AvatarConnectionId {
    key: ID
    connection: AvatarConnection
  }

  type AvatarConnectionCreated_at {
    key: DateTime
    connection: AvatarConnection
  }

  type AvatarConnectionUpdated_at {
    key: DateTime
    connection: AvatarConnection
  }

  type AvatarConnectionOwner {
    key: ID
    connection: AvatarConnection
  }

  type AvatarConnectionContent {
    key: JSON
    connection: AvatarConnection
  }

  type AvatarConnectionUid {
    key: String
    connection: AvatarConnection
  }

  type AvatarConnectionPublished_at {
    key: DateTime
    connection: AvatarConnection
  }

  input AvatarInput {
    owner: ID
    content: JSON
    items: [ID]
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editAvatarInput {
    owner: ID
    content: JSON
    items: [ID]
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createAvatarInput {
    data: AvatarInput
  }

  type createAvatarPayload {
    avatar: Avatar
  }

  input updateAvatarInput {
    where: InputID
    data: editAvatarInput
  }

  type updateAvatarPayload {
    avatar: Avatar
  }

  input deleteAvatarInput {
    where: InputID
  }

  type deleteAvatarPayload {
    avatar: Avatar
  }

  type Comment {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    content: String
    publishedAt: DateTime
    laughs: Long
    video: Video
    owner: UsersPermissionsUser
    parent: Comment
    published_at: DateTime
    laughers(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
    children(sort: String, limit: Int, start: Int, where: JSON): [Comment]
  }

  type CommentConnection {
    values: [Comment]
    groupBy: CommentGroupBy
    aggregate: CommentAggregator
  }

  type CommentAggregator {
    count: Int
    totalCount: Int
  }

  type CommentGroupBy {
    id: [CommentConnectionId]
    created_at: [CommentConnectionCreated_at]
    updated_at: [CommentConnectionUpdated_at]
    content: [CommentConnectionContent]
    publishedAt: [CommentConnectionPublishedAt]
    laughs: [CommentConnectionLaughs]
    video: [CommentConnectionVideo]
    owner: [CommentConnectionOwner]
    parent: [CommentConnectionParent]
    published_at: [CommentConnectionPublished_at]
  }

  type CommentConnectionId {
    key: ID
    connection: CommentConnection
  }

  type CommentConnectionCreated_at {
    key: DateTime
    connection: CommentConnection
  }

  type CommentConnectionUpdated_at {
    key: DateTime
    connection: CommentConnection
  }

  type CommentConnectionContent {
    key: String
    connection: CommentConnection
  }

  type CommentConnectionPublishedAt {
    key: DateTime
    connection: CommentConnection
  }

  type CommentConnectionLaughs {
    key: ID
    connection: CommentConnection
  }

  type CommentConnectionVideo {
    key: ID
    connection: CommentConnection
  }

  type CommentConnectionOwner {
    key: ID
    connection: CommentConnection
  }

  type CommentConnectionParent {
    key: ID
    connection: CommentConnection
  }

  type CommentConnectionPublished_at {
    key: DateTime
    connection: CommentConnection
  }

  input CommentInput {
    content: String
    publishedAt: DateTime
    laughs: Long
    video: ID
    laughers: [ID]
    owner: ID
    children: [ID]
    parent: ID
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editCommentInput {
    content: String
    publishedAt: DateTime
    laughs: Long
    video: ID
    laughers: [ID]
    owner: ID
    children: [ID]
    parent: ID
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createCommentInput {
    data: CommentInput
  }

  type createCommentPayload {
    comment: Comment
  }

  input updateCommentInput {
    where: InputID
    data: editCommentInput
  }

  type updateCommentPayload {
    comment: Comment
  }

  input deleteCommentInput {
    where: InputID
  }

  type deleteCommentPayload {
    comment: Comment
  }

  type Community {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    mostRecentPeroidStart: Date
    mostRecentPeroidEnd: Date
    peroidDurationInDays: Int
    totalPoolLaughs: Long
    locale: String
    usersActive(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
    comediansActive(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
    commentsInPeriod(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [Comment]
    videosPublishedInPeroid(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [Address]
    localizations(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [Community]
  }

  input CommunityInput {
    mostRecentPeroidStart: Date
    mostRecentPeroidEnd: Date
    usersActive: [ID]
    peroidDurationInDays: Int
    totalPoolLaughs: Long
    comediansActive: [ID]
    commentsInPeriod: [ID]
    videosPublishedInPeroid: [ID]
    localizations: [ID]
    locale: String
    created_by: ID
    updated_by: ID
  }

  input editCommunityInput {
    mostRecentPeroidStart: Date
    mostRecentPeroidEnd: Date
    usersActive: [ID]
    peroidDurationInDays: Int
    totalPoolLaughs: Long
    comediansActive: [ID]
    commentsInPeriod: [ID]
    videosPublishedInPeroid: [ID]
    localizations: [ID]
    locale: String
    created_by: ID
    updated_by: ID
  }

  input updateCommunityInput {
    data: editCommunityInput
  }

  type updateCommunityPayload {
    community: Community
  }

  type deleteCommunityPayload {
    community: Community
  }

  type Item {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    name: String
    nonfungibleToken: NonfungibleToken
    content: JSON
    isActive: Boolean
    published_at: DateTime
    owners(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
    tags(sort: String, limit: Int, start: Int, where: JSON): [Tag]
  }

  type ItemConnection {
    values: [Item]
    groupBy: ItemGroupBy
    aggregate: ItemAggregator
  }

  type ItemAggregator {
    count: Int
    totalCount: Int
  }

  type ItemGroupBy {
    id: [ItemConnectionId]
    created_at: [ItemConnectionCreated_at]
    updated_at: [ItemConnectionUpdated_at]
    name: [ItemConnectionName]
    nonfungibleToken: [ItemConnectionNonfungibleToken]
    content: [ItemConnectionContent]
    isActive: [ItemConnectionIsActive]
    published_at: [ItemConnectionPublished_at]
  }

  type ItemConnectionId {
    key: ID
    connection: ItemConnection
  }

  type ItemConnectionCreated_at {
    key: DateTime
    connection: ItemConnection
  }

  type ItemConnectionUpdated_at {
    key: DateTime
    connection: ItemConnection
  }

  type ItemConnectionName {
    key: String
    connection: ItemConnection
  }

  type ItemConnectionNonfungibleToken {
    key: ID
    connection: ItemConnection
  }

  type ItemConnectionContent {
    key: JSON
    connection: ItemConnection
  }

  type ItemConnectionIsActive {
    key: Boolean
    connection: ItemConnection
  }

  type ItemConnectionPublished_at {
    key: DateTime
    connection: ItemConnection
  }

  input ItemInput {
    name: String
    nonfungibleToken: ID
    content: JSON
    owners: [ID]
    isActive: Boolean
    tags: [ID]
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editItemInput {
    name: String
    nonfungibleToken: ID
    content: JSON
    owners: [ID]
    isActive: Boolean
    tags: [ID]
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createItemInput {
    data: ItemInput
  }

  type createItemPayload {
    item: Item
  }

  input updateItemInput {
    where: InputID
    data: editItemInput
  }

  type updateItemPayload {
    item: Item
  }

  input deleteItemInput {
    where: InputID
  }

  type deleteItemPayload {
    item: Item
  }

  type LaughPoint {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    user: UsersPermissionsUser
    score: Int
    uid: String
    start: Float
    end: Float
    video: Video
    published_at: DateTime
  }

  type LaughPointConnection {
    values: [LaughPoint]
    groupBy: LaughPointGroupBy
    aggregate: LaughPointAggregator
  }

  type LaughPointAggregator {
    count: Int
    totalCount: Int
    sum: LaughPointAggregatorSum
    avg: LaughPointAggregatorAvg
    min: LaughPointAggregatorMin
    max: LaughPointAggregatorMax
  }

  type LaughPointAggregatorSum {
    score: Float
    start: Float
    end: Float
  }

  type LaughPointAggregatorAvg {
    score: Float
    start: Float
    end: Float
  }

  type LaughPointAggregatorMin {
    score: Float
    start: Float
    end: Float
  }

  type LaughPointAggregatorMax {
    score: Float
    start: Float
    end: Float
  }

  type LaughPointGroupBy {
    id: [LaughPointConnectionId]
    created_at: [LaughPointConnectionCreated_at]
    updated_at: [LaughPointConnectionUpdated_at]
    user: [LaughPointConnectionUser]
    score: [LaughPointConnectionScore]
    uid: [LaughPointConnectionUid]
    start: [LaughPointConnectionStart]
    end: [LaughPointConnectionEnd]
    video: [LaughPointConnectionVideo]
    published_at: [LaughPointConnectionPublished_at]
  }

  type LaughPointConnectionId {
    key: ID
    connection: LaughPointConnection
  }

  type LaughPointConnectionCreated_at {
    key: DateTime
    connection: LaughPointConnection
  }

  type LaughPointConnectionUpdated_at {
    key: DateTime
    connection: LaughPointConnection
  }

  type LaughPointConnectionUser {
    key: ID
    connection: LaughPointConnection
  }

  type LaughPointConnectionScore {
    key: Int
    connection: LaughPointConnection
  }

  type LaughPointConnectionUid {
    key: String
    connection: LaughPointConnection
  }

  type LaughPointConnectionStart {
    key: Float
    connection: LaughPointConnection
  }

  type LaughPointConnectionEnd {
    key: Float
    connection: LaughPointConnection
  }

  type LaughPointConnectionVideo {
    key: ID
    connection: LaughPointConnection
  }

  type LaughPointConnectionPublished_at {
    key: DateTime
    connection: LaughPointConnection
  }

  input LaughPointInput {
    user: ID
    score: Int
    uid: String
    start: Float
    end: Float
    video: ID
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editLaughPointInput {
    user: ID
    score: Int
    uid: String
    start: Float
    end: Float
    video: ID
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createLaughPointInput {
    data: LaughPointInput
  }

  type createLaughPointPayload {
    laughPoint: LaughPoint
  }

  input updateLaughPointInput {
    where: InputID
    data: editLaughPointInput
  }

  type updateLaughPointPayload {
    laughPoint: LaughPoint
  }

  input deleteLaughPointInput {
    where: InputID
  }

  type deleteLaughPointPayload {
    laughPoint: LaughPoint
  }

  type Laugh {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    owner: UsersPermissionsUser
    content: UploadFile
    score: Int
    uid: String
    published_at: DateTime
  }

  type LaughConnection {
    values: [Laugh]
    groupBy: LaughGroupBy
    aggregate: LaughAggregator
  }

  type LaughAggregator {
    count: Int
    totalCount: Int
    sum: LaughAggregatorSum
    avg: LaughAggregatorAvg
    min: LaughAggregatorMin
    max: LaughAggregatorMax
  }

  type LaughAggregatorSum {
    score: Float
  }

  type LaughAggregatorAvg {
    score: Float
  }

  type LaughAggregatorMin {
    score: Float
  }

  type LaughAggregatorMax {
    score: Float
  }

  type LaughGroupBy {
    id: [LaughConnectionId]
    created_at: [LaughConnectionCreated_at]
    updated_at: [LaughConnectionUpdated_at]
    owner: [LaughConnectionOwner]
    content: [LaughConnectionContent]
    score: [LaughConnectionScore]
    uid: [LaughConnectionUid]
    published_at: [LaughConnectionPublished_at]
  }

  type LaughConnectionId {
    key: ID
    connection: LaughConnection
  }

  type LaughConnectionCreated_at {
    key: DateTime
    connection: LaughConnection
  }

  type LaughConnectionUpdated_at {
    key: DateTime
    connection: LaughConnection
  }

  type LaughConnectionOwner {
    key: ID
    connection: LaughConnection
  }

  type LaughConnectionContent {
    key: ID
    connection: LaughConnection
  }

  type LaughConnectionScore {
    key: Int
    connection: LaughConnection
  }

  type LaughConnectionUid {
    key: String
    connection: LaughConnection
  }

  type LaughConnectionPublished_at {
    key: DateTime
    connection: LaughConnection
  }

  input LaughInput {
    owner: ID
    content: ID
    score: Int
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editLaughInput {
    owner: ID
    content: ID
    score: Int
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createLaughInput {
    data: LaughInput
  }

  type createLaughPayload {
    laugh: Laugh
  }

  input updateLaughInput {
    where: InputID
    data: editLaughInput
  }

  type updateLaughPayload {
    laugh: Laugh
  }

  input deleteLaughInput {
    where: InputID
  }

  type deleteLaughPayload {
    laugh: Laugh
  }

  type Link {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    name: String
    owner: UsersPermissionsUser
    link: String
    uid: String
    published_at: DateTime
  }

  type LinkConnection {
    values: [Link]
    groupBy: LinkGroupBy
    aggregate: LinkAggregator
  }

  type LinkAggregator {
    count: Int
    totalCount: Int
  }

  type LinkGroupBy {
    id: [LinkConnectionId]
    created_at: [LinkConnectionCreated_at]
    updated_at: [LinkConnectionUpdated_at]
    name: [LinkConnectionName]
    owner: [LinkConnectionOwner]
    link: [LinkConnectionLink]
    uid: [LinkConnectionUid]
    published_at: [LinkConnectionPublished_at]
  }

  type LinkConnectionId {
    key: ID
    connection: LinkConnection
  }

  type LinkConnectionCreated_at {
    key: DateTime
    connection: LinkConnection
  }

  type LinkConnectionUpdated_at {
    key: DateTime
    connection: LinkConnection
  }

  type LinkConnectionName {
    key: String
    connection: LinkConnection
  }

  type LinkConnectionOwner {
    key: ID
    connection: LinkConnection
  }

  type LinkConnectionLink {
    key: String
    connection: LinkConnection
  }

  type LinkConnectionUid {
    key: String
    connection: LinkConnection
  }

  type LinkConnectionPublished_at {
    key: DateTime
    connection: LinkConnection
  }

  input LinkInput {
    name: String
    owner: ID
    link: String
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editLinkInput {
    name: String
    owner: ID
    link: String
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createLinkInput {
    data: LinkInput
  }

  type createLinkPayload {
    link: Link
  }

  input updateLinkInput {
    where: InputID
    data: editLinkInput
  }

  type updateLinkPayload {
    link: Link
  }

  input deleteLinkInput {
    where: InputID
  }

  type deleteLinkPayload {
    link: Link
  }

  type NonfungibleToken {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    name: String
    cost: Long
    currentCollectionSize: Int
    maxCollectionSize: Int
    isUnique: Boolean
    address: Address
    item: Item
    video: Video
    issuer: UsersPermissionsUser
    visualization: UploadFile
    sound: UploadFile
    uid: String
    published_at: DateTime
    owners(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
    tags(sort: String, limit: Int, start: Int, where: JSON): [Tag]
  }

  type NonfungibleTokenConnection {
    values: [NonfungibleToken]
    groupBy: NonfungibleTokenGroupBy
    aggregate: NonfungibleTokenAggregator
  }

  type NonfungibleTokenAggregator {
    count: Int
    totalCount: Int
    sum: NonfungibleTokenAggregatorSum
    avg: NonfungibleTokenAggregatorAvg
    min: NonfungibleTokenAggregatorMin
    max: NonfungibleTokenAggregatorMax
  }

  type NonfungibleTokenAggregatorSum {
    currentCollectionSize: Float
    maxCollectionSize: Float
  }

  type NonfungibleTokenAggregatorAvg {
    currentCollectionSize: Float
    maxCollectionSize: Float
  }

  type NonfungibleTokenAggregatorMin {
    currentCollectionSize: Float
    maxCollectionSize: Float
  }

  type NonfungibleTokenAggregatorMax {
    currentCollectionSize: Float
    maxCollectionSize: Float
  }

  type NonfungibleTokenGroupBy {
    id: [NonfungibleTokenConnectionId]
    created_at: [NonfungibleTokenConnectionCreated_at]
    updated_at: [NonfungibleTokenConnectionUpdated_at]
    name: [NonfungibleTokenConnectionName]
    cost: [NonfungibleTokenConnectionCost]
    currentCollectionSize: [NonfungibleTokenConnectionCurrentCollectionSize]
    maxCollectionSize: [NonfungibleTokenConnectionMaxCollectionSize]
    isUnique: [NonfungibleTokenConnectionIsUnique]
    address: [NonfungibleTokenConnectionAddress]
    item: [NonfungibleTokenConnectionItem]
    video: [NonfungibleTokenConnectionVideo]
    issuer: [NonfungibleTokenConnectionIssuer]
    visualization: [NonfungibleTokenConnectionVisualization]
    sound: [NonfungibleTokenConnectionSound]
    uid: [NonfungibleTokenConnectionUid]
    published_at: [NonfungibleTokenConnectionPublished_at]
  }

  type NonfungibleTokenConnectionId {
    key: ID
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionCreated_at {
    key: DateTime
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionUpdated_at {
    key: DateTime
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionName {
    key: String
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionCost {
    key: ID
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionCurrentCollectionSize {
    key: Int
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionMaxCollectionSize {
    key: Int
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionIsUnique {
    key: Boolean
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionAddress {
    key: ID
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionItem {
    key: ID
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionVideo {
    key: ID
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionIssuer {
    key: ID
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionVisualization {
    key: ID
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionSound {
    key: ID
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionUid {
    key: String
    connection: NonfungibleTokenConnection
  }

  type NonfungibleTokenConnectionPublished_at {
    key: DateTime
    connection: NonfungibleTokenConnection
  }

  input NonfungibleTokenInput {
    name: String
    cost: Long
    currentCollectionSize: Int
    maxCollectionSize: Int
    isUnique: Boolean
    owners: [ID]
    address: ID
    item: ID
    video: ID
    issuer: ID
    visualization: ID
    sound: ID
    tags: [ID]
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editNonfungibleTokenInput {
    name: String
    cost: Long
    currentCollectionSize: Int
    maxCollectionSize: Int
    isUnique: Boolean
    owners: [ID]
    address: ID
    item: ID
    video: ID
    issuer: ID
    visualization: ID
    sound: ID
    tags: [ID]
    uid: String
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createNonfungibleTokenInput {
    data: NonfungibleTokenInput
  }

  type createNonfungibleTokenPayload {
    nonfungibleToken: NonfungibleToken
  }

  input updateNonfungibleTokenInput {
    where: InputID
    data: editNonfungibleTokenInput
  }

  type updateNonfungibleTokenPayload {
    nonfungibleToken: NonfungibleToken
  }

  input deleteNonfungibleTokenInput {
    where: InputID
  }

  type deleteNonfungibleTokenPayload {
    nonfungibleToken: NonfungibleToken
  }

  type Tag {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    content: String
    isNative: Boolean
    published_at: DateTime
    videos(sort: String, limit: Int, start: Int, where: JSON): [Video]
    fans(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
  }

  type TagConnection {
    values: [Tag]
    groupBy: TagGroupBy
    aggregate: TagAggregator
  }

  type TagAggregator {
    count: Int
    totalCount: Int
  }

  type TagGroupBy {
    id: [TagConnectionId]
    created_at: [TagConnectionCreated_at]
    updated_at: [TagConnectionUpdated_at]
    content: [TagConnectionContent]
    isNative: [TagConnectionIsNative]
    published_at: [TagConnectionPublished_at]
  }

  type TagConnectionId {
    key: ID
    connection: TagConnection
  }

  type TagConnectionCreated_at {
    key: DateTime
    connection: TagConnection
  }

  type TagConnectionUpdated_at {
    key: DateTime
    connection: TagConnection
  }

  type TagConnectionContent {
    key: String
    connection: TagConnection
  }

  type TagConnectionIsNative {
    key: Boolean
    connection: TagConnection
  }

  type TagConnectionPublished_at {
    key: DateTime
    connection: TagConnection
  }

  input TagInput {
    content: String
    videos: [ID]
    isNative: Boolean
    fans: [ID]
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editTagInput {
    content: String
    videos: [ID]
    isNative: Boolean
    fans: [ID]
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createTagInput {
    data: TagInput
  }

  type createTagPayload {
    tag: Tag
  }

  input updateTagInput {
    where: InputID
    data: editTagInput
  }

  type updateTagPayload {
    tag: Tag
  }

  input deleteTagInput {
    where: InputID
  }

  type deleteTagPayload {
    tag: Tag
  }

  type Video {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    title: String
    slug: String!
    publishedAt: DateTime
    laughs: Long
    nonfungibleToken: NonfungibleToken
    description: String
    owner: UsersPermissionsUser
    content: UploadFile
    views: Int
    uid: String
    published_at: DateTime
    comments(sort: String, limit: Int, start: Int, where: JSON): [Comment]
    laughers(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
    laughPoints(sort: String, limit: Int, start: Int, where: JSON): [LaughPoint]
    tags(sort: String, limit: Int, start: Int, where: JSON): [Tag]
  }

  type VideoConnection {
    values: [Video]
    groupBy: VideoGroupBy
    aggregate: VideoAggregator
  }

  type VideoAggregator {
    count: Int
    totalCount: Int
    sum: VideoAggregatorSum
    avg: VideoAggregatorAvg
    min: VideoAggregatorMin
    max: VideoAggregatorMax
  }

  type VideoAggregatorSum {
    views: Float
  }

  type VideoAggregatorAvg {
    views: Float
  }

  type VideoAggregatorMin {
    views: Float
  }

  type VideoAggregatorMax {
    views: Float
  }

  type VideoGroupBy {
    id: [VideoConnectionId]
    created_at: [VideoConnectionCreated_at]
    updated_at: [VideoConnectionUpdated_at]
    title: [VideoConnectionTitle]
    slug: [VideoConnectionSlug]
    publishedAt: [VideoConnectionPublishedAt]
    laughs: [VideoConnectionLaughs]
    nonfungibleToken: [VideoConnectionNonfungibleToken]
    description: [VideoConnectionDescription]
    owner: [VideoConnectionOwner]
    content: [VideoConnectionContent]
    views: [VideoConnectionViews]
    uid: [VideoConnectionUid]
    published_at: [VideoConnectionPublished_at]
  }

  type VideoConnectionId {
    key: ID
    connection: VideoConnection
  }

  type VideoConnectionCreated_at {
    key: DateTime
    connection: VideoConnection
  }

  type VideoConnectionUpdated_at {
    key: DateTime
    connection: VideoConnection
  }

  type VideoConnectionTitle {
    key: String
    connection: VideoConnection
  }

  type VideoConnectionSlug {
    key: String
    connection: VideoConnection
  }

  type VideoConnectionPublishedAt {
    key: DateTime
    connection: VideoConnection
  }

  type VideoConnectionLaughs {
    key: ID
    connection: VideoConnection
  }

  type VideoConnectionNonfungibleToken {
    key: ID
    connection: VideoConnection
  }

  type VideoConnectionDescription {
    key: String
    connection: VideoConnection
  }

  type VideoConnectionOwner {
    key: ID
    connection: VideoConnection
  }

  type VideoConnectionContent {
    key: ID
    connection: VideoConnection
  }

  type VideoConnectionViews {
    key: Int
    connection: VideoConnection
  }

  type VideoConnectionUid {
    key: String
    connection: VideoConnection
  }

  type VideoConnectionPublished_at {
    key: DateTime
    connection: VideoConnection
  }

  input VideoInput {
    title: String
    slug: String!
    publishedAt: DateTime
    laughs: Long
    comments: [ID]
    nonfungibleToken: ID
    laughers: [ID]
    description: String
    owner: ID
    content: ID
    laughPoints: [ID]
    views: Int
    uid: String
    tags: [ID]
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input editVideoInput {
    title: String
    slug: String
    publishedAt: DateTime
    laughs: Long
    comments: [ID]
    nonfungibleToken: ID
    laughers: [ID]
    description: String
    owner: ID
    content: ID
    laughPoints: [ID]
    views: Int
    uid: String
    tags: [ID]
    published_at: DateTime
    created_by: ID
    updated_by: ID
  }

  input createVideoInput {
    data: VideoInput
  }

  type createVideoPayload {
    video: Video
  }

  input updateVideoInput {
    where: InputID
    data: editVideoInput
  }

  type updateVideoPayload {
    video: Video
  }

  input deleteVideoInput {
    where: InputID
  }

  type deleteVideoPayload {
    video: Video
  }

  type I18NLocale {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    name: String
    code: String
  }

  input LocaleInput {
    name: String
    code: String
    created_by: ID
    updated_by: ID
  }

  input editLocaleInput {
    name: String
    code: String
    created_by: ID
    updated_by: ID
  }

  type UploadFile {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    name: String!
    alternativeText: String
    caption: String
    width: Int
    height: Int
    formats: JSON
    hash: String!
    ext: String
    mime: String!
    size: Float!
    url: String!
    previewUrl: String
    provider: String!
    provider_metadata: JSON
    related(sort: String, limit: Int, start: Int, where: JSON): [Morph]
  }

  type UploadFileConnection {
    values: [UploadFile]
    groupBy: UploadFileGroupBy
    aggregate: UploadFileAggregator
  }

  type UploadFileAggregator {
    count: Int
    totalCount: Int
    sum: UploadFileAggregatorSum
    avg: UploadFileAggregatorAvg
    min: UploadFileAggregatorMin
    max: UploadFileAggregatorMax
  }

  type UploadFileAggregatorSum {
    width: Float
    height: Float
    size: Float
  }

  type UploadFileAggregatorAvg {
    width: Float
    height: Float
    size: Float
  }

  type UploadFileAggregatorMin {
    width: Float
    height: Float
    size: Float
  }

  type UploadFileAggregatorMax {
    width: Float
    height: Float
    size: Float
  }

  type UploadFileGroupBy {
    id: [UploadFileConnectionId]
    created_at: [UploadFileConnectionCreated_at]
    updated_at: [UploadFileConnectionUpdated_at]
    name: [UploadFileConnectionName]
    alternativeText: [UploadFileConnectionAlternativeText]
    caption: [UploadFileConnectionCaption]
    width: [UploadFileConnectionWidth]
    height: [UploadFileConnectionHeight]
    formats: [UploadFileConnectionFormats]
    hash: [UploadFileConnectionHash]
    ext: [UploadFileConnectionExt]
    mime: [UploadFileConnectionMime]
    size: [UploadFileConnectionSize]
    url: [UploadFileConnectionUrl]
    previewUrl: [UploadFileConnectionPreviewUrl]
    provider: [UploadFileConnectionProvider]
    provider_metadata: [UploadFileConnectionProvider_metadata]
  }

  type UploadFileConnectionId {
    key: ID
    connection: UploadFileConnection
  }

  type UploadFileConnectionCreated_at {
    key: DateTime
    connection: UploadFileConnection
  }

  type UploadFileConnectionUpdated_at {
    key: DateTime
    connection: UploadFileConnection
  }

  type UploadFileConnectionName {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionAlternativeText {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionCaption {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionWidth {
    key: Int
    connection: UploadFileConnection
  }

  type UploadFileConnectionHeight {
    key: Int
    connection: UploadFileConnection
  }

  type UploadFileConnectionFormats {
    key: JSON
    connection: UploadFileConnection
  }

  type UploadFileConnectionHash {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionExt {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionMime {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionSize {
    key: Float
    connection: UploadFileConnection
  }

  type UploadFileConnectionUrl {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionPreviewUrl {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionProvider {
    key: String
    connection: UploadFileConnection
  }

  type UploadFileConnectionProvider_metadata {
    key: JSON
    connection: UploadFileConnection
  }

  input FileInput {
    name: String!
    alternativeText: String
    caption: String
    width: Int
    height: Int
    formats: JSON
    hash: String!
    ext: String
    mime: String!
    size: Float!
    url: String!
    previewUrl: String
    provider: String!
    provider_metadata: JSON
    related: [ID]
    created_by: ID
    updated_by: ID
  }

  input editFileInput {
    name: String
    alternativeText: String
    caption: String
    width: Int
    height: Int
    formats: JSON
    hash: String
    ext: String
    mime: String
    size: Float
    url: String
    previewUrl: String
    provider: String
    provider_metadata: JSON
    related: [ID]
    created_by: ID
    updated_by: ID
  }

  input deleteFileInput {
    where: InputID
  }

  type deleteFilePayload {
    file: UploadFile
  }

  type UsersPermissionsPermission {
    id: ID!
    type: String!
    controller: String!
    action: String!
    enabled: Boolean!
    policy: String
    role: UsersPermissionsRole
  }

  type UsersPermissionsRole {
    id: ID!
    name: String!
    description: String
    type: String
    permissions(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsPermission]
    users(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
  }

  type UsersPermissionsRoleConnection {
    values: [UsersPermissionsRole]
    groupBy: UsersPermissionsRoleGroupBy
    aggregate: UsersPermissionsRoleAggregator
  }

  type UsersPermissionsRoleAggregator {
    count: Int
    totalCount: Int
  }

  type UsersPermissionsRoleGroupBy {
    id: [UsersPermissionsRoleConnectionId]
    name: [UsersPermissionsRoleConnectionName]
    description: [UsersPermissionsRoleConnectionDescription]
    type: [UsersPermissionsRoleConnectionType]
  }

  type UsersPermissionsRoleConnectionId {
    key: ID
    connection: UsersPermissionsRoleConnection
  }

  type UsersPermissionsRoleConnectionName {
    key: String
    connection: UsersPermissionsRoleConnection
  }

  type UsersPermissionsRoleConnectionDescription {
    key: String
    connection: UsersPermissionsRoleConnection
  }

  type UsersPermissionsRoleConnectionType {
    key: String
    connection: UsersPermissionsRoleConnection
  }

  input RoleInput {
    name: String!
    description: String
    type: String
    permissions: [ID]
    users: [ID]
    created_by: ID
    updated_by: ID
  }

  input editRoleInput {
    name: String
    description: String
    type: String
    permissions: [ID]
    users: [ID]
    created_by: ID
    updated_by: ID
  }

  input createRoleInput {
    data: RoleInput
  }

  type createRolePayload {
    role: UsersPermissionsRole
  }

  input updateRoleInput {
    where: InputID
    data: editRoleInput
  }

  type updateRolePayload {
    role: UsersPermissionsRole
  }

  input deleteRoleInput {
    where: InputID
  }

  type deleteRolePayload {
    role: UsersPermissionsRole
  }

  type UsersPermissionsUser {
    id: ID!
    created_at: DateTime!
    updated_at: DateTime!
    username: String!
    email: String!
    provider: String
    confirmed: Boolean
    blocked: Boolean
    role: UsersPermissionsRole
    isComedian: Boolean
    laughsLaughedAt: Long
    avatar: Avatar
    bio: String
    firstName: String
    lastName: String
    profilePhoto: UploadFile
    mostRecentPeriodLaughsLaughedAt: Long
    nonfungibleTokens(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [NonfungibleToken]
    addresses(sort: String, limit: Int, start: Int, where: JSON): [Address]
    laughs(sort: String, limit: Int, start: Int, where: JSON): [Laugh]
    following(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
    followers(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [UsersPermissionsUser]
    laughedAtComments(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [Comment]
    laughedAtVideos(sort: String, limit: Int, start: Int, where: JSON): [Video]
    links(sort: String, limit: Int, start: Int, where: JSON): [Link]
    items(sort: String, limit: Int, start: Int, where: JSON): [Item]
    videos(sort: String, limit: Int, start: Int, where: JSON): [Video]
    issued(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): [NonfungibleToken]
    preferredStyles(sort: String, limit: Int, start: Int, where: JSON): [Tag]
  }

  type UsersPermissionsUserConnection {
    values: [UsersPermissionsUser]
    groupBy: UsersPermissionsUserGroupBy
    aggregate: UsersPermissionsUserAggregator
  }

  type UsersPermissionsUserAggregator {
    count: Int
    totalCount: Int
  }

  type UsersPermissionsUserGroupBy {
    id: [UsersPermissionsUserConnectionId]
    created_at: [UsersPermissionsUserConnectionCreated_at]
    updated_at: [UsersPermissionsUserConnectionUpdated_at]
    username: [UsersPermissionsUserConnectionUsername]
    email: [UsersPermissionsUserConnectionEmail]
    provider: [UsersPermissionsUserConnectionProvider]
    confirmed: [UsersPermissionsUserConnectionConfirmed]
    blocked: [UsersPermissionsUserConnectionBlocked]
    role: [UsersPermissionsUserConnectionRole]
    isComedian: [UsersPermissionsUserConnectionIsComedian]
    laughsLaughedAt: [UsersPermissionsUserConnectionLaughsLaughedAt]
    avatar: [UsersPermissionsUserConnectionAvatar]
    bio: [UsersPermissionsUserConnectionBio]
    firstName: [UsersPermissionsUserConnectionFirstName]
    lastName: [UsersPermissionsUserConnectionLastName]
    profilePhoto: [UsersPermissionsUserConnectionProfilePhoto]
    mostRecentPeriodLaughsLaughedAt: [UsersPermissionsUserConnectionMostRecentPeriodLaughsLaughedAt]
  }

  type UsersPermissionsUserConnectionId {
    key: ID
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionCreated_at {
    key: DateTime
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionUpdated_at {
    key: DateTime
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionUsername {
    key: String
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionEmail {
    key: String
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionProvider {
    key: String
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionConfirmed {
    key: Boolean
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionBlocked {
    key: Boolean
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionRole {
    key: ID
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionIsComedian {
    key: Boolean
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionLaughsLaughedAt {
    key: ID
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionAvatar {
    key: ID
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionBio {
    key: String
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionFirstName {
    key: String
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionLastName {
    key: String
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionProfilePhoto {
    key: ID
    connection: UsersPermissionsUserConnection
  }

  type UsersPermissionsUserConnectionMostRecentPeriodLaughsLaughedAt {
    key: ID
    connection: UsersPermissionsUserConnection
  }

  input UserInput {
    username: String!
    email: String!
    provider: String
    password: String
    resetPasswordToken: String
    confirmationToken: String
    confirmed: Boolean
    blocked: Boolean
    role: ID
    nonfungibleTokens: [ID]
    addresses: [ID]
    laughs: [ID]
    following: [ID]
    followers: [ID]
    laughedAtComments: [ID]
    laughedAtVideos: [ID]
    isComedian: Boolean
    laughsLaughedAt: Long
    links: [ID]
    avatar: ID
    items: [ID]
    bio: String
    firstName: String
    lastName: String
    videos: [ID]
    issued: [ID]
    profilePhoto: ID
    mostRecentPeriodLaughsLaughedAt: Long
    preferredStyles: [ID]
    created_by: ID
    updated_by: ID
  }

  input editUserInput {
    username: String
    email: String
    provider: String
    password: String
    resetPasswordToken: String
    confirmationToken: String
    confirmed: Boolean
    blocked: Boolean
    role: ID
    nonfungibleTokens: [ID]
    addresses: [ID]
    laughs: [ID]
    following: [ID]
    followers: [ID]
    laughedAtComments: [ID]
    laughedAtVideos: [ID]
    isComedian: Boolean
    laughsLaughedAt: Long
    links: [ID]
    avatar: ID
    items: [ID]
    bio: String
    firstName: String
    lastName: String
    videos: [ID]
    issued: [ID]
    profilePhoto: ID
    mostRecentPeriodLaughsLaughedAt: Long
    preferredStyles: [ID]
    created_by: ID
    updated_by: ID
  }

  input createUserInput {
    data: UserInput
  }

  type createUserPayload {
    user: UsersPermissionsUser
  }

  input updateUserInput {
    where: InputID
    data: editUserInput
  }

  type updateUserPayload {
    user: UsersPermissionsUser
  }

  input deleteUserInput {
    where: InputID
  }

  type deleteUserPayload {
    user: UsersPermissionsUser
  }

  union Morph =
      UsersPermissionsMe
    | UsersPermissionsMeRole
    | UsersPermissionsLoginPayload
    | UserPermissionsPasswordPayload
    | Address
    | AddressConnection
    | AddressAggregator
    | AddressGroupBy
    | AddressConnectionId
    | AddressConnectionCreated_at
    | AddressConnectionUpdated_at
    | AddressConnectionName
    | AddressConnectionOwner
    | AddressConnectionType
    | AddressConnectionIsActive
    | AddressConnectionPublicKey
    | AddressConnectionUid
    | AddressConnectionPublished_at
    | createAddressPayload
    | updateAddressPayload
    | deleteAddressPayload
    | Avatar
    | AvatarConnection
    | AvatarAggregator
    | AvatarGroupBy
    | AvatarConnectionId
    | AvatarConnectionCreated_at
    | AvatarConnectionUpdated_at
    | AvatarConnectionOwner
    | AvatarConnectionContent
    | AvatarConnectionUid
    | AvatarConnectionPublished_at
    | createAvatarPayload
    | updateAvatarPayload
    | deleteAvatarPayload
    | Comment
    | CommentConnection
    | CommentAggregator
    | CommentGroupBy
    | CommentConnectionId
    | CommentConnectionCreated_at
    | CommentConnectionUpdated_at
    | CommentConnectionContent
    | CommentConnectionPublishedAt
    | CommentConnectionLaughs
    | CommentConnectionVideo
    | CommentConnectionOwner
    | CommentConnectionParent
    | CommentConnectionPublished_at
    | createCommentPayload
    | updateCommentPayload
    | deleteCommentPayload
    | Community
    | updateCommunityPayload
    | deleteCommunityPayload
    | Item
    | ItemConnection
    | ItemAggregator
    | ItemGroupBy
    | ItemConnectionId
    | ItemConnectionCreated_at
    | ItemConnectionUpdated_at
    | ItemConnectionName
    | ItemConnectionNonfungibleToken
    | ItemConnectionContent
    | ItemConnectionIsActive
    | ItemConnectionPublished_at
    | createItemPayload
    | updateItemPayload
    | deleteItemPayload
    | LaughPoint
    | LaughPointConnection
    | LaughPointAggregator
    | LaughPointAggregatorSum
    | LaughPointAggregatorAvg
    | LaughPointAggregatorMin
    | LaughPointAggregatorMax
    | LaughPointGroupBy
    | LaughPointConnectionId
    | LaughPointConnectionCreated_at
    | LaughPointConnectionUpdated_at
    | LaughPointConnectionUser
    | LaughPointConnectionScore
    | LaughPointConnectionUid
    | LaughPointConnectionStart
    | LaughPointConnectionEnd
    | LaughPointConnectionVideo
    | LaughPointConnectionPublished_at
    | createLaughPointPayload
    | updateLaughPointPayload
    | deleteLaughPointPayload
    | Laugh
    | LaughConnection
    | LaughAggregator
    | LaughAggregatorSum
    | LaughAggregatorAvg
    | LaughAggregatorMin
    | LaughAggregatorMax
    | LaughGroupBy
    | LaughConnectionId
    | LaughConnectionCreated_at
    | LaughConnectionUpdated_at
    | LaughConnectionOwner
    | LaughConnectionContent
    | LaughConnectionScore
    | LaughConnectionUid
    | LaughConnectionPublished_at
    | createLaughPayload
    | updateLaughPayload
    | deleteLaughPayload
    | Link
    | LinkConnection
    | LinkAggregator
    | LinkGroupBy
    | LinkConnectionId
    | LinkConnectionCreated_at
    | LinkConnectionUpdated_at
    | LinkConnectionName
    | LinkConnectionOwner
    | LinkConnectionLink
    | LinkConnectionUid
    | LinkConnectionPublished_at
    | createLinkPayload
    | updateLinkPayload
    | deleteLinkPayload
    | NonfungibleToken
    | NonfungibleTokenConnection
    | NonfungibleTokenAggregator
    | NonfungibleTokenAggregatorSum
    | NonfungibleTokenAggregatorAvg
    | NonfungibleTokenAggregatorMin
    | NonfungibleTokenAggregatorMax
    | NonfungibleTokenGroupBy
    | NonfungibleTokenConnectionId
    | NonfungibleTokenConnectionCreated_at
    | NonfungibleTokenConnectionUpdated_at
    | NonfungibleTokenConnectionName
    | NonfungibleTokenConnectionCost
    | NonfungibleTokenConnectionCurrentCollectionSize
    | NonfungibleTokenConnectionMaxCollectionSize
    | NonfungibleTokenConnectionIsUnique
    | NonfungibleTokenConnectionAddress
    | NonfungibleTokenConnectionItem
    | NonfungibleTokenConnectionVideo
    | NonfungibleTokenConnectionIssuer
    | NonfungibleTokenConnectionVisualization
    | NonfungibleTokenConnectionSound
    | NonfungibleTokenConnectionUid
    | NonfungibleTokenConnectionPublished_at
    | createNonfungibleTokenPayload
    | updateNonfungibleTokenPayload
    | deleteNonfungibleTokenPayload
    | Tag
    | TagConnection
    | TagAggregator
    | TagGroupBy
    | TagConnectionId
    | TagConnectionCreated_at
    | TagConnectionUpdated_at
    | TagConnectionContent
    | TagConnectionIsNative
    | TagConnectionPublished_at
    | createTagPayload
    | updateTagPayload
    | deleteTagPayload
    | Video
    | VideoConnection
    | VideoAggregator
    | VideoAggregatorSum
    | VideoAggregatorAvg
    | VideoAggregatorMin
    | VideoAggregatorMax
    | VideoGroupBy
    | VideoConnectionId
    | VideoConnectionCreated_at
    | VideoConnectionUpdated_at
    | VideoConnectionTitle
    | VideoConnectionSlug
    | VideoConnectionPublishedAt
    | VideoConnectionLaughs
    | VideoConnectionNonfungibleToken
    | VideoConnectionDescription
    | VideoConnectionOwner
    | VideoConnectionContent
    | VideoConnectionViews
    | VideoConnectionUid
    | VideoConnectionPublished_at
    | createVideoPayload
    | updateVideoPayload
    | deleteVideoPayload
    | I18NLocale
    | UploadFile
    | UploadFileConnection
    | UploadFileAggregator
    | UploadFileAggregatorSum
    | UploadFileAggregatorAvg
    | UploadFileAggregatorMin
    | UploadFileAggregatorMax
    | UploadFileGroupBy
    | UploadFileConnectionId
    | UploadFileConnectionCreated_at
    | UploadFileConnectionUpdated_at
    | UploadFileConnectionName
    | UploadFileConnectionAlternativeText
    | UploadFileConnectionCaption
    | UploadFileConnectionWidth
    | UploadFileConnectionHeight
    | UploadFileConnectionFormats
    | UploadFileConnectionHash
    | UploadFileConnectionExt
    | UploadFileConnectionMime
    | UploadFileConnectionSize
    | UploadFileConnectionUrl
    | UploadFileConnectionPreviewUrl
    | UploadFileConnectionProvider
    | UploadFileConnectionProvider_metadata
    | deleteFilePayload
    | UsersPermissionsPermission
    | UsersPermissionsRole
    | UsersPermissionsRoleConnection
    | UsersPermissionsRoleAggregator
    | UsersPermissionsRoleGroupBy
    | UsersPermissionsRoleConnectionId
    | UsersPermissionsRoleConnectionName
    | UsersPermissionsRoleConnectionDescription
    | UsersPermissionsRoleConnectionType
    | createRolePayload
    | updateRolePayload
    | deleteRolePayload
    | UsersPermissionsUser
    | UsersPermissionsUserConnection
    | UsersPermissionsUserAggregator
    | UsersPermissionsUserGroupBy
    | UsersPermissionsUserConnectionId
    | UsersPermissionsUserConnectionCreated_at
    | UsersPermissionsUserConnectionUpdated_at
    | UsersPermissionsUserConnectionUsername
    | UsersPermissionsUserConnectionEmail
    | UsersPermissionsUserConnectionProvider
    | UsersPermissionsUserConnectionConfirmed
    | UsersPermissionsUserConnectionBlocked
    | UsersPermissionsUserConnectionRole
    | UsersPermissionsUserConnectionIsComedian
    | UsersPermissionsUserConnectionLaughsLaughedAt
    | UsersPermissionsUserConnectionAvatar
    | UsersPermissionsUserConnectionBio
    | UsersPermissionsUserConnectionFirstName
    | UsersPermissionsUserConnectionLastName
    | UsersPermissionsUserConnectionProfilePhoto
    | UsersPermissionsUserConnectionMostRecentPeriodLaughsLaughedAt
    | createUserPayload
    | updateUserPayload
    | deleteUserPayload

  input InputID {
    id: ID!
  }

  enum PublicationState {
    LIVE
    PREVIEW
  }

  type AdminUser {
    id: ID!
    username: String
    firstname: String!
    lastname: String!
  }

  type Query {
    address(id: ID!, publicationState: PublicationState): Address
    addresses(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [Address]
    addressesConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): AddressConnection
    avatar(id: ID!, publicationState: PublicationState): Avatar
    avatars(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [Avatar]
    avatarsConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): AvatarConnection
    comment(id: ID!, publicationState: PublicationState): Comment
    comments(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [Comment]
    commentsConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): CommentConnection
    community(publicationState: PublicationState, locale: String): Community
    item(id: ID!, publicationState: PublicationState): Item
    items(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [Item]
    itemsConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): ItemConnection
    laughPoint(id: ID!, publicationState: PublicationState): LaughPoint
    laughPoints(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [LaughPoint]
    laughPointsConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): LaughPointConnection
    laugh(id: ID!, publicationState: PublicationState): Laugh
    laughs(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [Laugh]
    laughsConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): LaughConnection
    link(id: ID!, publicationState: PublicationState): Link
    links(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [Link]
    linksConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): LinkConnection
    nonfungibleToken(
      id: ID!
      publicationState: PublicationState
    ): NonfungibleToken
    nonfungibleTokens(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [NonfungibleToken]
    nonfungibleTokensConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): NonfungibleTokenConnection
    tag(id: ID!, publicationState: PublicationState): Tag
    tags(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [Tag]
    tagsConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): TagConnection
    video(id: ID!, publicationState: PublicationState): Video
    videos(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [Video]
    videosConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): VideoConnection
    files(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [UploadFile]
    filesConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): UploadFileConnection
    role(id: ID!, publicationState: PublicationState): UsersPermissionsRole
    roles(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [UsersPermissionsRole]
    rolesConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): UsersPermissionsRoleConnection
    user(id: ID!, publicationState: PublicationState): UsersPermissionsUser
    users(
      sort: String
      limit: Int
      start: Int
      where: JSON
      publicationState: PublicationState
    ): [UsersPermissionsUser]
    usersConnection(
      sort: String
      limit: Int
      start: Int
      where: JSON
    ): UsersPermissionsUserConnection
    me: UsersPermissionsMe
  }

  scalar JSON
    @specifiedBy(
      url: "http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf"
    )

  scalar DateTime

  scalar Time

  scalar Date

  scalar Long

  scalar Upload

  type Query {
    findVideos(id: ID!): [Video]
  }
`;

gql`
  type Mutation {
    createAddress(input: createAddressInput): createAddressPayload
    updateAddress(input: updateAddressInput): updateAddressPayload
    deleteAddress(input: deleteAddressInput): deleteAddressPayload
    createAvatar(input: createAvatarInput): createAvatarPayload
    updateAvatar(input: updateAvatarInput): updateAvatarPayload
    deleteAvatar(input: deleteAvatarInput): deleteAvatarPayload
    createComment(input: createCommentInput): createCommentPayload
    updateComment(input: updateCommentInput): updateCommentPayload
    deleteComment(input: deleteCommentInput): deleteCommentPayload
    updateCommunity(
      input: updateCommunityInput
      locale: String
    ): updateCommunityPayload
    deleteCommunity(locale: String): deleteCommunityPayload
    createItem(input: createItemInput): createItemPayload
    updateItem(input: updateItemInput): updateItemPayload
    deleteItem(input: deleteItemInput): deleteItemPayload
    createLaughPoint(input: createLaughPointInput): createLaughPointPayload
    updateLaughPoint(input: updateLaughPointInput): updateLaughPointPayload
    deleteLaughPoint(input: deleteLaughPointInput): deleteLaughPointPayload
    createLaugh(input: createLaughInput): createLaughPayload
    updateLaugh(input: updateLaughInput): updateLaughPayload
    deleteLaugh(input: deleteLaughInput): deleteLaughPayload
    createLink(input: createLinkInput): createLinkPayload
    updateLink(input: updateLinkInput): updateLinkPayload
    deleteLink(input: deleteLinkInput): deleteLinkPayload
    createNonfungibleToken(
      input: createNonfungibleTokenInput
    ): createNonfungibleTokenPayload
    updateNonfungibleToken(
      input: updateNonfungibleTokenInput
    ): updateNonfungibleTokenPayload
    deleteNonfungibleToken(
      input: deleteNonfungibleTokenInput
    ): deleteNonfungibleTokenPayload
    createTag(input: createTagInput): createTagPayload
    updateTag(input: updateTagInput): updateTagPayload
    deleteTag(input: deleteTagInput): deleteTagPayload
    createVideo(input: createVideoInput): createVideoPayload
    updateVideo(input: updateVideoInput): updateVideoPayload
    deleteVideo(input: deleteVideoInput): deleteVideoPayload

    deleteFile(input: deleteFileInput): deleteFilePayload

    createRole(input: createRoleInput): createRolePayload

    updateRole(input: updateRoleInput): updateRolePayload

    deleteRole(input: deleteRoleInput): deleteRolePayload

    createUser(input: createUserInput): createUserPayload

    deleteUser(input: deleteUserInput): deleteUserPayload
    createCommunityLocalization(input: updateCommunityInput!): Community!
    upload(
      refId: ID
      ref: String
      field: String
      source: String
      info: FileInfoInput
      file: Upload!
    ): UploadFile!
    multipleUpload(
      refId: ID
      ref: String
      field: String
      source: String
      files: [Upload]!
    ): [UploadFile]!
    updateFileInfo(id: ID!, info: FileInfoInput!): UploadFile!
    login(input: UsersPermissionsLoginInput!): UsersPermissionsLoginPayload!
    register(
      input: UsersPermissionsRegisterInput!
    ): UsersPermissionsLoginPayload!
    forgotPassword(email: String!): UserPermissionsPasswordPayload
    resetPassword(
      password: String!
      passwordConfirmation: String!
      code: String!
    ): UsersPermissionsLoginPayload
    emailConfirmation(confirmation: String!): UsersPermissionsLoginPayload
  }
`;

const resolvers = {
  Query: {
    findVideos: async (_source, { id }, { dataSources }) => {
      return dataSources.videosAPI.getVideo(id);
    },
  },
};
export { typeDefs, resolvers };
