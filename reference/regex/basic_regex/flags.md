# flags
* regex[meta header]
* std[meta namespace]
* basic_regex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
flag_type flags() const;
```

## 概要
最後に�定された�規表現フラグを返す。


## 戻り値
最後に�定された�規表現フラグ


## 備考
`flag_type` は [`regex_constants::syntax_option_type`](../regex_constants/syntax_option_type.md) の別名である。


## 例
```cpp example
#include <iostream>
#include <regex>

# define PRINTFLAG(f, FLAG) (std::cout << #FLAG " is " << (f & std::regex_constants::FLAG ? "set" : "n

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
* flags[color ff0000]
* std::regex_constants::syntax_option_type[link ../regex_constants/syntax_option_type.md]
* std::regex_constants::icase[link ../regex_constants/syntax_option_type.md]
* std::regex_constants::optimize[link ../regex_constants/syntax_option_type.md]

### 出力
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


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
