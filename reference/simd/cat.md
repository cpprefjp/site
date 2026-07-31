# cat
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class... Abis>
  constexpr resize_t<
    (basic_vec<T, Abis>::size() + ...),
    basic_vec<T, Abis...[0]>
  >
    cat(const basic_vec<T, Abis>&... xs) noexcept;      // (1) C++26

  template<std::size_t Bytes, class... Abis>
  constexpr resize_t<
    (basic_mask<Bytes, Abis>::size() + ...),
    basic_mask<Bytes, Abis...[0]>
  >
    cat(const basic_mask<Bytes, Abis>&... xs) noexcept; // (2) C++26
}
```

## 概要
`cat`は、複数の[`basic_vec`](basic_vec.md)（(1)）または[`basic_mask`](basic_mask.md)（(2)）を連結して、1つの大きなデータ並列オブジェクトを生成する関数である。

引数として渡したオブジェクトが、引数の順に前から並べられる。結果の要素数は、各引数の要素数の総和となる。

逆に、大きなデータ並列オブジェクトを分割する操作は[`chunk`](chunk.md)である。

## 戻り値
引数`xs`を順に連結したデータ並列オブジェクト。`j`番目の引数の`i`番目の要素は、結果のうち「`i` + 先頭から`j`番目までの引数の要素数の合計」の位置へコピーされる。

## 例外
投げない

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 2> a([](int i) { return i; });      // {0, 1}
  simd::vec<int, 2> b([](int i) { return i + 10; }); // {10, 11}

  // 2つのvecを連結して要素数4のvecを得る
  auto r = simd::cat(a, b);  // {0, 1, 10, 11}

  for (int i = 0; i < r.size(); ++i)
    std::print("{} ", r[i]);
  std::println("");
}
```
* simd::cat[color ff0000]
* simd::vec[link basic_vec.md]

### 出力
```
0 1 10 11 
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
- [`std::simd::chunk`](chunk.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
