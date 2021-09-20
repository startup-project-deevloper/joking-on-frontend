import gql from "graphql-tag";

const FIND_VIDEO_QUERY = gql`
  query findVideos($where: JSON) {
    videos(where: $where) {
      title
      laughers {
        username
        profilePhoto {
          url
        }
      }
      owner {
        username
        profilePhoto {
          url
        }
      }
      publishedAt
      description
      laughPoints {
        score
        start
        end
      }
      laughs
      content {
        url
      }
      views
      comments {
        content
      }
      slug
    }
  }
`;

export default FIND_VIDEO_QUERY;
