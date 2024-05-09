'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import { sampleHtml } from '@/data/sampleHtml'

export default function HTML2PDF() {
  const [state, setState] = useState({
    isLoading: false,
    fetchUrl: '',
    htmlCode: '',
  })

  // Destructure state into individual variables
  const { isLoading, fetchUrl, htmlCode } = state

  const handleSampleCodeClick = () => {
    setState({ ...state, htmlCode: sampleHtml })
  }

  const handleConvertClick = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      const response = await fetch('/api/htmltopdf', {
        method: 'POST',
        body: JSON.stringify({ html: htmlCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()

      const pdfUrl = data.url
      // console.log('pdf URL:', pdfUrl)

      setState((prevState) => ({ ...prevState, fetchUrl: pdfUrl }))
    } catch (error) {
      console.error('Error in converting HTML to PDF:', error)
    }
    setState((prevState) => ({ ...prevState, isLoading: false }))
  }

  return (
    <div className="flex h-screen items-center justify-center pt-0">
      <div className="flex w-full flex-col items-center justify-center space-y-1 dark:text-gray-100">
        <h1 className="bg-gradient-to-r from-black to-gray-500 bg-clip-text pb-3 text-center text-3xl font-bold tracking-tighter text-transparent md:text-7xl/none">
          HTML to PDF Converter
        </h1>
        <p className="sm:text-md mx-auto max-w-[650px] pb-1 pt-1 text-gray-600 md:py-3 md:text-xl lg:text-2xl">
          Paste the html code and convert it.
        </p>
        <p
          className="text-md mx-auto cursor-pointer pb-6 text-[#A855F7] underline"
          onClick={handleSampleCodeClick}
        >
          Use sample code
        </p>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="flex w-80 flex-col items-center justify-center">
            <textarea
              value={htmlCode}
              onChange={(e) => setState({ ...state, htmlCode: e.target.value })}
              className="mb-4 w-full rounded-lg border border-gray-400 p-2 shadow-sm shadow-black/50"
              placeholder="Paste HTML code here"
              rows={8}
            />
            {fetchUrl ? (
              <div className="mt-4">
                <Link
                  target="_blank"
                  href={fetchUrl}
                  className="w-40 rounded-md bg-black px-8 py-4 text-white transition-all duration-300 hover:bg-black/90"
                  download
                >
                  Download PDF
                </Link>
              </div>
            ) : (
              <div className="mt-4">
                <Button onClick={handleConvertClick}>Convert to PDF</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
