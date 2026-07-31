# operator/
* simd[meta header]
* std::simd[meta namespace]
* basic_vec[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
friend constexpr basic_vec operator/(const basic_vec& lhs, const basic_vec& rhs) noexcept;
```

## 概要
2つの[`basic_vec`](../basic_vec.md)オブジェクトの対応する要素同士を除算する。

*Hidden friends*として定義される。


## テンプレートパラメータ制約
式`a / b`（`a`と`b`は`value_type`型）が適格であること。


## 戻り値
`lhs`と`rhs`に除算を要素ごとに適用した結果で初期化された[`basic_vec`](../basic_vec.md)オブジェクトを返す。


## 例
```cpp example
#include <simd>
#include <print>

namespace simd = std::simd;

int main()
{
  simd::vec<int, 4> a = [](int i) { return (i + 1) * 10; };  // {10, 20, 30, 40}
  int bv[] = {2, 5, 3, 4};
  simd::vec<int, 4> b = [&](int i) { return bv[i]; };        // {2, 5, 3, 4}

  simd::vec<int, 4> c = a / b;

  for (int i = 0; i < c.size(); ++i) {
    std::print("{} ", c[i]);
  }
  std::println("");
}
```
* simd::vec[color ff0000]
* c.size()[link size.md]

### 出力
```
5 4 10 10 
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
    - C++26で追加された
