# start_lifetime_as
* memory[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
template <class T>
T* start_lifetime_as(void* p) noexcept; // (1)

template <class T>
const T* start_lifetime_as(const void* p) noexcept; // (2)

template <class T>
volatile T* start_lifetime_as(volatile void* p) noexcept; // (3)

template <class T>
const volatile T* start_lifetime_as(const volatile void* p) noexcept; // (4)
}
```

## 概要
オブジェクトの生存期間を開始することを明示する。


## 要件
`T` が *implicit-lifetime types* であること。また、`T` が 完全型であること。


## 事前条件
- `[p, (char*)p + sizeof(T))` の範囲が `p` を通じてアクセス可能な領域であること。
- `p` が型 `T` のアライメントを満たすこと。


## 効果
型 `T` のオブジェクト（アドレスは `p`）が暗黙的に構築される。`T` 内にネストされているオブジェクトも暗黙的に構築される。


## 戻り値
暗黙的に構築された型 `T` のオブジェクトへのポインタを返す。


## 例外
投げない。


## 例
```cpp example
#include <cstdint>
#include <memory>
#include <iostream>

int main() {
  float f = 3.14f;

  std::uint32_t* n = std::start_lifetime_as<std::uint32_t>(&f);

  std::cout << *n << std::endl;
}
```
* std::start_lifetime_as[color ff0000]

### 出力
```
1078523331
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::start_lifetime_as_array`](/reference/memory/start_lifetime_as_array.md)


## 参照
- [P2590R2: Explicit lifetime management](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2590r2.pdf)
- [P2679R2: Fixing std::start_lifetime_as and std::start_lifetime_as_array](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2679r2.pdf)
