# operator!=
* random[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Engine, size_t K>
  bool operator!=(
    const shuffle_order_engine<Engine, K>& x,
    const shuffle_order_engine<Engine, K>& y);
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

int main()
{
  std::knuth_b e1;
  std::knuth_b e2;

  e1(); // e1 == e2にならないよう、e1の状態を進める

  if (e1 != e2) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```
* std::knuth_b[link /reference/random/knuth_b.md]

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


