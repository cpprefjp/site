# operator~
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]
* function[meta id-type]

```cpp
bitset<N> operator~() const;          // C++03
bitset<N> operator~() const noexcept; // C++11
```

## 概要
ビットを反転させる。


## 戻り値
`*this`のビットを反転させた`bitset`オブジェクトを生成して返す。  
この関数は、以下のプ�グラムを同じ動作をする：

```cpp
return bitset(*this).flip();
```
* flip[link flip.md]


## 例外
投げない。


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs("0011");

  std::bitset<4> result = ~bs;

  std::cout << result << std::endl;
}
```

### 出力
```
1100
```


## 参照

