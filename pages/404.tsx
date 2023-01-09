import Layout from '../components/Layout';

function NotFoundPage() {
  return (
    <Layout pageTitle="Oops..">
      <div className="bg-slate-300 w-full h-screen items-center justify-center flex ">
        <p className="text-2xl font-semibold">
          Halaman tidak Ditemukan | Error 404
        </p>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
