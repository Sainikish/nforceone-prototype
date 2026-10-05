import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Privacy", description: "NForce One privacy notice.", path: "/privacy" }) };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy notice"
      need="Draft, pending review and approval by NForce One legal before this notice is finalised."
    >
      <div className="space-y-8 t-body text-gray-700">
        <p className="t-small text-gray-500">Last updated: 30 September 2026</p>

        <p>
          NForce One (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a technology and delivery company with
          its principal office at 5700 Tennyson Parkway, Suite 300, Plano, Texas 75024, United States. We operate the
          website at www.nforceone.com. This notice explains what personal data we collect when you use this website,
          why we collect it, and your rights.
        </p>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">1. Information we collect</h2>
          <p>
            <span className="font-medium text-black">Contact forms:</span> When you submit a contact, enquiry or job
            application form we collect your name, email address, company name and the message or file you provide.
            This information is used solely to respond to your request.
          </p>
          <p>
            <span className="font-medium text-black">Website analytics:</span> Subject to your consent via the cookie
            banner, we use Google Analytics to collect anonymised data about how you use this website, including pages
            visited, referrer and interactions such as button clicks and form submissions. This data is aggregated and
            does not personally identify you.
          </p>
          <p>
            <span className="font-medium text-black">NForce AI assistant:</span> When you use the website assistant,
            the text of your questions is processed to return a response from our approved knowledge base. No
            conversation content is stored or associated with you after your session ends.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">2. Cookies</h2>
          <p>
            We use cookies for analytics measurement only. No analytics cookies are placed until you accept via the
            cookie consent banner displayed on your first visit. You can withdraw or update your consent at any time
            using the cookie settings in the website footer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">3. Third-party services</h2>
          <p>
            We use Google Analytics (Google LLC) to measure how the website is used. Analytics cookies are gated behind
            your consent and no data is sent to Google without it. We do not use advertising, retargeting or
            behavioural profiling cookies on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">4. How long we keep your data</h2>
          <p>
            Contact form submissions are retained only for as long as necessary to address your enquiry and any
            follow-up correspondence. Analytics data is held in accordance with Google Analytics&apos; standard
            retention settings (26 months). AI assistant conversation content is not retained beyond the active browser
            session.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">5. Your rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, restrict or request deletion of
            personal data we hold about you, or to withdraw consent where processing is based on consent. To exercise
            any of these rights, contact us at contact@nforceone.com.
          </p>
          <p className="font-medium text-black">California residents (CCPA / CPRA)</p>
          <p>
            We do not sell your personal information. California residents may request to know what personal information
            we have collected, to have it deleted, and to opt out of any sale (which we do not conduct). Contact us to
            exercise these rights.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">6. Data security</h2>
          <p>
            We apply reasonable technical and organisational measures to protect personal data against unauthorised
            access, accidental loss or disclosure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">7. Changes to this notice</h2>
          <p>
            We may update this notice from time to time. The &ldquo;Last updated&rdquo; date at the top reflects the
            most recent revision. Continued use of this website after any update constitutes acceptance of the revised
            notice.
          </p>
        </section>
      </div>
    </LegalPage>
  );
}
