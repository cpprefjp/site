# scan_is
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
const charT* scan_is(mask m, const charT* low, const charT* high) const; // (1) C++98
```
* mask[link /reference/locale/ctype_base.md]

## 概要
文字列中の、指定した分類に該当する最初の文字を取得する。


## 戻り値
[`do_scan_is(m, low, high)`](do_scan_is.md)


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& ct = std::use_facet<std::ctype<char>>(std::locale::classic());

  const char s[] = "ab1c";

  // 最初の数字の位置を得る
  const char* p = ct.scan_is(std::ctype_base::digit, s, s + 4);

  std::cout << (p - s) << std::endl;
}
```
* scan_is[color ff0000]
* std::ctype[link /reference/locale/ctype.md]
* std::ctype_base::digit[link /reference/locale/ctype_base.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
2
```

## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::do_scan_is`](do_scan_is.md)
- [`ctype::scan_not`](scan_not.md)
