# widen
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
charT
  widen(char c) const;     // (1) C++98

const char*
  widen(const char* low,
        const char* high,
        charT* to) const;  // (2) C++98
```

## 概要
指定された`char`型の文字に該当する`charT`型の文字を取得する。

- (1) : 文字`c`を`charT`型へ変換する
- (2) : 範囲`[low, high)`の各文字を`charT`型へ変換し、`to`が指す領域へ格納する


## 戻り値
- (1) : [`do_widen(c)`](do_widen.md)
- (2) : [`do_widen(low, high, to)`](do_widen.md)


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& ct = std::use_facet<std::ctype<wchar_t>>(std::locale::classic());

  // (1)
  std::wcout << ct.widen('a') << std::endl;

  // (2)
  const char s[] = "abc";
  wchar_t buf[4] = {};
  ct.widen(s, s + 3, buf);

  std::wcout << buf << std::endl;
}
```
* widen[color ff0000]
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
- [`ctype::do_widen`](do_widen.md)
- [`ctype::narrow`](narrow.md)
