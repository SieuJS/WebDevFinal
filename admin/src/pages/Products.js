import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import AdminProduct from '../components/AdminProduct';

export default function Categories() {
    return (
        <div className="grid-container">
            <AdminHeader />
            <AdminSidebar />
            <AdminProduct />
        </div>
    );
}