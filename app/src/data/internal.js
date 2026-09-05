// Internal investor snapshot. Edit this file until Clerk and Cal.com feed the board.
// Headline counts can be larger than the tables. Tables are the people you can name.

export const CAL = {
  bookingPage: 'https://cal.com/john-rodrigues-rqt2lg/15min',
  inbox: 'https://app.cal.com/bookings',
  events: {
    intro: 'https://cal.com/john-rodrigues-rqt2lg/15min',
  },
}

export const INTERNAL = {
  asOf: '2026-09-05',
  source: 'snapshot',
  metrics: {
    freeUsers: 0,
    paidUsers: 0,
    revenue: 0,
    mrr: 0,
  },
  revenueHistory: [
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
  ],
  mrrHistory: [
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
  ],
  seatHistory: [
    { label: 'Apr', free: 0, paid: 0 },
    { label: 'May', free: 0, paid: 0 },
    { label: 'Jun', free: 0, paid: 0 },
    { label: 'Jul', free: 0, paid: 0 },
    { label: 'Aug', free: 0, paid: 0 },
    { label: 'Sep', free: 0, paid: 0 },
  ],
  users: [
    // { id: 'user_1', name: 'Ada West', email: 'ada@studio.com', plan: 'free', createdAt: '2026-09-01', lastSeenAt: '2026-09-04' },
  ],
  bookings: [
    // { id: 'book_1', name: 'Ada West', email: 'ada@studio.com', type: '15 min intro', startsAt: '2026-09-08T16:00:00-07:00', status: 'scheduled', url: 'https://cal.com/john-rodrigues-rqt2lg/15min' },
  ],
}

export const PLAN_LABEL = {
  free: 'Free',
  studio: 'Studio',
  custom: 'Custom',
}

export const BOOKING_STATUS_LABEL = {
  scheduled: 'Scheduled',
  completed: 'Completed',
  canceled: 'Canceled',
  'no-show': 'No show',
}
