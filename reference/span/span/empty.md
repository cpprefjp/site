# empty
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]] constexpr bool empty() const noexcept; // (1) C++20
constexpr bool empty() const noexcept;               // (1) C++26
```

## 概要
参照している範囲が空かどうかを判定する。


## 戻り値
以下と等価：

```cpp
return size() == 0;
```
* size()[link size.md]


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <cassert>
#include <span>
#include <vector>

int main()
{
  std::vector<int> v = {1, 2, 3, 4, 5};
  int* p = v.data();
  std::size_t n = 0;

  assert(!std::span{v}.empty());

  assert(std::span{v}.first(0).empty());
  assert((std::span<int>{p, n}.empty()));
}
```
* empty()[color ff0000]
* first[link first.md]
* v.data()[link /reference/vector/vector/data.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
