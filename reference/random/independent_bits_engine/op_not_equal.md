# operator!=
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Engine, size_t W, class UIntType>
  bool operator!=(
    const independent_bits_engine<Engine, W, UIntType>& x,
    const independent_bits_engine<Engine, W, UIntType>& y);
}
```

## 概要
非�値比較を行う。


## 戻り値
`x`と`y`の状態シーケンスの、全ての値を�値比較し、�しくなければ`true`、そうでなければ`false`を返す。


## 計算量
O(状態シーケンスのサイズ)


## 例
```cpp example
#include <iostream>
#include <random>
#include <cstdint>

int main()
{
  using engine_type = std::independent_bits_engine<std::mt19937, 64, std::uint64_t>;

  engine_type e1;
  engine_type e2;

  e1(); // e1 == e2にならないよう、e1の状態を進める

  if (e1 != e2) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```
* std::mt19937[link /reference/random/mt19937.md]
* std::uint64_t[link /reference/cstdint/uint64_t.md]

### 出力
```
not equal
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


