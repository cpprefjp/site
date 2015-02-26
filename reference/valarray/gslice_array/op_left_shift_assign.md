#operator<<=
* valarray[meta header]
* std[meta namespace]

```cpp
void operator<<=(const valarray<T>& xs) const;
```

##概要
左シフトの複合代入を行う。


##効果
元となる`valarray`オブジェクトから参照によって抽出した各要素を、`xs`の各要素の値だけ左シフトする。


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

std::size_t product(const std::valarray<std::size_t>& v)
{
  return std::accumulate(
           std::begin(v),
           std::end(v),
           1u,
           std::multiplies<std::size_t>());
}

int main()
{
  std::valarray<int> v = {
    0b10000101,
    0b00001010,
    0b00010101
  };

  const std::size_t start = 0u;  // 開始位置
  const std::valarray<std::size_t> lengths = {3u}; // 要素数
  const std::valarray<std::size_t> strides = {1u}; // 何個置きに処理するか

  // 抽出した要素を4ビット左シフトする
  // lengthを掛け合わせたものがgsliceで抽出した配列の長さ
  v[std::gslice(start, lengths, strides)] <<= std::valarray<int>(4, product(lengths));

  for (int x : v) {
    std::cout << std::bitset<8>(x).to_string() << std::endl;
  }
}
```

###出力
```
01010000
10100000
01010000
```


