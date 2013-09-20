#operator==(C++11)
```cpp
namespace std {
  template <class Engine, size_t W, class UIntType>
  bool operator==(
    const independent_bits_engine<Engine, W, UIntType>& x,
    const independent_bits_engine<Engine, W, UIntType>& y);
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
#include <cstdint>

int main()
{
  typedef
    std::independent_bits_engine<std::mt19937, 64, std::uint64_t>
  engine_type;

  engine_type e1;
  engine_type e2;

  if (e1 == e2) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* mt19937[link /reference/random/mt19937.md]
* uint64_t[link /reference/cstdint/uint64_t.md]

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


