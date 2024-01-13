import AdminHeader from '../../components/Admin/AdminHeader';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminCat from '../../components/Admin/AdminCat';

export default function Categories() {
    return (
        <div className="grid-container">
            <AdminHeader />
            <AdminSidebar />
            <AdminCat/>
        </div>
    );
}