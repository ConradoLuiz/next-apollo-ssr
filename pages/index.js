import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from '../components/PostList'
import { initializeApollo, useApollo } from '../lib/apolloClient'

const IndexPage = ({props: {initialApolloState}}) => {
  const apolloClient = useApollo(initialApolloState);
  
  return (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <Submit />
      <PostList client={apolloClient}/>
    </App>
)}


IndexPage.getInitialProps = async (context) => {
  const apolloClient = initializeApollo()
  
  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    }
  }
}

// export async function getServerSideProps(obj) {
//   const apolloClient = initializeApollo()
//   console.log(obj);
  
//   await apolloClient.query({
//     query: ALL_POSTS_QUERY,
//     variables: allPostsQueryVars
//   });

//   return {
//     props : {
//       initialApolloState: apolloClient.cache.extract()
//     }
//   }
// }

export default IndexPage
