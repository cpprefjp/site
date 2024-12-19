# philox4x32
* random[meta header]
* std[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  using philox4x32 = philox_engine<uint_fast32_t, 32, 4, 10, 0xD2511F53, 0x9E3779B9, 0xCD9E8D57, 0xBB67AE85>;
}
```
* philox_engine[link philox_engine.md]
* uint_fast32_t[link /reference/cstdint/uint_fast32_t.md]

## 概要
パラメータ設定済みの[`philox_engine`](philox_engine.md)。  
32ビット版のPhilox。64ビット版は[`philox4x64`](philox4x64.md)。


## 要件
`philox4x32`型オブジェクトをデフォルト構築した場合、10000番目に生成される擬似乱数の値は`1955073260`であること。


## 乱数列の周期
4 * 2<sup>4 * 32</sup> = 2<sup>130</sup>


## サイズ
32ビット * 10個


## シード、および生成される値の型
[`uint_fast32_t`](/reference/cstdint/uint_fast32_t.md)


## 備考
- ここではラウンド数として`r = 10`を設定している。この値を大きくすれば乱数の品質は向上し、統計的により良い分布になっていく。`10`という値は既知の統計検定の合格する最小値よりやや大きめであり、広く使用されている値である。言い換えれば、適度な性能コストで統計的な安全マージンを提供している


## 例
```cpp example
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::philox4x32 engine{seed_gen()};

  for (int i = 0; i < 10; ++i) {
    std::uint32_t result = engine();
    std::cout << result << std::endl;
  }
}
```
* std::philox4x32[color ff0000]
* std::random_device[link random_device.md]
* seed_gen()[link random_device/op_call.md]
* engine()[link philox_engine/op_call.md]

### 出力例
```
717409690
3816001420
2063273750
279442752
2836561695
431684143
3973522490
2090827657
748889484
859307553
```

## バージョン
### 言語
- C++26

- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
