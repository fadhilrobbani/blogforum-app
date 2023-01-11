import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { User } from '.';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import api from '../../utils/api';

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
  const users: User[] = await api.getAllUsers();
  const paths: UserPaths = users.map((user) => ({
    params: { id: `${user.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user: User = await api.getUserById(params?.id as string);

  if (!user) {
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
