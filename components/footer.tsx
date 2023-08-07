import React from "react";
import Text from "@/components/text";

const Footer = () => {
  return (
    <footer className="container overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
      <Text.Body className="mt-10 text-center text-xs leading-5 text-gray-500">
        Fantasy Netball is currently being developed by{" "}
        <a href="https://timveletta.com" className="text-primary" target="_blank">
          Tim Veletta
        </a>
      </Text.Body>
    </footer>
  );
};

export default Footer;
