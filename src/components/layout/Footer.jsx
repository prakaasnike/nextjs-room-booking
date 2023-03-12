import React from 'react'

const Footer = ({ name = "Prakash Nayak" }) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return (
        <footer className="py-4 text-center bg-white border-t-2 border-gray-100">
            <p className="text-gray-500 text-sm">
                © {year} Made with ❤️ by <strong>{name}</strong> | Today is {month} {day}
            </p>
        </footer>
    )
}

export default Footer
