# scan_not
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
const charT* scan_not(mask m, const charT* low, const charT* high) const; // (1) C++98
```
* mask[link /reference/locale/ctype_base.md]

## 概要
文字列中の、指定した分類に該当しない最初の文字を取得する。


## 戻り値
[`do_scan_not(m, low, high)`](do_scan_not.md)


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& ct = std::use_facet<std::ctype<char>>(std::locale::classic());

  const char s[] = "ab1c";

  // 最初の英字ではない文字の位置を得る
  const char* p = ct.scan_not(std::ctype_base::alpha, s, s + 4);

  std::cout << (p - s) << std::endl;
}
```
* scan_not[color ff0000]
* std::ctype[link /reference/locale/ctype.md]
* std::ctype_base::alpha[link /reference/locale/ctype_base.md]
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
- [`ctype::do_scan_not`](do_scan_not.md)
- [`ctype::scan_is`](scan_is.md)
