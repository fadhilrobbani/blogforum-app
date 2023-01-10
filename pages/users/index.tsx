import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

interface UsersProps {
  users: User[];
}

export type User = {
  id: string;
  email: string;
  password: string;
};

export default function Users({ users }: UsersProps) {
  const router = useRouter();
  return (
    <Layout pageTitle="User">
      <div>halaman user</div>
      <div className="grid grid-cols-2">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => router.push(`/users/${user.id}`)}
            className="shadow-md bg-slate-200 cursor-pointer p-3 m-2"
          >
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/users');
  const { success, payload } = await res.json();
  if (!success) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      users: payload,
    },
    revalidate: 10,
  };
};
