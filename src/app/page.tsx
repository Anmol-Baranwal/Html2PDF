'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [fetchUrl, setFetchUrl] = useState('')
  const [htmlCode, setHtmlCode] = useState('')

  const handleSampleCodeClick = () => {
    const sampleHtml =
      "<html><body><h1>Hey there, I'm your Dev.to buddy. Anmol!</h1></body></html>"
    setHtmlCode(sampleHtml)
  }

  const handleConvertClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('https://pjdmuj.buildship.run/html-to-pdf', {
        method: 'POST',
        body: JSON.stringify({ html: htmlCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.text()
      setFetchUrl(data)

      console.log({ data })
    } catch (error) {
      console.error('Error converting HTML to PDF:', error)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex h-screen items-center justify-center pt-0">
      <div className="flex w-full flex-col items-center justify-center space-y-1 dark:text-gray-100">
        <h1 className="bg-gradient-to-r from-black to-gray-500 bg-clip-text pb-3 text-center text-3xl font-bold tracking-tighter text-transparent md:text-7xl/none">
          HTML to PDF <br /> <span className=""> Converter</span>
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
              onChange={(e) => setHtmlCode(e.target.value)}
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
