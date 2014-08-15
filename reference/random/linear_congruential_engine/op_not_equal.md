#operator!= (C++11)
```cpp
namespace std {
  template <class UIntType, UIntType A, UIntType C, UIntType M>
  bool operator!=(
    const linear_congruential_engine<UIntType, A, C, M>& x,
    const linear_congruential_engine<UIntType, A, C, M>& y);
}
```

##概要
非等値比較を行う。


##戻り値
`x`と`y`の状態シーケンスの、全ての値を等値比較し、等しくなければ`true`、そうでなければ`false`を返す。


##計算量
O(状態シーケンスのサイズ)


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::minstd_rand e1;
  std::minstd_rand e2;

  e1(); // e1 == e2にならないよう、e1の状態を進める

  if (e1 != e2) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```

###出力
```
not equal
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


