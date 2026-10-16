import cafeConversation from '@/public/blog/cafe-conversation.webp';
import friendsInCafe from '@/public/blog/friends-in-cafe.webp';
import studentsAtLaptop from '@/public/blog/students-at-laptop.webp';
import studyPartners from '@/public/blog/study-partners.webp';
import tbilisiEvening from '@/public/blog/tbilisi-evening.webp';
import tbilisiNight from '@/public/blog/tbilisi-night.webp';
import teamAtScreen from '@/public/blog/team-at-screen.webp';
import type { BlogPost } from '@/types/blog';

/**
 * Cover photos are from Unsplash (free Unsplash License): friends-in-cafe, students-at-laptop and
 * team-at-screen by Vitaly Gariev, tbilisi-evening by Denis Arslanbekov, tbilisi-night by
 * Aleksandr Popov, cafe-conversation by Brooke Cagle, study-partners by Chidera Faustina Okeke.
 * Publish dates are placeholders until the team sets the real ones. Georgian text needs native review.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'why-small-groups',
    publishedAt: '2026-10-14',
    cover: friendsInCafe,
    coverAlt: {
      en: 'Four friends laughing around a cafe table while one of them takes a photo on a phone.',
      ka: 'ოთხი მეგობარი ხარხარებს ყავახანის მაგიდასთან, ერთი მათგანი ტელეფონით იღებს ფოტოს.',
    },
    tags: [
      { en: 'Product', ka: 'პროდუქტი' },
      { en: 'Community', ka: 'თემი' },
    ],
    title: {
      en: 'Why small groups beat big feeds',
      ka: 'რატომ სჯობს მცირე ჯგუფები დიდ ფიდებს',
    },
    excerpt: {
      en: 'A feed puts you in front of everyone. A small group puts you at a table with a few people who care about the same things. Here is why SEE is built around micro-groups.',
      ka: 'ფიდი შენ ყველას წინაშე გაყენებს. მცირე ჯგუფი კი რამდენიმე ადამიანთან ერთად მაგიდასთან გსვამს — მათთან, ვისაც იგივე აინტერესებს. აი, რატომ არის SEE აგებული მიკრო-ჯგუფებზე.',
    },
    body: {
      en: `Open a social feed and you are one of everyone. Sit at a table with a few people who care about the same things and you are one of them.

## Feeds are built for reach

A public feed is designed to put as many posts as possible in front of as many people as possible. That works well for news. It works poorly for meeting someone you will actually see again, because scrolling is easy to start and hard to turn into a conversation.

## A small group changes the dynamic

In a small group, everyone is seen and everyone speaks. Nobody can hide in the crowd and nobody has to perform for an audience. Trust has room to grow because the conversation can go somewhere.

> Every Space is tailored to your intention.

## What SEE does differently

SEE does not give you a feed to scroll. After you set up a profile, it matches you into a private micro-group built around shared ground: interests, values, goals and skills.

- No public feeds and no endless swiping.
- Small, private groups built around what you have in common.
- A first meeting that happens offline, in real life.

## Why the first meeting matters

Chatting online is a fine start, but a meeting is where a group becomes real. SEE's job is to get you to that first table. A built-in facilitator helps the group break the ice and find a time that works for everyone.

## Where we start

The first micro-groups will be in Tbilisi. If that sounds like you, [join the waitlist](/en#waitlist) and we will email you the moment spots open up.`,
      ka: `გახსენი სოციალური ფიდი და ერთი ხარ ყველას შორის. დაჯექი მაგიდასთან რამდენიმე ადამიანთან ერთად, ვისაც იგივე აინტერესებს, და უკვე ერთ-ერთი ხარ მათგან.

## ფიდები მასშტაბისთვისაა შექმნილი

საჯარო ფიდი იმისთვისაა შექმნილი, რომ რაც შეიძლება მეტი პოსტი რაც შეიძლება მეტ ადამიანამდე მივიდეს. ეს კარგად მუშაობს სიახლეებისთვის. მაგრამ ცუდად მუშაობს იმ ადამიანის გასაცნობად, ვისაც რეალურად კვლავ შეხვდები, რადგან სქროლვა იოლი დასაწყებია, თუმცა რთულია მისგან საუბარი გამოვიდეს.

## მცირე ჯგუფი დინამიკას ცვლის

მცირე ჯგუფში ყველა ჩანს და ყველა საუბრობს. ბრბოში ვერავინ დაიმალება და არავის უწევს აუდიტორიისთვის თამაში. ნდობას ზრდისთვის სივრცე აქვს, რადგან საუბარს განვითარება შეუძლია.

> ყველა სივრცე შენს განზრახვაზეა მორგებული.

## რით განსხვავდება SEE

SEE არ გაძლევს ფიდს სასქროლად. პროფილის შექმნის შემდეგ ის გაერთიანებს პირად მიკრო-ჯგუფში, რომელიც საერთო საფუძველზეა აგებული: ინტერესებზე, ღირებულებებზე, მიზნებსა და უნარებზე.

- საჯარო ფიდებისა და უსასრულო სვაიპის გარეშე.
- მცირე, პირადი ჯგუფები, რომლებიც იმაზეა აგებული, რაც შენ გაქვს საერთო.
- პირველი შეხვედრა ოფლაინში, რეალურ ცხოვრებაში.

## რატომ არის მნიშვნელოვანი პირველი შეხვედრა

ონლაინ საუბარი კარგი დასაწყისია, მაგრამ შეხვედრაზე ხდება ჯგუფი რეალური. SEE-ს ამოცანაა, პირველ მაგიდამდე მიგიყვანოს. ჩაშენებული ფასილიტატორი ჯგუფს ყინულის გატეხაში ეხმარება და დროს ისე შეათანხმებს, რომ ყველას მოერგოს.

## საიდან ვიწყებთ

პირველი მიკრო-ჯგუფები თბილისში იქნება. თუ ეს შენ გეხება, [შემოუერთდი მოლოდინის სიას](/ka#waitlist) და ადგილების გახსნისთანავე გამოგიგზავნით ელწერილს.`,
    },
  },
  {
    slug: 'from-seevrce-to-see',
    publishedAt: '2026-10-07',
    cover: tbilisiEvening,
    coverAlt: {
      en: 'Tbilisi at dusk: the old town and the river, with the Narikala fortress lit up on the hill.',
      ka: 'თბილისი შებინდებისას: ძველი უბანი და მდინარე, გორაკზე განათებული ნარიყალას ციხე.',
    },
    tags: [
      { en: 'Story', ka: 'ისტორია' },
      { en: 'Team', ka: 'გუნდი' },
    ],
    title: {
      en: 'From SEEvrce to SEE',
      ka: 'SEEvrce-დან SEE-მდე',
    },
    excerpt: {
      en: 'SEE did not start with a pitch deck. It started in 2023 at TSU, with small offline spaces we curated by hand. This is how that grew into an app.',
      ka: 'SEE საინვესტიციო პრეზენტაციით არ დაწყებულა. ყველაფერი 2023 წელს თსუ-ში დაიწყო, ხელით შერჩეული მცირე ოფლაინ სივრცეებით. აი, როგორ გადაიზარდა ეს აპლიკაციად.',
    },
    body: {
      en: `SEE did not start with a pitch deck. It began in 2023 at TSU, with a project called SEEvrce.

## The problem we saw

We saw firsthand how hard it was for students and young builders to find their circle. Finding the right people was harder than it should have been.

## SEEvrce: curating by hand

So we started curating small offline spaces ourselves, bringing the right people together by hand. No app, no algorithm: just people choosing who might get along and putting them in the same room.

## Youth Space of Georgia

As the movement grew, it became Youth Space of Georgia, and the community grew into an NGO. Along the way we proved that high-intent matching actually works in the real world.

> Our core team met through those very first meetups.

## Now, SEE

Today we are building the technology to scale that proven model for everyone. You set your intentions, SEE matches you into a private micro-group, and a built-in facilitator helps you meet offline.

## What stays the same

The app is new, but the idea is the one we started with: small, curated groups that meet in real life. Everything we build has to serve that.`,
      ka: `SEE საინვესტიციო პრეზენტაციით არ დაწყებულა. ყველაფერი 2023 წელს, თსუ-ში, პროექტით SEEvrce დაიწყო.

## პრობლემა, რომელიც ვნახეთ

საკუთარ თავზე ვნახეთ, რამდენად რთულია სტუდენტებისა და ახალგაზრდა შემქმნელებისთვის თავიანთი წრის პოვნა. სწორი ადამიანების პოვნა უფრო რთული იყო, ვიდრე უნდა ყოფილიყო.

## SEEvrce: ხელით შერჩევა

ამიტომ თავად დავიწყეთ მცირე ოფლაინ სივრცეების შერჩევა და სწორი ადამიანების ხელით დაკავშირება. აპლიკაციის და ალგორითმის გარეშე: უბრალოდ ადამიანები ირჩევდნენ, ვინ შეიძლება კარგად მოუწყოს ერთმანეთს, და ერთ ოთახში თავს უყრიდნენ.

## საქართველოს ახალგაზრდული სივრცე

როცა მოძრაობა გაიზარდა, ის გახდა „საქართველოს ახალგაზრდული სივრცე“ (Youth Space of Georgia), თემი კი არასამთავრობო ორგანიზაციად ჩამოყალიბდა. გზაში დავამტკიცეთ, რომ მიზანმიმართული შერჩევა რეალურ სამყაროშიც მუშაობს.

> ჩვენი ძირითადი გუნდი სწორედ იმ პირველ შეხვედრებზე გავიცანით ერთმანეთი.

## ახლა კი — SEE

დღეს ვქმნით ტექნოლოგიას, რომ ეს ნაცადი მოდელი ყველასთვის ხელმისაწვდომი გავხადოთ. შენ განსაზღვრავ შენს განზრახვას, SEE პირად მიკრო-ჯგუფში გაგაერთიანებს, ჩაშენებული ფასილიტატორი კი ოფლაინ შეხვედრაში დაგეხმარება.

## რა რჩება უცვლელი

აპლიკაცია ახალია, მაგრამ იდეა იგივეა, რითაც დავიწყეთ: მცირე, შერჩეული ჯგუფები, რომლებიც რეალურ ცხოვრებაში ხვდებიან. ყველაფერი, რასაც ვაშენებთ, ამას უნდა ემსახურებოდეს.`,
    },
  },
  {
    slug: 'friends-or-a-team',
    publishedAt: '2026-09-30',
    cover: studentsAtLaptop,
    coverAlt: {
      en: 'A group of students gathered around a laptop in a lecture hall, looking at the screen together.',
      ka: 'სტუდენტების ჯგუფი ლექციების დარბაზში ლეპტოპის გარშემო შეკრებილა და ერთად უყურებს ეკრანს.',
    },
    tags: [
      { en: 'How it works', ka: 'როგორ მუშაობს' },
      { en: 'Intentions', ka: 'განზრახვები' },
    ],
    title: {
      en: 'Friends or a team? Start with your intention',
      ka: 'მეგობრები თუ გუნდი? დაიწყე შენი განზრახვით',
    },
    excerpt: {
      en: 'Every Space in SEE begins with what you are looking for. Here is how choosing an intention shapes the group you are matched with, from profile to first meetup.',
      ka: 'SEE-ში ყველა სივრცე იმით იწყება, რასაც ეძებ. აი, როგორ აყალიბებს განზრახვის არჩევა ჯგუფს, რომელშიც ხვდები — პროფილიდან პირველ შეხვედრამდე.',
    },
    body: {
      en: `People join SEE for different reasons. Some want someone to talk to over coffee. Others want a co-founder. Before anything else, SEE asks which one you are.

## Two intentions, one or both

You can choose one intention or select both.

- **Find friends:** people for genuine conversation, shared interests and new experiences.
- **Build your team:** collaborators, startup teammates, mentors and people growing in similar directions.

Every Space is tailored to the intention you pick, so a group formed around friendship does not feel like a networking event, and a group formed around a project does not drift into small talk.

## Step 1: create a profile and set your intentions

Share your goals, skills and interests. You might be looking for co-founders, project collaborators, study partners or new friends. The more honestly you describe what you are after, the better the match can be.

## Step 2: get matched into a micro-group

Skip endless swiping and public feeds. SEE matches you into a private, high-alignment micro-group built around shared ground.

## Step 3: break the ice and meet offline

A built-in smart facilitator breaks the ice, coordinates the group's availability and organizes your first real-world meetup. The aim is lasting social capital: people you know, not just people you follow.

## Ready to start?

The first micro-groups will open in Tbilisi. [Join the waitlist](/en#waitlist) to get priority access.`,
      ka: `ადამიანები SEE-ს სხვადასხვა მიზეზით უერთდებიან. ზოგს ყავაზე სასაუბრო ადამიანი სჭირდება. ზოგს — თანადამფუძნებელი. SEE ყველაფერზე ადრე გეკითხება, რომელი ხარ შენ.

## ორი განზრახვა — ერთი ან ორივე

შეგიძლია აირჩიო ერთი განზრახვა ან ორივე.

- **იპოვე მეგობრები:** ადამიანები გულწრფელი საუბრებისთვის, საერთო ინტერესებისა და ახალი გამოცდილებისთვის.
- **ააწყვე შენი გუნდი:** თანამოაზრეები, სტარტაპის თანაგუნდელები, მენტორები და ადამიანები, რომლებიც მსგავსი მიმართულებით ვითარდებიან.

ყველა სივრცე შენს არჩეულ განზრახვაზეა მორგებული. ამიტომ მეგობრობაზე აგებული ჯგუფი ნეთვორქინგის ღონისძიებას არ ჰგავს, პროექტზე აგებული ჯგუფი კი ზერელე საუბარში არ იკარგება.

## ნაბიჯი 1: შექმენი პროფილი და განსაზღვრე განზრახვა

გაგვიზიარე შენი მიზნები, უნარები და ინტერესები. შეიძლება ეძებ თანადამფუძნებელს, პროექტის პარტნიორს, სასწავლო მეწყვილეს ან ახალ მეგობრებს. რაც უფრო გულწრფელად აღწერ, რასაც ეძებ, მით უკეთესი შეიძლება იყოს შერჩევა.

## ნაბიჯი 2: შეუერთდი მიკრო-ჯგუფს

უსასრულო სვაიპისა და საჯარო ფიდების გარეშე. SEE პირად, მაღალი თავსებადობის მიკრო-ჯგუფში გაგაერთიანებს, რომელიც საერთო საფუძველზეა აგებული.

## ნაბიჯი 3: გატეხე ყინული და შეხვდით ოფლაინში

ჩაშენებული ჭკვიანი ფასილიტატორი გატეხავს ყინულს, შეათანხმებს ჯგუფის დროს და მოაწყობს თქვენს პირველ რეალურ შეხვედრას. მიზანი ხანგრძლივი სოციალური კაპიტალია: ადამიანები, ვისაც იცნობ, და არა მხოლოდ ისინი, ვისაც მიჰყვები.

## მზად ხარ დასაწყებად?

პირველი მიკრო-ჯგუფები თბილისში გაიხსნება. [შემოუერთდი მოლოდინის სიას](/ka#waitlist) და მიიღე პრიორიტეტული წვდომა.`,
    },
  },
  {
    slug: 'first-meetup',
    publishedAt: '2026-09-23',
    cover: cafeConversation,
    coverAlt: {
      en: 'Four people laughing and talking at a wooden cafe table with coffee and a laptop.',
      ka: 'ოთხი ადამიანი იცინის და საუბრობს ყავახანის ხის მაგიდასთან, მაგიდაზე ყავა და ლეპტოპია.',
    },
    tags: [
      { en: 'How it works', ka: 'როგორ მუშაობს' },
      { en: 'Community', ka: 'თემი' },
    ],
    title: {
      en: 'What happens at your first SEE meetup',
      ka: 'რა ხდება SEE-ს პირველ შეხვედრაზე',
    },
    excerpt: {
      en: 'You have been matched into a micro-group. Now what? A look at how SEE helps a group go from names on a screen to a real conversation.',
      ka: 'მიკრო-ჯგუფში უკვე მოხვდი. ახლა რა? აი, როგორ ეხმარება SEE ჯგუფს ეკრანზე დაწერილი სახელებიდან რეალურ საუბრამდე მიღწევაში.',
    },
    body: {
      en: `Being matched is only the start. The point of SEE is the moment a group sits down together.

## Before you meet

Picking a time is where many plans quietly die. In SEE, a built-in smart facilitator coordinates the group's availability, so nobody has to chase a long chat thread to find a day that works for everyone.

## Breaking the ice

The first few minutes of any meeting are the awkward ones. The facilitator is there to break the ice, so the group does not begin from silence. You show up knowing why you are all in the same room.

## Why a small group makes it easier

A micro-group is small and built around shared ground. You do not have to introduce yourself to a crowd, and you already have something in common with every person at the table.

## What comes after

The goal is not a single good evening. It is lasting social capital: people you know and can call on, and who can call on you. What the group does next is up to the group.

Ready for a first meetup of your own? [Join the waitlist](/en#waitlist) and we will let you know when the first spots open.`,
      ka: `მიკრო-ჯგუფში მოხვედრა მხოლოდ დასაწყისია. SEE-ს არსი ის წამია, როცა ჯგუფი ერთად ჯდება მაგიდასთან.

## შეხვედრამდე

დროის არჩევისას ბევრი გეგმა უჩუმრად ჩაიშლება. SEE-ში ჩაშენებული ჭკვიანი ფასილიტატორი ჯგუფის თავისუფალ დროს ათანხმებს, ამიტომ არავის უწევს გრძელ ჩატში იმ დღის ძებნა, რომელიც ყველას მოერგება.

## ყინულის გატეხვა

ნებისმიერი შეხვედრის პირველი წუთები ყველაზე უხერხულია. ფასილიტატორი სწორედ ყინულის გასატეხადაა, რათა ჯგუფი დუმილით არ დაიწყოს. შეხვედრაზე იმის ცოდნით მიდიხარ, რომ ყველა იმავე მიზეზით შეიკრიბა.

## რატომ ხდის მცირე ჯგუფი ყველაფერს იოლს

მიკრო-ჯგუფი პატარაა და საერთო საფუძველზეა აგებული. ბრბოს წინაშე წარდგენა არ გიწევს და მაგიდასთან მჯდომ ყველა ადამიანთან უკვე გაქვს რაღაც საერთო.

## შემდეგ რა ხდება

მიზანი ერთი კარგი საღამო არ არის. მიზანი ხანგრძლივი სოციალური კაპიტალია: ადამიანები, ვისაც იცნობ, ვისაც შეგიძლია დაეყრდნო და ვისაც შენც შეუძლია დაგეყრდნოს. რას გააკეთებს ჯგუფი შემდეგ, თავად ჯგუფის გადასაწყვეტია.

მზად ხარ შენი პირველი შეხვედრისთვის? [შემოუერთდი მოლოდინის სიას](/ka#waitlist) და პირველი ადგილების გახსნისას შეგატყობინებთ.`,
    },
  },
  {
    slug: 'study-partner-or-co-founder',
    publishedAt: '2026-09-16',
    cover: studyPartners,
    coverAlt: {
      en: 'Two students sitting side by side at a table, looking at a laptop and talking.',
      ka: 'ორი სტუდენტი გვერდიგვერდ ზის მაგიდასთან, უყურებენ ლეპტოპს და საუბრობენ.',
    },
    tags: [
      { en: 'Intentions', ka: 'განზრახვები' },
      { en: 'Guide', ka: 'გზამკვლევი' },
    ],
    title: {
      en: 'Looking for a study partner or a co-founder?',
      ka: 'ეძებ სასწავლო მეწყვილეს ან თანადამფუძნებელს?',
    },
    excerpt: {
      en: 'The right person for a project or an exam is rarely the first one you meet. How to describe what you are after so SEE can match you well.',
      ka: 'პროექტისთვის ან გამოცდისთვის სწორი ადამიანი იშვიათად არის პირველი, ვისაც შეხვდები. როგორ აღწერო, რასაც ეძებ, რომ SEE-მ კარგად შეგარჩიოს.',
    },
    body: {
      en: `A co-founder, a project collaborator, a study partner: these are some of the people SEE members look for. They have one thing in common. Each of them is easier to find when you can say clearly what you want.

## Start with the intention

SEE's **Build your team** intention is for meeting collaborators, startup teammates, mentors and people growing in similar directions. If you are after friends, choose **Find friends** instead, or select both. Every Space is tailored to what you pick.

## Say what you are building or learning

"Interested in tech" is hard to match on. "Want to build a mobile app for students" or "preparing for the same exam" gives a group something to stand on. The more specific your goal, the easier it is to land in a group that shares it.

## Say what you can offer

A good team is not a group of copies. Share your skills as well as your goals, so SEE can bring together people whose strengths fit together.

## Stay open to the group

In a micro-group you meet several people at once, not one. You may find your partner at the table, or the person who introduces you to them. Either way you leave knowing more people than you came with.

## Where to begin

Create your profile, set your intentions and let the matching do the first step. [Join the waitlist](/en#waitlist) to get priority access to the first micro-groups in Tbilisi.`,
      ka: `თანადამფუძნებელი, პროექტის პარტნიორი, სასწავლო მეწყვილე: ესენი ის ადამიანებია, ვისაც SEE-ს წევრები ეძებენ. ერთი რამ აქვთ საერთო: ყველა მათგანის პოვნა უფრო იოლია, როცა გარკვევით შეგიძლია თქვა, რა გინდა.

## დაიწყე განზრახვით

SEE-ს განზრახვა **ააწყვე შენი გუნდი** განკუთვნილია თანამოაზრეების, სტარტაპის თანაგუნდელების, მენტორებისა და მსგავსი მიმართულებით მოძრავი ადამიანების გასაცნობად. თუ მეგობრებს ეძებ, აირჩიე **იპოვე მეგობრები** ან ორივე ერთად. ყველა სივრცე შენს არჩევანზეა მორგებული.

## თქვი, რას აშენებ ან რას სწავლობ

„ტექნოლოგიები მაინტერესებს“ — ამის მიხედვით შერჩევა რთულია. „მინდა სტუდენტებისთვის მობილური აპლიკაცია ავაშენო“ ან „ერთსა და იმავე გამოცდისთვის ვემზადები“ ჯგუფს საყრდენს აძლევს. რაც უფრო კონკრეტულია მიზანი, მით უფრო იოლია იმ ჯგუფში მოხვედრა, რომელსაც ის იზიარებს.

## თქვი, რას სთავაზობ

კარგი გუნდი ერთმანეთის ასლებისგან არ შედგება. გაგვიზიარე უნარებიც და მიზნებიც, რათა SEE-მ ისეთი ადამიანები დააკავშიროს, ვისი ძლიერი მხარეებიც ერთმანეთს ავსებს.

## ღია იყავი ჯგუფის მიმართ

მიკრო-ჯგუფში ერთს კი არა, რამდენიმე ადამიანს ხვდები. შეიძლება შენი პარტნიორი სწორედ მაგიდასთან იპოვო, ან იმ ადამიანი, ვინც მასთან გაგაცნობს. ორივე შემთხვევაში იმაზე მეტ ადამიანს იცნობ, ვიდრე მოსვლისას.

## საიდან დაიწყო

შექმენი პროფილი, განსაზღვრე განზრახვა და პირველი ნაბიჯი შერჩევას მიანდე. [შემოუერთდი მოლოდინის სიას](/ka#waitlist), რათა მიიღო პრიორიტეტული წვდომა თბილისის პირველ მიკრო-ჯგუფებზე.`,
    },
  },
  {
    slug: 'why-tbilisi',
    publishedAt: '2026-09-09',
    cover: tbilisiNight,
    coverAlt: {
      en: 'Tbilisi at night seen from a hill, with the lights of the city stretching into the distance.',
      ka: 'ღამის თბილისი გორაკიდან, ქალაქის განათებული შუქები შორს მიიწევს.',
    },
    tags: [
      { en: 'Story', ka: 'ისტორია' },
      { en: 'Tbilisi', ka: 'თბილისი' },
    ],
    title: {
      en: 'Why SEE starts in Tbilisi',
      ka: 'რატომ იწყება SEE თბილისში',
    },
    excerpt: {
      en: 'Our first meetups happened here, our team is based here and our first micro-groups will form here. Why we are starting small, and starting at home.',
      ka: 'ჩვენი პირველი შეხვედრები აქ გაიმართა, ჩვენი გუნდი აქ არის და პირველი მიკრო-ჯგუფებიც აქ ჩამოყალიბდება. რატომ ვიწყებთ პატარად და საკუთარ სახლში.',
    },
    body: {
      en: `SEE did not begin in a distant market. It began in Tbilisi.

## It started here

Our story starts in 2023 at TSU, where we curated small offline spaces by hand under the name SEEvrce. The movement grew into Youth Space of Georgia, and our core team met through those very first meetups. The idea has always been tied to this city and the people in it.

## Starting at home

The first SEE micro-groups will form in Tbilisi. We know the community, we know where people meet, and we can be present at the first gatherings ourselves. That matters for a product whose whole point is people meeting in real life.

## A limited first cohort

Spots in the first cohort are limited. Joining the waitlist gives you priority access when they open. Keeping the first groups small lets us pay attention to every one of them, which is exactly what SEE is about.

## What comes next

We are building the technology to take a model that already works offline and make it available to everyone. We will share more as it takes shape.

If you are in Tbilisi and want to be among the first, [join the waitlist](/en#waitlist).`,
      ka: `SEE შორეულ ბაზარზე არ დაწყებულა. ის თბილისში დაიწყო.

## აქ დაიწყო

ჩვენი ისტორია 2023 წელს, თსუ-ში იწყება, სადაც SEEvrce-ის სახელით ხელით ვარჩევდით მცირე ოფლაინ სივრცეებს. მოძრაობა გაიზარდა და „საქართველოს ახალგაზრდულ სივრცედ“ (Youth Space of Georgia) იქცა, ჩვენი ძირითადი გუნდი კი სწორედ იმ პირველ შეხვედრებზე გავიცანით ერთმანეთი. იდეა ყოველთვის ამ ქალაქთან და მის ადამიანებთან იყო დაკავშირებული.

## ვიწყებთ სახლიდან

SEE-ს პირველი მიკრო-ჯგუფები თბილისში ჩამოყალიბდება. ვიცნობთ თემს, ვიცით, სად ხვდებიან ადამიანები, და პირველ შეკრებებზე თავადაც შეგვიძლია ვიყოთ. ეს მნიშვნელოვანია პროდუქტისთვის, რომლის მთელი არსი ადამიანების რეალურ შეხვედრაშია.

## შეზღუდული პირველი ნაკადი

პირველი ნაკადის ადგილები შეზღუდულია. მოლოდინის სიაში შესვლა პრიორიტეტულ წვდომას გაძლევს ადგილების გახსნისას. პირველი ჯგუფების მცირედ დატოვება საშუალებას გვაძლევს, თითოეულს ყურადღება მივაქციოთ — და სწორედ ეს არის SEE.

## რა იქნება შემდეგ

ვქმნით ტექნოლოგიას, რომ ოფლაინში უკვე მოქმედი მოდელი ყველასთვის ხელმისაწვდომი გავხადოთ. მეტს გაგიზიარებთ, როგორც კი ფორმას მიიღებს.

თუ თბილისში ხარ და პირველებს შორის გინდა იყო, [შემოუერთდი მოლოდინის სიას](/ka#waitlist).`,
    },
  },
  {
    slug: 'social-capital',
    publishedAt: '2026-09-02',
    cover: teamAtScreen,
    coverAlt: {
      en: 'Four colleagues gathered around a computer screen in a bright workspace, one of them pointing at it.',
      ka: 'ოთხი კოლეგა კომპიუტერის ეკრანთან შეკრებილა ნათელ სამუშაო სივრცეში, ერთი მათგანი ეკრანზე მიუთითებს.',
    },
    tags: [
      { en: 'Product', ka: 'პროდუქტი' },
      { en: 'Ideas', ka: 'იდეები' },
    ],
    title: {
      en: 'Social capital, in plain words',
      ka: 'სოციალური კაპიტალი მარტივი სიტყვებით',
    },
    excerpt: {
      en: 'SEE turns shared interests, values, goals and skills into social capital. What does that mean, and why does it matter more than a follower count?',
      ka: 'SEE საერთო ინტერესებს, ღირებულებებს, მიზნებსა და უნარებს სოციალურ კაპიტალად აქცევს. რას ნიშნავს ეს და რატომაა ის მნიშვნელოვანი მეტად, ვიდრე მიმდევრების რაოდენობა?',
    },
    body: {
      en: `We say it a lot: SEE turns shared interests, values, goals and skills into social capital. Here is what we mean.

## What social capital is

Social capital is the value that comes from the people you know and trust. It is the friend who tells you about an opportunity, the teammate you can ask for help, the mentor who answers your message. You cannot buy it, and you cannot collect it by following accounts.

## Why a follower count is not the same thing

A large audience is not a network of people who know you. Social capital grows through repeated, real contact with people who have something in common with you. That is slower than gaining followers, and it lasts far longer.

## The ingredients

SEE starts from four things that tend to bring people together:

- shared interests
- shared values
- shared goals
- complementary skills

## How SEE builds it

We match you into a private micro-group around that common ground, then help the group meet offline. A small group gives each person room to be known, and a real meeting is where trust starts.

> Skip endless swiping and public feeds.

## The measure we care about

Not how many people saw your profile, but how many people you now know well enough to ask for help. That is the capital SEE wants to build for you.

Want to start building yours? [Join the waitlist](/en#waitlist).`,
      ka: `ხშირად ვამბობთ: SEE საერთო ინტერესებს, ღირებულებებს, მიზნებსა და უნარებს სოციალურ კაპიტალად აქცევს. აი, რას ვგულისხმობთ.

## რა არის სოციალური კაპიტალი

სოციალური კაპიტალი ის ღირებულებაა, რომელიც იმ ადამიანებისგან მოდის, ვისაც იცნობ და ენდობი. ეს არის მეგობარი, რომელიც შესაძლებლობაზე გეუბნება, თანაგუნდელი, ვისაც დახმარებას სთხოვ, მენტორი, რომელიც შენს შეტყობინებას პასუხობს. მის ყიდვას ვერ შეძლებ და ანგარიშებზე გამოწერით ვერ დაგროვებ.

## რატომ არ არის მიმდევრების რაოდენობა იგივე

დიდი აუდიტორია იმ ადამიანების ქსელი არ არის, ვინც გიცნობს. სოციალური კაპიტალი იზრდება განმეორებითი, რეალური კონტაქტით იმ ადამიანებთან, ვისთანაც რაღაც გაქვს საერთო. ეს მიმდევრების მოგროვებაზე ნელია, მაგრამ გაცილებით დიდხანს რჩება.

## ინგრედიენტები

SEE ოთხი რამიდან იწყებს, რაც ადამიანებს ერთმანეთთან აახლოებს:

- საერთო ინტერესები
- საერთო ღირებულებები
- საერთო მიზნები
- ერთმანეთის შემავსებელი უნარები

## როგორ აშენებს მას SEE

ამ საერთო საფუძველზე პირად მიკრო-ჯგუფში გაერთიანებთ და შემდეგ ჯგუფს ოფლაინ შეხვედრაში ვეხმარებით. მცირე ჯგუფი თითოეულს აძლევს სივრცეს, რომ გაიცნონ, რეალური შეხვედრა კი ნდობის დასაწყისია.

> უსასრულო სვაიპისა და საჯარო ფიდების გარეშე.

## საზომი, რომელიც გვაინტერესებს

არა ის, რამდენმა ადამიანმა ნახა შენი პროფილი, არამედ ის, რამდენ ადამიანს იცნობ საკმარისად კარგად, რომ დახმარება სთხოვო. სწორედ ეს კაპიტალია, რომლის აშენებაც SEE-ს შენთვის სურს.

გინდა შენი სოციალური კაპიტალის აშენება დაიწყო? [შემოუერთდი მოლოდინის სიას](/ka#waitlist).`,
    },
  },
];
