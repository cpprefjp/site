#operator!=(C++11)
```cpp
namespace std {
  template <class Engine, size_t p, size_t r>
  bool operator!=(
    const discard_block_engine<Engine, p, r>& x,
    const discard_block_engine<Engine, p, r>& y);
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
  std::ranlux24 e1;
  std::ranlux24 e2;

  e1(); // e1 == e2にならないよう、e1の状態を進める

  if (e1 != e2) {
    std::cout << "not equal" << std::endl;
  }
  else {
    std::cout << "equal" << std::endl;
  }
}
```
* ranlux24[link /reference/random/ranlux24.md]

###出力
```
not equal
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


