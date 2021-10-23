import { GetServerSideProps } from "next";
import { ReactNode } from "react";
import Container from "../components/ui/Container";
import { PageProps } from "../types";
import { unauthenticatedRoute } from "../util/redirects";
import { withSession } from "../util/session";

export const TERMS_LAST_UPDATE = "July 7th, 2019";

interface LegalProps {
	title?: string;
	children: ReactNode;
}

function Legal({ title, children }: LegalProps) {
	return (
		<div className="flex flex-col space-y-2">
			<div className="text-2xl font-bold font-montserrat text-dark-400 dark:text-white">
				{title}
			</div>
			<div className="flex flex-col space-y-2 text-gray-500 dark:text-gray-400 leading-5">
				{children}
			</div>
		</div>
	);
}

export default function Terms({ user }: PageProps) {
	return (
		<Container title="Terms" user={user}>
			<div className="max-w-6xl relative my-16">
				<div className="flex flex-col space-y-2">
					<div className="text-dank-300 text-6xl font-bold font-montserrat">
						TERMS OF SERVICE
					</div>
					<div className="font-montserrat font-bold text-dark-400 dark:text-white">
						Last updated: {TERMS_LAST_UPDATE}
					</div>
					<Legal>
						<div>
							Please read these Terms of Service ("Terms", "Terms
							of Service") carefully before using the
							https://www.dankmemer.lol website (the "Service")
							operated by Melms Media LLC ("us", "we", or "our").
						</div>
						<div>
							Your access to and use of the Service is conditioned
							upon your acceptance of and compliance with these
							Terms. These Terms apply to all visitors, users and
							others who wish to access or use the Service.
						</div>
						<div>
							By accessing or using the Service you agree to be
							bound by these Terms. If you disagree with any part
							of the terms then you do not have permission to
							access the Service.
						</div>
					</Legal>
					<Legal title="Purchases">
						<div>
							If you wish to purchase any product or service made
							available through the Service ("Purchase"), you may
							be asked to supply certain information relevant to
							your Purchase including, without limitation, your
							credit card number, the expiration date of your
							credit card, your billing address, and your shipping
							information.
						</div>
						<div>
							You represent and warrant that: (i) you have the
							legal right to use any credit card(s)or other
							payment method(s) in connection with any Purchase;
							and that (ii) the information you supply to us is
							true, correct and complete.
						</div>
						<div>
							The service may employ the use of third party
							services for the purpose of facilitating payment and
							the completion of Purchases. By submitting your
							information, you grant us the right to provide the
							information to these third parties subject to our
							Privacy Policy.
						</div>
						<div>
							We reserve the right to refuse or cancel your order
							at any time for reasons including but not limited
							to: product or service availability, errors in the
							description or price of the product or service,
							error in your order or other reasons.
						</div>
						<div>
							We reserve the right to refuse or cancel your order
							if fraud or an unauthorized or illegal transaction
							is suspected.
						</div>
					</Legal>
					<Legal title="Availability, Errors and Inaccuracies">
						<div>
							We are constantly updating product and service
							offerings on the Service. We may experience delays
							in updating information on the Service and in our
							advertising on other web sites. The information
							found on the Service may contain errors or
							inaccuracies and may not be complete or current.
							Products or services may be mispriced, described
							inaccurately, or unavailable on the Service and we
							cannot guarantee the accuracy or completeness of any
							information found on the Service.
						</div>
						<div>
							We therefore reserve the right to change or update
							information and to correct errors, inaccuracies, or
							omissions at any time without prior notice.
						</div>
					</Legal>
					<Legal title="Links To Other Web Sites">
						<div>
							Our Service may contain links to third party web
							sites or services that are not owned or controlled
							by Melms Media LLC
						</div>
						<div>
							Melms Media LLC has no control over, and assumes no
							responsibility for the content, privacy policies, or
							practices of any third party web sites or services.
							We do not warrant the offerings of any of these
							entities/individuals or their websites.
						</div>
						<div>
							You acknowledge and agree that Melms Media LLC shall
							not be responsible or liable, directly or
							indirectly, for any damage or loss caused or alleged
							to be caused by or in connection with use of or
							reliance on any such content, goods or services
							available on or through any such third party web
							sites or services.
						</div>
						<div>
							We strongly advise you to read the terms and
							conditions and privacy policies of any third party
							web sites or services that you visit.
						</div>
						<div>
							We therefore reserve the right to change or update
							information and to correct errors, inaccuracies, or
							omissions at any time without prior notice.
						</div>
					</Legal>
					<Legal title="Termination">
						<div>
							We may terminate or suspend your access to the
							Service immediately, without prior notice or
							liability, under our sole discretion, for any reason
							whatsoever and without limitation, including but not
							limited to a breach of the Terms.
						</div>
						<div>
							All provisions of the Terms which by their nature
							should survive termination shall survive
							termination, including, without limitation,
							ownership provisions, warranty disclaimers,
							indemnity and limitations of liability.
						</div>
					</Legal>
					<Legal title="Indemnification">
						<div>
							You agree to defend, indemnify and hold harmless
							Melms Media LLC and its licensee and licensors, and
							their employees, contractors, agents, officers and
							directors, from and against any and all claims,
							damages, obligations, losses, liabilities, costs or
							debt, and expenses (including but not limited to
							attorney's fees), resulting from or arising out of
							a&#41; your use and access of the Service, or b&#41;
							a breach of these Terms.
						</div>
					</Legal>
					<Legal title="Disclaimer">
						<div>
							Your use of the Service is at your sole risk. The
							Service is provided on an "AS IS" and "AS AVAILABLE"
							basis. The Service is provided without warranties of
							any kind, whether express or implied, including, but
							not limited to, implied warranties of
							merchantability, fitness for a particular purpose,
							non-infringement or course of performance.
						</div>
						<div>
							Melms Media LLC its subsidiaries, affiliates, and
							its licensors do not warrant that a&#41; the Service
							will function uninterrupted, secure or available at
							any particular time or location; b&#41; any errors
							or defects will be corrected; c&#41; the Service is
							free of viruses or other harmful components; or d)
							the results of using the Service will meet your
							requirements.
						</div>
					</Legal>
					<Legal title="Exclusions">
						<div>
							Some jurisdictions do not allow the exclusion of
							certain warranties or the exclusion or limitation of
							liability for consequential or incidental damages,
							so the limitations above may not apply to you.
						</div>
					</Legal>
					<Legal title="Governing Law">
						<div>
							These Terms shall be governed and construed in
							accordance with the laws of North Carolina, United
							States, without regard to its conflict of law
							provisions.
						</div>
						<div>
							Our failure to enforce any right or provision of
							these Terms will not be considered a waiver of those
							rights. If any provision of these Terms is held to
							be invalid or unenforceable by a court, the
							remaining provisions of these Terms will remain in
							effect. These Terms constitute the entire agreement
							between us regarding our Service, and supersede and
							replace any prior agreements we might have had
							between us regarding the Service.
						</div>
					</Legal>
					<Legal title="Changes">
						<div>
							We reserve the right, at our sole discretion, to
							modify or replace these Terms at any time. If a
							revision is material we will provide at least 30
							days notice prior to any new terms taking effect.
							What constitutes a material change will be
							determined at our sole discretion.
						</div>
						<div>
							By continuing to access or use our Service after any
							revisions become effective, you agree to be bound by
							the revised terms. If you do not agree to the new
							terms, you are no longer authorized to use the
							Service.
						</div>
					</Legal>
					<Legal title="Contact us">
						<div>
							If you have any questions about our Terms, please
							contact us by email:{" "}
							<a
								href="mailto:admin@dankmemer.gg"
								className="text-dank-300"
							>
								admin@dankmemer.gg
							</a>
						</div>
					</Legal>
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps =
	withSession(unauthenticatedRoute);
