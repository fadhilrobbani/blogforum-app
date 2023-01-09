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
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
    </Layout>
  );
}

type UserPaths = {
  params: {
    id: string;
  };
}[];
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await res.json();
  const paths: UserPaths = users.map((user) => ({
    params: { id: `${user.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params?.id}`
  );
  const user: User = await res.json();

  if (JSON.stringify(user) === '{}') {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user,
    },
  };
};
