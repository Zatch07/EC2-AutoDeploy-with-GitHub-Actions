import { assert, Struct, StructError } from "superstruct";
import { DtoAssertionError } from "./customErrors";

interface ICreateDtoParseFnProps<T1, T2> {
  name: string;
  schema: Struct<T1, T2>;
}

export const createDtoAssertionFn = <T1, T2>(props: ICreateDtoParseFnProps<T1, T2>) => {
  const { name, schema } = props;

  return (value: unknown): asserts value is T1 => {
    try {
      assert(value, schema);
    } catch (e: unknown) {
      if (e instanceof StructError) {
        const { refinement } = e;

        /*
          Improves default messages generated by superstruct
        */
        let message = e.message;

        message = message.replace(/ -- /, ` in ${name}. `);

        if (refinement) {
          message = message.replace(
            /value of type `([a-zA-Z]+)`/,
            `value of type \`$1 ${refinement}\``
          );
        }

        throw new DtoAssertionError(message);
      } else {
        throw e;
      }
    }
  };
};
