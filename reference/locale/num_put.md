# num_put
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class OutputIterator = ostreambuf_iterator<charT> >
  class num_put : public locale::facet;
}
```
* ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
`num_put`は、数値・真偽値・ポインタを書式化して出力ストリームへ出力するためのロケールファセットである。[`basic_ostream`](/reference/ostream/basic_ostream.md)の数値出力演算子[`operator<<`](/reference/ostream/basic_ostream/op_ostream.md)は、このファセットを介して出力の書式化を行う。

テンプレートパラメータ`OutputIterator`は、出力に使用するイテレータの型を表し、既定では[`std::ostreambuf_iterator`](/reference/iterator/ostreambuf_iterator.md)`<charT>`である。

書式化処理は`protected`な仮想関数[`do_put`](num_put/do_put.md)に実装されており、`public`メンバ関数[`put`](num_put/put.md)から呼び出される。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| [`(constructor)`](num_put/op_constructor.md) | コンストラクタ |
| [`put`](num_put/put.md) | 数値を出力する |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|-----------------------|
| [`(destructor)`](num_put/op_destructor.md) | デストラクタ |
| [`do_put`](num_put/do_put.md) | 数値を出力する (virtual) |

### 浮動小数点数の書式変換

`do_put`が浮動小数点数を出力するとき、[`ios_base`](/reference/ios/ios_base.md)の`floatfield`と`uppercase`の状態に応じて、以下のprintf変換指定子に相当する書式が使われる。

| 状態 | 相当するprintf変換 |
|------|--------------------|
| `floatfield == ios_base::fixed && !uppercase` | `%f` |
| `floatfield == ios_base::fixed` | `%F` |
| `floatfield == ios_base::scientific && !uppercase` | `%e` |
| `floatfield == ios_base::scientific` | `%E` |
| `floatfield == (ios_base::fixed \| ios_base::scientific) && !uppercase` | `%a` |
| `floatfield == (ios_base::fixed \| ios_base::scientific)` | `%A` |
| `!uppercase`（上記以外） | `%g` |
| （それ以外） | `%G` |

## メンバ型

| 名前 | 説明 |
|------------------------|---------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 出力のイテレータ型 `OutputIterator` |

## 例
```cpp example
#include <iostream>
#include <sstream>
#include <locale>
#include <iterator>

int main()
{
  std::ostringstream oss;

  // ストリームのロケールからnum_putファセットを取得する
  const auto& facet = std::use_facet<std::num_put<char>>(oss.getloc());

  // 幅8で右詰め、埋め文字は'*'
  oss.width(8);
  facet.put(std::ostreambuf_iterator<char>{oss}, oss, '*', 42L);

  std::cout << oss.str() << std::endl;
}
```
* std::num_put[color ff0000]
* std::use_facet[link use_facet.md]
* oss.getloc()[link /reference/ios/ios_base/getloc.md]
* oss.width[link /reference/ios/ios_base/width.md]
* facet.put[link num_put/put.md]
* std::ostreambuf_iterator[link /reference/iterator/ostreambuf_iterator.md]
* oss.str()[link /reference/sstream/basic_ostringstream/str.md]

### 出力
```
******42
```


## バージョン
### 言語
- C++98


## 関連項目
- [`num_get`](num_get.md)
- [`numpunct`](numpunct.md)
- [`locale`](locale.md)
- [`use_facet`](use_facet.md)
- [`basic_ostream`の`operator<<`](/reference/ostream/basic_ostream/op_ostream.md)


## 参照
- [LWG Issue 4084. `std::fixed` ignores `std::uppercase`](https://cplusplus.github.io/LWG/issue4084)
    - C++26で、`floatfield == ios_base::fixed`のときに`uppercase`が設定されていれば`%F`（大文字）が使われることが明確化された（従来は`fixed`が常に`%f`で`uppercase`が無視されていた）
