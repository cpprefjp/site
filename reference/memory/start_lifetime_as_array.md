# start_lifetime_as_array
* memory[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
template <class T>
T* start_lifetime_as_array(void* p, size_t n) noexcept; // (1)

template <class T>
const T* start_lifetime_as_array(const void* p, size_t n) noexcept; // (2)

template <class T>
volatile T* start_lifetime_as_array(volatile void* p, size_t n) noexcept; // (3)

template <class T>
const volatile T* start_lifetime_as_array(const volatile void* p, size_t n) noexcept; // (4)
}
```

## 概要
配列オブジェクトの生存期間を開始することを明示する。


## 要件
`T` が完全型であること。


## 事前条件
- `p` が、型 `T` の配列のアライメントを満たすこと。または、`p` がnullであること。
- `n <= size_t(-1) / sizeof(T)` が真であること。
- `n > 0` が真ならば、`[(char*)p, (char*)p + (n * sizeof(T)))` の範囲が `p` を通じてアクセス可能な領域であること。


## 効果
`n > 0` が真ならば、サイズ `n` の `T` の配列の型を `U` とすると、[`start_lifetime_as`](/reference/memory/start_lifetime_as.md)`<U>(p)` と同じ効果。そうでなければ、何もしない。


## 戻り値
`n > 0` が真ならば、暗黙的に構築されたサイズ `n` の `T` の配列の、最初の要素へのポインタを返す。そうでなければ、`p`。


## 例外
投げない。


## 例
```cpp example
#include <cstdint>
#include <memory>

int main() {
  float f = 3.14f;

  std::uint16_t* n = std::start_lifetime_as_array<std::uint16_t>(&f, 2);

  std::cout << n[0] << " " << n[1] << std::endl;
}
```
* std::start_lifetime_as_array[color ff0000]

### 出力
```
62915 16456
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::start_lifetime_as`](/reference/memory/start_lifetime_as.md)


## 参照
- [P2590R2: Explicit lifetime management](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2590r2.pdf)
- [P2679R2: Fixing std::start_lifetime_as and std::start_lifetime_as_array](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2679r2.pdf)
