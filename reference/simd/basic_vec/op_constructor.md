# コンストラクタ
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr basic_vec() noexcept = default;                  // (1) C++26

template<class U>
constexpr basic_vec(U&& value) noexcept;                   // (2) C++26

template<class U, class UAbi>
constexpr explicit(/*see below*/)
  basic_vec(const basic_vec<U, UAbi>& x) noexcept;         // (3) C++26

template<class G>
constexpr explicit basic_vec(G&& gen);                     // (4) C++26

template<class R, class... Flags>
constexpr basic_vec(R&& r, flags<Flags...> = {});          // (5) C++26

template<class R, class... Flags>
constexpr basic_vec(R&& r, const mask_type& mask,
                    flags<Flags...> = {});                 // (6) C++26

constexpr basic_vec(const real-type& reals,
                    const real-type& imags = {}) noexcept; // (7) C++26
```
* real-type[link real-type.md]


## 概要
`basic_vec`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。各要素をデフォルト初期化する。
- (2) : ブロードキャストコンストラクタ。単一の値`value`を全要素にコピーする。
- (3) : 変換コンストラクタ。要素数が等しい別の`basic_vec`から、要素ごとに要素型を変換して構築する。
- (4) : ジェネレータコンストラクタ。各要素を、そのインデックスを渡した関数オブジェクト`gen`の呼び出し結果で構築する。
- (5) : 連続範囲`r`の先頭から`size()`個の要素を読み込んで構築する。
- (6) : マスク付き範囲読み込み。`mask`の`true`である要素だけを`r`から読み込み、`false`の要素は`value_type()`で初期化する。
- (7) : 複素数要素型のとき、実部の並び`reals`と虚部の並び`imags`から構築する。


## テンプレートパラメータ制約
- (2) : `std::remove_cvref_t<U>`を`From`とする。次のいずれかを満たすこと。
    - `U`が[`std::convertible_to`](/reference/concepts/convertible_to.md)`<value_type>`を満たし、かつ`From`が算術型ではないこと
    - `From`が算術型であり、`From`から`value_type`への変換が値を保持する（value-preserving）こと
    - `From`が定数ラッパー（[`std::integral_constant`](/reference/type_traits/integral_constant.md)等）であり、その`value`が算術型で、`value_type`で表現可能であること
- (3) : `U`から`T`への明示的な変換が可能であり、変換元の要素数が`size()`と等しいこと
- (4) : すべての`i`（`0`以上`size()`未満）について、`gen(std::integral_constant<simd-size-type, i>())`の型が[`std::convertible_to`](/reference/concepts/convertible_to.md)`<value_type>`を満たすこと。その型が算術型である場合は、`value_type`への変換が値を保持すること
- (5), (6) : `R`が[`std::ranges::contiguous_range`](/reference/ranges/contiguous_range.md)かつ[`std::ranges::sized_range`](/reference/ranges/sized_range.md)であり、[`std::ranges::size`](/reference/ranges/size.md)`(r)`が定数式かつ`size()`と等しく、その要素型が[「vectorizable type」](/reference/simd.md#vectorizable-type)であって`T`へ明示的に変換可能であること
- (7) : `basic_vec`が複素数のデータ並列型（`simd-complex`）であること


## 適格要件
- (5), (6) : テンプレートパラメータパック`Flags`が変換フラグを含まない場合、`r`の要素型から`value_type`への変換が値を保持すること


## 事前条件
- (5), (6) : `Flags`が整列フラグを含む場合、[`std::ranges::data`](/reference/ranges/data.md)`(r)`が要求される境界に整列していること


## 効果
- (1) : 各要素をデフォルト初期化する。
- (2) : 引数を`value_type`へ変換した値で各要素を初期化する。
- (3) : すべての`i`について、第`i`要素を`static_cast<T>(x[i])`で初期化する。
- (4) : すべての`i`について、第`i`要素を`static_cast<value_type>(gen(std::integral_constant<simd-size-type, i>()))`で初期化する。`gen`は`i`ごとにちょうど1回、`i`の昇順で呼び出される。
- (5), (6) : すべての`i`について、第`i`要素を`mask[i] ? static_cast<T>(std::ranges::data(r)[i]) : T()`で初期化する。(5)は`mask`をすべて`true`とみなす。
- (7) : すべての`i`について、第`i`要素を`value_type(reals[i], imags[i])`で初期化する。


## explicitになる条件
- (3) : 次のいずれかを満たすとき`explicit`となる。
    - `U`から`value_type`への変換が値を保持しない
    - `U`と`value_type`がともに整数型であり、`U`の整数変換順位が`value_type`より高い
    - `U`と`value_type`がともに浮動小数点型であり、`U`の浮動小数点変換順位が`value_type`より高い


## 例外
- (1), (2), (3), (6), (7) : 投げない
- (4), (5) : 「例外を投げない」とは規定されない


## 例
```cpp example
#include <simd>
#include <print>
#include <array>

namespace simd = std::simd;

template <class V>
void print(const char* name, const V& v)
{
  std::print("{}: ", name);
  for (int i = 0; i < v.size(); ++i) {
    std::print("{} ", v[i]);
  }
  std::println("");
}

int main()
{
  // (2) ブロードキャスト：全要素を同じ値に
  simd::vec<int, 4> b = 10;

  // (4) ジェネレータ：各要素をインデックスから生成
  simd::vec<int, 4> c([](int i) { return i + 1; });

  // (5) 連続範囲から読み込み
  std::array<int, 4> arr = {5, 6, 7, 8};
  simd::vec<int, 4> d{arr};

  // (3) 要素型を変換
  simd::vec<float, 4> e = simd::vec<int, 4>(c);

  ::print("b", b);
  ::print("c", c);
  ::print("d", d);
  ::print("e", e);
}
```
* simd::vec[link ../basic_vec.md]
* v.size()[link size.md]

### 出力
```
b: 10 10 10 10 
c: 1 2 3 4 
d: 5 6 7 8 
e: 1 2 3 4 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_vec`](../basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`が追加された
- [P2876R3 Proposal to extend `std::simd` with more constructors and accessors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2876r3.html)
    - 範囲読み込み・ジェネレータ・複素数用のコンストラクタが追加された
- [P3430R3 SIMD issues: explicit, unsequenced, identity-element position, and members of disabled SIMD](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3430r3.pdf)
    - ジェネレータコンストラクタ (4) から`noexcept`と「`gen`の呼び出しは互いに未順序」という制約が除去され、`gen`は各要素につき昇順でちょうど1回呼び出されると規定された
- [P4012R1 Value-preserving consteval broadcast to `simd::vec`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4012r1.pdf)
    - ブロードキャストコンストラクタ (2) から`explicit`が除去され、値を保持する算術型や定数ラッパー型からの暗黙変換を許可するよう制約が再規定された
- [LWG Issue 4420. §[simd] conversions (constructor, load, stores, gather, and scatter) are incorrectly constrained for `<stdfloat>` types](https://cplusplus.github.io/LWG/issue4420)
    - C++26で、`<stdfloat>`型への明示的変換を許可するため、コンストラクタの制約が`constructible_from`から明示的変換可能性(`explicitly-convertible-to`)ベースへ修正された
