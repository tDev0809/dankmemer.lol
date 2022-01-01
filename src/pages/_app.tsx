import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<meta name="twitter:site" content="@dankmemerbot" />
				<meta name="twitter:creator" content="@dankmemerbot" />
				<meta name="theme-color" content="#598D3E" />
				<meta property="og:image:width" content="64" />
				<meta property="og:image:height" content="64" />
				<meta
					property="og:image"
					content="/img/memer.png"
					key="og-image"
				/>
				<link rel="icon" href="/img/memer.png" />
			</Head>
			<DefaultSeo
				defaultTitle="Dank Memer"
				description="Dank Memer is a feature-rich Discord bot with the original twist of being sarcastic and memey. A MASSIVE currency system, tons of memes, and much more!"
				canonical="https://dankmemer.lol"
				additionalMetaTags={[
					{
						name: "keywords",
						content:
							"DankMemer,Discord,DiscordBot,Dank,Memes,Chat,Fun,Music,Free,Currency",
					},
				]}
				openGraph={{
					url: "https://dankmemer.lol",
					title: "Dank Memer",
					description:
						"Dank Memer is a feature-rich Discord bot with the original twist of being sarcastic and memey. A MASSIVE currency system, tons of memes, and much more!",
				}}
			/>
			<link
				href="https://fonts.googleapis.com/icon?family=Material+Icons"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic"
				rel="stylesheet"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Inter"
				rel="stylesheet"
			/>

			<link
				href="https://fonts.googleapis.com/css2?family=Handlee&display=swap"
				rel="stylesheet"
			/>
			<Script
				data-ad-client="ca-pub-1439722543831764"
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
				strategy="afterInteractive"
			/>
			<Script
				async
				strategy="afterInteractive"
				src="https://www.google-analytics.com/analytics.js"
			/>
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `window.ga = window.ga || function () {
                                (ga.q = ga.q || []).push(arguments)
                            };
                            ga.l = +new Date;
                            ga('create', 'UA-89062206-3', 'auto');
                            `,
				}}
			/>
			<Script
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `ga('send', 'pageview', {
						hitType: 'pageview',
						page: location.pathname
					});`,
				}}
			/>
			<Script
				strategy="afterInteractive"
				src="https://s.nitropay.com/ads-598.js"
			/>
			<Script
				strategy="lazyOnload"
				dangerouslySetInnerHTML={{
					__html: `window['nitroAds'] = window['nitroAds'] || { createAd: function () { window.nitroAds.queue.push(["createAd", arguments]) }, queue: [] };`,
				}}
			/>
			<ThemeProvider
				defaultTheme="dark"
				attribute="class"
				enableSystem={false}
			>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
