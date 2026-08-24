# num_get
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class InputIterator = istreambuf_iterator<charT> >
  class num_get : public locale::facet;
}
```
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
`num_get`は、入力ストリームから数値・真偽値・ポインタを読み取り、解析するためのロケールファセットである。[`basic_istream`](/reference/istream/basic_istream.md)の数値入力演算子[`operator>>`](/reference/istream/basic_istream/op_istream.md)は、このファセットを介して入力の解析を行う。

テンプレートパラメータ`InputIterator`は、入力に使用するイテレータの型を表し、既定では[`istreambuf_iterator`](/reference/iterator/istreambuf_iterator.md)`<charT>`である。

解析処理は`protected`な仮想関数[`do_get`](num_get/do_get.md)に実装されており、`public`メンバ関数[`get`](num_get/get.md)から呼び出される。このクラスを継承して[`do_get`](num_get/do_get.md)をオーバーライドすることで、数値の解析方法をカスタマイズできる。


## メンバ関数

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------|----------------|---|
| [`(constructor)`](num_get/op_constructor.md) | コンストラクタ | |
| [`get`](num_get/get.md)                   | 数値の解析     | |

### 静的メンバ変数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------------------|--------------------------------|---|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID | |

### protectedメンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------------|--------------|---|
| [`(destructor)`](num_get/op_destructor.md)  | デストラクタ | |
| [`do_get`](num_get/do_get.md)               | 数値の解析 (virtual) | |

## メンバ型

| 名前 | 説明 | 対応バージョン |
|-------------|------------------------------------|---|
| `char_type` | 文字型 `charT`                     | |
| `iter_type` | 入力のイテレータ型 `InputIterator` | |


## 例
```cpp example
#include <iostream>
#include <locale>
#include <sstream>
#include <iterator>

int main()
{
  std::istringstream iss{"42 3.14"};

  // ストリームのロケールからnum_getファセットを取得する
  const auto& facet = std::use_facet<std::num_get<char>>(iss.getloc());

  std::istreambuf_iterator<char> begin{iss}, end{};
  std::ios_base::iostate err = std::ios_base::goodbit;

  long i = 0;
  begin = facet.get(begin, end, iss, err, i);

  // 空白文字は解析されないため、読み飛ばす
  ++begin;

  double d = 0.0;
  facet.get(begin, end, iss, err, d);

  std::cout << i << std::endl;
  std::cout << d << std::endl;
}
```
* std::num_get[color ff0000]
* std::use_facet[link /reference/locale/use_facet.md]
* facet.get[link num_get/get.md]
* iss.getloc()[link /reference/ios/ios_base/getloc.md]
* std::istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* std::ios_base::iostate[link /reference/ios/ios_base/type-iostate.md]
* std::ios_base::goodbit[link /reference/ios/ios_base/type-iostate.md]

### 出力
```
42
3.14
```


## バージョン
### 言語
- C++98


## 関連項目
- [`num_put`](num_put.md)
- [`numpunct`](numpunct.md)
- [`locale`](locale.md)
- [`use_facet`](use_facet.md)
- [`basic_istream`の`operator>>`](/reference/istream/basic_istream/op_istream.md)
