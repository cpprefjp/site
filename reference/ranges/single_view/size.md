# size
* ranges[meta header]
* std::ranges[meta namespace]
* single_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static constexpr size_t size() noexcept; // (1) C++20
```

## 概要
要素数を取得する。

## 戻り値

以下と等価：

```cpp
return 1;
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
