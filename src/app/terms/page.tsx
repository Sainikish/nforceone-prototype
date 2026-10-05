import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Terms", description: "NForce One website terms of use.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      need="Draft, pending review and approval by NForce One legal before these terms are finalised."
    >
      <div className="space-y-8 t-body text-gray-700">
        <p className="t-small text-gray-500">Last updated: 30 September 2026</p>

        <p>
          These terms govern your use of www.nforceone.com (the &ldquo;website&rdquo;), operated by NForce One, 5700
          Tennyson Parkway, Suite 300, Plano, Texas 75024, United States. By accessing or using the website you agree
          to these terms in full.
        </p>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">1. Permitted use</h2>
          <p>You may use this website for lawful, personal, non-commercial informational purposes. You may not:</p>
          <ul className="space-y-1.5 pl-5 list-disc marker:text-gray-400">
            <li>use the website in any way that breaches applicable local, national or international law or regulation</li>
            <li>transmit unsolicited or unauthorised advertising material</li>
            <li>attempt to gain unauthorised access to any part of the website or its underlying systems</li>
            <li>use automated tools to scrape or harvest content without our written permission</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">2. Intellectual property</h2>
          <p>
            All content on this website, including text, graphics, logos, images and software, is owned by NForce
            One or its licensors and is protected by copyright, trade mark and other intellectual property laws. You
            may not reproduce, distribute, modify or create derivative works from any content without our prior written
            consent.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">3. Accuracy of information</h2>
          <p>
            We aim to keep information on this website accurate and current. However, we make no warranty or
            representation, express or implied, as to the completeness, accuracy, reliability, suitability or
            availability of any content. Any reliance you place on such content is at your own risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">4. Disclaimer of warranties</h2>
          <p>
            The website is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind,
            whether express or implied, including but not limited to implied warranties of merchantability, fitness for
            a particular purpose or non-infringement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">5. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by applicable law, NForce One shall not be liable for any indirect,
            incidental, special, consequential or punitive damages, or any loss of profits or revenue, arising from
            your use of or inability to use this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">6. External links</h2>
          <p>
            This website may contain links to third-party websites for your convenience. We have no control over and
            accept no responsibility for the content, privacy practices or availability of those sites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">7. Governing law</h2>
          <p>
            These terms and any dispute arising from them are governed by the laws of the State of Texas, United
            States, without regard to its conflict-of-law provisions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[16px] font-semibold text-black">8. Changes</h2>
          <p>
            We may revise these terms at any time. The &ldquo;Last updated&rdquo; date above reflects any changes.
            Continued use of the website after any revision constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </LegalPage>
  );
}
