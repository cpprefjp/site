#operator|=
* valarray[meta header]
* std[meta namespace]
* gslice_array[meta class]
* function[meta id-type]

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
#include <numeric> // accumulate
#include <functional> // multiplies

std::size_t product(const std::valarray<std::size_t>& va)
{
  return std::accumulate(
           std::begin(va),
           std::end(va),
           1u,
           std::multiplies<std::size_t>());
}

int main()
{
  std::valarray<int> va = {
    0b00000101,
    0b00001010,
    0b00010101
  };

  const std::size_t start = 0u;  // 開始位置
  const std::valarray<std::size_t> lengths = {3u}; // 要素数
  const std::valarray<std::size_t> strides = {1u}; // 何個置きに処理するか

  // 抽出した要素に0b11を論理和する
  // lengthを掛け合わせたものがgsliceで抽出した配列の長さ
  va[std::gslice(start, lengths, strides)] |= std::valarray<int>(0b00000011, product(lengths));

  for (int x : va) {
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


