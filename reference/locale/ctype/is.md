# is
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
bool
  is(mask m, charT c) const; // (1) C++98

const charT*
  is(const charT* low,
     const charT* high,
     mask* vec) const;       // (2) C++98
```
* mask[link /reference/locale/ctype_base.md]

## 概要
文字の分類を判定する。

- (1) : 文字`c`が分類`m`に該当するかを判定する
- (2) : 範囲`[low, high)`の各文字の分類を`vec`へ格納する


## 戻り値
- (1) : [`do_is(m, c)`](do_is.md)
- (2) : [`do_is(low, high, vec)`](do_is.md)


## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& ct = std::use_facet<std::ctype<char>>(std::locale::classic());

  std::cout << std::boolalpha;

  // (1)
  std::cout << ct.is(std::ctype_base::digit, '5') << std::endl;
  std::cout << ct.is(std::ctype_base::alpha, '5') << std::endl;

  // (2)
  const char s[] = "a1";
  std::ctype_base::mask vec[2] = {};
  ct.is(s, s + 2, vec);

  std::cout << ((vec[0] & std::ctype_base::alpha) != 0) << std::endl;
  std::cout << ((vec[1] & std::ctype_base::digit) != 0) << std::endl;
}
```
* is[color ff0000]
* std::ctype[link /reference/locale/ctype.md]
* std::ctype_base::digit[link /reference/locale/ctype_base.md]
* std::ctype_base::alpha[link /reference/locale/ctype_base.md]
* std::ctype_base::mask[link /reference/locale/ctype_base.md]
* std::use_facet[link /reference/locale/use_facet.md]
* std::locale::classic()[link /reference/locale/locale/classic.md]

### 出力
```
true
false
true
true
```

## バージョン
### 言語
- C++98


## 関連項目
- [`ctype::do_is`](do_is.md)
- [`ctype_base`](/reference/locale/ctype_base.md)
- [`ctype::scan_is`](scan_is.md)
