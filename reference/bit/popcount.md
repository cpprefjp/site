# popcount
* bit[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr int popcount(T x) noexcept;
}
```

## 概要
立っているビットを数える。popcountは「population count」の略。


## テンプレートパラメータ制約
- 型`T`が符号なし整数型であること


## 戻り値
値`x`の、1ビットの数を返す。


## 例外
投げない


## 備考
- この関数は、ハードウェア機能として提供されている場合がある
- GCCの組み込み関数として`__builtin_popcount()`、`__builtin_popcountl()`、`__builtin_popcountll()`が定義されていた
- popcountは少なくとも1961年のCPUアー�テクチャから�在している命令であり、NSA (アメリカ国家安全保障局) の要請によって暗号解析のためアー�テクチャに導入された。この命令は幅広い用途に使われる：
    - 暗号解析
    - エラー訂� (ECC, Error Correction Code)。ハミング距離 (Hamming Distance) の計算に使用する
    - チェスプ�グラム。チェスではビットでボード情報を保持することが多く、64ビットワードに1ボードの情報が収まる。popcountによって駒の変動計算などができる
    - 分�の特徴ベクトル (Molecular Fingerprinting)。分�はなんらかの方法でハッシュ化され、それらがどれくらい似ているかをpopcountで判�する
    - Hash Array Mapped Tries (HAMT) アルゴリズム
    - ビット配列 (標準では[`std::bitset`](/reference/bitset/bitset.md)や[`std::vector<bool>`](/reference/vector/vector.md))


## 例
```cpp example
#include <cassert>
#include <bit>
#include <cstdint>

int main()
{
  auto i = static_cast<std::uint32_t>(0b1000'0000'0000'1010'0000'0000'0000'1000u);
  int n = std::popcount(i);
  assert(n == 4);
}
```
* std::popcount[color ff0000]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0
- [GCC](/implementation.md#gcc): 9.2
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::bitset::count()`](/reference/bitset/bitset/count.md)


## 参照
- [P0553R4 Bit operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0553r4.html)
- [You Won’t Believe This One Weird CPU Instruction!](https://vaibhavsagar.com/blog/2019/09/08/popcount/)
