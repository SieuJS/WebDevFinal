import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import AdminCat from '../components/AdminCat';

export default function Categories() {
    return (
        <div className="grid-container">
            <AdminHeader />
            <AdminSidebar />
            <AdminCat/>
        </div>
    );
}