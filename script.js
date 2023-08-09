let data = {};
const url = 'https://6b00-2a02-e0-6f0e-7f00-db5b-e1b7-44e8-88c4.ngrok-free.app/record'
const entries = performance.getEntriesByType("navigation");
entries.forEach((entry) => {
    const dom_content_load_start = entry.domContentLoadedEventStart;
    const dom_content_load_end = entry.domContentLoadedEventEnd;
    const dom_complate = entry.domComplete;
    const response_start = entry.responseStart;
    const response_end = entry.responseEnd;
    const response_status = entry.responseStatus;
    const hostname = entry.name;
    data = {
        dom_content_load_start,
        dom_content_load_end,
        dom_complate,
        response_start,
        response_end,
        response_status,
        hostname
    };
});
(async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const content = await rawResponse.json();

  console.log(content.message);
})();