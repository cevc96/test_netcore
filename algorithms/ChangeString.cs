using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace dotnetApi.Controllers
{
    public class ChangeString
    {
        public string build(string word) {

            char[] word_split = word.ToCharArray();
            string[] array_letters  = {"a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"};
            for(int key = 0; key < word_split.Length; key++) {
                int find_index = Array.FindIndex(array_letters, letter => letter == word_split[key].ToString().ToLower());
                
                if(find_index != -1) {
                    Boolean isLower     = Char.IsLower(word_split[key]);
                    string newCharacter = !isLower ? array_letters[find_index+1].ToString().ToUpper() : array_letters[find_index+1].ToString();
                    word_split[key]     = newCharacter.ToCharArray()[0];
                }
            }
            return new string(word_split);
        }
    }
}
