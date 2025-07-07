# コンストラクタ
* random[meta header]
* std[meta namespace]
* philox_engine[meta class]
* function[meta id-type]
* cpp26[meta cpp]
* [mathjax enable]

```cpp
philox_engine();                           // (1) C++26

explicit philox_engine(result_type value); // (2) C++26

template<class Sseq>
explicit philox_engine(Sseq& q);           // (3) C++26

philox_engine(const philox_engine& e) = default; // (4) C++26
philox_engine(philox_engine&& e) = default;      // (5) C++26
```
* Sseq[link /reference/random/seed_seq.md]

## 概要
- (1) : デフォルトコンストラクタ
- (2) : シード値を受け取って状態シーケンスを構築する
- (3) : シードのシーケンスを受け取って状態を構築する
- (4) : コピーコンストラクタ。状態をコピーする
- (5) : ムーブコンストラクタ


## 効果
- (1) : デフォルトのシード値 (`default_seed`) で(2)に委譲
- (2) :
    - $K_{0}$ に $ value\ mod\ 2^{w} $ を設定する
    - $K_{0}$ 以外の $X$ と $K$ のすべての要素に値0を設定する
    - $i$ に値としてn-1を設定する
- (3) :
    - `p = ceil(w / 32)`、長さ`n / 2 * p`の配列`a`があるとして、[`q.generate`](/reference/random/seed_seq/generate.md)`(a + 0, a + n / 2 * p)`を呼び出す
    - $K$ の各要素k=0, …, n/2-1に、 $ \left(\sum_{j=0}^{p-1}a_{k \cdot p+j} \cdot 2^{32j}\right)\ mod\ 2^{w} $ を設定する
    - $X$ のすべての要素に値0を設定する
    - $i$ に値としてn-1を設定する


## 計算量
- (1), (2), (3) : 状態のサイズ `n` に対し O(n)
- (5) : 状態シーケンスの要素数はコンパイル時に決定されるため、多くの場合状態シーケンスはスタック上(配列)に作られる。そのため、ムーブが効果的に動作することは期待できない


## 例
```cpp example
#include <iostream>
#include <random>
#include <array>

int main()
{
  // (1) デフォルト構築
  // デフォルトのシード値(default_seed静的メンバ変数)から構築する
  {
    std::philox4x32 engine;

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (2) シード値を指定して構築
  {
    std::uint32_t seed = std::random_device{}();
    std::philox4x32 engine{seed};

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }

  // (3) シードのシーケンスを指定して構築
  {
    // シードのシーケンスを作る
    std::random_device seed_gen;
    std::array<std::uint32_t, 100> seeds;

    for (std::uint32_t& x : seeds) {
      x = seed_gen();
    }

    std::seed_seq seq(seeds.begin(), seeds.end());

    // シードのシーケンスを指定してエンジンを初期化
    std::philox4x32 engine{seq};

    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* engine()[link op_call.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* seeds.begin()[link /reference/array/array/begin.md]
* seeds.end()[link /reference/array/array/end.md]

### 出力例
```
349899751
1721219710
1841229489
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
