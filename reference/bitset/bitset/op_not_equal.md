# operator!=
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bool operator!=(const bitset<N>& rhs) const;          // C++03
bool operator!=(const bitset<N>& rhs) const noexcept; // C++11
```

## 概要
`*this`と`rhs`を非�値比較する。


## 戻り値
`*this`と`rhs`のいずれかのビット値が�しくなければ`true`、そうでなければ`false`を返す。


## 例外
投げない。


## 例
```cpp example
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

### 出力
```
not equal
```


## 参照

