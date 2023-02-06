import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

const app = document.querySelector("#app");
import AboutPage from "./pages/about";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFound";
import ProductDetailPage from "./pages/ProductDetail";
import ProductsPage from "./pages/Products";
import { render, router } from "./utilities";

router.on("/", () => render(HomePage, app));
router.on("/about", () => render(AboutPage, app));
router.on("/products", () => render(ProductsPage, app));
router.on("/product/:id", ({ data }) => render(() => ProductDetailPage(data), app));
router.notFound(() => render(NotFoundPage, app));
router.resolve();
