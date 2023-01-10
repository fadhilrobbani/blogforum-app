import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { User } from '.';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';

interface UserDetailProps {
  user: User;
}

export default function UserDetail({ user }: UserDetailProps) {
  const router = useRouter();
  const { id } = router.query;
  if (router.isFallback) {
    return <Spinner />;
  }
  return (
    <Layout pageTitle={id as string}>
      <div>UserDetail {id}</div>
      <div>{user.email}</div>
    </Layout>
  );
}

type UserPaths = {
  params: {
    id: string;
  };
}[];
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/users');
  const { payload } = await res.json();
  const users: User[] = payload;
  const paths: UserPaths = users.map((user) => ({
    params: { id: `${user.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/users/${params?.id}`);
  const { payload } = await res.json();
  const user: User = payload;

  if (JSON.stringify(user) === '{}') {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user,
    },
    revalidate: 10,
  };
};
