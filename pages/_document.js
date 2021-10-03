import Document, { Html, Head, Main, NextScript } from 'next/document'
// import "jquery/dist/jquery.js";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
                                  rel="stylesheet" />
                </Head>
                <body>
                <Main />
                <NextScript />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
                        integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
                        crossOrigin="anonymous"></script>
                </body>
            </Html>
        )
    };
}

export default MyDocument;