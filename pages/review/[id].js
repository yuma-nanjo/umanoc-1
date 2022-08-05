import { client } from "../../libs/client";
import Image from "next/image";
import dayjs from "dayjs";

export default function ReviewId({ review }) {
  return (
    <main>
      <h1>{review.title}</h1>
      <p>{dayjs(review.publishedAt).format("YYYY.MM.DD")}</p>
      <div className="mt-12">
        {review.cover ? (
          <Image
            src={review.cover.url}
            width={review.cover.width}
            height={review.cover.height}
            alt={review.title}
          />
        ) : (
          <Image src="/noimage.jpg" alt="No Image" width={100} height={100} />
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `${review.review}`,
        }}
      />
    </main>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "review" });

  const paths = data.contents.map((content) => `/review/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "review", contentId: id });

  return {
    props: {
      review: data,
    },
  };
};
