import { ThreeDots } from 'react-loader-spinner';

export default function Spinner() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
}
