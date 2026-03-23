// pages/buyer/HomePage.js - Landing page + storefront for buyers
import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard';
import CategorySidebar from '../../components/CategorySidebar';
import PromoCarousel from '../../components/PromoCarousel';
import '../../styles/pages/home.css';

const HomePage = () => {
  const { getFeaturedProducts, getTrendingProducts } = useProducts();
  const featuredProducts = getFeaturedProducts().slice(0, 6);
  const trendingProducts = getTrendingProducts().slice(0, 6);

  return (
    <div className="home-page">

      {/* ===== HERO / LANDING SECTION ===== */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">#1 Coconut Coir Supplier in the Philippines</span>
          <h1 className="hero-title">
            Premium Coconut Coir<br />
            <span className="hero-highlight">Straight from Philippine Farms</span>
          </h1>
          <p className="hero-subtitle">
            We provide 100% natural, eco-friendly coconut coir products for gardening,
            landscaping, construction, and agriculture — sustainably sourced from
            Filipino coconut farmers.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="hero-btn hero-btn-primary">
              Start Shopping
            </Link>
            <a href="#about-section" className="hero-btn hero-btn-secondary">
              Learn More
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">10+</span>
              <span className="hero-stat-label">Products</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">Natural</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">PH</span>
              <span className="hero-stat-label">Proudly Filipino</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT US SECTION ===== */}
      <section className="about-section" id="about-section">
        <div className="about-container">
          <div className="about-header">
            <span className="section-tag">About Us</span>
            <h2>Who We Are</h2>
            <p className="about-intro">
              <strong>CocoirStore</strong> is a Philippine-based e-commerce platform dedicated to
              providing premium coconut coir products. Our mission is to support sustainable
              farming by transforming coconut husks — an abundant natural resource in the
              Philippines — into high-quality products for homes, farms, and industries.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-icon">Our Story</div>
              <h3>Our Story</h3>
              <p>
                Born from the heart of the Philippine coconut belt, CocoirStore partners directly
                with local coconut farmers to source the finest raw coir. Every purchase supports
                Filipino farming communities.
              </p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">Eco</div>
              <h3>Sustainability</h3>
              <p>
                Coconut coir is a renewable, biodegradable material. By choosing our products,
                you help reduce agricultural waste and support eco-friendly alternatives to
                synthetic materials.
              </p>
            </div>
            <div className="about-card">
              <div className="about-card-icon">Quality</div>
              <h3>Quality Promise</h3>
              <p>
                Each product goes through a careful cleaning, processing, and quality-check
                stage. We guarantee consistent quality from fiber to finished goods — every
                single time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE OFFER SECTION ===== */}
      <section className="offer-section">
        <div className="offer-container">
          <span className="section-tag">What We Offer</span>
          <h2>Our Product Categories</h2>
          <div className="offer-grid">
            <div className="offer-card">
              <div className="offer-icon">G</div>
              <h3>Gardening & Horticulture</h3>
              <p>Coco peat, grow bags, coir pots, and planting media for healthy plant growth.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">C</div>
              <h3>Construction & Erosion Control</h3>
              <p>Coir geotextiles, logs, and nets for slope stabilization and land protection.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">F</div>
              <h3>Fiber & Raw Materials</h3>
              <p>Premium coir fiber, bristle, and twine for industrial and craft applications.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">H</div>
              <h3>Home & Lifestyle</h3>
              <p>Natural coir doormats, rugs, and decorative items for an eco-friendly home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STOREFRONT: PROMO + PRODUCTS ===== */}
      <div className="home-container">
        {/* Left Sidebar with Categories */}
        <CategorySidebar />

        {/* Main Content Area */}
        <main className="home-main-content">
          {/* Promotional Carousel Banner */}
          <PromoCarousel />

          {/* Featured Products Section */}
          <section className="featured-section">
            <div className="section-header">
              <h2>Featured Products</h2>
              <Link to="/products" className="view-all-link">
                View All →
              </Link>
            </div>
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Trending Products Section */}
          <section className="trending-section">
            <div className="section-header">
              <h2>Trending Now</h2>
              <Link to="/products" className="view-all-link">
                View All →
              </Link>
            </div>
            <div className="products-grid">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="company-info">
            <h2>Why Choose CocoirStore?</h2>
            <div className="info-cards">
              <div className="info-card">
                <h3>Premium Quality</h3>
                <p>100% natural coconut coir sourced from Philippine coconut farms</p>
              </div>
              <div className="info-card">
                <h3>Eco-Friendly</h3>
                <p>Sustainable and environmentally responsible products</p>
              </div>
              <div className="info-card">
                <h3>Fast Delivery</h3>
                <p>Quick shipping to your location with tracking</p>
              </div>
              <div className="info-card">
                <h3>Best Prices</h3>
                <p>Competitive pricing and regular discounts</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-content">
              <h2>Ready to Go Green?</h2>
              <p>Explore our complete collection of premium coconut coir products</p>
              <Link to="/login" className="btn btn-large btn-primary">
                Shop Now
              </Link>
            </div>
          </section>
        </main>
      </div>

      {/* ===== GROUP / TEAM SECTION ===== */}
      <section className="team-section">
        <div className="team-container">
          <span className="section-tag">SKYJCUTIES</span>
          <h2>The People Behind CocoirStore</h2>
          <p className="team-intro">
            We are SKYJCUTIES — a passionate group of students committed to building a sustainable
            e-commerce platform for Philippine coconut coir products.
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">JM</div>
              <h4>Taduran, John Miguel B.</h4>
              <p>Developer</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">MM</div>
              <h4>Manalastas, Mark Miguel V.</h4>
              <p>Designer</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">KS</div>
              <h4>Sarita, Kramnik P.</h4>
              <p>Researcher</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">JR</div>
              <h4>Cortan, John Rosedel R.</h4>
              <p>Project Lead</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
