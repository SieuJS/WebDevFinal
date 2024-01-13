import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminProduct from '../../components/Admin/AdminProduct';

export default function Product() {
    return (
        <div className="grid-container">
            <AdminHeader />
            <AdminSidebar />
            <AdminProduct />
        </div>
    );
}