# entropy
* random[meta header]
* std[meta namespace]
* random_device[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
double entropy() const noexcept;
```

## 概要
エントロピー(乱数の乱雑さの度合い)を取得する。


## 戻り値
実装が非決定的な乱数を持っておらず、擬似乱数を使用する場合には乱雑さがないため、`0.0`が返る。  
そうでなければ、[`min()`](min.md)から`log2(`[`max()`](max.md) `+ 1)`の範囲において、[`operator()`](op_call.md)によって返される乱数の乱雑さの度合いを返す。


## 備考
- GCC(libstdc++)とClang(libc++)は常に`0.0`を返す。
- Visual C++は常に`32`を返す。
- Boost.Randomの`random_device::entropy()`は常に`10`を返す。


## 例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device rd;

  double result = rd.entropy();
  std::cout << result << std::endl;
}
```
* entropy()[color ff0000]

### 出力
```
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1


## 参照


