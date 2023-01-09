import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

interface UsersProps {
  users: User[];
}

export type User = {
  id: number;
  name: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
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
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await res.json();
  return {
    props: {
      users,
    },
    revalidate: 10,
  };
};
