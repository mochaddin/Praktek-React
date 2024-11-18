import { useEffect, useState, useRef, useTransition } from 'react';
import { getAllProducts } from '../../services/getAllProducts';
import ProductList from '../../components/ProductList/ProductList';
import Navbar from '../../components/Navbar/Navbar';
import RadioButton from '../../components/RadioButton/RadioButton';
import getAllProductCategories from '../../services/getAllProductCategories';

function Products() {
  const [products, setProducts] = useState([]);
  const RadioButtonOpts = useRef([
    {
      label: 'All',
      value: 'all'
    },
  ]);

  const originalProducts = useRef([]);
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    function fetchProducts() {
      let allProducts = getAllProducts();
      allProducts = allProducts.length > 0 ? allProducts : [];
      originalProducts.current = allProducts;
      setProducts(allProducts);
    }

    function fetchCategories() {
      const allCategories = getAllProductCategories();
      const newCategories = allCategories
        .map((cat) => ({ label: cat.name, value: cat.slug }))
        .filter(
          (newCat) => !RadioButtonOpts.current.some((existingCat) => existingCat.value === newCat.value)
        );
      RadioButtonOpts.current = [...RadioButtonOpts.current, ...newCategories];
    }

    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    startTransition(() => {
      const filtered = originalProducts.current.filter(product => {
        const matchedCategory =
          selectedCategory === 'all' || product.categorySlug === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchedCategory && matchesSearch;
      });
      setProducts(filtered);
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />

      <div className="px-4 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium text-xl">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton options={RadioButtonOpts.current} defaultValue={'all'} onChange={handleCategoryChange} />
        </div>
      </div>

      <section className="container px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
          <ProductList products={products} isPending={isPending} />
        </div>
      </section>
    </>
  );
}
export default Products;
