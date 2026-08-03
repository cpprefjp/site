# select
* simd[meta header]
* std::simd[meta namespace]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::simd {
  template<class T, class U>
  constexpr auto
    select(bool c,
           const T& a,
           const U& b)
    -> remove_cvref_t<decltype(c ? a : b)>;              // (1) C++26

  template<std::size_t Bytes, class Abi, class T, class U>
  constexpr auto
    select(const basic_mask<Bytes, Abi>& c,
           const T& a,
           const U& b)
    noexcept -> decltype(/*simd-select-impl*/(c, a, b)); // (2) C++26
}
```
* basic_mask[link basic_mask.md]
* remove_cvref_t[link /reference/type_traits/remove_cvref.md]

## 概要
条件に応じて2つの値のうちいずれかを選択する。条件演算子`c ? a : b`のデータ並列版である。

- (1) : スカラー版。条件`c`が`true`なら`a`を、`false`なら`b`を返す
- (2) : データ並列版。マスク`c`の各要素に応じて、`true`の位置では`a`の対応する要素を、`false`の位置では`b`の対応する要素を選択した結果を返す

- `c` : 選択条件。(2) では[`basic_mask`](basic_mask.md)（比較演算子の結果など）
- `a` : 条件が`true`のときに選択される値
- `b` : 条件が`false`のときに選択される値

## 効果
- (1) : `return c ? a : b;`と等価である
- (2) : 実引数依存の名前探索（ADL）によって見つかる説明専用の`simd-select-impl(c, a, b)`を返すことと等価である

## 戻り値
選択結果。(2) では`a`と`b`の各要素をマスクに応じて選択したデータ並列型。

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a([](int i) { return i + 1; });        // {1, 2, 3, 4}
  simd::vec<int, 4> b([](int i) { return (i + 1) * 10; }); // {10, 20, 30, 40}

  // マスクの各要素に応じてa/bの要素を選択する
  auto mask = (a < 3);                // {true, true, false, false}
  auto r = simd::select(mask, a, b);  // {1, 2, 30, 40}

  for (int i = 0; i < r.size(); ++i) {
    std::print("{} ", r[i]);
  }
  std::println("");
}
```
* simd::select[color ff0000]
* simd::vec[link basic_vec.md]
* r.size()[link basic_vec/size.md]

### 出力
```
1 2 30 40 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_mask`](basic_mask.md)
- [`std::simd::basic_vec`](basic_vec.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で`std::simd`ライブラリに追加された
