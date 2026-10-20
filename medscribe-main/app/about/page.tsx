import Image from "next/image";
import Link from "next/link";
import React from "react";

function AboutPage() {
  return (
    <div className="p-4 md:p-6">
      <title>About us</title>
      <section
        style={{ background: 'url("/banner-scaled.jpg") center/cover' }}
        className="text-center p-4 py-10 md:p-6 md:py-16 lg:p-8 lg:py-20 rounded-2xl"
      >
        <article className="flex items-center justify-center">
          <Image src="/icon.svg" width={40} height={40} alt="Logo" />
          <p className="font-semibold">Med Scribe</p>
        </article>
        <div className="flex items-center gap-1 justify-center my-2">
          <Link href="/">Home</Link>
          <small>/</small>
          <Link href="/about">About</Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-black">About us</h1>
      </section>
      <section className="p-4 md:p-6 space-y-6 max-w-xl mx-auto">
        <p>

        
      Welcome to app Med Scribe!
 </p>
 <p>

 
In today's fast-paced healthcare environment, efficient management of patient information is crucial for providing quality care. Med Scribe is designed to streamline the documentation and storage of treatment records, enabling healthcare professionals to access and update patient data with ease. This software not only enhances the accuracy of medical records but also ensures compliance with regulatory standards, improving overall patient safety and care outcomes
</p>
<p>


Med Scribe enhances the accuracy of medical records and helps to provide treatment fast.
</p>
<p>


As healthcare becomes increasingly digitized, adopting such innovative solutions is essential for enhancing patient operational
 efficiency.
 </p>
      </section>
    </div>
  );
}

export default AboutPage;
