#operator== (C++11)
```cpp
namespace std {
  template <class UIntType, UIntType A, UIntType C, UIntType M>
  bool operator==(
    const linear_congruential_engine<UIntType, A, C, M>& x,
    const linear_congruential_engine<UIntType, A, C, M>& y);
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
  std::minstd_rand e1;
  std::minstd_rand e2;

  if (e1 == e2) {
	std::cout << "equal" << std::endl;
  }
  else {
	std::cout << "not equal" << std::endl;
  }
}
```

###出力
```
equal
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


