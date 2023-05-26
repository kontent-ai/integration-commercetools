export type ElementConfig = Readonly<{
  isMultiSelect: boolean;
  commercetools: CommercetoolsConfig;
}>;

type CommercetoolsConfig = {
  defaultCulture: string;
  projectKey: string;
  clientId: string;
  secret: string;
  oauthUrl: string;
  apiUrl: string;
  scope: string;
};

export const isElementConfig = (v: unknown): v is ElementConfig =>
  typeof v === "object"
  && v !== null
  && hasProperty(hasTypeOf("boolean"))(nameOf<ElementConfig>("isMultiSelect"), v)
  && hasProperty(isCommercetoolsConfig)(nameOf<ElementConfig>("commercetools"), v);

const isCommercetoolsConfig = (v: unknown): v is CommercetoolsConfig =>
  typeof v === "object"
  && v !== null
  && hasStringProperty(nameOf<CommercetoolsConfig>("apiUrl"), v)
  && hasStringProperty(nameOf<CommercetoolsConfig>("clientId"), v)
  && hasStringProperty(nameOf<CommercetoolsConfig>("defaultCulture"), v)
  && hasStringProperty(nameOf<CommercetoolsConfig>("scope"), v)
  && hasStringProperty(nameOf<CommercetoolsConfig>("oauthUrl"), v)
  && hasStringProperty(nameOf<CommercetoolsConfig>("secret"), v)
  && hasStringProperty(nameOf<CommercetoolsConfig>("projectKey"), v);

const hasProperty =
  <Prop>(guard: (p: unknown) => p is Prop) =>
  <PropName extends string, In extends object>(name: PropName, v: In): v is In & { [key in PropName]: PropName } =>
    name in v
    && guard((v as Record<string, unknown>)[name]);

type Types = Readonly<{
  string: string;
  boolean: boolean;
}>;
const hasTypeOf = <T extends keyof Types>(t: T) => (v: unknown): v is Types[T] => typeof v === t;

const hasStringProperty = hasProperty(hasTypeOf("string"));

const nameOf = <Shape>(name: keyof Shape) => name;
