//Volumes/vision/codes/jenara/my-app/app/privacy/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/brand/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none fixed">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto"
          >
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-light block mb-4 uppercase">
              Legal
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              PRIVACY <span className="font-extralight text-white/60">POLICY</span>
            </h1>
            <p className="text-white/40 text-xs sm:text-sm tracking-widest uppercase">
              Last updated: July 25, 2025
            </p>
          </motion.div>

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-neutral-900/30 border border-white/5 p-6 sm:p-10 md:p-14 backdrop-blur-sm rounded-sm">
              
              {/* Introduction */}
              <div className="prose prose-invert max-w-none text-white/70 text-sm sm:text-base leading-relaxed space-y-6 font-light">
                <p>
                  JENERA operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). JENERA is powered by Shopify, which enables us to provide the Services to you. This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase or other transaction using the Services or otherwise communicate with us. If there is a conflict between our Terms of Service and this Privacy Policy, this Privacy Policy controls with respect to the collection, processing, and disclosure of your personal information.
                </p>
                <p>
                  Please read this Privacy Policy carefully. By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
                </p>

                {/* Section: Personal Information We Collect */}
                <SectionHeader title="Personal Information We Collect or Process" />
                <p>
                  When we use the term "personal information," we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you. We may collect or process the following categories of personal information, including inferences drawn from this personal information, depending on how you interact with the Services, where you live, and as permitted or required by applicable law:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-white/40">
                  <li><strong className="text-white font-medium">Contact details</strong> including your name, address, billing address, shipping address, phone number, and email address.</li>
                  <li><strong className="text-white font-medium">Financial information</strong> including credit card, debit card, and financial account numbers, payment card information, financial account information, transaction details, form of payment, payment confirmation and other payment details.</li>
                  <li><strong className="text-white font-medium">Account information</strong> including your username, password, security questions, preferences and settings.</li>
                  <li><strong className="text-white font-medium">Transaction information</strong> including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel and your past transactions.</li>
                  <li><strong className="text-white font-medium">Communications with us</strong> including the information you include in communications with us, for example, when sending a customer support inquiry.</li>
                  <li><strong className="text-white font-medium">Device information</strong> including information about your device, browser, or network connection, your IP address, and other unique identifiers.</li>
                  <li><strong className="text-white font-medium">Usage information</strong> including information regarding your interaction with the Services, including how and when you interact with or navigate the Services.</li>
                </ul>

                {/* Section: Personal Information Sources */}
                <SectionHeader title="Personal Information Sources" />
                <p>We may collect personal information from the following sources:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-white/40">
                  <li><strong className="text-white font-medium">Directly from you</strong> including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information;</li>
                  <li><strong className="text-white font-medium">Automatically through the Services</strong> including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies;</li>
                  <li><strong className="text-white font-medium">From our service providers</strong> including when we engage them to enable certain technology and when they collect or process your personal information on our behalf;</li>
                  <li><strong className="text-white font-medium">From our partners or other third parties.</strong></li>
                </ul>

                {/* Section: How We Use Your Info */}
                <SectionHeader title="How We Use Your Personal Information" />
                <p>Depending on how you interact with us or which of the Services you use, we may use personal information for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-4 marker:text-white/40">
                  <li><strong className="text-white font-medium">Provide, Tailor, and Improve the Services.</strong> We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you, such as recommending products related to your purchases. This may include using your personal information to better tailor and improve the Services.</li>
                  <li><strong className="text-white font-medium">Marketing and Advertising.</strong> We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services.</li>
                  <li><strong className="text-white font-medium">Security and Fraud Prevention.</strong> We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password or other access details with anyone else.</li>
                  <li><strong className="text-white font-medium">Communicating with You.</strong> We use your personal information to provide you with customer support, to be responsive to you, to provide effective services to you and to maintain our business relationship with you.</li>
                  <li><strong className="text-white font-medium">Legal Reasons.</strong> We use your personal information to comply with applicable law or respond to valid legal process, including requests from law enforcement or government agencies, to investigate or participate in civil discovery, potential or actual litigation, or other adversarial legal proceedings, and to enforce or investigate potential violations of our terms or policies.</li>
                </ul>

                {/* Section: How We Disclose */}
                <SectionHeader title="How We Disclose Personal Information" />
                <p>In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-white/40">
                  <li>With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
                  <li>With business and marketing partners to provide marketing services and advertise to you. For example, we use Shopify to support personalized advertising with third-party services based on your online activity with different merchants and websites. Our business and marketing partners will use your information in accordance with their own privacy notices. Depending on where you reside, you may have a right to direct us not to share information about you to show you targeted advertisements and marketing based on your online activity with different merchants and websites. You can exercise your rights to opt-out of those uses <span className="underline decoration-white/30 cursor-pointer hover:text-white hover:decoration-white transition-colors">here</span>.</li>
                  <li>When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations.</li>
                  <li>With our affiliates or otherwise within our corporate group.</li>
                  <li>In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service or policies, and to protect or defend the Services, our rights, and the rights of our users or others.</li>
                </ul>

                {/* Section: Relationship with Shopify */}
                <SectionHeader title="Relationship with Shopify" />
                <p>
                  The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in countries other than where you reside, in order to provide and improve the Services for you. In addition, to help protect, grow, and improve our business, we use certain Shopify enhanced features that incorporate data and information obtained from your interactions with our Store, along with other merchants and with Shopify. To provide these enhanced features, Shopify may make use of personal information collected about your interactions with our store, along with other merchants, and with Shopify. In these circumstances, Shopify is responsible for the processing of your personal information, including for responding to your requests to exercise your rights over use of your personal information for these purposes. To learn more about how Shopify uses your personal information and any rights you may have, you can visit the <Link href="https://privacy.shopify.com/" className="underline decoration-white/30 hover:text-white hover:decoration-white transition-colors">Shopify Consumer Privacy Policy</Link>. Depending on where you live, you may exercise certain rights with respect to your personal information here <span className="underline decoration-white/30 cursor-pointer hover:text-white hover:decoration-white transition-colors">Shopify Privacy Portal Link</span>.
                </p>

                {/* Section: Third Party Websites */}
                <SectionHeader title="Third Party Websites and Links" />
                <p>
                  The Services may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.
                </p>

                {/* Section: Children's Data */}
                <SectionHeader title="Children's Data" />
                <p>
                  The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority in your jurisdiction. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted. As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we "share" or "sell" (as those terms are defined in applicable law) personal information of individuals under 16 years of age.
                </p>

                {/* Section: Security and Retention */}
                <SectionHeader title="Security and Retention of Your Information" />
                <p>
                  Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee "perfect security." In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us.
                </p>
                <p>
                  How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
                </p>

                {/* Section: Your Rights and Choices */}
                <SectionHeader title="Your Rights and Choices" />
                <p>
                  Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-white/40">
                  <li><strong className="text-white font-medium">Right to Access / Know.</strong> You may have a right to request access to personal information that we hold about you.</li>
                  <li><strong className="text-white font-medium">Right to Delete.</strong> You may have a right to request that we delete personal information we maintain about you.</li>
                  <li><strong className="text-white font-medium">Right to Correct.</strong> You may have a right to request that we correct inaccurate personal information we maintain about you.</li>
                  <li><strong className="text-white font-medium">Right of Portability.</strong> You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.</li>
                  <li><strong className="text-white font-medium">Right to Opt out of Sale or Sharing for Targeted Advertising.</strong> Depending on where you reside, you may have a right to opt out of the "sale" or "share" of your personal information or to opt out of the processing of your personal information for purposes considered to be "targeted advertising", as defined in applicable privacy laws. You can exercise your rights to opt-out of those uses <span className="underline decoration-white/30 cursor-pointer hover:text-white hover:decoration-white transition-colors">here</span>. Please note that if you visit our website with the Global Privacy Control opt-out preference signal enabled, depending on where you are, we will automatically treat this as a request to opt-out for the device and browser that you use to visit the website. If we are able to associate the device sending the signal to a Shopify account, we will apply the opt out request to the account as well. To learn more about Global Privacy Control, you can visit <Link href="https://globalprivacycontrol.org/" className="underline decoration-white/30 hover:text-white hover:decoration-white transition-colors">https://globalprivacycontrol.org/</Link>. Other than the Global Privacy Control, we do not recognize other "Do Not Track" signals that may be sent from your web browser or device.</li>
                  <li><strong className="text-white font-medium">Managing Communication Preferences.</strong> We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.</li>
                </ul>
                
                <p className="mt-6">
                  If you reside in the UK or European Economic Area, and subject to exceptions and limitations provided by local law, you may exercise the following rights in addition to the rights outlined above:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-white/40">
                  <li><strong className="text-white font-medium">Objection to Processing and Restriction of Processing:</strong> You may have the right to ask us to stop or restrict our processing of personal information for certain purposes.</li>
                  <li><strong className="text-white font-medium">Withdrawal of Consent:</strong> Where we rely on consent to process your personal information, you have the right to withdraw this consent. If you withdraw your consent, this will not affect the lawfulness of any processing based on your consent before its withdrawal.</li>
                </ul>
                <p>
                  You may exercise any of these rights where indicated on the Services or by contacting us using the contact details provided below. To learn more about how Shopify uses your personal information and any rights you may have, including rights related to data processed by Shopify, you can visit <Link href="https://privacy.shopify.com/en" className="underline decoration-white/30 hover:text-white hover:decoration-white transition-colors">https://privacy.shopify.com/en</Link>.
                </p>
                <p>
                  We will not discriminate against you for exercising any of these rights. We may need to verify your identity before we can process your requests, as permitted or required under applicable law. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law.
                </p>

                {/* Section: Complaints */}
                <SectionHeader title="Complaints" />
                <p>
                  If you have complaints about how we process your personal information, please contact us using the contact details provided below. Depending on where you live, you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority. For the EEA, you can find a list of the responsible data protection supervisory authorities <Link href="https://edpb.europa.eu/about-edpb/board/members_en" className="underline decoration-white/30 hover:text-white hover:decoration-white transition-colors">here</Link>.
                </p>

                {/* Section: International Transfers */}
                <SectionHeader title="International Transfers" />
                <p>
                  Please note that we may transfer, store and process your personal information outside the country you live in.
                </p>
                <p>
                  If we transfer your personal information out of the European Economic Area or the United Kingdom, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.
                </p>

                {/* Section: Changes */}
                <SectionHeader title="Changes to This Privacy Policy" />
                <p>
                  We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on this website, update the "Last updated" date and provide notice as required by applicable law.
                </p>

                {/* Section: Contact */}
                <SectionHeader title="Contact" />
                <div className="bg-white/5 p-6 border border-white/5 mt-6 rounded-sm">
                  <p className="mb-4">
                    Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at:
                  </p>
                  <a 
                    href="mailto:verseandme@gmail.com" 
                    className="text-xl sm:text-2xl font-medium text-white hover:text-white/70 transition-colors block break-words"
                  >
                    verseandme@gmail.com
                  </a>
                  <p className="mt-4 text-sm text-white/50">
                    For the purpose of applicable data protection laws, we are the data controller of your personal information.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Footer Accent */}
          <div className="mt-16 sm:mt-24 border-t border-white/5 pt-8 text-center">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-white/20 uppercase">JENERA &copy; 2025</span>
          </div>

        </div>
      </main>
    </>
  );
}

// Helper Component for consistent section headers
function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xl sm:text-2xl font-bold text-white mt-12 mb-4 tracking-tight border-b border-white/10 pb-4 inline-block w-full">
      {title}
    </h2>
  );
}