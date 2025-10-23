import createNextIntlPlugin from "next-intl/plugin";

/** @type { import('next').NextConfig } */
const NextConfig = {
  images: {
    unoptimized: true,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(NextConfig);
