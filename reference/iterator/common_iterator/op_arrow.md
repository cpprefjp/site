# operator->
* iterator[meta header]
* std[meta namespace]
* common_iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
decltype(auto) operator->() const requires /*see below*/;
```

## 概要
イテレータを間接参照する。

## テンプレートパラメータ制約

`requires`節には以下の制約式が指定される。

```cpp
indirectly_readable<const I> &&
(requires(const I& i) { i.operator->(); } ||
 is_reference_v<iter_reference_t<I>> ||
 constructible_from<iter_value_t<I>, iter_reference_t<I>>)
```
* indirectly_readable[link /reference/iterator/indirectly_readable.md]
* is_reference_v[link /reference/type_traits/is_reference.md]
* iter_reference_t[link /reference/iterator/iter_reference_t.md]
* constructible_from[link /reference/concepts/constructible_from.md]

## 事前条件

[`holds_alternative`](/reference/variant/holds_alternative.md)`<I>(v_) == true`

## 戻り値

`I, S`の値のどちらかを[`variant<I, S>`](/reference/variant/variant.md)型のメンバ変数`v_`に保持しているとして、次のいずれか

- `I`がポインタ型であり、`get<I>(v_).operator->()`が呼び出し可能な場合 : `return get<I>(v_);`

- [`iter_reference_t`](/reference/iterator/iter_reference_t.md)`<I>`が参照型の場合 : 以下と等価  
    ```cpp
    auto&& tmp = *get<I>(v_);
    return addressof(tmp);
    ```

- それ以外の場合 : `return proxy(*get<I>(v_));`  
    `proxy`は次のように定義される説明専用のクラス。  
    ```cpp
    class proxy {
      iter_value_t<I> keep_;
      proxy(iter_reference_t<I>&& x)
        : keep_(std::move(x)) {}
    public:
      const iter_value_t<I>* operator->() const {
        return addressof(keep_);
      }
    };
    ```
    * iter_reference_t[link /reference/iterator/iter_reference_t.md]

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 9 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)
