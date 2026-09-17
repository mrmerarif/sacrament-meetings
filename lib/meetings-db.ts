import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
{
id: 1,
date: '2026-08-02',
meetingType: 'regular',
presiding: 'Bishop Smith',
conducting: 'Brother Jones',
openingHymn: { number: 2, title: 'The Spirit of God' },
openingPrayer: 'Sister Williams',
wardBusiness: [
{ description: 'Sustaining of new Primary president' }
],
stakeBusiness: false,
sacramentHymn: {
number: 169,
title: 'In Remembrance of Thy Suffering'
},
speakers: [
{
name: 'Sister Brown',
topic: 'Faith in Jesus Christ',
type: 'speaker'
},
{
name: 'Youth Choir',
topic: '',
type: 'musical-number'
}
],
closingHymn: {
number: 31,
title: 'O God, Our Help in Ages Past'
},
closingPrayer: 'Brother Davis',
announcements: ['Ward temple night: August 9']
},
{
id: 2,
date: '2026-08-09',
meetingType: 'testimony',
presiding: 'Bishop Smith',
conducting: 'Sister Williams',
openingHymn: {
number: 85,
title: 'How Firm a Foundation'
},
openingPrayer: 'Brother Davis',
wardBusiness: [
{ description: 'Youth activity announcement' }
],
stakeBusiness: false,
sacramentHymn: {
number: 193,
title: 'I Stand All Amazed'
},
speakers: [
{
name: 'Ward Members',
topic: 'Personal Testimonies',
type: 'speaker'
},
{
name: 'Sister Miller',
topic: 'Musical Number',
type: 'musical-number'
}
],
closingHymn: {
number: 219,
title: 'Because I Have Been Given Much'
},
closingPrayer: 'Sister Brown',
announcements: [
'Youth conference registration is now open'
]
},
{
id: 3,
date: '2026-08-16',
meetingType: 'regular',
presiding: 'President Anderson',
conducting: 'Brother Johnson',
openingHymn: {
number: 30,
title: 'Come, Come, Ye Saints'
},
openingPrayer: 'Sister Taylor',
wardBusiness: [
{ description: 'Relief Society activity announcement' },
{ description: 'Primary program preparation reminder' }
],
stakeBusiness: false,
sacramentHymn: {
number: 190,
title: 'In Memory of the Crucified'
},
speakers: [
{
name: 'Brother Anderson',
topic: 'Serving Others',
type: 'speaker'
},
{
name: 'Sister Johnson',
topic: 'Following the Savior',
type: 'speaker'
}
],
closingHymn: {
number: 227,
title: 'There Is Sunshine in My Soul Today'
},
closingPrayer: 'Brother Taylor',
announcements: [
'Ward service project will be held Saturday'
]
},
{
id: 4,
date: '2026-08-23',
meetingType: 'regular',
presiding: 'Bishop Smith',
conducting: 'Brother Jones',
openingHymn: {
number: 81,
title: 'Press Forward, Saints'
},
openingPrayer: 'Sister Davis',
wardBusiness: [
{ description: 'New member welcome' }
],
stakeBusiness: true,
sacramentHymn: {
number: 174,
title: 'While of These Emblems We Partake'
},
speakers: [
{
name: 'Sister Brown',
topic: 'The Power of Prayer',
type: 'speaker'
},
{
name: 'Brother Miller',
topic: 'Strengthening Families',
type: 'speaker'
},
{
name: 'Ward Choir',
topic: '',
type: 'musical-number'
}
],
closingHymn: {
number: 97,
title: 'Lead, Kindly Light'
},
closingPrayer: 'Brother Davis',
announcements: [
'Stake conference information will be shared next week'
]
},
{
id: 5,
date: '2026-08-30',
meetingType: 'general',
presiding: 'President Anderson',
conducting: 'Sister Williams',
openingHymn: {
number: 89,
title: 'The Lord Is My Light'
},
openingPrayer: 'Brother Johnson',
wardBusiness: [
{ description: 'Ward picnic announcement' }
],
stakeBusiness: true,
sacramentHymn: {
number: 181,
title: 'Jesus of Nazareth, Savior and King'
},
speakers: [
{
name: 'Brother Anderson',
topic: 'Jesus Christ',
type: 'speaker'
},
{
name: 'Sister Taylor',
topic: 'Faith in the Savior',
type: 'speaker'
}
],
closingHymn: {
number: 219,
title: 'Because I Have Been Given Much'
},
closingPrayer: 'Sister Brown',
announcements: [
'Ward picnic will be held next Saturday'
]
},
{
id: 6,
date: '2026-09-06',
meetingType: 'regular',
presiding: 'Bishop Smith',
conducting: 'Brother Jones',
openingHymn: {
number: 3,
title: 'Now We Sing Thy Praise'
},
openingPrayer: 'Sister Williams',
wardBusiness: [
{ description: 'Primary activity announcement' }
],
stakeBusiness: false,
sacramentHymn: {
number: 194,
title: 'There Is a Green Hill Far Away'
},
speakers: [
{
name: 'Sister Brown',
topic: 'Covenants and Discipleship',
type: 'speaker'
},
{
name: 'Brother Davis',
topic: 'Serving in the Church',
type: 'speaker'
},
{
name: 'Youth Choir',
topic: '',
type: 'musical-number'
}
],
closingHymn: {
number: 96,
title: 'Dearest Children, God Is Near You'
},
closingPrayer: 'Brother Johnson',
announcements: [
'Ward temple night will be September 20'
]
},
{
id: 7,
date: '2026-09-13',
meetingType: 'regular',
presiding: 'Bishop Smith',
conducting: 'Brother Jones',
openingHymn: {
number: 2,
title: 'The Spirit of God'
},
openingPrayer: 'Sister Williams',
wardBusiness: [
{ description: 'Sustaining of new Primary president' }
],
stakeBusiness: false,
sacramentHymn: {
number: 169,
title: 'In Remembrance of Thy Suffering'
},
speakers: [
{
name: 'Sister Brown',
topic: 'Faith in Jesus Christ',
type: 'speaker'
},
{
name: 'Youth Choir',
topic: '',
type: 'musical-number'
}
],
closingHymn: {
number: 31,
title: 'O God, Our Help in Ages Past'
},
closingPrayer: 'Brother Davis',
announcements: [
'Ward temple night: September 20'
]
}
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
if (date) {
return meetings.filter((meeting) => meeting.date === date);
}

return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
return meetings.find((meeting) => meeting.id === id) ?? null;
}