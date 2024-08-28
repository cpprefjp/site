# base
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::sentinel[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr const sentinel_t<V> base() const;
```

## 概要

元の`view`の番兵を取得する。

## 効果

入力`view`（`V`）の番兵を`end_`というメンバに保持するとして、`return end_;` と等しい

## 例
(執筆中)

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
