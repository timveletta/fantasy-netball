import React from "react";
import Text from "@/components/text";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container py-8 flex flex-col flex-wrap">
      <Text.Title>Privacy Policy for FantasyNetball.com</Text.Title>
      <Text.Body>Last Updated: 25 July 2023</Text.Body>
      <Text.Body>
        At FantasyNetball.com, we value the privacy of our users and are committed to protecting their personal
        information. This Privacy Policy outlines how we collect, use, disclose, and safeguard the data you provide to
        us when using our website and services.
      </Text.Body>
      <Text.Body>
        By accessing and using FantasyNetball.com, you consent to the practices described in this policy.
      </Text.Body>
      <Text.Header>1. Information Collection and Use</Text.Header>
      <Text.Subheader>1.1 Personal Information</Text.Subheader>
      <Text.Body>
        We may collect personal information such as your name, email address, and other identifiable data when you
        register an account, or interact with our website in any way. We use this information to provide you with
        personalized services, improve our website and services, and communicate with you.
      </Text.Body>
      <Text.Subheader>1.2 Non-Personal Information</Text.Subheader>
      <Text.Body>
        We may also collect non-personal information automatically, such as your IP address, browser type, device
        information, and usage data. This data is collected to analyze trends, administer the website, and gather
        demographic information for our internal use.
      </Text.Body>
      <Text.Header>2. Cookies and Similar Technologies</Text.Header>
      <Text.Body>
        We use cookies and similar technologies to enhance user experience and gather information about your
        interactions with FantasyNetball.com. Cookies are small files stored on your device that help us recognize your
        preferences and remember certain information for future visits. By using the website, you agree to the use of
        cookies as described in our{" "}
        <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-800" href="/cookies">
          Cookie Policy
        </Link>
        .
      </Text.Body>
      <Text.Header>3. Data Sharing and Disclosure</Text.Header>
      <Text.Subheader>3.1 Third-Party Service Providers</Text.Subheader>
      <Text.Body>
        We may share your personal information with trusted third-party service providers who assist us in operating our
        website and providing services to you. These service providers are contractually obligated to protect your data
        and may only use it for the purposes specified by us.
      </Text.Body>
      <Text.Subheader>3.2 Legal Requirements</Text.Subheader>
      <Text.Body>
        We may disclose your personal information when required by law or to protect our rights and comply with legal
        processes.
      </Text.Body>
      <Text.Subheader>3.3 Business Transfers</Text.Subheader>
      <Text.Body>
        In the event of a merger, acquisition, or sale of all or part of FantasyNetball.com, your personal information
        may be transferred to the acquiring entity, subject to the same privacy protections described in this policy.
      </Text.Body>
      <Text.Header>4. Security</Text.Header>
      <Text.Body>
        We implement industry-standard security measures to protect your personal information from unauthorized access,
        misuse, or alteration. However, please understand that no method of transmission over the internet or electronic
        storage is entirely secure, and we cannot guarantee absolute security.
      </Text.Body>
      <Text.Header>5. Children's Privacy</Text.Header>
      <Text.Body>
        FantasyNetball.com does not knowingly collect or solicit personal information from individuals under the age of
        13. If you believe we have collected personal information from a child under 13, please contact us immediately,
        and we will promptly remove the information.
      </Text.Body>
      <Text.Header>6. Third-Party Links</Text.Header>
      <Text.Body>
        Our website may contain links to external websites or services operated by third parties. Please note that we
        are not responsible for the privacy practices of these third parties, and this Privacy Policy applies only to
        information collected by FantasyNetball.com. We recommend reviewing the privacy policies of any linked websites
        before providing them with your personal information.
      </Text.Body>
      <Text.Header>7. Changes to this Privacy Policy</Text.Header>
      <Text.Body>
        We may update this Privacy Policy from time to time to reflect changes in our practices and services. We will
        notify you of any significant changes by posting a prominent notice on our website or sending you an email. We
        encourage you to review this policy periodically for the latest information on our privacy practices.
      </Text.Body>
      <Text.Header>8. Contact Us</Text.Header>
      <Text.Body>
        If you have any questions or concerns regarding this Privacy Policy or your personal information, please contact
        us at{" "}
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-800"
          href="mailto:timothy.veletta@gmail.com"
        >
          timothy.veletta@gmail.com
        </a>
        .
      </Text.Body>
    </div>
  );
};

export default Page;
