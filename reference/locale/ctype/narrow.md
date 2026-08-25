# narrow
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
char
  narrow(charT c,
         char dfault) const;  // (1) C++98

const charT*
  narrow(const charT* low,
         const charT* high,
         char dfault,
         char* to) const;     // (2) C++98
```

## 概要
指定された`charT`型の文字に該当する`char`型の文字を取得する。

- (1) : 文字`c`を`char`型へ変換する。変換できない場合は`dfault`を返す
- (2) : 範囲`[low, high)`の各文字を`char`型へ変換し、`to`が指す領域へ格納する


## 戻り値
- (1) : [`do_narrow(c, dfault)`](do_narrow.md)
- (2) : [`do_narrow(low, high, dfault, to)`](do_narrow.md)


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& ct = std::use_facet<std::ctype<wchar_t>>(std::locale::classic());

  // (1)
  std::cout << ct.narrow(L'a', '?') << std::endl;

  // (2)
  const wchar_t s[] = L"abc";
  char buf[4] = {};
  ct.narrow(s, s + 3, '?', buf);

  std::cout << buf << std::endl;
}
```
* narrow[color ff0000]
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
- [`ctype::do_narrow`](do_narrow.md)
- [`ctype::widen`](widen.md)
