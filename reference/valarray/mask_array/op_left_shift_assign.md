#operator<<=
* valarray[meta header]

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

int main()
{
  std::valarray<int> v = {
    0b10000101,
    0b00001010,
    0b00010101
  };

  std::valarray<bool> mask = {true, true, true};

  std::mask_array<int> result = v[mask];

  // 抽出した要素を4ビット左シフトする
  result <<= std::valarray<int>(4, 3);

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


