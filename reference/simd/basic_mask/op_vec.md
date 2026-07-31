# operator basic_vec
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template<class U, class A>
constexpr explicit(sizeof(U) != Bytes)
  operator basic_vec<U, A>() const noexcept; // (1) C++26
```
* basic_vec[link ../basic_vec.md]

## 概要
マスクを、対応する要素型の[`basic_vec`](../basic_vec.md)へ変換する。各要素は`true`が`1`、`false`が`0`に変換される。

要素型のサイズがマスクの`Bytes`と等しくない場合、この変換演算子は`explicit`となる。


## テンプレートパラメータ制約
- (1) : 変換先[`basic_vec`](../basic_vec.md)`<U, A>`の要素数がマスクの要素数と等しいこと


## 戻り値
- (1) : すべての`i`（`0`以上`size()`未満）について、第`i`要素が`static_cast<U>(operator[](i))`で初期化された[`basic_vec`](../basic_vec.md)オブジェクト


## 例外
投げない


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return i; };  // {0, 1, 2, 3}
  simd::mask<int, 4> m = (a < 2);                  // {true, true, false, false}

  // マスクをbasic_vecへ変換する（true→1, false→0）
  simd::vec<int, 4> v = static_cast<simd::vec<int, 4>>(m);

  for (int i = 0; i < v.size(); ++i) {
    std::print("{} ", v[i]);
  }
  std::println("");
}
```
* simd::mask[link ../basic_mask.md]
* simd::vec[link ../basic_vec.md]
* v.size()[link size.md]
* v[i][link op_at.md]

### 出力
```
1 1 0 0 
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
- [`to_bitset`](to_bitset.md)
- [`to_ullong`](to_ullong.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
