import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList, {
  ALL_POSTS_QUERY,
  allPostsQueryVars,
} from '../components/PostList'
import { initializeApollo, useApollo } from '../lib/apolloClient'
import NextApp from 'next/app';
import withApollo from "../lib/withApollo";


const IndexPage = () => {
  return (
    <App>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
      <Submit />
      <PostList />
    </App>
)}

// Since getInitialProps runs on the server, on first load
// I query the data the page is going to need and runs smooth 
// with SSR. When the user navigates to this page through client 
// side routing, getInitialProps runs on the browser and attemps to 
// make this query. BUT if the data that the page needs is already 
// cached, I dont need to make the query at all, instead I just get
// the data from the apollo store
IndexPage.getInitialProps = async (context) => {

  const apolloClient = context.apolloClient;
  
  // This just makes one query, but if the page needs multiple queries
  // we can make use of apollo fragments
  // But i havent tested that out yet
  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  });

  // Since the component uses useQuery from apollo hooks, 
  // it automatically gets the data from the apollo store
  
}


// Here I use <ssr: false> to not let the WithApollo library 
// invoke getDataFromTree since it hinders perfomance.
// Instead I want to make the queries myself. And I do so in the
// function above, getInitialProps
export default withApollo({ ssr: false })(IndexPage);
