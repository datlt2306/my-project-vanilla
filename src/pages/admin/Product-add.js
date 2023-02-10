import { useEffect, router } from "@/utilities";
// import { products } from "@/data";
import { v4 as uuidv4 } from "uuid";

const AdminProductAddPage = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    useEffect(() => {
        const form = document.getElementById("form-add");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const newProduct = {
                id: uuidv4(),
                name: productName.value,
                price: productPrice.value,
            };

            // thêm vào mảng products;
            products.push(newProduct);

            // lưu lại storage

            localStorage.setItem("products", JSON.stringify(products));

            // redirect sang admin/products
            router.navigate("/admin/products");
        });
    });
    return `<div class="container">
    <h1>Thêm sản phẩm</h1>
    <form action="" id="form-add">
        <div class="form-group mb-3">
            <label for="">Tên sản phẩm</label>
            <input type="text" id="product-name" class="form-control" />
        </div>
        <div class="form-group mb-3">
            <label for="">Giá sản phẩm</label>
            <input type="text" id="product-price" class="form-control" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Thêm sản phẩm</button>
        </div>
    </form>
    </div>`;
};

export default AdminProductAddPage;
