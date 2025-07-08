# view_interface
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  template<class D>
    requires is_class_v<D> && same_as<D, remove_cv_t<D>>
  class view_interface { …… };
}
```

## 概要

`view_interface`は、[`view`](view.md)を実装する際に便利なクラステンプレートである。

使用するときは、`D`で`view_interface`を公開継承した上で派生クラス`D`を`view_interface`のテンプレート引数にする(CRTP)。

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
| [`cbegin`](view_interface/cbegin.md)         | 定数イテレータを取得する           | C++23          |
| [`cend`](view_interface/cend.md)             | 定数イテレータ（番兵）を取得する     | C++23          |
| [`derived`](view_interface/derived.md)       | `D`へダウンキャストする (説明専用) | C++20          |

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 関連項目

- [`enable_view`](/reference/ranges/enable_view.md)

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
- [LWG Issue 3549. `view_interface` is overspecified to derive from `view_base`](https://cplusplus.github.io/LWG/issue3549)
- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
