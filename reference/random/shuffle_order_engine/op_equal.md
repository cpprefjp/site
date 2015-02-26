#operator== (C++11)
* random[meta header]

```cpp
namespace std {
  template <class Engine, size_t K>
  bool operator==(
    const shuffle_order_engine<Engine, K>& x,
    const shuffle_order_engine<Engine, K>& y);
}
```

##概要
等値比較を行う。


##戻り値
`x`と`y`の状態シーケンスの、全ての値を等値比較し、等しければ`true`、そうでなければ`false`を返す。


##計算量
O(状態シーケンスのサイズ)


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::knuth_b e1;
  std::knuth_b e2;

  if (e1 == e2) {
	std::cout << "equal" << std::endl;
  }
  else {
	std::cout << "not equal" << std::endl;
  }
}
```
* knuth_b[link /reference/random/knuth_b.md]

###出力
```
equal
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


