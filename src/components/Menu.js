import React, {useState} from 'react';
import '../App.css';

function Menu() {  // Pass a closeMenu function as a prop
  const menuItems = [
    {
      name: '1 Gallon Sweet Tea',
      price: '$5',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/SweetTeaGal.png"
    },
    {
      name: 'Half Gallon Sweet Tea',
      price: '$3',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/SweetTeaHalf.png"
    },
    {
      name: 'Classic Glazed',
      price: '$1.20',
      category: "Glazed",
      imgSrc: "/images/MenuIMG/Glazed.png"
    },
    {
      name: 'Classic Glazed with Chocolate Icing',
      price: '$1.20',
      category: "Glazed",
      imgSrc: "/images/MenuIMG/GazedChoc.png"
    },
    {
      name: 'Classic Glazed with Strawberry Icing',
      price: '$1.20',
      category: "Glazed",
      imgSrc: "/images/MenuIMG/GazedStrawb.png"
    },
    {
      name: 'Classic Glazed with Chocolate Icing and Sprinkles',
      price: '$1.20',
      category: "Glazed",
      imgSrc: "/images/MenuIMG/GazedChocspr.png"
    },
    {
      name: 'Classic Glazed with Strawberry Icing and Sprinkles',
      price: '$1.20',
      category: "Glazed",
      imgSrc: "/images/MenuIMG/GazedStrawbspr.png"
    },
    {
      name: 'Cake with Chocolate Icing',
      price: '$1.20',
      category: "Cake",
      imgSrc: "/images/MenuIMG/CakeChoc.png"
    },
    {
      name: 'Cake with Maple Icing',
      price: '$1.20',
      category: "Cake",
      imgSrc: "/images/MenuIMG/CakeMap.png"
    },
    {
      name: 'Cake with Strawberry Icing',
      price: '$1.20',
      category: "Cake",
      imgSrc: "/images/MenuIMG/CakeStrawb.png"
    },
    {
      name: 'Cake with Vanilla Icing',
      price: '$1.20',
      category: "Cake",
      imgSrc: "/images/MenuIMG/CakeVan.png"
    },
    {
      name: 'Cake with Chocolate Icing and Sprinkles',
      price: '$1.20',
      category: "Cake",
      imgSrc: "/images/MenuIMG/CakeChocSpr.png"
    },
    {
      name: 'Cake with Vanilla Icing and Sprinkles',
      price: '$1.20',
      category: "Cake",
      imgSrc: "/images/MenuIMG/CakeVanSpr.png"
    },
    {
      name: 'Chocolate Long John',
      price: '$1.20',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/ChocLJ.png"
    },
    {
      name: 'Vanilla Long John',
      price: '$1.20',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/VanLJ.png"
    },
    {
      name: 'Strawberry Long John',
      price: '$1.20',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/StrawbLJ.png"
    },
    {
      name: 'Maple Long John',
      price: '$1.20',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/MapLJ.png"
    },
    {
      name: 'Bavarian-filled with Chocolate Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/BanFillChoc.png"
    },
    {
      name: 'Raspberry Jelly-Filled with White Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/RazFillVan.png"
    },
    {
      name: 'Creme-Filled with Strawberry Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/VanFillStrawb.png"
    },
    {
      name: 'Creme-Filled with Chocolate Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/VanFillChoc.png"
    },
    {
      name: 'Creme-Filled with Maple Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/VanFillMap.png"
    },
    {
      name: 'Banana Creme-Filled with Vanilla Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/BanFillVan.png"
    },
    {
      name: 'Banana Creme-Filled with Chocolate Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/BanFillChoc.png"
    },
    {
      name: 'Lemon-Filled with Lemon Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/LemFillLem.png"
    },
    {
      name: 'Chocolate Creme-Filled with Chocolate Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/ChocFillChoc.png"
    },
    {
      name: 'Chocolate Creme-Filled with Vanilla Icing',
      price: '$1.20',
      category: "Filled",
      imgSrc: "/images/MenuIMG/ChocFillVan.png"
    },
    {
      name: 'Maple Cinnamon Roll',
      price: '$1.20',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/MapSwirl.png"
    },
    {
      name: 'Blueberry',
      price: '$1.20',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/BluBry.png"
    },
    {
      name: 'Glazed Twists',
      price: '$1.20',
      category: "Glazed",
      imgSrc: "/images/MenuIMG/GlazeTwists.png"
    },
    {
      name: 'Sugar Twists',
      price: '$1.20',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/CinTwist.png"
    },
    {
      name: 'Glazed Cinnamon Roll',
      price: '$1.20',
      category: "Glazed",
      imgSrc: "/images/MenuIMG/CinSwirl.png"
    },
    {
      name: 'Pecan Roll (Fridays and Sundays Only!)',
      price: '$1.75',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/Pecan.png"
    },
    {
      name: 'Donut Holes on a Stick',
      price: '$1.20',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/HoleSticks.png"
    },
    {
      name: 'Donut Holes',
      price: '$2 per half-dozen, $3.50 per dozen',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/Holes.png"
    },
    {
      name: 'Tiger Tails (Saturday Only!)',
      price: '$1.35',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/TigTail.png"
    },
    {
      name: 'Apple Fritters',
      price: '$1.35',
      category: "Specialty",
      imgSrc: "/images/MenuIMG/Fritters.png"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Glazed", "Filled", "Cake", "Specialty"];

  const filteredItems = selectedCategory === "All" ? menuItems : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">Dan's Menu</h1>
      </div>
      <p className="menu-subtitle">
        <strong>Call in before 1 A.M. to guarantee your order!</strong>
      </p>
      <p className="menu-pricing">
        A dozen standard donuts for $12, $7.20 for half a dozen
        <br />
        <small>(excludes apple fritters, pecan danish, and donut holes)</small>
      </p>

       {/* Category Filters */}
       <div className="menu-filters">
        {categories.map(category => (
          <button 
            key={category} 
            className={`filter-button ${selectedCategory === category ? "active" : ""}`} 
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-grid">
  {filteredItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <img src={item.imgSrc} alt={item.name} className="menu-image" />
            <div className="menu-item-text">
              <p className="menu-item-name">{item.name}</p>
              <p className="menu-item-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;