import { useEffect, useState } from "@/utilities";

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        const btns = document.querySelectorAll(".btn-remove");
        for (let btn of btns) {
            btn.addEventListener("click", function () {
                const id = this.dataset.id;

                fetch(`http://localhost:3000/products/${id}`, {
                    method: "DELETE",
                }).then(() => {
                    // reRender
                    const newProducts = products.filter((product) => product.id !== +id);
                    setProducts(newProducts);
                });
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
