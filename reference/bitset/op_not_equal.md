#operator!=
```cpp
bool operator!=(const bitset<N>& rhs) const;          // C++03
bool operator!=(const bitset<N>& rhs) const noexcept; // C++11
```

##概要
`*this`と`rhs`を非等値比較する。


##戻り値
`*this`と`rhs`のいずれかのビット値が等しくなければ`true`、そうでなければ`false`を返す。


##例外
投げない。


##例
```cpp
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs1("1010");
  std::bitset<4> bs2("1110");

  if (bs1 != bs2) {
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


##参照

