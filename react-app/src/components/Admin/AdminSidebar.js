export default function AdminSidebar() {
    return (
        <aside id="sidebar">
            <div className="sidebar-title">
            <div className="sidebar-brand">
                <span className="material-icons-outlined">shopping_cart</span> STORE
            </div>
            <span className="material-icons-outlined" onclick="closeSidebar()">close</span>
            </div>

            <ul className="sidebar-list">
            <li className="sidebar-list-item">
                <a href="/" target="_blank">
                <span className="material-icons-outlined">dashboard</span> Dashboard
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/admin/product">
                <span className="material-icons-outlined">inventory_2</span> Products
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/admin/category">
                <span className="material-icons-outlined">category</span> Categories
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/admin/customers" target="_blank">
                <span className="material-icons-outlined">groups</span> Customers
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/" target="_blank">
                <span className="material-icons-outlined">fact_check</span> Inventory
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/" target="_blank">
                <span className="material-icons-outlined">poll</span> Reports
                </a>
            </li>
            <li className="sidebar-list-item">
                <a href="/" target="_blank">
                <span className="material-icons-outlined">settings</span> Settings
                </a>
            </li>
            </ul>
        </aside> 
    );
};