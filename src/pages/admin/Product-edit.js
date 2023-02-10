import { useEffect, router, useState } from "@/utilities";

const AdminProductEditPage = ({ id }) => {
    console.log(id);
    // const products = JSON.parse(localStorage.getItem("products")) || [];
    // const currentProduct = products.find((product) => product.id === id);

    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            });
    }, []);

    useEffect(() => {
        const form = document.getElementById("form-add");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = {
                name: productName.value,
                price: productPrice.value,
            };
            fetch(`http://localhost:3000/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then(() => {
                // redirect sang admin/products
                router.navigate("/admin/products");
            });
        });
    });
    return `<div class="container">
            <h1>Cập nhật sản phẩm</h1>
            <form action="" id="form-add">
                <div class="form-group mb-3">
                    <label for="">Tên sản phẩm</label>
                    <input type="text" id="product-name" class="form-control" value="${
                        product.name ?? ""
                    }" />
                </div>
                <div class="form-group mb-3">
                    <label for="">Giá sản phẩm</label>
                    <input type="text" id="product-price" class="form-control" value="${
                        product.price ?? ""
                    }" />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">Cập nhật sản phẩm</button>
                </div>
            </form>
            </div>`;
};

export default AdminProductEditPage;
