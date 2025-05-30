# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* ref_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
template <different-from<ref_view> T>
  requires 以下参照
constexpr
  ref_view(T&& t);          // (1) C++20
```

## 概要
[`ref_view`](../ref_view.md)オブジェクトを構築する。

- (1) : `t`へのポインタを`*this`に保持する


## 効果
- (1) : メンバ変数`r_`を[`addressof`](/reference/memory/addressof.md)`(static_cast<R&>(`[`std::forward`](/reference/utility/forward.md)`<T>(t)))`で初期化する


## 備考
- (1) : 説明専用の関数`FUN`を以下のように定義する：
    ```cpp
    void FUN(R&);
    void FUN(R&&) = delete;
    ```

    - requires節は、以下と等価になる：

    ```cpp
    convertible_to<T, R&> && requires { FUN(declval<T>()); }
    ```

    - これはつまり、このコンストラクタには一時オブジェクトは渡せないことを意味する


## 例
```cpp example
#include <iostream>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  for (int x : std::ranges::ref_view(v)) {
    std::cout << x << ' ';
  }
}
```

### 出力
```
1 2 3 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
