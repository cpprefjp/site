#operator|=
* valarray[meta header]
* std[meta namespace]
* indirect_array[meta class]

```cpp
void operator|=(const valarray<T>& xs) const;
```

##概要
論理和の複合代入を行う。


##効果
元となる`valarray`オブジェクトから参照によって抽出した各要素に、`xs`の各要素を論理和する。


##戻り値
なし


##備考
`valarray`から抽出した要素数と`xs`の要素数が異なる場合、その挙動は未定義。


##例
```cpp
#include <iostream>
#include <valarray>
#include <bitset>

int main()
{
  std::valarray<int> v = {
    0b00000101,
    0b00001010,
    0b00010101
  };

  std::valarray<std::size_t> mask = {0, 1, 2};

  std::indirect_array<int> result = v[mask];

  // 抽出した要素に0b11を論理和する
  result |= std::valarray<int>(0b00000011, mask.size());

  for (int x : v) {
    std::cout << std::bitset<8>(x).to_string() << std::endl;
  }
}
```

###出力
```
00000111
00001011
00010111
```


