#flags (C++11)
* regex[meta header]
* std[meta namespace]

```cpp
flag_type flags() const;
```

##概要
最後に設定された正規表現フラグを返す。


##戻り値
最後に設定された正規表現フラグ


##備考
`flag_type` は [`regex_constants`](../regex_constants.md.nolink)`::syntax_option_type` の typedef である。


##例
```cpp
#include <iostream>
#include <regex>

#define PRINTFLAG(f, FLAG) (std::cout << #FLAG " is " << (f & std::regex_constants::FLAG ? "set" : "not set") << std::endl)

void print(std::regex_constants::syntax_option_type f)
{
  PRINTFLAG(f, icase);
  PRINTFLAG(f, nosubs);
  PRINTFLAG(f, optimize);
  PRINTFLAG(f, collate);
  PRINTFLAG(f, ECMAScript);
  PRINTFLAG(f, basic);
  PRINTFLAG(f, extended);
  PRINTFLAG(f, awk);
  PRINTFLAG(f, grep);
  PRINTFLAG(f, egrep);
}

int main()
{
  std::regex re("(\\w+) (\\d+) (\\w+)", std::regex_constants::icase | std::regex_constants::optimize);
  print(re.flags());
}
```
* iostream[link ../../iostream.md]
* regex[link ../../regex.md]
* regex_constants[link ../regex_constants.md.nolink]
* flags[color ff0000]
* cout[link ../../iostream/cout.md]
* endl[link ../../ostream/endl.md]

###出力
```
icase is set
nosubs is not set
optimize is set
collate is not set
ECMAScript is not set
basic is not set
extended is not set
awk is not set
grep is not set
egrep is not set
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
