import { addProduct } from "@/api/product";
import { useEffect, router } from "@/utilities";
import axios from "axios";

const AdminProductAddPage = () => {
    useEffect(() => {
        const form = document.getElementById("form-add");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");
        const productImages = document.getElementById("product-images");

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const urls = await uploadFiles(productImages.files);
            addProduct({
                name: productName.value,
                price: productPrice.value,
                gallery: urls,
            })
                .then(() => router.navigate("/admin/products"))
                .catch((error) => console.log(error));
        });
    });

    const uploadFiles = async (files) => {
        if (files) {
            const CLOUD_NAME = "ecommercer2021";
            const PRESET_NAME = "demo-upload";
            const FOLDER_NAME = "ECMA";
            const urls = [];
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

            const formData = new FormData(); // key: value

            formData.append("upload_preset", PRESET_NAME);
            formData.append("folder", FOLDER_NAME);

            for (const file of files) {
                formData.append("file", file);
                const response = await axios.post(api, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                urls.push(response.data.secure_url);
                // return urls;
            }
            return urls;
        }
    };
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
        <div class="form-group mb-3">
            <label for="">Ảnh sản phẩm</label>
            <input type="file" id="product-images" multiple class="form-control" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Thêm sản phẩm</button>
        </div>
    </form>
    </div>`;
};

export default AdminProductAddPage;
