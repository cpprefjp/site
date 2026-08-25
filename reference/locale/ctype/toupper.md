# toupper
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
charT
  toupper(charT c) const;           // (1) C++98
const charT*
  toupper(charT* low,
          const charT* high) const; // (2) C++98
```

## 概要
大文字に変換する。

- (1) : 文字`c`を大文字に変換する
- (2) : 範囲`[low, high)`の各文字を大文字に変換する


## 戻り値
- (1) : [`do_toupper(c)`](do_toupper.md)
- (2) : [`do_toupper(low, high)`](do_toupper.md)


## 例
```cpp example
#include <iostream>
#include <locale>
#include <string>

int main()
{
  const auto& ct = std::use_facet<std::ctype<char>>(std::locale::classic());

  // (1)
  std::cout << ct.toupper('a') << std::endl;

  // (2)
  std::string s = "abc";
  ct.toupper(&s[0], &s[0] + s.size());
  std::cout << s << std::endl;
}
```
* toupper[color ff0000]
* std::ctype[link /reference/locale/ctype.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
A
ABC
```

## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::do_toupper`](do_toupper.md)
- [`ctype::tolower`](tolower.md)
