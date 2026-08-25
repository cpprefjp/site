# put
* locale[meta header]
* std[meta namespace]
* num_put[meta class]
* function[meta id-type]

```cpp
public:
  iter_type put(iter_type out, ios_base& str, char_type fill, bool val) const;               // (1) C++98
  iter_type put(iter_type out, ios_base& str, char_type fill, long val) const;               // (2) C++98
  iter_type put(iter_type out, ios_base& str, char_type fill, long long val) const;          // (3) C++11
  iter_type put(iter_type out, ios_base& str, char_type fill, unsigned long val) const;      // (4) C++98
  iter_type put(iter_type out, ios_base& str, char_type fill, unsigned long long val) const; // (5) C++11
  iter_type put(iter_type out, ios_base& str, char_type fill, double val) const;             // (6) C++98
  iter_type put(iter_type out, ios_base& str, char_type fill, long double val) const;        // (7) C++98
  iter_type put(iter_type out, ios_base& str, char_type fill, const void* val) const;        // (8) C++98
```
* ios_base[link /reference/ios/ios_base.md]

## 概要
数値・真偽値・ポインタを書式化して、出力イテレータ`out`へ出力する。

- (1) : `bool`を出力する
- (2), (3) : 符号付き整数型 (`long`, `long long`) を出力する
- (4), (5) : 符号なし整数型 (`unsigned long`, `unsigned long long`) を出力する
- (6), (7) : 浮動小数点数型 (`double`, `long double`) を出力する
- (8) : ポインタ (`const void*`) を出力する

`fill`は、`str.`[`width()`](/reference/ios/ios_base/width.md)による幅指定を満たすために使用される埋め文字である。


## 戻り値
- (1)〜(8) : [`do_put(out, str, fill, val)`](do_put.md)の戻り値


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>

int main()
{
  std::ostringstream oss;
  const auto& facet = std::use_facet<std::num_put<char>>(oss.getloc());

  facet.put(std::ostreambuf_iterator<char>{oss}, oss, ' ', 42L);
  oss << ' ';
  facet.put(std::ostreambuf_iterator<char>{oss}, oss, ' ', 3.14);

  std::cout << oss.str() << std::endl;
}
```
* std::num_put[link /reference/locale/num_put.md]
* put[color ff0000]
* std::use_facet[link /reference/locale/use_facet.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]

### 出力
```
42 3.14
```

## バージョン
### 言語
- C++98


## 関連項目
- [`num_put::do_put`](do_put.md)
- [`num_get`](/reference/locale/num_get.md)
- [`numpunct`](/reference/locale/numpunct.md)
