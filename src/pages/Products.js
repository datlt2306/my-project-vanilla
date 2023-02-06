import ProductList from "@/components/ProductList";
import { products } from "../data";

const ProductsPage = () => {
    return `<div class="container">
    <div class="row">
        ${ProductList({ products })}
    </div></div>`;
};

export default ProductsPage;
