import React from "react";
import MyContainer from "../MyContainer/MyContainer";

const AboutUs = () => {
  return (
    <div>
      <MyContainer>
        <title>About Us</title>
        <div className=" px-4 py-12">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-secondary">About Us</h2>
              <p className="mt-4 text-lg text-gray-500">
                Empowering garment businesses with smart management and seamless
                sales
              </p>
            </div>

            {/* Main Content */}
            <div className="grid gap-10 md:grid-cols-2">
              {/* Left Section */}
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                  Who We Are
                </h3>
                <p className="leading-relaxed text-gray-600">
                  We are a modern garments management platform designed to
                  simplify how garment businesses operate. Our system helps
                  admins manage products, track buyer orders, and monitor sales
                  efficiently from one place.
                </p>
                <p className="mt-4 leading-relaxed text-gray-600">
                  Whether you are handling a small clothing store or a large
                  garment operation, our platform gives you the tools you need
                  to stay organized, reduce errors, and grow your business.
                </p>
              </div>

              {/* Right Section */}
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                  What We Do
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
                    Manage garment products with full control
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
                    Track buyer orders and order status in real time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
                    Monitor sales performance and business growth
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600"></span>
                    Ensure smooth communication between admin and sales
                    management
                  </li>
                </ul>
              </div>
            </div>

            {/* Mission Section */}
            <div className="mt-12 rounded-2xl bg-secondary p-10 text-center text-white">
              <h3 className="mb-4 text-3xl font-semibold">Our Mission</h3>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed">
                Our mission is to make garment business management simple,
                transparent, and efficient. We aim to help garment owners and
                managers save time, reduce operational complexity, and focus
                more on delivering quality products to their customers.
              </p>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default AboutUs;
