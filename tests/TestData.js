export const testToken = 'test-authToken'

export const testUser = {
  _avatar: null,
  is_self: true,
  username: 'test-user'
}

export const testComment = {
  child_comments: [],
  comment:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ' +
    'nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam',
  created: 'January 1, 2022',
  id: 1,
  is_blocked: false,
  is_censored: false,
  is_deleted: false,
  is_removed: false,
  ratings: {
    current_user_rating_id: false,
    current_user_rating_value: 0,
    positive_ratings: 0,
    negative_ratings: 0
  },
  user_image: '',
  user_info: {
    has_changing_permission: false,
    has_deleting_permission: false
  },
  user_name: 'test-user'
}

export const testIdeaAdmin = {
  category: null,
  comment_count: 1,
  content_type: 110,
  created: '2022-06-29T14:48:31.387494+02:00',
  creator: 'admin',
  description: `This is a test idea.

  It's a really good one.
  `,
  has_changing_permission: true,
  has_commenting_permission: true,
  has_deleting_permission: true,
  has_rating_permission: true,
  image: null,
  labels: [],
  name: 'App Test Idea 0',
  negative_rating_count: 0,
  pk: 6,
  positive_rating_count: 0,
  reference_number: '2022-00006',
  user_rating: null
}

export const testModule = {
  categories: false,
  has_idea_adding_permission: true,
  labels: false,
  phases: [
    {
      description: 'Create and comment on new ideas.',
      end_date: '2022-07-29T23:59:00+02:00',
      is_active: true,
      name: 'Collect phase',
      start_date: '2022-06-27T00:00:00+02:00',
      type: 'a4_candy_ideas:collect'
    },
    {
      description: 'Rate the previously collected ideas.',
      end_date: '2022-08-18T23:59:00+02:00',
      is_active: false,
      name: 'Rating phase',
      start_date: '2022-07-31T00:00:00+02:00',
      type: 'a4_candy_ideas:rating'
    }
  ],
  pk: 7
}

export const testText = {
  Lorum1039: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
  'Huic ego, si negaret quicquam interesse ad beate vivendum quali uteretur ' +
  'victu, concederem, laudarem etiam; Nam cui proposito sit conservatio sui,' +
  ' necesse est huic partes quoque sui caras suo genere laudabiles. Duo Reges: ' +
  'constructio interrete. Ita, quem ad modum in senatu semper est aliquis, qui' +
  ' interpretem postulet, sic, isti nobis cum interprete audiendi sunt. Et ais, '+
  'si una littera commota sit, fore tota ut labet disciplina. Quando enim Socrates,'+
  ' qui parens philosophiae iure dici potest, quicquam tale fecit? Cur igitur,' +
  ' cum de re conveniat, non malumus usitate loqui? Possumusne ergo in vita ' +
  'summum bonum dicere, cum id ne in cena quidem posse videamur? Nihilne te ' +
  'delectat umquam -video, quicum loquar-, te igitur, Torquate, ipsum per se ' +
  'nihil delectat? Non autem hoc: igitur ne illud quidem. Mihi vero, inquit, ' +
  'placet agi subtilius et, ut ipse dixisti, pressius. Sin te auctoritas Mihi ' +
  'vero, inquit, placet agi subtilius et, ut ipse dixisti, pressius. Sin te auctoritas'
}
