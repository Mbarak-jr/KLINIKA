import { format } from 'date-fns'

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'MMM dd, yyyy')
}

export const formatTime = (timeString: string) => {
  return format(new Date(`2000-01-01T${timeString}`), 'h:mm a')
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}