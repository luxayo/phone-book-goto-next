
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://wpe-hiring.tokopedia.net/graphql",
  documents: "src/api/**/*.ts",
  generates: {
    "src/api/generated.ts": {
      plugins: ['typescript',
      'typescript-operations',
      'typescript-react-apollo']
    }
  }
};

export default config;
