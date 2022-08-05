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
      <SimpleGrid minChildWidth="160px" spacing="10px">
        {blog.map((blog) => (
          <li className="list-none" key={blog.id}>
            <Box
              maxW="100%"
              maxH="100%"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Link href={`/blog/${blog.id}`}>
                <a>
                  {blog.eyecatch ? (
                    <Image
                      src={blog.eyecatch.url}
                      width={768}
                      height={430}
                      layout="responsive"
                      objectFit="cover"
                      priority="false"
                      quality={100}
                      alt={blog.title}
                    />
                  ) : (
                    <Image
                      src="/noimage.jpg"
                      alt="No Image"
                      width={768}
                      height={430}
                      layout="responsive"
                      objectFit="cover"
                      priority="false"
                      quality={100}
                    />
                  )}
                </a>
              </Link>
              <Box p="3">
                <Box display="flex" alignItems="baseline">
                  {(() => {
                    if (now.diff(dayjs(blog.publishedAt), "day") <= 7) {
                      return (
                        <Badge borderRadius="full" px="2" colorScheme="cyan">
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
                    {dayjs(blog.publishedAt).format("YYYY.MM.DD")}
                  </Box>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h1"
                  fontSize="xs"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {blog.title}
                </Box>
                <Badge borderRadius="full" px="2" colorScheme="yellow">
                  {blog.category && `${blog.category.name}`}
                </Badge>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h1"
                  fontSize="xx-small"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {dayjs(blog.updatedAt).format("YYYY.MM.DD")} updated
                </Box>
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
