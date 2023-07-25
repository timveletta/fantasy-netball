import React from "react";
import Text from "@/components/text";

const Page = () => {
  return (
    <div className="container py-8 flex flex-col flex-wrap">
      <Text.Title>Cookie Policy for FantasyNetball.com</Text.Title>
      <Text.Body>Last Updated: 25th July 2023</Text.Body>
      <Text.Header>1. What are Cookies?</Text.Header>
      <Text.Body>
        Cookies are small text files that are stored on your device (computer, tablet, smartphone) when you visit a
        website. They are widely used to improve the user experience, provide essential features and functionalities,
        and analyze how users interact with websites. Cookies may also be used by third-party services integrated into
        the website.
      </Text.Body>
      <Text.Header>2. How We Use Cookies</Text.Header>
      <Text.Body>At FantasyNetball.com, we use cookies for the following purposes:</Text.Body>
      <Text.Subheader>2.1 Essential Cookies</Text.Subheader>
      <Text.Body>
        These cookies are necessary for the operation of the website and enable you to access certain features and
        services. They help maintain your session and preferences while navigating the site.
      </Text.Body>
      <Text.Subheader>2.2 Analytical Cookies</Text.Subheader>
      <Text.Body>
        We use analytical cookies to understand how visitors interact with our website. These cookies collect
        non-personal information and help us analyze user behavior, such as the number of visitors, pages viewed, and
        time spent on each page. The insights obtained from these cookies allow us to improve the website's performance
        and content.
      </Text.Body>
      <Text.Subheader>2.3 Functional Cookies</Text.Subheader>
      <Text.Body>
        Functional cookies enhance your experience by remembering your preferences and choices (e.g., language, region)
        to provide you with more personalized and efficient interactions.
      </Text.Body>
      <Text.Subheader>2.4 Third-Party Cookies</Text.Subheader>
      <Text.Body>
        FantasyNetball.com may use third-party services that place cookies on your device. These cookies are managed by
        the respective third parties and are subject to their own privacy policies. We do not have direct control over
        these cookies. The third-party cookies used on our website may include Google Analytics, social media plugins,
        advertising networks, etc.
      </Text.Body>
      <Text.Header>3. Managing Cookies</Text.Header>
      <Text.Body>
        You have the option to control and manage cookies through your web browser settings. Most browsers allow you to
        block or delete cookies, as well as set preferences for cookie acceptance. However, please be aware that
        blocking or disabling certain cookies may affect the functionality and user experience of the website.
      </Text.Body>
      <Text.Header>4. Consent</Text.Header>
      <Text.Body>
        By using FantasyNetball.com and accepting cookies through your browser settings, you consent to the use of
        cookies as described in this Cookie Policy. You can withdraw your consent at any time by adjusting your browser
        settings to reject cookies or by clearing your cookies.
      </Text.Body>
      <Text.Header>5. Changes to the Cookie Policy</Text.Header>
      <Text.Body>
        We may update this Cookie Policy from time to time to reflect changes in our use of cookies and related
        practices. When we make significant changes to this policy, we will update the "Last Updated" date at the
        beginning of the policy. We recommend reviewing this policy periodically to stay informed about our use of
        cookies.
      </Text.Body>
      <Text.Header>6. Contact Us</Text.Header>
      <Text.Body>
        If you have any questions or concerns about this Cookie Policy or your cookie preferences, please contact us at{" "}
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-800"
          href="mailto:timothy.veletta@gmail.com"
        >
          timothy.veletta@gmail.com
        </a>
      </Text.Body>
    </div>
  );
};

export default Page;
