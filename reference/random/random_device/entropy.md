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
実装が非決定論的な乱数を持っておらず、擬似乱数を使用する場合には乱雑さがないため、`0.0`が返る。  
そうでなければ、[`min()`](min.md)から`log2(`[`max()`](max.md) `+ 1)`の範囲において、[`operator()`](op_call.md)によって返される乱数の乱雑さの度合いを返す。


## 備考
- GCC (libstdc++) は、バージョン7系までは常に`0.0`を返す。8.1からは、GNU/Linux環境でカーネルのエントロピー数にアクセスできればその値を返す
- Clang (libc++) は、常に`0.0`を返す。
- Visual C++は、常に`32`を返す。
- Boost.Randomの`random_device::entropy()`は常に`10`を返す。


## 例
```cpp example
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
- [GCC](/implementation.md#gcc): 4.7.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]


## 参照
- [GCC 8 Release Series - Changes, New Features, and Fixes](https://gcc.gnu.org/gcc-8/changes.html)
