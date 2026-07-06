import { connectToDatabase } from "@/lib/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

const DEFAULT_POSTS = [
  {
    title: "Introducing ApexManagement: The Offline-First Retail Future",
    slug: "introducing-apexmanagement-offline-first-retail",
    summary: "Discover how we engineered ApexManagement, a 100% offline-first billing terminal with zero-setup configuration, automated ledgers, and seamless WhatsApp integration.",
    content: `
      <p>In the digital age, businesses are heavily reliant on internet connectivity. But what happens when the network goes down? Customer queues stall, billing stops, and revenue is lost. To address this vulnerability, the engineering team at <strong>Apex Horizon</strong> designed and developed <strong>ApexManagement</strong>—the ultimate offline-first retail and billing terminal.</p>
      
      <h3>The Architecture of Independence</h3>
      <p>ApexManagement is built to be 100% independent of external servers. All data, from inventory catalogs to customer billing logs, is saved directly on the client's local system. By designing a custom local JSON-based storage engine, we achieved sub-millisecond query responses. Search-as-you-type in an inventory of 50,000+ items is completely instantaneous.</p>
      
      <h3>Automated CA Ledgers & Reports</h3>
      <p>Accounting is a major hurdle for retail businesses. ApexManagement automates financial record-keeping by generating native Excel (<code>.xlsx</code>) ledgers formatted perfectly for Chartered Accountants (CAs). Utilizing Apache POI, the application constructs high-fidelity spreadsheets including cell formatting, mathematical formulas, and summary sheets directly on the local machine with zero external library overhead.</p>
      
      <h3>Zero-Setup Executable (Native Java & jpackage)</h3>
      <p>One of our primary design directives was eliminating installation friction. Desktop business apps often require complex runtime dependencies, database setups, and environment pathing. We solved this by bundling a fully sandboxed Java runtime directly inside the installer using Launch4j and the native JDK <code>jpackage</code> tool. The user gets a lightweight, single-executable double-click installer. No setup, no configuration, no dependencies.</p>
      
      <h3>The Hybrid WhatsApp Gateway</h3>
      <p>Even though billing is completely offline, customers expect modern digital receipts. We built a background communication bridge that safely triggers WhatsApp messaging API calls when an active network interface is detected. If the system is offline, receipts are queued locally and automatically dispatched the moment connection is restored.</p>
    `,
    author: "Apex Horizon Team",
    coverImage: "/dashboard.png",
    tags: ["ApexManagement", "Offline First", "Retail", "Desktop Apps"],
    readTime: "4 min read",
    published: true,
    publishedAt: new Date("2026-06-15")
  },
  {
    title: "Designing Ultra-Secure Local Databases for Desktop Apps",
    slug: "designing-secure-local-databases-desktop-apps",
    summary: "Why offline billing terminals need robust database schemas, automated backups, and why JSON-based persistence outperforms heavy SQL engines for small-scale retail.",
    content: `
      <p>When developers build local applications, they often default to installing full-blown database systems like PostgreSQL or MySQL. However, for a small business running a billing counter, administering a local SQL instance is a disaster waiting to happen. Services crash, configurations break, and data corruption goes unnoticed.</p>
      
      <h3>Why JSON-Based Storage?</h3>
      <p>For small to medium retail environments, a relational database server is overkill. At Apex Horizon, we designed a lightweight, append-only JSON database system. It keeps the simplicity of human-readable data format, has a zero memory footprint when idle, and can be backed up instantly by copying a single file. Reading data is as simple as parsing file text directly into memory at startup, allowing lightning-fast operations.</p>
      
      <h3>Solving the Reliability Equation</h3>
      <p>An offline database faces unique challenges, such as unexpected power cuts, system crashes, and manual user tampering. To ensure absolute data integrity, we implemented two-phase file commits:
      <ol>
        <li><strong>Atomic Writes:</strong> Data is first written to a temporary copy. Only when the write succeeds is the original file atomically replaced.</li>
        <li><strong>Automatic Local Backups:</strong> The system automatically compresses database states into password-protected zip folders every time the application is closed.</li>
      </ol>
      </p>
      
      <h3>Encryption at Rest</h3>
      <p>Since the database sits directly on the user's hard drive, physical security is paramount. All saved JSON files are encrypted using AES-256 GCM. The key is securely generated and held within the OS-native credentials vault, preventing malicious access to proprietary business logs even if the hard drive is extracted.</p>
    `,
    author: "Apex Horizon Team",
    coverImage: "/apexmanagement.png",
    tags: ["Desktop Apps", "Security", "Architecture", "Databases"],
    readTime: "5 min read",
    published: true,
    publishedAt: new Date("2026-06-28")
  },
  {
    title: "Building Subscription-Ready SaaS: A Next-js and Mongoose Deep Dive",
    slug: "building-subscription-ready-saas-nextjs-mongoose",
    summary: "A step-by-step breakdown of how Apex Horizon builds high-performance, subscription-ready business software with Next.js App Router and Mongoose.",
    content: `
      <p>Modern software development demands speed, reliability, and excellent search engine indexing. For our enterprise clients, we construct SaaS web applications using a stack optimized for both developer velocity and system performance: <strong>Next.js App Router</strong> and <strong>MongoDB/Mongoose</strong>.</p>
      
      <h3>Next.js App Router: The Rendering Shift</h3>
      <p>With Next.js App Router, we leverage React Server Components (RSC) to handle data fetching. In traditional React applications, pages fetch data on the client side, causing loading spinners and delayed SEO indexing. With Server Components:
      <ul>
        <li>Data fetching connects directly to MongoDB from the server, eliminating network latency between the client and API.</li>
        <li>No JavaScript is shipped to the client for rendering, resulting in tiny bundle sizes.</li>
        <li>Search engines receive a fully rendered HTML document, maximizing SEO indexability instantly.</li>
      </ul>
      </p>
      
      <h3>Managing Database Connections in Serverless</h3>
      <p>One common pitfall when integrating Mongoose with Next.js serverless route handlers is connection exhaustion. In standard Express apps, a single database connection runs indefinitely. In serverless environment, handlers boot up and shut down dynamically. We solve this by caching the connection object globally, ensuring subsequent API invocations reuse the established connection pool.</p>
      
      <h3>Dynamic SEO & Meta-Tag Engineering</h3>
      <p>SaaS portals require dynamic metadata for marketing and sharing. Using Next.js <code>generateMetadata</code> function, we dynamically resolve headings, descriptions, and open-graph imagery based on the requested route and document schema, ensuring every page looks outstanding when shared across platforms like Slack, WhatsApp, and Twitter.</p>
    `,
    author: "Apex Horizon Team",
    coverImage: "/emailnexus.png",
    tags: ["SaaS", "Next.js", "Mongoose", "Web Dev"],
    readTime: "6 min read",
    published: true,
    publishedAt: new Date("2026-07-02")
  }
];

export async function GET() {
  try {
    await connectToDatabase();

    // Clean out existing blogs to avoid duplicates on slug index
    await Blog.deleteMany({});

    // Seed default posts
    const seededBlogs = await Blog.insertMany(DEFAULT_POSTS);

    return NextResponse.json(
      {
        message: "Database seeded successfully",
        count: seededBlogs.length,
        blogs: seededBlogs.map(b => ({ title: b.title, slug: b.slug }))
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { message: "Seeding failed", error: error.message || error },
      { status: 500 }
    );
  }
}
