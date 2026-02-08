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


## 戻り値
- `OtherIndexType`が`bool`型以外の整数型の場合、`return i;`と等価。
- `OtherIndexType`が`bool`型の場合、`return static_cast<index_type>(i);`と等価。


## 例外
投げない


## バージョン
### 言語
- C++23


## 参照
- [P0009R18 MDSPAN](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0009r18.html)
