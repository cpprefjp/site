# operator<<=
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bitset<N>& operator<<=(size_t pos) noexcept;
```

## 概要
ビットを左シフトさせる。


## 効果
`*this`のビットを`pos`の個数だけ左にシフトさせる。溢れたビットは0になる。


## 戻り値
`*this`


## 例外
投げない。


## 例
```cpp
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<8> bs("10000011");

  bs <<= 4;

  std::cout << bs << std::endl;
}
```

### 出力
```
00110000
```


## 参照

