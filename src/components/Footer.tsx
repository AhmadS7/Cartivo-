const Footer: React.FC = () => {
    return (
    <footer className="bg-gray-200 py-4 mt-8">
      <div className="container mx-auto text-center text-gray-600">
        &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>
    </footer>
    );
    };

    export default Footer;
