
import Carousel from '../components/Carousel'
import { AllFoods } from './AllFoods'
import AllFoodsA from './AllFoodsA'

const Home = () => {
  return (
    <div> 
      <Carousel />
      <AllFoods/>
      {/* <AllFoodsA/> */}
    </div>
  )
}

export default Home