import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";
import Script from 'next/script';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return initialProps;
	}

	render() {
		return (
			<Html className="dark">
				<Head>
					<Script data-ad-client="ca-pub-1439722543831764" async
							src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
							strategy="afterInteractive" />
					<Script strategy="afterInteractive" dangerouslySetInnerHTML={{
						__html: `window.ga = window.ga || function () {
                                (ga.q = ga.q || []).push(arguments)
                            };
                            ga.l = +new Date;
                            ga('create', 'UA-89062206-3', 'auto');`
					}} />
					<Script async strategy="afterInteractive" src="https://www.google-analytics.com/analytics.js" />
					<Script strategy="afterInteractive" src="https://s.nitropay.com/ads-598.js" />
					<Script strategy="lazyOnload" dangerouslySetInnerHTML={{
						__html: `window['nitroAds'] = window['nitroAds'] || { createAd: function () { window.nitroAds.queue.push(["createAd", arguments]) }, queue: [] };`
					}} />
					<link
						rel="stylesheet"
						type="text/css"
						href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css"
					/>
				</Head>
				<body className="dark:bg-dark-300">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
