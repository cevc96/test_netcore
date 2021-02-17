using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnetApi.Controllers
{
    public class OrderRange
    {
        public static void /*int[,]*/ build(int[] numbers) {

            //int[] numbers   = {2,1,4,5};
            Array.Sort(numbers);
            int[] pair_arry    = {};
            List<int> listPair = new List<int>();
            int[] odd_arry     = {};
            List<int> listOdd  = new List<int>();
            for(int i = 0; i < numbers.Length; i++) {
                if(numbers[i]%2 == 0) {
                    listPair.Add(numbers[i]);
                } else {
                    listOdd.Add(numbers[i]);
                }
            }
            pair_arry       = listPair.ToArray();
            odd_arry        = listOdd.ToArray();
            int index_pair = Array.Find(pair_arry, num => num == numbers[0]);
            int index_odd  = Array.Find(odd_arry, num => num == numbers[0]);
            /*if(index_pair == -1) {
                int[,] a = { index_odd, index_pair };
                int d = new[]
                    {
                        new[] index_odd,
                        new[] index_pair
                    };
                return d;
            }*/
            //return index_pair == -1 ? {index_odd, index_pair} : {index_pair, index_odd};
            return;
        }
    }
}
