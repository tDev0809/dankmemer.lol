import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return initialProps;
	}

	render() {
		return (
			<Html className="dark">
				<Head>
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
