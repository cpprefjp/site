# collate
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class collate : public locale::facet;
}
```
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
`collate`は、文字列の照合（比較）とハッシュ計算のための機能を提供するロケールファセットである。

[`locale`](locale.md)のメンバ関数テンプレート[`operator()`](locale/op_call.md)は、このファセットを使用することで、[`locale`](locale.md)オブジェクトを文字列を扱うアルゴリズムやコンテナの述語として直接使えるようにしている。

規格が要求する特殊化（`collate<char>`と`collate<wchar_t>`）は、辞書順による順序付けを行う。

## メンバ関数

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|--------------------------------------------|
| [`(constructor)`](collate/op_constructor.md) | コンストラクタ |
| [`compare`](collate/compare.md) | 文字列を比較する |
| [`transform`](collate/transform.md) | 文字の範囲を照合順序での比較に使える文字列に変換する |
| [`hash`](collate/hash.md) | 文字範囲のハッシュ値を求める |

### 静的メンバ変数

| 名前 | 説明 |
|--------------------------------------------------------------|--------------------------------|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` | このファセットを識別するためのID |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------------------------------|
| [`(destructor)`](collate/op_destructor.md) | デストラクタ |
| [`do_compare`](collate/do_compare.md) | 文字列を比較する |
| [`do_transform`](collate/do_transform.md) | 文字の範囲を照合順序での比較に使える文字列に変換する |
| [`do_hash`](collate/do_hash.md) | 文字範囲のハッシュ値を求める |

## メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `string_type` | 文字列型 [`std::basic_string`](/reference/string/basic_string.md)`<charT>` |

## 例
```cpp example
#include <iostream>
#include <locale>

int main()
{
  const auto& col = std::use_facet<std::collate<char>>(std::locale::classic());

  const char a[] = "abc";
  const char b[] = "abd";

  // ロケールの照合順序で比較する
  std::cout << col.compare(a, a + 3, b, b + 3) << std::endl;
}
```
* std::collate[color ff0000]
* col.compare[link collate/compare.md]
* std::use_facet[link use_facet.md]
* std::locale::classic()[link locale/classic.md]

### 出力
```
-1
```


## バージョン
### 言語
- C++98


## 関連項目
- [`collate_byname`](collate_byname.md)
- [`locale::operator()`](locale/op_call.md)
- [`locale`](locale.md)
