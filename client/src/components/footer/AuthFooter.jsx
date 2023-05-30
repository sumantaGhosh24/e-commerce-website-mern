import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaDiscord,
  FaHome,
  FaEnvelope,
  FaPhone,
  FaFax,
} from "react-icons/fa";
import {Link} from "react-router-dom";

const AuthFooter = () => {
  return (
    <>
      <footer className="bg-blue-500 text-center text-white lg:text-left">
        <div className="flex items-center justify-center border-b-2 border-white p-6 lg:justify-between">
          <div className="mr-12 hidden lg:block">
            <span>Get connected with us on social networks : </span>
          </div>
          <div className="flex justify-center">
            <a href="#!" className="mr-6 text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#!" className="mr-6 text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#!" className="mr-6 text-white">
              <FaLinkedinIn size={24} />
            </a>
            <a href="#!" className="mr-6 text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#!" className="mr-6 text-white">
              <FaYoutube size={24} />
            </a>
            <a href="#!" className="text-white">
              <FaDiscord size={24} />
            </a>
          </div>
        </div>
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                E-Commerce
              </h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit,
                nulla, voluptas voluptate quisquam incidunt itaque repellendus
                explicabo doloremque cumque ipsa sed commodi porro ea earum.
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Important Links
              </h6>
              <p className="mb-4">
                <Link
                  to="/welcome"
                  className="text-neutral-600 dark:text-neutral-200"
                >
                  Products
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  to="/orders"
                  className="text-neutral-600 dark:text-neutral-200"
                >
                  Orders
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  to="/register"
                  className="text-neutral-600 dark:text-neutral-200"
                >
                  Register
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  to="/register"
                  className="text-neutral-600 dark:text-neutral-200"
                >
                  Login
                </Link>
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Useful links
              </h6>
              <p className="mb-4">
                <Link to="#" className="text-neutral-600 dark:text-neutral-200">
                  Help
                </Link>
              </p>
              <p className="mb-4">
                <Link to="#" className="text-neutral-600 dark:text-neutral-200">
                  Service
                </Link>
              </p>
              <p className="mb-4">
                <Link to="#" className="text-neutral-600 dark:text-neutral-200">
                  Contact
                </Link>
              </p>
              <p>
                <Link to="#" className="text-neutral-600 dark:text-neutral-200">
                  Customer Service
                </Link>
              </p>
            </div>
            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Contact
              </h6>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaHome className="mr-3" size={20} />
                Abc Road, Kolkata, India
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-3" size={20} />
                test@example.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaPhone className="mr-3" size={20} />+ 91 9999999999
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <FaFax className="mr-3" size={20} />+ 91 9999999999
              </p>
            </div>
          </div>
        </div>
        <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
          <span>© 2023 Copyright:</span>
          <a
            className="font-semibold text-neutral-600 dark:text-neutral-400 ml-2"
            href="#"
          >
            E-Commerce
          </a>
        </div>
      </footer>
    </>
  );
};

export default AuthFooter;
