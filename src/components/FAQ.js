import React from "react";
import "./FAQ.css";

const FAQs = () => {
  return (
    <div className="Main-FAQ">
    <div className="faqhead">FAQs</div>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h6 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Do I need a different resume for every different job application?
            </button>
          </h6>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
            Every time you apply for a new job, you should make sure the resume speaks directly to the job description. That means, your resume may not need to be entirely different, but you’ll likely want to make at least a few minor updates. If you’re applying for a different type of job, you may want a completely different resume, from the content all the way to the format. With all the different templates to choose from, take advantage of our resume builder and create a variety of resumes to fit both your personality and your different job applications.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              How do I choose the right resume template?
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
            Choosing the right resume template mostly comes down to personal preference. Granted, if you’re applying for a job in finance, you may not want an abstract-leaning format like a graphic designer may use. So, as you browse through all the resume templates while you build your resume, think about what potential employers may expect to see, then pick the resume that fits both your personality and career goals.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Free resume builder doesn’t usually mean free. Does Resume.com sell my information?
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
            Absolutely not. Our resume builder is completely free. From creating an account to uploading your resume to downloading and printing, you’ll never pay a dime. Your information is all secure and we will not sell to anyone.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
