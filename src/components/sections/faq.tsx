import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqs = [
    {
      question: "Is my data secure?",
      answer:
        "Yes. We use enterprise-grade encryption and private vector stores. Your data never trains public models.",
    },
    {
      question: "Does it really speak Bengali properly?",
      answer:
        "Yes. Test the demo above. Our stack is optimized for regional nuances.",
    },
    {
      question: "Is this expensive?",
      answer:
        "It is an investment in infrastructure, priced against the cost of hiring 3 full-time staff members.",
    },
  ];
  
  export function FAQSection() {
    return (
      <section id="faq" className="w-full py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl">Objection Handling</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-primary/20">
                <AccordionTrigger className="text-left font-headline text-xl hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
  }
  