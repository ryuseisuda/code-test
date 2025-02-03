import { FC, ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {title}
        </h1>
        {children}
      </div>
    </div>
  )
}
