import Head from 'next/head';

const FailPage = () => (
  <>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet" />
    </Head>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="rounded-full h-40 w-40 bg-gray-100 mx-auto flex items-center justify-center">
          <svg className="h-20 w-20 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-semibold text-red-600">Payment Failed</h1>
          <p className="mt-2 text-gray-700">Oops! Something went wrong with your payment. Please try again later.</p>
        </div>
      </div>
    </div>
  </>
);

export default FailPage;
