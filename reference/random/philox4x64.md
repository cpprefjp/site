# philox4x64
* random[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  using philox4x64 = philox_engine<uint_fast64_t, 64, 4, 10, 0xD2E7470EE14C6C93, 0x9E3779B97F4A7C15, 0xCA5A826395121157, 0xBB67AE8584CAA73B>;
}
```
* philox_engine[link philox_engine.md]
* uint_fast64_t[link /reference/cstdint/uint_fast64_t.md]

## 概要
パラメータ設定済みの[`philox_engine`](philox_engine.md)。  
64ビット版のPhilox。32ビット版は[`philox4x32`](philox4x32.md)。


## 要件
`philox4x64`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`3409172418970261260`であること。


## 乱数列の周期
4 * 2<sup>4 * 64</sup> = 2<sup>258</sup>


## サイズ
64ビット * 10個


## シード、および生成される値の型
[`uint_fast64_t`](/reference/cstdint/uint_fast64_t.md)


## 備考
- ここではラウンド数として`r = 10`を設定している。この値を大きくすれば乱数の品質は向上し、統計的により良い分布になっていく。`10`という値は既知の統計検定に合格する最小値よりやや大きめであり、広く使用されている値である。言い換えれば、適度な性能コストで統計的な安全マージンを提供している
    - `r = 7`でも統計的な欠陥は見つかっていないが、実際には`r = 10`だけが広く使われている


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::philox4x64 engine{seed_gen()};

  for (int i = 0; i < 10; ++i) {
    std::uint64_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::philox4x64[color ff0000]
* std::random_device[link random_device.md]
* seed_gen()[link random_device/op_call.md]
* engine()[link philox_engine/op_call.md]

### 出力例
```
72062055105063631
539956941501865535
5904818425294243952
8001500457562741315
13252054522302466664
18049527239021749472
5492258834844344098
5802814489282269200
3731762092097568778
13599432073888768711
```

## バージョン
### 言語
- C++26

- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
