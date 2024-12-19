# set_counter
* random[meta header]
* std[meta namespace]
* philox_engine[meta class]
* function[meta id-type]
* cpp26[meta cpp]
* [mathjax enable]

```cpp
void set_counter(const array<result_type, n>& c); // (1) C++26
```
* array[link /reference/array/array.md]

## 概要
- (1) : カウンターを設定する

この関数は、カウンターベースの乱数生成器において、カウンター値を直接設定することで乱数生成器を指定位置に進める (ジャンプさせる) ことができる。カウンターベースでない乱数生成器においては、乱数生成器の状態を進めるには一つひとつ乱数生成の結果を捨てなければならない場合があるが、カウンターベース乱数生成器のこの機能を使えば状態を一気に進めることができる。

この機能は、シード設定と合わせて使用する。同じシード値と同じカウンター値を設定すれば、同じ乱数列を再現させることができる。

この関数のパラメータは、標準ライブラリで定義される[`philox4x32`](/reference/random/philox4x32.md)および[`philox4x64`](/reference/random/philox4x64.md)を使っている限りは、要素数4の符号なし32 or 64ビット整数をもつ配列である。


### この関数のユースケース
この関数のユースケースとして、多数のアトムの多数のステップでモンテカルロ・シミュレーションをする際の典型的なフローは以下のようになる：

```cpp
uint32_t global_seed = 999;
for (uint32_t time_step = 0; time_step < time_steps_num; ++time_step) {
    for (uint32_t atom_id = 0; atom_id < atoms_num; ++atom_id) {
        philox4x32 eng(global_seed);
        eng.set_counter({atom_id, time_step, 0, 0});
        normal_distribution<> nd;
        auto n1 = nd(eng);
        auto n2 = nd(eng);
        // …
    }
}
```
* uint32_t[link /reference/cstdint/uint32_t.md]
* normal_distribution[link /reference/random/normal_distribution.md]

この関数を使用することで、`atoms_num`の状態を保存することなく、その場で乱数生成器を作成することができる。また、どちらのループも並列化を妨げない。マイナス面としては、アトムごと・タイムステップごとに消費される乱数の数をコントロールする必要がある。消費される乱数の数が4*232*2を超えると、異なるアトムの配列が重なり、望ましくない相互相関が生じる可能性がある。それを回避するには以下のようにする必要がある：


### discardとの違い
ある制限のもとでは、この関数は[`discard()`](discard.md)メンバ関数を使っても同様の効果を得ることができるが、以下の点で異なる：

- [`discard()`](discard.md)する回数は`unsigned long long`に制限されており (多くのシステムで64ビット)、`philox4x64`は`4*2^(64*4)`の周期をもつために、このシーケンスを2つに分割するには (タイムステップとアトム)、[`discard()`](discard.md)を`4*2^(64*3 - 64)`回呼び出さなければならない。`set_counter()`では1回の呼び出しで済む
- また、[`discard()`](discard.md)はカウンターを現在の位置から相対的に進める。[`discard()`](discard.md) APIが存在するのは状態を進める効率的なアルゴリズムをもっているからである。`set_counter()`はカウンターの絶対値を設定する。これはカウンターベースの乱数生成器のユニークな特性である


## 効果
- $X$ の各要素j=0, …, n-1に $ C_{n-1-j}\ mod\ 2^{w} $ を設定する
- $i$ に値としてn-1を設定する


## 戻り値
なし


## 備考
- カウンターは $n \cdot w$ ビットの符号なし整数値 $ \sum_{j=0}^{n-1}X_{j} \cdot 2^{wj} $ である


## 例
```cpp example
#include <print>
#include <random>

struct Vector {
  float x, y, z;
};

int main()
{
  std::uint32_t seed = 12345;
  std::philox4x32 engine;

  // 2x2x2個のランダムなベクトルを生成する
  for (std::uint32_t x = 0; x < 2; ++x) {
    for (std::uint32_t y = 0; y < 2; ++y) {
      for (std::uint32_t z = 0; z < 2; ++z) {
        engine.seed(seed);
        engine.set_counter({x, y, z, 0});

        std::uniform_real_distribution<float> dist{0, 1.0};

        Vector vec {
            dist(engine),
            dist(engine),
            dist(engine)
        };
        std::println("{},{},{}", vec.x, vec.y, vec.z);
      }
    }
  }
}
```
* set_counter[color ff0000]
* uniform_real_distribution[link /reference/random/uniform_real_distribution.md]
* std::uint32_t[link /reference/cstdint/uint32_t.md]

### 出力例
```
0.8202247,0.18554558,0.8234037
0.4850654,0.9281539,0.43299365
0.26559144,0.98589313,0.31661463
0.88831127,0.4234704,0.9224362
0.0027833676,0.14429614,0.8929877
0.6186795,0.6290597,0.46478647
0.17204352,0.54567194,0.1469554
0.7067667,0.48607737,0.6880201
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
