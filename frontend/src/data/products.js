export const products = [
  // Men
  { 
    id: 1, 
    name: 'Vintage Denim Jacket', 
    price: 7469, 
    category: 'men', 
    img: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=2000&auto=format&fit=crop'
    ],
    description: "Experience timeless fashion with this premium vintage denim jacket. Featuring durable stitching and a classic fit, it's the perfect addition to any modern wardrobe."
  },
  { 
    id: 2, 
    name: 'Classic White Sneakers', 
    price: 6639, 
    category: 'men', 
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop',
    description: "Step into comfort with our classic white sneakers. Designed for everyday wear, these shoes offer both style and unmatched support."
  },
  { 
    id: 5, 
    name: 'Casual Linen Shirt', 
    price: 3735, 
    category: 'men', 
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810319428-019690571b5b?q=80&w=2000&auto=format&fit=crop'
    ],
    description: "Stay cool and stylish this summer with our casual linen shirt. Breathable fabric and a relaxed fit make it a must-have."
  },
  { 
    id: 9, 
    name: 'Urban Street Hoodie', 
    price: 4149, 
    category: 'men', 
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop',
    description: "Embrace the urban lifestyle with this comfortable and stylish street hoodie. Perfect for chilly evenings."
  },
  { 
    id: 10, 
    name: 'Tailored Fit Chinos', 
    price: 4565, 
    category: 'men', 
    img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=2000&auto=format&fit=crop',
    description: "Versatile tailored fit chinos that easily transition from the office to the weekend. Crafted for maximum comfort."
  },
  
  // Women
  { 
    id: 3, 
    name: 'Summer Floral Dress', 
    price: 4979, 
    category: 'women', 
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    description: "Radiate summer vibes with this beautiful floral dress. Lightweight, breezy, and effortlessly chic."
  },
  { 
    id: 4, 
    name: 'Elegant Evening Gown', 
    price: 9960, 
    category: 'women', 
    img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2071&auto=format&fit=crop',
    description: "Turn heads at any event with this elegant evening gown. Exquisite design and premium materials for a stunning look."
  },
  { 
    id: 6, 
    name: 'Leather Crossbody Bag', 
    price: 5477, 
    category: 'women', 
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop',
    description: "A compact yet spacious leather crossbody bag. Keep your essentials organized in style."
  },
  { 
    id: 11, 
    name: 'High-Waist Jeans', 
    price: 6225, 
    category: 'women', 
    img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2000&auto=format&fit=crop',
    description: "Flattering high-waist jeans designed to highlight your silhouette. Made with stretchable, durable denim."
  },
  { 
    id: 12, 
    name: 'Silk Blouse', 
    price: 7055, 
    category: 'women', 
    img: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=2000&auto=format&fit=crop',
    description: "A luxurious silk blouse that adds a touch of sophistication to any outfit. Soft, breathable, and chic."
  },
  {
    id: 15,
    name: 'Premium Makeup Palette',
    price: 3817,
    category: 'women',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop',
    description: "Complete your look with our premium makeup palette. High-quality shades perfect for any occasion."
  },
  {
    id: 16,
    name: 'Luxury Matte Lipstick',
    price: 1992,
    category: 'women',
    img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=2000&auto=format&fit=crop',
    description: "A bold, long-lasting matte lipstick that provides a flawless finish without drying your lips."
  },
  
  // Kids
  { 
    id: 7, 
    name: 'Kids Striped T-Shirt', 
    price: 2075, 
    category: 'kids', 
    img: 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=2070&auto=format&fit=crop',
    description: "A fun and playful striped t-shirt for kids. Made with soft cotton for all-day comfort."
  },
  { 
    id: 8, 
    name: 'Toddler Denim Overalls', 
    price: 2905, 
    category: 'kids', 
    img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2000&auto=format&fit=crop',
    description: "Cute and durable denim overalls for toddlers. Perfect for playtime adventures."
  },
  { 
    id: 13, 
    name: 'Kids Winter Jacket', 
    price: 4565, 
    category: 'kids', 
    img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2000&auto=format&fit=crop',
    description: "Keep them warm and cozy with this insulated winter jacket. Bright colors and maximum protection against the cold."
  },
  { 
    id: 14, 
    name: 'Colorful Sneakers', 
    price: 2490, 
    category: 'kids', 
    img: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2000&auto=format&fit=crop',
    description: "Vibrant and comfortable sneakers designed for active kids. Easy to slip on and off."
  },
  
  // Trending Additions based on Flipkart reference
  {
    id: 17,
    name: 'Elegant Silk Saree',
    price: 8999,
    category: 'women',
    img: 'https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=2000&auto=format&fit=crop',
    description: "A beautifully crafted traditional silk saree. Perfect for weddings, festivals, and special occasions."
  },
  {
    id: 18,
    name: 'Classic Chronograph Watch',
    price: 12499,
    category: 'accessories',
    img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2000&auto=format&fit=crop',
    description: "A sophisticated chronograph watch with a leather strap. Timeless elegance for your wrist."
  },
  {
    id: 19,
    name: 'Graphic Print T-Shirt',
    price: 1499,
    category: 'men',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop',
    description: "A comfortable, everyday graphic t-shirt made with 100% breathable cotton."
  },
  {
    id: 20,
    name: 'Running Sports Shoes',
    price: 4999,
    category: 'men',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop',
    description: "Lightweight and breathable running shoes built for maximum performance and style."
  },
  
  // Additional Items for better variety
  {
    id: 21,
    name: 'Designer Party Wear Saree',
    price: 15499,
    category: 'women',
    img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=2000&auto=format&fit=crop',
    description: "Make a statement with this heavily embroidered designer party wear saree."
  },
  {
    id: 22,
    name: 'Smart Fitness Watch',
    price: 7999,
    category: 'accessories',
    img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2000&auto=format&fit=crop',
    description: "Track your health and stay connected with this state-of-the-art smart fitness watch."
  },
  {
    id: 23,
    name: 'Kids Cartoon T-Shirts (Pack of 3)',
    price: 2199,
    category: 'kids',
    img: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=2000&auto=format&fit=crop',
    description: "Fun and vibrant cartoon print t-shirts for kids. Made with ultra-soft organic cotton."
  },
  {
    id: 24,
    name: 'Leather Formal Shoes',
    price: 6499,
    category: 'men',
    img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop',
    description: "Premium handcrafted leather formal shoes for men. Perfect for office and evening wear."
  },
  {
    id: 25,
    name: 'Women Casual Sneakers',
    price: 3999,
    category: 'women',
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2000&auto=format&fit=crop',
    description: "Trendy, comfortable, and versatile casual sneakers for everyday fashion."
  },
  {
    id: 26,
    name: 'Luxury Rose Gold Watch',
    price: 18999,
    category: 'women',
    img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2000&auto=format&fit=crop',
    description: "A stunning luxury rose gold watch featuring a minimalist dial and premium mesh band."
  },
  {
    id: 27,
    name: 'Plain Basic T-Shirts (Combo)',
    price: 1999,
    category: 'men',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop',
    description: "Essential plain basic t-shirts for your daily wardrobe. Includes black, white, and grey."
  }
];

export const trendingProducts = products.filter(p => [1, 3, 2, 9, 17, 18, 22].includes(p.id));
