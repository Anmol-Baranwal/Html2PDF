import { NextResponse, NextRequest } from 'next/server'

interface HtmlToPdfRequest {
  html: string
}

export async function POST(req: NextRequest) {
  try {
    // console.log('Request body:', req.body)

    const requestBody = (await req.json()) as HtmlToPdfRequest

    if (!requestBody || !requestBody.html) {
      throw new Error('req body is empty')
    }

    const { html } = requestBody

    // console.log('HTML:', html)

    const response = await fetch('https://pjdmuj.buildship.run/html-to-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html }),
    })

    // console.log('Conversion response status:', response.status)

    if (!response.ok) {
      throw new Error('Failed to convert HTML to PDF')
    }

    const pdfUrl = await response.text()
    // console.log('PDF URL:', pdfUrl)

    return NextResponse.json({ url: pdfUrl }) // respond with the PDF URL
  } catch (error) {
    console.error('Error in converting HTML to PDF:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
}
