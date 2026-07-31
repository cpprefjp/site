# chunk
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  // 型Tと同じ要素数の断片へ分割する
  template<class T, class Abi>
  constexpr auto
    chunk(const basic_vec<typename T::value_type, Abi>& x) noexcept; // (1) C++26
  template<class T, class Abi>
  constexpr auto
    chunk(const basic_mask<mask-element-size<T>, Abi>& x) noexcept;  // (2) C++26

  // 要素数Nの断片へ分割する
  template<simd-size-type N, class T, class Abi>
  constexpr auto
    chunk(const basic_vec<T, Abi>& x) noexcept;       // (3) C++26
  template<simd-size-type N, std::size_t Bytes, class Abi>
  constexpr auto
    chunk(const basic_mask<Bytes, Abi>& x) noexcept;  // (4) C++26
}
```
* simd-size-type[link /reference/simd/simd-size-type.md]
* mask-element-size[link /reference/simd/mask-element-size.md]

## 概要
`chunk`は、大きな[`basic_vec`](basic_vec.md)や[`basic_mask`](basic_mask.md)を、より小さなデータ並列オブジェクトへ分割する関数である。

- (1), (2) : 分割後の断片の型`T`を明示的に指定する。`T`の要素数を単位として先頭から順に分割する
- (3), (4) : 分割後の断片の要素数`N`を指定する

元の要素数が断片の要素数で割り切れる場合は、すべての断片が同じ型となるため、[`std::array`](/reference/array/array.md)で返される。割り切れない場合は、末尾に端数の断片が付くため、[`std::tuple`](/reference/tuple/tuple.md)で返される。

逆に、複数のデータ並列オブジェクトを連結する操作は[`cat`](cat.md)である。

## 戻り値
元のオブジェクト`x`を先頭から順に分割した断片の列。

- 要素数が割り切れる場合 : すべての断片を格納した[`std::array`](/reference/array/array.md)
- 割り切れない場合 : 先頭の等分割された断片群と、末尾の端数の断片を格納した[`std::tuple`](/reference/tuple/tuple.md)

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 8> v([](int i) { return i; });  // {0, 1, 2, 3, 4, 5, 6, 7}

  // 要素数4の断片2つに分割する（割り切れるのでarrayが返る）
  auto chunks = simd::chunk<4>(v);

  for (auto& c : chunks) {
    for (int i = 0; i < c.size(); ++i)
      std::print("{} ", c[i]);
    std::println("");
  }
}
```
* simd::chunk[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
0 1 2 3 
4 5 6 7 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](basic_vec.md)
- [`std::simd::basic_mask`](basic_mask.md)
- [`std::simd::cat`](cat.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
- [P3441R2 Rename `simd_split` to `simd_chunk`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3441r2.html)
    - 分割関数の名前が`simd_split`から`chunk`に改名された
