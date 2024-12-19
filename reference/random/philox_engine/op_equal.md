# operator==
* random[meta header]
* std[meta namespace]
* philox_engine[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
friend bool operator==(const philox_engine& x, const philox_engine& y);
```

## 概要
等値比較を行う。


## 戻り値
`a`と`b`の状態シーケンスの、全ての値を等値比較し、等しければ`true`、そうでなければ`false`を返す。


## 計算量
O(状態シーケンスのサイズ)


## 例
```cpp example
#include <cassert>
#include <random>

int main()
{
  std::philox4x32 e1;
  std::philox4x32 e2;

  assert(e1 == e2);
  assert(!(e1 != e2));
}
```

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 19 [mark noimpl]
- [GCC](/implementation.md#gcc): 14 [mark noimpl]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

