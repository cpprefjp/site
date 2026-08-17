# empty
* ranges[meta header]
* std::ranges[meta namespace]
* single_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
static constexpr bool empty() noexcept; // (1) C++20
```

## 概要
Rangeが空かどうかを判定する。

## 戻り値

```cpp
return false;
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]


## 参照
- [LWG Issue 4035. `single_view` should provide `empty`](https://cplusplus.github.io/LWG/issue4035)
    - C++26で、常に`false`を返す静的メンバ関数`empty`が`single_view`に明示的に追加された（従来は[`view_interface`](../view_interface.md)経由で提供されていた）
