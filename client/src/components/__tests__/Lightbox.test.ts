import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Lightbox } from '../Lightbox'

describe('Lightbox Component', () => {
  const mockImages = [
    { url: 'image1.jpg', alt: 'Image 1', title: 'First Image' },
    { url: 'image2.jpg', alt: 'Image 2', title: 'Second Image' },
    { url: 'image3.jpg', alt: 'Image 3', title: 'Third Image' },
  ]

  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders lightbox with images', () => {
    render(
      <Lightbox images={mockImages} initialIndex={0} onClose={mockOnClose} />
    )

    expect(screen.getByText('First Image')).toBeInTheDocument()
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('navigates to next image', () => {
    render(
      <Lightbox images={mockImages} initialIndex={0} onClose={mockOnClose} />
    )

    const nextButton = screen.getByRole('button', { name: /chevronright/i })
    fireEvent.click(nextButton)

    expect(screen.getByText('Second Image')).toBeInTheDocument()
    expect(screen.getByText('2 / 3')).toBeInTheDocument()
  })

  it('navigates to previous image', () => {
    render(
      <Lightbox images={mockImages} initialIndex={1} onClose={mockOnClose} />
    )

    const prevButton = screen.getByRole('button', { name: /chevronleft/i })
    fireEvent.click(prevButton)

    expect(screen.getByText('First Image')).toBeInTheDocument()
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('closes lightbox on close button click', () => {
    render(
      <Lightbox images={mockImages} initialIndex={0} onClose={mockOnClose} />
    )

    const closeButton = screen.getByRole('button', { name: /x/i })
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it('handles keyboard navigation', () => {
    render(
      <Lightbox images={mockImages} initialIndex={0} onClose={mockOnClose} />
    )

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(screen.getByText('2 / 3')).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(screen.getByText('1 / 3')).toBeInTheDocument()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('handles zoom controls', () => {
    render(
      <Lightbox images={mockImages} initialIndex={0} onClose={mockOnClose} />
    )

    const zoomInButton = screen.getByRole('button', { name: /zoomin/i })
    fireEvent.click(zoomInButton)

    expect(screen.getByText('110%')).toBeInTheDocument()

    const zoomOutButton = screen.getByRole('button', { name: /zoomout/i })
    fireEvent.click(zoomOutButton)

    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('wraps around when navigating past last image', () => {
    render(
      <Lightbox images={mockImages} initialIndex={2} onClose={mockOnClose} />
    )

    const nextButton = screen.getByRole('button', { name: /chevronright/i })
    fireEvent.click(nextButton)

    expect(screen.getByText('First Image')).toBeInTheDocument()
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
  })

  it('displays single image gallery correctly', () => {
    const singleImage = [{ url: 'image1.jpg', alt: 'Only Image' }]

    render(
      <Lightbox images={singleImage} initialIndex={0} onClose={mockOnClose} />
    )

    expect(screen.getByText('1 / 1')).toBeInTheDocument()
    const nextButton = screen.getByRole('button', { name: /chevronright/i })
    expect(nextButton).toBeDisabled()
  })
})
