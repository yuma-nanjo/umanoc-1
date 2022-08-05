import Head from "next/head";
import Link from "next/link";
import { client } from "../libs/client";
import { Box, SimpleGrid, Badge } from "@chakra-ui/react";
import Image from "next/image";
import dayjs from "dayjs";

export default function Home({ blog }) {
  const now = dayjs();
  return (
    <div>
      <Head>
        <title>Home | umanoc</title>
      </Head>
      <SimpleGrid minChildWidth="260px" spacingX="20px" spacingY="20px">
        {blog.map((blog) => (
          <li className="list-none" key={blog.title}>
            <Box
              maxW="100%"
              maxH="100%"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <div>
                <Link href={`/blog/${blog.id}`}>
                  <a>
                    {blog.eyecatch ? (
                      <Image
                        src={blog.eyecatch.url}
                        width={400}
                        height={300}
                        layout="responsive"
                        objectFit="cover"
                        priority="false"
                        alt={blog.title}
                      />
                    ) : (
                      <Image
                        src="/noimage.jpg"
                        alt="No Image"
                        width={400}
                        height={300}
                        layout="responsive"
                        objectFit="cover"
                        priority="false"
                      />
                    )}
                  </a>
                </Link>
              </div>
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  {(() => {
                    if (now.diff(dayjs(blog.publishedAt), "day") <= 7) {
                      return (
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          New
                        </Badge>
                      );
                    }
                  })()}

                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    <p>
                      {blog.title} beds &bull; {blog.id} baths
                    </p>
                  </Box>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h1"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {blog.title}
                </Box>
                <Badge borderRadius="full" px="2" colorScheme="yellow">
                  {blog.category && `${blog.category.name}`}
                </Badge>

                <Box>
                  {dayjs(blog.publishedAt).format("YYYY.MM.DD")} updated
                </Box>

                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: `${blog.content}`,
                  }}
                /> */}
              </Box>
            </Box>
          </li>
        ))}
      </SimpleGrid>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};
