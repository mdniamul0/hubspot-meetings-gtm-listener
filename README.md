# HubSpot Meetings GTM Event Listener

**Free Google Tag Manager listener that tracks HubSpot Meetings bookings.** It fires one `hubspot_meeting_success` event the moment a visitor books a time in a HubSpot calendar embedded on your website, so you can send the booking to GA4, Google Ads, Meta Pixel and any other tag.

![HubSpot Meetings GTM Event Listener](docs/banner.png)

**Full guide, install video and copy button:** https://mdniamul.com/gtm-event-listeners/hubspot-meetings-gtm-listener/

---

## What it does

HubSpot's embedded Meetings iframe sends a `meetingBookSucceeded` message to your page when a booking is made. This listener catches it and pushes:

```js
{
  event: 'hubspot_meeting_success',
  form_id: '8f2b1c3a-11aa-4c9e-9b7f-1234567890ab', // HubSpot meeting form GUID
  page_path: '/book-a-call/'
}
```

Built-in safety:

- Only trusts messages from `*.hubspot.com` (works with `meetings.hubspot.com` and `meetings-eu1.hubspot.com`)
- Ignores empty, fake or unrelated messages from other iframes, extensions and chat widgets
- Pushes once per booking, even when HubSpot sends the message twice

## Install in 6 steps

1. **Embed the calendar on your page.** HubSpot → Sales → Meetings Scheduler → your link → Share → Embed. The booking must happen on your page, not on meetings.hubspot.com.
2. **GTM → Tags → New → Custom HTML.** Paste [`hubspot-meetings-gtm-listener.html`](hubspot-meetings-gtm-listener.html). Trigger: **All Pages**.
3. **Triggers → New → Custom Event**, event name `hubspot_meeting_success`.
4. **Variables → New → Data Layer Variable**: `DLV - form_id` → `form_id`.
5. Fire your **GA4 event** (for example `generate_lead`), **Google Ads conversion** or **Meta Pixel** on that trigger.
6. **Preview**, book a test meeting, check the event in Tag Assistant, then **Publish**.

## Files

| File | What it is |
|---|---|
| `hubspot-meetings-gtm-listener.html` | Ready to paste into a GTM Custom HTML tag |
| `hubspot-meetings-gtm-listener.js` | Same code without the `<script>` tags |
| `examples/sample-datalayer-output.json` | What the push looks like |

## Videos

- Install the free code: https://mdniamul.com/gtm-event-listeners/hubspot-meetings-gtm-listener/#install-video
- What the advanced version collects: https://mdniamul.com/gtm-event-listeners/hubspot-meetings-gtm-listener/#advanced

## Need more data? Advanced version

The free code tells you a meeting was booked. The **advanced version** also sends the booked contact's SHA-256 hashed email, name and phone, the meeting details (organizer, date, length, paid or free), UTM values, 17 ad click IDs, first-party cookies (`_ga`, `_fbp`, `_fbc`, `_gcl_au` and more), visitor location and a unique `event_id`, ready for Google Ads Enhanced Conversions, Meta CAPI, TikTok Events API and server-side GTM.

It comes with a setup video, a PDF guide and a GTM import file in your client portal. Price on request:

- WhatsApp: https://api.whatsapp.com/send?phone=8801776485758
- Book a call: https://calendly.com/mdniamul
- All listeners: https://mdniamul.com/gtm-event-listeners/

## Troubleshooting

- **No event:** the booking was done on meetings.hubspot.com instead of your page, GTM is not on that page, or the tag is paused.
- **Two events:** an older listener is still live. Keep one.
- **Check the raw message:** run `window.addEventListener('message', e => console.log(e.origin, e.data))` in the console and book a test meeting.

## About

Built by **[MD Niamul](https://mdniamul.com)**, GoHighLevel & AI Agent Automation, Marketing Attribution and Server-Side Tracking Specialist. Founder of Digital Soldier Agency and official Stape partner.

[Website](https://mdniamul.com) · [Free GTM listeners](https://mdniamul.com/gtm-event-listeners/) · [Book a call](https://calendly.com/mdniamul) · [LinkedIn](https://linkedin.com/in/mdniamul)

## License

MIT. Free to use on your own and your clients' sites. See [LICENSE](LICENSE).
