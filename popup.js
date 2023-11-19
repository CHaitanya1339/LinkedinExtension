document.addEventListener('DOMContentLoaded', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: function () {
          const textField = document.querySelector('input[type="text"]');
          if (textField) {
              textField.addEventListener('input', function () {
                  const hirerNameElement = document.querySelector('.hirer-card__container strong');
                  const hirerName = hirerNameElement ? hirerNameElement.innerText.trim() : '<recruiter_name>';
                  const jobTitle = document.querySelector('.job-details-jobs-unified-top-card__job-title');
                  const companyName = document.querySelector('.job-details-jobs-unified-top-card__primary-description .app-aware-link');
                  const jobInfo = {
                      jobTitle: jobTitle.innerText.trim(),
                      companyName: companyName.innerText.trim(),
                      hirerName: hirerName
                  };


                  let jobInfoString = `Hi ${jobInfo.hirerName},\n I saw a job opening for ${jobInfo.jobTitle} at ${jobInfo.companyName} that I am interested in applying for. Based on my 2 years of experience in Node.js and AWS, I believe I could be a good fit for this position. I’d love to share more about my own qualifications and experiences.`;

                  if (this.value.toLowerCase().includes('/apply')) {
                      this.value = jobInfoString;
                  }
              });
          }
      },
  });
});