/* HubSpot Meetings listener by MD Niamul - mdniamul.com */
(function () {
  window.dataLayer = window.dataLayer || [];
  var lastPush = 0;

  window.addEventListener('message', function (event) {
    // Only trust messages from HubSpot's meetings iframe (meetings.hubspot.com, meetings-eu1.hubspot.com)
    var host = '';
    try { host = new URL(event.origin).hostname; } catch (e) { return; }
    if (!/(^|\.)hubspot\.com$/.test(host)) return;

    var data = event.data;
    if (typeof data === 'string' && data.charAt(0) === '{') {
      try { data = JSON.parse(data); } catch (e) { return; }
    }
    if (!data || typeof data !== 'object') return;
    if (data.meetingBookSucceeded !== true && data.meetingBookSucceeded !== 'true') return;

    // One push per booking, even if HubSpot sends the message twice
    var now = new Date().getTime();
    if (now - lastPush < 2000) return;
    lastPush = now;

    var payload = data.meetingsPayload || {};
    window.dataLayer.push({
      event: 'hubspot_meeting_success',
      form_id: payload.formGuid || '',
      page_path: window.location.pathname
    });
  });
})();
