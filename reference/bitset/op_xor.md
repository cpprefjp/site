#operator^
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]

```cpp
namespace std {
  template <size_t N>
  bitset<N> operator^(const bitset<N>& lhs, const bitset<N>& rhs);          // C++03

  template <size_t N>
  bitset<N> operator^(const bitset<N>& lhs, const bitset<N>& rhs) noexcept; // C++11
}
```

##概要
`lhs`と`rhs`に対して、排他的論理和(XOR)した`bitset`を生成する。


##戻り値
`lhs`と`rhs`のどちらか一方だけ1となるビットを1、それ以外のビットを0とする`bitset`オブジェクトを生成して返す。  
この関数は、以下のプログラムと同じ動作をする：

```cpp
return bitset<N>(lhs) ^= rhs;
```
* ^=[link ./op_xor_assign.md]


##例外
投げない。


##例
```cpp
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs1("0011");
  std::bitset<4> bs2("0101");

  std::bitset<4> result = bs1 ^ bs2;

  std::cout << result << std::endl;
}
```

###出力
```
0110
```


##参照

