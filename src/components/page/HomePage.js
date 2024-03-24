import Banner from "../home/Banner";
import Categories from "../home/Categories";
import OtherInformation from "../home/OtherInformation";
import Trending from "../home/Trending";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <Trending />
      <OtherInformation />
    </div>
  );
};

export default HomePage;
