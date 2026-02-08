# execution-policy
* [meta exposition-only]
* execution[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class T>
  concept execution-policy = is_execution_policy_v<remove_cvref_t<T>>;
}
```
* is_execution_policy_v[link is_execution_policy.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]

## 概要
`execution-policy`は、型`T`が実行ポリシー型であることを表す説明専用のコンセプトである。

このコンセプトは、並列Rangeアルゴリズムのテンプレートパラメータ制約として使用される。

このコンセプトに合致する型は、以下のページを参照：

- [実行ポリシー](execution/execution_policy.md)


## バージョン
### 言語
- C++26

## 参照
- [P3179R9 C++ parallel range algorithms](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3179r9.html)
