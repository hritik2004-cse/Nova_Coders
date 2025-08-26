import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
    {
        id: "item-1",
        question: "What is Nova Coders?",
        answer: "Nova Coders is a dynamic and inclusive community for developers, designers, and tech enthusiasts of all skill levels. Our mission is to create a collaborative environment where members can learn, build innovative projects, and grow their professional network."
    },
    {
        id: "item-2",
        question: "Who is Nova Coders for?",
        answer: "We welcome everyone! Whether you're a student just starting your coding journey, a seasoned professional looking to mentor others, or simply someone passionate about technology, you'll find a place here."
    },
    {
        id: "item-3",
        question: "Is there a fee to join the community?",
        answer: "No, membership in Nova Coders is completely free. Our goal is to make learning and collaboration accessible to everyone."
    },
    {
        id: "item-4",
        question: "How do I become a member?",
        answer: "The best way to join is by becoming active on our Discord Server. This is where we share announcements, organize events, and collaborate on projects. You can also follow our social media channels to stay updated."
    },
    {
        id: "item-5",
        question: "How can I contribute to the community?",
        answer: "There are many ways to contribute! You can participate in our open-source projects on GitHub, help answer questions on Discord, share your knowledge by leading a workshop, or mentor other members. We're always open to new ideas!"
    },
    {
        id: "item-6",
        question: "What kind of events do you host?",
        answer: "We host a variety of events, including online hackathons (like our recent Hack Gear 1.0), expert-led workshops on the latest technologies, collaborative code jams, and casual networking sessions."
    },
    {
        id: "item-7",
        question: "I'm a beginner. Are the events suitable for me?",
        answer: "Absolutely! We strive to make our events welcoming and valuable for all skill levels. We often have beginner-friendly tracks and mentorship available during events to help you get started."
    },
    {
        id: "item-8",
        question: "Does Nova Coders offer internships?",
        answer: "Yes, we offer internship opportunities that allow you to gain hands-on experience by working on real-world community projects. It's a great way to build your portfolio and learn from experienced members."
    },
    {
        id: "item-9",
        question: "How can I apply for an internship or other roles?",
        answer: "Keep an eye on our 'Apply Now' section on the website and the announcements channel on our Discord server. We post all open opportunities there with details on how to apply."
    }
];

const Faq = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-sky-400 dark:to-[#64ffda] text-transparent bg-clip-text">
                    Frequently Asked Questions
                </h2>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-[700px] mx-auto"
                    defaultValue="item-1"
                >
                    {faqData.map((item) => (
                        <AccordionItem value={item.id} key={item.id}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-balance">
                                    {item.answer}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

export default Faq;
