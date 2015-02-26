#operator|=
* valarray[meta header]

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

  const std::size_t start = 0u;  // 開始位置
  const std::size_t length = 3u; // 要素数
  const std::size_t stride = 1u; // 何個置きに処理するか

  std::slice_array<int> result = v[std::slice(start, length, stride)];

  // 抽出した要素に0b11を論理和する
  result |= std::valarray<int>(0b00000011, length);

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


