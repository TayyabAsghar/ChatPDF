import features from "@/data/features";

const Home = () => {
  console.log(features);
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-indigo-600">
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center">
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default Home;
