import Jumbotron from '../../components/cards/jumbotron/Jumbotron';

import NewArrivals from '../../components/home/newArrivals/NewArrivals';
import BestSellers from '../../components/home/bestSellers/BestSellers';
import CategoryList from '../../components/home/categoryList/CategoryList';
import SubcategoryList from '../../components/home/subCategory/SubcategoryList';

import './Home.css';

const Home = () => {
  return (
    <main className="home-page">
      {/* =========================================
          HERO
      ========================================= */}

      <section className="home-hero">
        <Jumbotron text={['New Arrivals', 'Best Sellers']} />
      </section>

      {/* =========================================
          NEW ARRIVALS
      ========================================= */}

      <section className="home-section home-section-light">
        <div className="home-container">
          <div className="home-section-heading">
            <span className="home-eyebrow">Fresh from the store</span>

            <h2>New Arrivals</h2>

            <p>Discover the latest products added to our collection.</p>
          </div>

          <div className="home-products">
            <NewArrivals />
          </div>
        </div>
      </section>

      {/* =========================================
          BEST SELLERS
      ========================================= */}

      <section className="home-section">
        <div className="home-container">
          <div className="home-section-heading">
            <span className="home-eyebrow">Customer favourites</span>

            <h2>Best Sellers</h2>

            <p>Explore the products our customers love the most.</p>
          </div>

          <div className="home-products">
            <BestSellers />
          </div>
        </div>
      </section>

      {/* =========================================
          CATEGORIES
      ========================================= */}

      <section className="home-section home-category-section">
        <div className="home-container">
          <div className="home-section-heading">
            <span className="home-eyebrow">Browse our collection</span>

            <h2>Categories</h2>

            <p>Find exactly what you're looking for by category.</p>
          </div>

          <div className="home-category-list">
            <CategoryList />
          </div>
        </div>
      </section>

      {/* =========================================
          SUBCATEGORIES
      ========================================= */}

      <section className="home-section home-subcategory-section">
        <div className="home-container">
          <div className="home-section-heading">
            <span className="home-eyebrow">Explore further</span>

            <h2>Subcategories</h2>

            <p>Refine your shopping experience and discover more.</p>
          </div>

          <div className="home-category-list">
            <SubcategoryList />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
