import { addProduct } from "@/api/product";
import { useEffect, router } from "@/utilities";
import axios from "axios";

const AdminProductAddPage = () => {
    useEffect(() => {
        const form = document.getElementById("form-add");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");

        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            try {
                await addProduct({
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
