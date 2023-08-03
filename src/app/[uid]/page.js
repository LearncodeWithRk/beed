import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";

export async function generateMetadata({ params }) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const page = await client.getByUID("page", params.uid);

  return {
    title: `${prismic.asText(page.data.title)} | ${prismic.asText(
      settings.data.name,
    )}`,
  };
}

export default async function Page({ params }) {
  const client = createClient();

  const page = await client.getByUID("page", params.uid);
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return (
    <Layout navigation={navigation} settings={settings}>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}