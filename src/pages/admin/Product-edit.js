import { useEffect, router } from "@/utilities";

const AdminProductEditPage = ({ id }) => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const currentProduct = products.find((product) => product.id === id);
    useEffect(() => {
        const form = document.getElementById("form-add");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const newProduct = {
                id: id,
                name: productName.value,
                price: productPrice.value,
            };

            // cập nhật phần tử trong mảng products;
            const newProducts = products.map((product) => {
                return product.id === newProduct.id ? newProduct : product;
            });

            // lưu lại storage

            localStorage.setItem("products", JSON.stringify(newProducts));

            // redirect sang admin/products
            router.navigate("/admin/products");
        });
    });
    if (!currentProduct) return null;
    return `<div class="container">
            <h1>Cập nhật sản phẩm</h1>
            <form action="" id="form-add">
                <div class="form-group mb-3">
                    <label for="">Tên sản phẩm</label>
                    <input type="text" id="product-name" class="form-control" value="${currentProduct.name}" />
                </div>
                <div class="form-group mb-3">
                    <label for="">Giá sản phẩm</label>
                    <input type="text" id="product-price" class="form-control" value="${currentProduct.price}" />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">Cập nhật sản phẩm</button>
                </div>
            </form>
            </div>`;
};

export default AdminProductEditPage;
