import { sleep } from "../sleep";
import { DefaultTimeout } from "./constants";

interface BubbleSortProps {
  isOptimized?: boolean;
  arraySize: number;
  dataSetter: React.Dispatch<React.SetStateAction<number[]>>;
}

export const bubbleSort = () => {
  let cancelled = false;

  const sort = async ({
    isOptimized,
    arraySize,
    dataSetter
  }: BubbleSortProps) => {
    cancelled = false;

    for (let i = 0; i < arraySize; i++) {
      if (cancelled){
        break;
      }
  
      const lengthLeft = isOptimized
        ? arraySize - i - 1
        : arraySize;
  
      for (let k = 0; k < lengthLeft; k++) {
        if (cancelled){
          break;
        }
  
        dataSetter(initial => {
          if (initial[k] <= initial[k + 1]) {
            return initial;
          }
  
          const array = [...initial];
          array[k] = initial[k + 1];
          array[k + 1] = initial[k];
  
          return array;
        });
  
        await sleep(DefaultTimeout);
      }
    }
  };

  const cancellationToken = () => {
    cancelled = true;
  };

  return {
    sort,
    cancellationToken,
  };
}

// interface CancellableSortProps<T> {
//   sort
// }

// const cancellableSort = <T,>(props: T) => {
//   let cancelled = false;

//   setTimeout(async () => {
//     for (let i = 0; i < arraySize; i++) {
//       if (cancelled){
//         break;
//       }
  
//       const lengthLeft = isOptimized
//         ? arraySize - i - 1
//         : arraySize;
  
//       for (let k = 0; k < lengthLeft; k++) {
//         if (cancelled){
//           break;
//         }
  
//         dataSetter(initial => {
//           if (initial[k] <= initial[k + 1]) {
//             return initial;
//           }
  
//           const array = [...initial];
//           array[k] = initial[k + 1];
//           array[k + 1] = initial[k];
  
//           return array;
//         });
  
//         await sleep(DefaultTimeout);
//       }
//     }
//   })

//   return () => ({
//     cacellationToken: () => cancelled = true
//   })
// }
