# operator==
* simd[meta header]
* std::simd[meta namespace]
* basic_mask[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr basic_mask operator==(const basic_mask& lhs,
                                       const basic_mask& rhs) noexcept;
```

## 概要
2つの[`basic_mask`](../basic_mask.md)を要素ごとに等値比較する。

比較結果は単一の`bool`ではなく、要素ごとの比較結果を保持する[`basic_mask`](../basic_mask.md)として返される。

## 戻り値
`lhs`と`rhs`の対応する要素それぞれに`==`を適用した結果で初期化された`basic_mask`オブジェクトを返す。すなわち、戻り値のマスクの`i`番目の要素は`lhs[i] == rhs[i]`となる。

## 備考
*Hidden friends*として定義されるため、引数依存の名前探索 (ADL) でのみ発見される。

## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4>::mask_type a = [](int i) { return i < 2; };  // {true, true, false, false}
  simd::vec<int, 4>::mask_type b = [](int i) { return i % 2 == 0; };  // {true, false, true, false}

  // 要素ごとの等値比較。結果はマスクとして得られる
  simd::vec<int, 4>::mask_type m = (a == b);  // {true, false, false, true}

  for (int i = 0; i < m.size(); ++i) {
    std::print("{} ", m[i]);
  }
  std::println("");
}
```
* simd::vec[link ../basic_vec.md]
* m.size()[link size.md]
* m[i][link op_at.md]

### 出力
```
true false false true 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::simd::basic_mask`](../basic_mask.md)


## 参照
- [P1928R15 std::simd — merge data-parallel types from the Parallelism TS 2](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p1928r15.pdf)
    - C++26で追加された
