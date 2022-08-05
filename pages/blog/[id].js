import { client } from "../../libs/client";
import Image from "next/image";
import dayjs from "dayjs";

export default function BlogId({ blog }) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{dayjs(blog.publishedAt).format("YYYY.MM.DD")}</p>
      <p>{blog.category && `${blog.category.name}`}</p>
      <div className="mt-12">
        {blog.eyecatch ? (
          <Image
            src={blog.eyecatch.url}
            width={blog.eyecatch.width}
            height={blog.eyecatch.height}
            alt={blog.title}
          />
        ) : (
          <Image src="/noimage.jpg" alt="No Image" width={100} height={100} />
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.content}`,
        }}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
