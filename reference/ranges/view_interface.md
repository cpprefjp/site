# view_interface
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class D>
    requires is_class_v<D> && same_as<D, remove_cv_t<D>>
  class view_interface : public view_base { …… };
}
```
* view_base[link view_base.md]
* is_class_v[link /reference/type_traits/is_class.md]
* same_as[link /reference/concepts/same_as.md]
* remove_cv_t[link /reference/type_traits/remove_cv.md]

## 概要

`view_interface`は、[`view`](view.md)を実装する際に便利なクラステンプレートである。使用するときは、派生クラスを`view_interface`のテンプレート引数にする(CRTP)。

## テンプレートパラメータ制約

`D`は`view_interface<D>`の派生クラスであること。

## メンバ関数

これらのメンバ関数は、`std::ranges`以下のカスタマイゼーションポイントオブジェクトを使って実装されており、テンプレート引数`D`として渡されたRange型に対して該当する呼び出しが可能な場合のみオーバーロード解決に参加する。

| 名前                                         | 説明                               | 対応バージョン |
|----------------------------------------------|------------------------------------|----------------|
| [`empty`](view_interface/empty.md)           | Rangeが空かどうかを判定する        | C++20          |
| [`operator bool`](view_interface/op_bool.md) | Rangeが空でないかどうかを判定する  | C++20          |
| [`data`](view_interface/data.md)             | Rangeの先頭へのポインタを取得する  | C++20          |
| [`size`](view_interface/size.md)             | 要素数を取得する                   | C++20          |
| [`front`](view_interface/front.md)           | 先頭要素への参照を取得する         | C++20          |
| [`back`](view_interface/back.md)             | 末尾要素への参照を取得する         | C++20          |
| [`operator[]`](view_interface/op_at.md)      | 要素へアクセスする                 | C++20          |
| [`derived`](view_interface/derived.md)       | `D`へダウンキャストする (説明専用) | C++20          |

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0
- [GCC](/implementation.md#gcc): 10.1.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
