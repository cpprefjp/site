# tolower
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
charT
  tolower(charT c) const;           // (1) C++98

const charT*
  tolower(charT* low,
          const charT* high) const; // (2) C++98
```

## 概要
小文字に変換する。

- (1) : 文字`c`を小文字に変換する
- (2) : 範囲`[low, high)`の各文字を小文字に変換する


## 戻り値
- (1) : [`do_tolower(c)`](do_tolower.md)
- (2) : [`do_tolower(low, high)`](do_tolower.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <string>

int main()
{
  const auto& ct = std::use_facet<std::ctype<char>>(std::locale::classic());

  // (1)
  std::cout << ct.tolower('A') << std::endl;

  // (2)
  std::string s = "ABC";
  ct.tolower(&s[0], &s[0] + s.size());
  std::cout << s << std::endl;
}
```
* tolower[color ff0000]
* std::ctype[link /reference/locale/ctype.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
a
abc
```

## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::do_tolower`](do_tolower.md)
- [`ctype::toupper`](toupper.md)
