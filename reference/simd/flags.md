# flags
* simd[meta header]
* std::simd[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class... Flags>
  struct flags {
    template<class... Other>
    friend consteval auto operator|(flags, flags<Other...>);
  };

  inline constexpr flags<> flag_default{};
  inline constexpr flags</*convert-flag*/> flag_convert{};
  inline constexpr flags</*aligned-flag*/> flag_aligned{};
  template<std::size_t N> requires (has_single_bit(N))
  constexpr flags</*overaligned-flag*/<N>> flag_overaligned{};
}
```

## 概要
`flags`は、[`basic_vec`](basic_vec.md)の読み込み／書き込み（[`unchecked_load`](unchecked_load.md)・[`unchecked_store`](unchecked_store.md)や、範囲を取るコンストラクタなど）の動作を制御するためのフラグをまとめて表すクラステンプレートである。整数のビットフラグのように、`operator|`で複数のフラグを合成できる。

通常は、以下の定義済みフラグオブジェクトを使用する。

| フラグ | 説明 |
|--------|------|
| `flag_default`         | 既定の動作（フラグなし）。要素型とメモリの型が一致し、アライメント要件を仮定しない |
| `flag_convert`         | メモリの要素型が`basic_vec`の要素型と異なる場合に、変換読み込み／書き込みを許可する |
| `flag_aligned`         | メモリ先頭が`basic_vec`のアライメント要件（[`alignment_v`](alignment.md)）を満たしていると仮定する |
| `flag_overaligned<N>`  | メモリ先頭が`N`バイト境界にアライメントされていると仮定する（`N`は2の冪） |


## メンバ関数
### 非メンバ（*Hidden friends*）関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| <code>operator&#x7C;</code> | 2つの`flags`を合成する | C++26 |


## 例
```cpp example
#include <simd>
#include <array>
#include <print>

namespace simd = std::simd;

int main()
{
  std::array<float, 4> data = {1.0f, 2.0f, 3.0f, 4.0f};

  // アライメント済みメモリからの読み込みを指定
  simd::vec<float, 4> v = simd::unchecked_load(data, simd::flag_aligned);

  std::print("{}", v[0]);
  std::println("");
}
```
* simd::vec[link basic_vec.md]
* simd::unchecked_load[link unchecked_load.md]
* simd::flag_aligned[color ff0000]

### 出力
```
1
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
- [`std::simd::unchecked_load`](unchecked_load.md)
- [`std::simd::unchecked_store`](unchecked_store.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリが追加された
