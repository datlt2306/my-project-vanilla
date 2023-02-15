import { getProduct, updateProduct } from "@/api/product";
import { useEffect, router, useState } from "@/utilities";
import axios from "axios";

const AdminProductEditPage = ({ id }) => {
    console.log(id);
    // const products = JSON.parse(localStorage.getItem("products")) || [];
    // const currentProduct = products.find((product) => product.id === id);

    const [product, setProduct] = useState({});

    useEffect(() => {
        (async () => {
            try {
                setProduct(await getProduct(id));
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        const form = document.getElementById("form-add");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");

        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            try {
                await updateProduct({
                    id,
                    name: productName.value,
                    price: productPrice.value,
                });
                router.navigate("/admin/products");
            } catch (error) {
                console.log(error);
            }
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
