# get
* locale[meta header]
* std[meta namespace]
* num_get[meta class]
* function[meta id-type]

```cpp
public:
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, bool& val) const;               // (1)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, long& val) const;               // (2)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, long long& val) const;          // (3)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, unsigned short& val) const;     // (4)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, unsigned int& val) const;       // (5)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, unsigned long& val) const;      // (6)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, unsigned long long& val) const; // (7)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, float& val) const;              // (8)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, double& val) const;             // (9)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, long double& val) const;        // (10)
  iter_type get(iter_type in, iter_type end, ios_base& str,
                ios_base::iostate& err, void*& val) const;              // (11)
```
* ios_base[link /reference/ios/ios_base.md]
* ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]

## 概要
入力イテレータ範囲`[in, end)`から文字列を読み取り、`val`の型に応じた数値・真偽値・ポインタへ変換する。

- (1) : `bool`へ変換する
- (2), (3) : 符号付き整数型 (`long`, `long long`) へ変換する
- (4), (5), (6), (7) : 符号なし整数型 (`unsigned short`, `unsigned int`, `unsigned long`, `unsigned long long`) へ変換する
- (8), (9), (10) : 浮動小数点数型 (`float`, `double`, `long double`) へ変換する
- (11) : ポインタ (`void*`) へ変換する


## 効果
- (1)〜(11) : [`do_get`](do_get.md)`(in, end, str, err, val)`を呼び出す


## 戻り値
- (1)〜(11) : [`do_get`](do_get.md)`(in, end, str, err, val)`の戻り値。読み取りに使用しなかった最初の文字を指すイテレータとなる


## 例
```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>

int main()
{
  std::istringstream iss{"42"};
  auto& facet = std::use_facet<std::num_get<char>>(iss.getloc());

  long value = 0;
  std::ios_base::iostate err = std::ios_base::goodbit;
  std::istreambuf_iterator<char> begin{iss}, end{};

  facet.get(begin, end, iss, err, value);

  std::cout << value << std::endl;
}
```
* std::num_get[link /reference/locale/num_get.md]
* std::use_facet[link /reference/locale/use_facet.md]
* get[color ff0000]
* std::ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::goodbit[link /reference/ios/ios_base/type-iostate.md]
* std::istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]

### 出力
```
42
```


## バージョン
### 言語
- C++98


## 関連項目
- [`num_get::do_get`](do_get.md)
- [`numpunct`](/reference/locale/numpunct.md)
