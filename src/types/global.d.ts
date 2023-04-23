interface Post extends Object {
  title: String,
  content: String,
  image: Buffer,
  author: String,
  date: Date,
  score: number,
  comments: Array<String>, // Not implemented
  formatted_subwettit: Subwettit,
  flair: String,
  flairColor: String
}

interface Subwettit extends Object {
    title: String,
    type: String,
    logo: Buffer,
    nsfw: Boolean,
    members: Array<String>,
    moderators: Array<String>,
    creation_date: Date
}