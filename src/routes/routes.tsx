import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Marketplace from '../pages/Marketplace';

// Simple components for other routes
const About = () => <div><h1>About Us</h1><p>Learn more about our company.</p></div>;
const Teams = () => <div><h1>Our Teams</h1><p>Meet our amazing team members.</p></div>;
const Whitepaper = () => <div><h1>Whitepaper</h1><p>Read our detailed whitepaper.</p></div>;

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/marketplace" replace />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'teams',
                element: <Teams />,
            },
            {
                path: 'marketplace',
                element: <Marketplace />,
            },
            {
                path: 'whitepaper',
                element: <Whitepaper />,
            },
        ],
    },
]);
