import React from "react";
import Text from "@/components/text";

const navigation = {
  main: [{ name: "Privacy Policy", href: "/privacy" }],
};

const Footer = () => {
  return (
    <footer className="bg-white container overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
      <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
        {navigation.main.map((item) => (
          <div key={item.name} className="pb-6">
            <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              {item.name}
            </a>
          </div>
        ))}
      </nav>
      <Text.Body className="mt-10 text-center text-xs leading-5 text-gray-500">
        &copy; 2023 FantasyNetball.com
      </Text.Body>
    </footer>
  );
};

export default Footer;
