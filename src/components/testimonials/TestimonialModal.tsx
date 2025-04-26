'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { StarRating } from '@/components/ui/star-rating'

interface TestimonialModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (testimonial: {
    name: string
    message: string
    rating: number
    userType: string
    university: string
  }) => void
}

export default function TestimonialModal({ isOpen, onClose, onSubmit }: TestimonialModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 5,
    userType: '',
    university: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Testimonial</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userType">User Type</Label>
            <Select
              value={formData.userType}
              onValueChange={(value) => setFormData({ ...formData, userType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent className='bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-6 h-full'>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Professor">Professor</SelectItem>
                <SelectItem value="Graduate Student">Graduate Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Input
              id="university"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <StarRating
              value={formData.rating}
              onChange={(value) => setFormData({ ...formData, rating: value })}
              className="mt-2"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 