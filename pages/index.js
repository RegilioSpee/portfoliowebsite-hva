import Head from "next/head";
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import Footer from '../components/Footer'
import styles from "../styles/Home.module.css";

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story }) {
  story = useStoryblokState(story);

  return (
    <div>
      <Head>
        <title>Regilio Spee | Portfoliowebsite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <StoryblokComponent blok={story.content} />
      <Form />
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  let slug = "home";

  let sbParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
