"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Youtube, FileText, Share2, Calendar, User, ArrowLeft, Download, BookOpen, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

type ContentBlock =
    | { type: 'h3'; text: string }
    | { type: 'p'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'quote'; text: string };

type Article = {
    title: string;
    blocks: ContentBlock[];
};

export default function ContentPage() {
    const [language, setLanguage] = useState<'en' | 'am'>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLanguage = localStorage.getItem('language') as 'en' | 'am';
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const content = {
        en: {
            title: "Easter Evangelistic Outreach",
            subtitle: "Jesus Is All About Life (JAAL)",
            articles: [
                {
                    title: "Resurrection: Religious Myth or Historical Fact? (Part 1)",
                    blocks: [
                        { type: 'p', text: "Many people view the resurrection of Christ as a religious myth lacking evidence. However, many historians—without even using the Bible as a source—point to ancient non-Christian writers like Tacitus and Josephus to show that the resurrection is supported by strong historical evidence." },
                        { type: 'h3', text: "The Historical Reality of the Death" },
                        { type: 'p', text: "Over two thousand years ago in Israel, a man named Jesus was executed by the Romans on a cross, a punishment reserved for the worst criminals. Even historians who do not follow Him agree on this point: He truly died. Roman records and Jewish writings from that era confirm this, and no historian disagrees with this historical fact." },
                        { type: 'h3', text: "The Empty Tomb and Witnesses" },
                        { type: 'p', text: "Three days later, an event occurred that changed history: the tomb where He was buried became empty. This was first discovered by women, including Mary and her friends. In the culture of that time, a woman's testimony was not even accepted in a court of law. If someone were trying to start a new movement by creating a convenient lie, they would never choose a story where women were the primary witnesses. That detail only makes sense if the event actually happened that way." },
                        { type: 'p', text: "Furthermore, the followers who had fled in fear when Jesus was arrested suddenly began to testify boldly about Him. They claimed to have seen Him, eaten with Him, and touched His wounds. These ordinary fishermen and tax collectors were willing to face beatings, social exclusion, imprisonment, and death rather than deny what they saw. People do not die for something they know is a lie." }
                    ]
                },
                {
                    title: "Resurrection: Religious Myth or Historical Fact? (Part 2)",
                    blocks: [
                        { type: 'h3', text: "The Impact of the Resurrection" },
                        { type: 'p', text: "Even the enemies of Jesus could not stop this news. If it were all a lie, they could have simply produced the body to prove He was still dead, but they did not. Instead, the message spread like wildfire across the Roman world." },
                        { type: 'p', text: "If Christ had not been raised:" },
                        {
                            type: 'ul', items: [
                                "Christianity would be an ineffective \"self-improvement\" religion or a cruel, empty delusion.",
                                "As the Apostle Paul stated, preaching and faith would be useless, and witnesses would be considered liars.",
                                "Jesus would be nothing more than a tragic moral teacher crushed by Roman power.",
                                "Death, greed, and corruption would be the ultimate winners in this world."
                            ]
                        },
                        { type: 'h3', text: "A Call to Faith" },
                        { type: 'p', text: "The resurrection is not a myth; it is a historical event that split history in two. It is the confirmation that God has not abandoned the world, but is redeeming it. As Tim Keller noted, if Jesus truly rose from the dead, then we are compelled to believe what He said." },
                        { type: 'p', text: "If you wish to accept this spiritual victory and the hope of new life, you can pray this prayer of faith:" },
                        { type: 'quote', text: "\"Lord Jesus, I believe that You died for my sins and rose from the dead to cleanse me. I give my life to You and lean on Your hope today. Amen.\"" },
                        { type: 'p', text: "Making this decision is the best choice you can make for your life. He stands with open arms to receive you and will walk with you every step of the way." }
                    ]
                },
                {
                    title: "The Hopeful Heir / A Living Hope",
                    blocks: [
                        { type: 'p', text: "In his first letter, Peter speaks urgently about a living hope. This is the hope of eternal life, grounded in the fact that Jesus Christ did not remain dead; He is alive now." },
                        { type: 'p', text: "To understand this, imagine you are on an important phone call and notice your battery is at 1%. You would panic, wouldn't you? Now, imagine having a phone battery that never runs out, no matter how much you use it. The hope we have through Christ's resurrection is like that never-ending battery—it is a living hope that never fades." },
                        { type: 'p', text: "Unlike earthly security—such as a government official relying on a high-status vehicle that could be revoked with a single letter—the hope found in Christ's resurrection is a guaranteed future. No earthly authority, government, hunger, poverty, or heartbreak can take it away." },
                        {
                            type: 'ul', items: [
                                "It does not grow moldy like old bread.",
                                "It does not age like an unpainted house.",
                                "It is not mere wishful thinking; it is a living hope directly linked to the Resurrection.",
                                "Because Jesus has risen, your future is alive."
                            ]
                        },
                        { type: 'h3', text: "What is this Inheritance?" },
                        { type: 'p', text: "What is this inheritance in Christ? Where is it, and who is it for? Peter explains that this hope comes with an inheritance—a gift waiting for us." },
                        {
                            type: 'ul', items: [
                                "A Perfect Future: It is a perfect future where we live with God forever. In that place, there is no sorrow, tears, suffering, or crying. While we live in a world where light and darkness alternate, a life of never-fading light awaits us where Christ Himself shines. There is no pain from the loss of loved ones, no regret, and no fear.",
                                "A Present Relationship: It is a relationship with God that you can start right now. It grows and transforms your life for the better forever. God becomes your Father, and you can have a bond with the Creator of heaven and earth; He hears you and speaks to you.",
                                "A New Identity: If you believe this resurrection hope is for you, you will no longer be measured by your mistakes, your family background, your exam results, or what people say about you. You are loved by God, chosen, and called by name."
                            ]
                        },
                        { type: 'p', text: "This inheritance is for you. It is not just for priests, elders, or those who grew up in the church. It is not just for those who appear \"perfect\" on Sundays; it is for everyone who believes in Jesus and accepts the gift of hope through His resurrection." },
                        { type: 'h3', text: "What Does it Mean to be \"Born Again\"?" },
                        { type: 'p', text: "Being born again is like having a second birthday. Your old life—with its shame, failures, and dead ends—comes to an end." },
                        { type: 'p', text: "A new life begins with Jesus. Just as Jesus emerged from the grave alive and new, God wants to pull you out of your old story and bring you into a new life. The resurrection makes this possible; the same power that raised Him is ready to raise you into a new beginning." },
                        { type: 'h3', text: "How to Receive This Gift" },
                        { type: 'p', text: "In John chapter 3, this very question was asked. While it is the most crucial question a person can ask, the answer is simple and fundamental:" },
                        {
                            type: 'ul', items: [
                                "Acknowledge your need: Believe and accept that you need Him. Tell Him clearly: \"I am a sinner, and I cannot fix this on my own\".",
                                "Believe in His work: Believe that He died on the cross for you and rose again. His resurrection means your sins are forgiven and your future is alive.",
                                "Ask Him in: Ask Him to come into your heart right now and give you the gift of new life."
                            ]
                        },
                        { type: 'h3', text: "Conclusion: The Time is Now" },
                        { type: 'p', text: "During this Resurrection season, you do not have to remain without hope. Jesus is alive, and you can start this new life immediately." },
                        { type: 'p', text: "Do not wait for a \"convenient\" time or a day when you feel \"ready\". The same power that emptied the tomb is ready to fill your heart. As the Scripture says, \"In the time of my favor I heard you, and in the day of salvation I helped you\"." },
                        {
                            type: 'ul', items: [
                                "The favorable time is now.",
                                "The day of salvation is now."
                            ]
                        },
                        { type: 'p', text: "Death has no scheduled appointment; it arrives without knocking. You were not created just to live an ordinary earthly life, but for a living hope that never dies. Jesus is reaching out His hands to call you—will you accept Him?" },
                        { type: 'h3', text: "A Prayer You Can Say:" },
                        { type: 'quote', text: "\"Lord Jesus, I believe that You died for my sins and rose from the dead to cleanse me. I give my life to You, and today I lean on Your hope. Amen.\"" },
                        { type: 'p', text: "This is the best decision you can ever make in your life. He welcomes you with open arms and will walk with you every step of the way." }
                    ]
                }
            ] as Article[],
            videoTitle: "Watch Our Mission Documentary",
            videoDescription: "Watch more videos in our EvaSUE Youtube channel and subscribe to get updated videos",
            back: "Back to Home"
        },
        am: {
            title: "የፋሲካ የወንጌል ስርጭት",
            subtitle: "ኢየሱስ ለጥያቄ ሁሉ መልስ ነው (JAAL)",
            articles: [
                {
                    title: "ትንሳኤ፡ ኃይማኖታዊ ተረት ወይስ ታሪካዊ እውነታ? (ክፍል 1)",
                    blocks: [
                        { type: 'p', text: "ቊጥራቸው ቀላል ያይደሉ ሰዎች፥ የክርስቶስን ትንሳኤ፥ ማረጋገጫ እንደሌለው የኃይማኖት ተረት አድርገው ይመለከቱታል። ነገር ግን ብዙ የታሪክ ምሁራን መጽሐፍ ቅዱስን እንደ ምንጭ ሳይጠቀሙ፥ እንደ ታሲተስ እና ጆሲፈስ ያሉ ክርስቲያን ያልሆኑ ጥንታዊ የታሪክ ጸሐፊያን የጻፉትን ብቻ በመመልከት የክርስቶስ ትንሳኤ ጠንከር ባሉ ታሪካዊ ማስረጃዎች የተደገፈ እንደሆነ ይገልጻሉ።" },
                        { type: 'p', text: "ከሁለት ሺህ ዓመታት በፊት በእስራኤል፣ ኢየሱስ የተባለ ሰው ሮማውያን የከፉ ወንጀለኞችን በሚቀጡበት አሰቃቂ መንገድ በእንጨት ላይ ተሰቅሎ ተገደለ። እርሱን ፈጽሞ የማይከተሉ የታሪክ ተመራማሪዎች እንኳ በዚህ ነጥብ ላይ ይስማማሉ፦ እርሱ በእውነት ሞቷል። የዚያ ዘመን የሮማውያን መዛግብት እና የአይሁድ ጽሑፎች ይህንኑ ይጠቅሳሉ። በዚህ ታሪካዊ እውነታ የማይስማማ የታሪክ ምሑር የለም።" },
                        { type: 'p', text: "ከሦስት ቀናት በኋላ ታሪክን የለወጠ ነገር ተከሰተ። እርሱን የቀበሩበት መቃብር ባዶ ሆነ። ይህንን መጀመሪያ ያወቁት ሴቶች ማለትም ማርያምና ጓደኞቿ ነበሩ። በዚያ ዘመን ባሕል የሴቶች ምስክርነት በፍርድ ቤት እንኳ ተቀባይነት አልነበረውም። አንድ ሰው ዐዲስ ንቅናቄ ለመጀመር ፈልጎ ምቹ የሆነ የውሸት ታሪክ እየፈጠረ ቢሆን ኖሮ፥ በፍጹም ሴቶች ዋና ምስክር ሆነው ያረጋገጡትን የፈጠራ ታሪክ አይመርጥም ነበር። ያ ዝርዝር ጉዳይ ትርጉም የሚሰጠው ነገሩ በእውነት በዚያ መንገድ ከተከሰተ ብቻ ነው። በመቀጠልም ኢየሱስን ይከተሉ የነበሩት ሰዎች፥ እርሱ ሲታሰር በፍርሃት የሸሹት እነዚያው ሰዎች፥ ድንገት በድፍረት ከርሱ ጋር መመስከር ጀመሩ። “አየነው! ከእርሱ ጋር በላን! በእጆቹ ላይ ያሉትን ቁስሎች ዳሰስን!” አሉ። እነዚህ ተራ ዓሣ አጥማጆች እና ቀራጮች ሁሉም በፍጹም ስምምነት አየነው ያሉትን እውነት ከመካድ ይልቅ ለመደብደብ፣ ከማኅበረ ሰቡ ለመገለል ወደ እስር ቤት ለመጣልና ለመሞት ፈቃደኛ ነበሩ። ሰዎች ሐሰት መሆኑን ለሚያውቁት ነገር ወይም ሕይወታቸውን አይሰጡም።" }
                    ]
                },
                {
                    title: "ትንሳኤ፡ ኃይማኖታዊ ተረት ወይስ ታሪካዊ እውነታ? (ክፍል 2)",
                    blocks: [
                        { type: 'p', text: "የኢየሱስ ጠላቶች እንኳ ዜናውን ሊያስቆሙት አልቻሉም። ነገሩ ሁሉ ውሸት ቢሆን ኖሮ፣ አስከሬኑን አውጥተው “አያችሁ? አሁንም ሙት ነው” ማለት ይችሉ ነበር። ነገር ግን ይህንን አላደረጉም። ይልቁንም መልእክቱ በሮማውያን ዓለም እንደ ሰደድ እሳት ተሰራጨ። ክርስትና የመጋቢያንን ስብከት ብቻ ሰምተን የምንከተለው የኃይማኖት ዘይቤ ብቻ አይደለም። ነገር ግን በሙያቸው ጥንታዊ ሰነዶችን የሚያጠኑ ሰዎች፥ ብዙዎቹ ክርስቲያን ያልሆኑም እንኳን ሳይቀሩ እነዚህን እውነታዎች ተመልክተው፥ \"ለተከሰተው ነገር ከሁሉ የተሻለው ማብራሪያ ኢየሱስ የእውነትም ከሙታን ተነስቷል የሚለው ነው\" ይላሉ። ይህ ተረት አይደለም። ታሪክን ለሁለት የከፈለ ክስተት ነው። ዛሬም ቢሆን በ21ኛው ክፍለ ዘመን፥ ኢትዮጲያ ውስጥ ሆነን ስለዚህ ጉዳይ የምናወራው ለዚህ ነው። እግዚአብሔር ይመስገን! እግዚአብሔር የእውነትም ክርስቶስ ኢየሱስን ከሙታን አስነስቶታል።" },
                        { type: 'h3', text: "1. ኢየሱስ ከሙታን ባይነሳ ኖሮ ምን ይሆን ነበር?" },
                        { type: 'p', text: "ኢየሱስ በዚያ መቃብር ውስጥ ሳይነሳ ቀርቶ ቢሆን ኖሮ፥ ክርስትና ውጤታማ ያልሆነ የራስን ስብዕና ማሻሻያ ኃይማኖት፥ ከዚያም ባለፈ ጥልቅ ጭካኔን የተሞላ ከንቱ ቅዠት በሆነ ነበር። ሐዋርያው ጳውሎስ ስለዚህ ጉዳይ ሲናገር በጣም በግልጽ፥ “ክርስቶስም ካልተነሣ ስብከታችን ዋጋ ቢስ ነው፤ እምነታችሁም ከንቱ ነው። ከዚህም በላይ፣ እግዚአብሔር ክርስቶስን ከሞት አስነሥቶታል ብለን በመመስከራችን፣ ሐሰተኞች የእግዚአብሔር ምስክሮች ሆነን ተገኝተናል” ብሏል (1ቆሮ)። እንደሚታየው፣ ትክክለኛና አካላዊ ትንሣኤ ከሌለ፣ ኢየሱስ ማለት ያስተማራቸው ሐሳቦች በሮማውያን ጨካኝ ስልጣናዊ በትሮች የተደቆሱበት አንድ ተራ እና አሳዛኝ የሥነ ምግባር መምህር ብቻ ይሆናል።" },
                        { type: 'p', text: "ሞቶ የቀረ ቢሆን ኖሮ፥ የክርስቶስ ሞት በዚህ ዓለም ውስጥ ዐመፅ፣ ስግብግብነት እና ብልሹ አሠራር ሁል ጊዜም አሸናፊ እንደሚሆኑ ማረጋገጫ በሆነ ነበር። እንዲሁም ክርስትና የሰው ልጅን ልብ ለመለወጥ ምንም ዓይነት እውነተኛ ኃይል የሌለው፣ ምንም ዓይነት ተጨባጭ ምክንያት የሌለው፣ በ\"አድርግ\" እና \"አታድርግ\" ሕግጋት ላይ ብቻ የተመሠረተ ኃይማኖት ብቻ ይሆን ነበር ነበር።" },
                        { type: 'p', text: "ትንሣኤው ተረት ቢሆን ኖሮ፣ ጥልቁ የሰው ልጅ የፍትሕ እና የመታደስ ናፍቆት፥ ፍጻሜ አልባ የሆነ እና ዘፈቀዳዊ የተፈጥሮ ድንገተኛ አጋጣሚ ብቻ በሆነ ነበር። ይህም ማለት እያንዳንዱ ቀብር ፍጹም የሆነ የመጨረሻ ስንብት ነው፣ እያንዳንዱ ግፍ ደግሞ መቼም የማይጠፋ የታሪክ ጠባሳ ይሆን ነበር።" },
                        { type: 'p', text: "ነገር ግን የክርስቶስ ሞት እና ትንሣኤ ዝም ብሎ ደስ የሚል ሐሳብ ሳይሆን፥ እግዚአብሔር ይህን ዓለም እንዲሁ እንዳልተው እና እንደማይጥል፣ ይልቁንም እንደሚቤዥ የሚያረጋግጥ ታሪካዊ ክስተት ነው። መቃብሩ ባዶ ካልሆነ፥ ተስፋ፥ በሕይወት ትግሎቻችን ውስጥ ስናልፍ ለመጽናናት የምንጠቀምበት ሥነ-ልቦናዊ ዘዴ ብቻ ይሆን ነበር፤ ነገር ግን ቲም ኬለር እንዳለው፥ ኢየሱስ የእውነትም ከሙታን ከተነሳ፥ እርሱ የተናገረውን እና ከርሱ ጋር የነበሩትም ስለርሱ የመሰከሩትን የማመን ግዴታ ውስጥ እንወድቃለን። ነገር ግን እርሱ ከሙታን ተነስቷል፤ የዳግም ልደት፣ የዐዲስ ሕይወት እንዲሁም የፍጥረት ሁሉ መታደስ እና የእንደገና ዕድል ተስፋችን የርሱ ከሙታን መነሳት ነው።" },
                        { type: 'p', text: "እንግዲህ ከሞት የተነሳው ክርስቶስ የዘላለም ሕይወት ተስፋ ከሆነ ምን ላድረግ ብላችሁ መጠየቃችሁ አይቀርም። ይህ ታሪካዊ እምነት የፈጸመውን መንፈሳዊ ድል ለእኔ ነው ብሎ በመቀበል እና በክርስቶስ በመታመን፥ እናንተም ይህ ትንሳኤ ከሰጠን ተስፋ እና ዐዲስ ሕይወት ማዕድ መቋደስ ትችላላችሁ።" },
                        { type: 'p', text: "ይህንን የእምነት ጸሎት ባላችሁበት ሆናችሁ በዝግታ ወይም ድምጻችሁን አውጥታችሁ ከእኛ ጋር ጸልዩ፥" },
                        { type: 'quote', text: "\"ጌታ ኢየሱስ ሆይ፣ ስለኀጢአቴ እንደሞትክ እኔንም ከኀጢአቴ ለማንጻት ከሞት እንደተነሳህ አምናለሁ፤ ሕይወቴን ለአንተ እሰጣለሁ፣ ዛሬም በተስፋህ እደገፋለሁ። አሜን!\"" },
                        { type: 'p', text: "ይህ በሕይወታችሁ የምታደርጉት ከሁሉ የተሻለ ውሳኔ ነው። የተወደዳችሁ ሆይ፥ እርሱ እጆቹን ዘርግቶ ይቀበላችኋል፤ በእያንዳንዱ ርምጃችሁም ዐብሯችሁ ይጓዛል።" }
                    ]
                },
                {
                    title: "ተስፈኛው ባለ ርስት",
                    blocks: [
                        { type: 'p', text: "ጴጥሮስ በመጀመሪያ መልእክቱ አጥብቆ የሚናገረው ስለ ሕያው ተስፋ ነው። ይህ ተስፋ የዘላለም ሕይወት ተስፋ ነው፤ ምክንያቱም ኢየሱስ ክርስቶስ ሞቶ አልቀረም፤ አሁን ሕያው ነው።" },
                        { type: 'p', text: "እስቲ አስፈላጊ ስልክ እያወራችሁ ላይ እያላችሁ የስልካችሁ ባትሪ 1% ቢሆን የሚሰማችሁን ስሜት ለማሰብ ሞክሩ። ትደነግጣላችሁ አይደል? እስቲ ደግሞ የፈለጋችሁትን ያህል ብትጠቀሙበት ፈጽሞ የማያልቅ የስልክ ባትሪ ቢኖራችሁስ? በክርስቶስ ትንሳኤ ያገኘነው ተስፋ ባትሪው እንደማያልቅ ስልክ ነው፤ የማይጠፋ ሕያው ተስፋ ነው። ወይም ከመንግስት መስሪያ ቤት በተሰጠው 4ቊጥር ኮድ ታርጋ ባለው መኪና ተስፋ የሚያደርግን ሰው ዐስቡ። ይህ ሰው ይህንን መኪና በአንድ ደብዳቤ “መልስ” ሊባል ይችላል። በክርስቶስ ትንሳኤ የምናገኘው ተስፋ ግን የትኛውም ምድራዊ አለቃ፣ የትኛውም መንግሥት፣ ረሃብ፣ ማጣት፣ ማግኘት ወይም የልብ ስብራት ሊነጥቀው የማይችል የተረጋገጠ የወደፊት ሕይወት ተስፋ ነው። እንደቆየ እንጀራ አይሻግትም፣ ቀለም እንዳልተቀባ ቤት አያረጅም። ይህ ዝም ብሎ ምኞት አይደለም። ከትንሣኤው ጋር በቀጥታ የተቆራኘ ሕያው ተስፋ ነው። ኢየሱስ ተነስቷል — ስለዚህ የእናንተም የወደፊት ሕይወት ሕያው ነው።" },
                        { type: 'h3', text: "1. በክርስቶስ ያለው ርስት — ምንድን ነው? የት ነው ያለው? ለማንስ ነው?" },
                        { type: 'p', text: "አሁን ጴጥሮስ ይህ ተስፋ ከርስት ጋር እንደሚመጣ ይነግረናል። እኛን የሚጠባበቅ ስጦታ አለ።" },
                        {
                            type: 'ul', items: [
                                "በመጀመሪያ፣ ይህ ተስፋ የተገባልን ርስት ለዘላለም ከእግዚአብሔር ጋር የምንኖረው ፍጹም የኾነ የወደፊት ሕይወት ነው። በዚያ ሐዘን፣ እንባ፣ መከራ እና ልቅሶ የለም። ጨለማ እና ብርሃን በሚቆራረጥበት በዚህ ዓለም፥ ክርስቶስ ራሱ የሚያበራበት ፈጽሞ የማይጠፋ የብርሃን ሕይወት ይጠብቀናል። ከምንወዳቸው እና ከሚወዱን ሰዎች መለየታችን የሚፈጥርብን ሕመም በዚያ ሥፍራ የለም። ሕመም፣ ጸጸት እና ፍርሃት የማይኖርበት ሥፍራ ነው።",
                                "ሁለተኛ፣ ልክ አሁኑኑ መጀመር የምትችሉት እና በሕይወታችሁ እያደገ ኼዶ ሕይወታችሁን ለዘላለም በመልካም የሚለውጥ ከእግዚአብሔር ጋር ያለ ግንኙነት ነው። እግዚአብሔር አባታችሁ ይሆናል እናንተም የአባት እና የልጅ ኅብረት ከሰማይ እና ከምድር ፈጣሪ ከእግዚአብሔር ጋር ማድረግ ትችላላችሁ። እርሱ ይሰማችኋል ደግሞም ይናገራል።",
                                "ሦስተኛው፣ ዐዲስ ማንነት ነው። ይህንን የትንሳኤ ተስፋ ለኔ ነው ብላችሁ ካመናችሁ፥ ከእንግዲህ በስህተቶቻችሁ፣ በቤተሰብ አስተዳደጋችሁ፣ በፈተና ውጤታችሁ፣ ወይም ሰዎች ስለ እናንተ በሚያወሩት ነገር አትመዘኑም። በእግዚአብሔር የተወደዳችሁ፣ የተመረጣችሁና በስማችሁ የተጠራችሁ ናችሁ።"
                            ]
                        },
                        { type: 'p', text: "ይሄ ሁሉ ርስት ግን ለማን ነው? ለእናንተ ነው። ለካህናት ወይም ለሽማግሌዎች ወይም በቤተ ክርስቲያን ላደጉ ሰዎች ብቻ አይደለም። በእሁድ ቀን ፍጹም ለሚመስሉ ብቻ አይደለም። ኢየሱስን ለሚያምኑ እና የተስፋውን ስጦታ በትንሳኤው በማመን ለሚቀበሉ ሰዎች ሁሉ ነው" },
                        { type: 'h3', text: "2. እንደገና መወለድ — ትርጉሙ ምንድን ነው? እንዴትስ ነው ሰው ዳግመኛ መወለድ የሚችለው?" },
                        { type: 'p', text: "እንደገና መወለድ ልክ ሁለተኛ የልደት ቀንን እንደማግኘት ነው። አሮጌው ሕይወታችሁ ከእነ ሐፍረቱ፣ ውድቀቱ፣ አጣብቂኝ ውስጥ የገባው የእናንተ ማንነት ያበቃ። ዐዲስ ሕይወት ከኢየሱስ ጋር ይጀምራል። ልክ ኢየሱስ ከመቃብር ሕያውና አዲስ ሆኖ እንደወጣ፣ እግዚአብሔር እናንተንም ከአሮጌው ታሪካችሁ አውጥቶ ወደ ዐዲስ ሕይወት ሊያመጣችሁ ይፈልጋል። ትንሣኤው ይህንን ይቻላል ያደርገዋል። እርሱን ያስነሳው ኃይል እናንተንም ወደ ዐዲስ ጅማሬ ለማስነሳት ዝግጁ ነው።" },
                        { type: 'p', text: "ታዲያ ይህንን እንዴት ማግኘት እችላለሁ? በዮሐንስ ወንጌል ምዕራፍ 3 ይህንኑ ጥያቄ ተጠይቆ ነበር። ይህ አንድ ሰው በሕይወቱ መጠየቅ ያለበት ወሳኙ ጥያቄ ሲሆን መልሱ ግን ቀላል እና መሠረታዊ ነው።" },
                        { type: 'p', text: "እርሱ እንደሚያስፈልጋችሁ አምናችሁ ተቀበሉ። በግልጽ እንዲህ በሉት፥ \"ኀጢአተኛ ነኝ፣ ይህንንም በራሴ ማስተካከል አልችልም።\" በሉት" },
                        {
                            type: 'ul', items: [
                                "እርሱ ስለ እናንተ በመስቀል እንደሞተና እንደተነሳ እመኑ። የእርሱ ትንሣኤ ማለት የእናንተ ኃጢአት ተይቅሮላችኋል፣ የወደፊት ሕይወታችሁም ሕያው ነው ማለት ነው።",
                                "አሁኑኑ ወደ ልባችሁ እንዲመጣ እና የዐዲስ ሕይወት ስጦታን እንዲሰጣችሁ ጠይቁት።"
                            ]
                        },
                        { type: 'h3', text: "እንደ መውጫ" },
                        { type: 'p', text: "በዚህ የትንሣኤ ወቅት፣ ያለ ተስፋ መቅረት የለባችሁም። ኢየሱስ ሕያው ነው። ዐዲሱን ሕይወት አሁኑኑ መጀመር ትችላላችሁ። ምቹ ነው ብላችሁ የምታስቡትን ጊዜ ወይም \"ተዘጋጅቻለሁ\" የምትሉበትን ቀን አትጠብቁ። መቃብሩን ባዶ ያደረገው ያው ኃይል ልባችሁን ለመሙላት ዝግጁ ነው። የበለጠ በጌታ መንገድ እንዲረዷችሁ፥ ከታች ወደምታገኙት አድራሻ ለመደወል አታቅማሙ። መጽሐፍ “በተወደደ ጊዜ ሰማሁህ፤ በድነት ቀን ረዳሁህ” ይላልና። እነሆ፤ የተወደደው ጊዜ አሁን ነው፤ የመዳንም ቀን አሁን ነው።” በማለት ይናገራል። ሞት ቀጠሮ የለውም። ያለ ቀጠሮ የሚመጣ ሞት በሩን ሳያንኳኳ ይሄንን ዘላለምንም ዛሬንም የሚያሳምር ተስፋ እንዴት ማግኘት እንደምትችሉ ሊረዷችሁ ይጠብቋችኋል።" },
                        { type: 'p', text: "እናንተ የተፈጠራችሁት ተራ ምድራዊ ኑሮን ለመኖር ብቻ አይደለም። የተፈጠራችሁት ፈጽሞ ለማይሞት ሕያው ተስፋ ነው። ኢየሱስ እጆቹን ዘርግቶ እየጠራችሁ ነው። ትቀበሉታላችሁ? ጸሎታችን እንደትቀበሉት ነው። ትንሣኤው እውነት ነው። የወደፊት ሕይወታችሁ ሕያው ነው። ዐብረን በዚያ እንመላለስ።" },
                        { type: 'p', text: "ይህንን ጸሎት ባላችሁበት ሆናችሁ በዝግታ ወይም ድምጻችሁን አውጥታችሁ መጸለይ ትችላላችሁ፥" },
                        { type: 'quote', text: "\"ጌታ ኢየሱስ ሆይ፣ ስለኀጢአቴ እንደሞትክ እኔንም ከኀጢአቴ ለማንጻት ከሞት እንደተነሳህ አምናለሁ፤ ሕይወቴን ለአንተ እሰጣለሁ፣ ዛሬም በተስፋህ እደገፋለሁ። አሜን!\"" },
                        { type: 'p', text: "ይህ በሕይወታችሁ የምታደርጉት ከሁሉ የተሻለ ውሳኔ ነው። የተወደዳችሁ ሆይ፥ እርሱ እጆቹን ዘርግቶ ይቀበላችኋል፤ በእያንዳንዱ ርምጃችሁም ዐብሯችሁ ይጓዛል።" }
                    ]
                }
            ] as Article[],
            videoTitle: "የተልዕኮ ዘጋቢ ፊልማችንን ይመልከቱ",
            videoDescription: "ተጨማሪ ቪዲዮዎችን በኢቫሱ የዩቲዩብ ቻናላችን ይመልከቱ፤ አዳዲስ ቪዲዮዎችን ለማግኘት ሰብስክራይብ ያድርጉ።",
            back: "ወደ መነሻ ተመለስ"
        }
    };

    const t = language === 'en' ? content.en : content.am;

    if (!mounted) return null;

    const renderArticle = (article: typeof t.articles[0]) => (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl h-full flex flex-col">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-sky-400" />
                {article.title}
            </h2>

            <div className="space-y-6 flex-1">
                {article.blocks.map((block, bIdx) => {
                    switch (block.type) {
                        case 'h3':
                            return (
                                <h3 key={bIdx} className="text-xl sm:text-2xl font-bold text-sky-400 mt-8 mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    {block.text}
                                </h3>
                            );
                        case 'p':
                            return (
                                <p key={bIdx} className="text-slate-300 text-lg leading-relaxed">
                                    {block.text}
                                </p>
                            );
                        case 'ul':
                            return (
                                <ul key={bIdx} className="grid grid-cols-1 gap-4 my-8">
                                    {block.items.map((item, iIdx) => (
                                        <li key={iIdx} className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors shadow-lg hover:shadow-sky-900/20 group">
                                            <div className="mt-1.5 w-3 h-3 rounded-full bg-sky-500 shrink-0 shadow-[0_0_12px_rgba(14,165,233,0.8)] group-hover:scale-125 transition-transform" />
                                            <span className="text-slate-300 text-base flex-1">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            );
                        case 'quote':
                            return (
                                <div key={bIdx} className="my-8 p-6 bg-white/5 border border-sky-500/30 rounded-2xl italic text-sky-100 font-medium text-lg leading-relaxed border-l-4 border-l-sky-500 shadow-xl shadow-sky-900/20">
                                    {block.text}
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-slate-950 pt-28 pb-20 relative overflow-hidden">
            {/* Background elements to match overall theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-sky-950/40 to-slate-950 opacity-100 z-0" />
            <motion.div
                className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15)_0%,transparent_60%)] z-0 pointer-events-none"
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight"
                    >
                        {t.title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="h-1 w-12 bg-sky-500 rounded-full" />
                        <p className="text-sky-400 font-bold tracking-widest uppercase text-sm sm:text-base">
                            {t.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Main Grid Content - Equal Height Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Side: Part 1 Article */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-5"
                    >
                        {t.articles[0] && renderArticle(t.articles[0])}
                    </motion.div>

                    {/* Right Side: Video + Part 2 Article */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-7"
                    >
                        <div className="flex flex-col h-full">
                            {/* Video Section */}
                            <div className="mb-12">
                                <div className="mb-4 flex items-center gap-3">
                                    <Youtube className="w-6 h-6 text-red-500" />
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">Featured Video</h3>
                                </div>

                                <div className="relative group">
                                    {/* Glow effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                                    {/* Video Container */}
                                    <div className="relative aspect-video bg-slate-900 rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/1vdYw0VzReU?"
                                            title="EvaSUE Campus Outreach"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                                    <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Heart className="w-5 h-5 text-sky-400" />
                                        {t.videoTitle}
                                    </h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {t.videoDescription}
                                    </p>
                                </div>
                            </div>

                            {/* Part 2 Article */}
                            {t.articles[1] && renderArticle(t.articles[1])}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Full Width Article */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12"
                >
                    {t.articles[2] && renderArticle(t.articles[2])}
                </motion.div>
            </div>
        </main>
    );
}