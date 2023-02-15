import { deleteProduct, getProducts } from "@/api/product";
import { useEffect, useState } from "@/utilities";
import axios from "axios";

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setProducts(await getProducts());
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        const btns = document.querySelectorAll(".btn-remove");
        for (let btn of btns) {
            btn.addEventListener("click", async function () {
                const id = this.dataset.id;
                const confirm = window.confirm("bạn có chắc chắn muốn xóa hay không?");
                if (confirm) {
                    try {
                        await deleteProduct(id);
                        const newProducts = products.filter((product) => product.id !== +id);
                        setProducts(newProducts);
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        }
    });
    return /*html*/ `<div class="container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products
                            .map(
                                (product, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${product.name}</td>
                                <td>
                                    <button data-id="${
                                        product.id
                                    }" class="btn btn-danger btn-remove">Xóa</button>
                                    <a href="/admin/products/${product.id}/edit">Sửa</a>
                                </td>
                            </tr>
                        `
                            )
                            .join("")}
                    </tbody>
                </table>

    </div>`;
};

export default AdminProductsPage;
