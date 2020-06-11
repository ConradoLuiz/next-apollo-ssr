import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from '../components/PostList'
import { initializeApollo, useApollo } from '../lib/apolloClient'

const IndexPage = () => {
  // const apolloClient = useApollo(initialApolloState);
  
  return (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <Submit />
      <PostList />
    </App>
)}


// IndexPage.getInitialProps = async (context) => {
//   const apolloClient = initializeApollo()
  
//   await apolloClient.query({
//     query: ALL_POSTS_QUERY,
//     variables: allPostsQueryVars,
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//     }
//   }
// }

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  
  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars
  });

  return {
    props : {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}

export default IndexPage
