# index-cast
* [meta exposition-only]
* mdspan[meta header]
* function template[meta id-type]
* std[meta namespace]
* extents[meta class]
* cpp23[meta cpp]

```cpp
template<class OtherIndexType>
static constexpr auto index-cast(OtherIndexType&& i) noexcept; // 説明専用
```

## 概要
多次元配列のインデクス型へと変換する、説明専用のメンバ関数である。


## 効果
- [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<OtherIndexType>`が`bool`型以外の整数型の場合、`return i;`と等価。
- そうでない場合、`return static_cast<index_type>(i);`と等価。


## 例外
投げない


## バージョン
### 言語
- C++23


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
- [LWG Issue 4020. `extents::index-cast` weirdness](https://cplusplus.github.io/LWG/issue4020)
    - C++26で、効果の条件が`OtherIndexType`から[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<OtherIndexType>`に修正された。`OtherIndexType`は転送参照から推論されるため参照型になりえ、そのままでは整数型の左辺値が`static_cast`側の分岐に落ちてしまう問題を防ぐもの
