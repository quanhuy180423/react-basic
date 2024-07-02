import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import LoginIcon from "@mui/icons-material/People";
import LogOutIcon from "@mui/icons-material/LoginOutlined";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactIcon from "@mui/icons-material/ContactMail";
import { useState, useEffect } from 'react';

function Header() {
    const [value, setValue] = useState(0);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    // Hàm để lấy tên người dùng từ localStorage
    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString) {
            const user = JSON.parse(userString); // Parse JSON string về đối tượng
            return user.name || ''; // Trả về tên người dùng hoặc chuỗi rỗng nếu không có tên
        }
        return null; // Trả về null nếu không có người dùng
    };

    // Sử dụng useEffect để cập nhật tên người dùng khi component được render
    useEffect(() => {
        const name = getUser();
        if (name) {
            setUserName(name);
        } else {
            setUserName('');
        }
    }, [value]);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUserName(''); // Cập nhật lại tên người dùng để phản ánh trạng thái đăng xuất
        setValue(0); // Đặt lại giá trị navigation
        navigate('/'); // Điều hướng về trang đăng nhập
    };

    return (
        <AppBar position="sticky" style={{ marginBottom: '20px' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Staff Management
                </Typography>
                <Typography display='flex' justifyContent='center' flexGrow='1'>
                    {userName ? `Welcome, ${userName}` : 'Welcome, Guest'}
                </Typography>

                <Box sx={{ width: 500 }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        {userName ? <BottomNavigationAction
                            label="Logout"
                            icon={<LogOutIcon />}
                            onClick={handleLogout}
                        /> : <BottomNavigationAction
                            label="Login"
                            icon={<LoginIcon />}
                            component={Link}
                            to="/login"
                        />}

                        <BottomNavigationAction
                            label="Home"
                            icon={<HomeIcon />}
                            component={Link}
                            to="/"
                        />
                        <BottomNavigationAction
                            label="Dashboard"
                            icon={<DashboardIcon />}
                            component={Link}
                            to="/dashboard"
                        />
                        <BottomNavigationAction
                            label="Contact"
                            icon={<ContactIcon />}
                            component={Link}
                            to="/contact"
                        />

                    </BottomNavigation>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
